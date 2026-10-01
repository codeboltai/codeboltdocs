#!/usr/bin/env node
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

type DocsSource = "auto" | "web" | "local";

type ApiDocRecord = {
  id: string;
  package: string;
  surface: string;
  kind: string;
  category?: string;
  title: string;
  summary?: string;
  description?: string;
  signature?: string;
  importPath?: string;
  sourcePath?: string;
  docsPath?: string;
  risk?: string;
  tags?: string[];
  methods?: string[];
};

type SearchParams = {
  query: string;
  limit?: number;
  package?: string;
  surface?: string;
  kind?: string;
  category?: string;
  risk?: string;
  tags?: string[];
  includeDocs?: boolean;
  source?: DocsSource;
};

type KnowledgeMode = "auto" | "manual" | "docs" | "api" | "skill" | "examples" | "troubleshooting";
type KnowledgeKind = Exclude<KnowledgeMode, "auto">;

type KnowledgeRecord = {
  id: string;
  title: string;
  description?: string;
  kind: KnowledgeKind;
  section?: string;
  sourceUrl: string;
  sourcePath?: string;
  markdownPath?: string;
  headings?: string[];
  tags?: string[];
  audience?: string[];
  relatedApiSymbols?: string[];
  relatedSkills?: string[];
  content: string;
};

type KnowledgeSearchParams = {
  query: string;
  mode?: KnowledgeMode;
  audience?: "agent" | "developer" | "user";
  maxResults?: number;
  source?: DocsSource;
};

type KnowledgeSearchResult = Omit<KnowledgeRecord, "content"> & {
  score: number;
  snippet?: string;
};

type GroupedKnowledgeResults = {
  manual: KnowledgeSearchResult[];
  skills: KnowledgeSearchResult[];
  docs: KnowledgeSearchResult[];
  api: Array<ApiDocRecord & { score: number }>;
  examples: KnowledgeSearchResult[];
  troubleshooting: KnowledgeSearchResult[];
};

const DEFAULT_DOCS_URL = "https://mcp.codebolt.ai";

function docsUrl(): string {
  return (process.env.CODEBOLT_DOCS_URL || DEFAULT_DOCS_URL).replace(/\/+$/, "");
}

function docsSource(source?: DocsSource): DocsSource {
  const configured = (source || process.env.CODEBOLT_DOCS_SOURCE || "web").toLowerCase();
  return configured === "local" || configured === "auto" ? configured : "web";
}

function indexPath(): string {
  const configured = process.env.CODEBOLT_DOCS_INDEX;
  if (!configured) throw new Error("CODEBOLT_DOCS_INDEX is required for local docs mode.");
  return path.resolve(configured);
}

function manifestPath(): string | undefined {
  return process.env.CODEBOLT_DOCS_MANIFEST ? path.resolve(process.env.CODEBOLT_DOCS_MANIFEST) : undefined;
}

function knowledgeIndexPath(): string {
  const configured = process.env.CODEBOLT_KNOWLEDGE_INDEX;
  if (!configured) throw new Error("CODEBOLT_KNOWLEDGE_INDEX is required for local knowledge search mode.");
  return path.resolve(configured);
}

function knowledgeManifestPath(): string | undefined {
  return process.env.CODEBOLT_KNOWLEDGE_MANIFEST ? path.resolve(process.env.CODEBOLT_KNOWLEDGE_MANIFEST) : undefined;
}

function dtsDir(): string | undefined {
  return process.env.CODEBOLT_DOCS_DTS_DIR ? path.resolve(process.env.CODEBOLT_DOCS_DTS_DIR) : undefined;
}

function parseJsonl(content: string): ApiDocRecord[] {
  return content.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => JSON.parse(line) as ApiDocRecord);
}

async function loadLocalRecords(): Promise<ApiDocRecord[]> {
  return parseJsonl(await fsp.readFile(indexPath(), "utf8"));
}

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function tokenize(value: unknown): string[] {
  return normalize(String(value || "")).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[._:/\\-]/g, " ").split(/\s+/).filter(Boolean);
}

function recordText(record: ApiDocRecord): string {
  return [record.id, record.title, record.summary, record.description, record.signature, record.importPath, record.category, record.risk, ...(record.tags || [])].filter(Boolean).join(" ");
}

function matchesFilters(record: ApiDocRecord, params: SearchParams): boolean {
  if (params.package && normalize(record.package) !== normalize(params.package)) return false;
  if (params.surface && normalize(record.surface) !== normalize(params.surface)) return false;
  if (!params.surface && !params.includeDocs && !["runtime-api", "agent-framework"].includes(record.surface)) return false;
  if (params.kind && normalize(record.kind) !== normalize(params.kind)) return false;
  if (params.category && normalize(record.category) !== normalize(params.category)) return false;
  if (params.risk && normalize(record.risk) !== normalize(params.risk)) return false;
  if (params.tags && params.tags.length > 0) {
    const tags = new Set((record.tags || []).map(normalize));
    if (!params.tags.every((tag) => tags.has(normalize(tag)))) return false;
  }
  return true;
}

function scoreRecord(record: ApiDocRecord, queryTokens: string[]): number {
  const haystack = new Set(tokenize(recordText(record)));
  let score = 0;
  for (const token of queryTokens) {
    if (haystack.has(token)) score += 10;
    if (normalize(record.title).includes(token)) score += 8;
    if (normalize(record.id).includes(token)) score += 6;
    if (normalize(record.summary).includes(token)) score += 4;
    if (normalize(record.signature).includes(token)) score += 3;
  }
  return score;
}

function knowledgeRecordText(record: KnowledgeRecord): string {
  return [
    record.id,
    record.title,
    record.description,
    record.kind,
    record.section,
    record.sourcePath,
    ...(record.headings || []),
    ...(record.tags || []),
    ...(record.audience || []),
    record.content,
  ].filter(Boolean).join(" ");
}

function matchesKnowledgeFilters(record: KnowledgeRecord, params: KnowledgeSearchParams): boolean {
  if (params.mode && params.mode !== "auto" && params.mode !== record.kind) return false;
  if (params.audience && record.audience?.length && !record.audience.map(normalize).includes(normalize(params.audience))) return false;
  return true;
}

function scoreKnowledgeRecord(record: KnowledgeRecord, params: KnowledgeSearchParams, queryTokens: string[]): number {
  const haystack = new Set(tokenize(knowledgeRecordText(record)));
  let score = 0;
  for (const token of queryTokens) {
    if (haystack.has(token)) score += 6;
    if (normalize(record.title).includes(token)) score += 12;
    if (normalize(record.id).includes(token)) score += 8;
    if (normalize(record.description).includes(token)) score += 6;
    if ((record.tags || []).some((tag) => normalize(tag).includes(token))) score += 10;
    if ((record.headings || []).some((heading) => normalize(heading).includes(token))) score += 8;
  }
  if (params.mode && params.mode !== "auto" && params.mode === record.kind) score += 20;
  if (params.audience && (record.audience || []).map(normalize).includes(normalize(params.audience))) score += 10;
  return score;
}

function createSnippet(content: string, queryTokens: string[]): string {
  const normalizedContent = content.replace(/\s+/g, " ").trim();
  if (!normalizedContent) return "";
  const lowerContent = normalizedContent.toLowerCase();
  const matchIndex = queryTokens.map((token) => lowerContent.indexOf(token)).filter((index) => index >= 0).sort((left, right) => left - right)[0] ?? 0;
  const start = Math.max(0, matchIndex - 120);
  const end = Math.min(normalizedContent.length, matchIndex + 280);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < normalizedContent.length ? "…" : "";
  return `${prefix}${normalizedContent.slice(start, end)}${suffix}`;
}

function emptyKnowledgeResults(): GroupedKnowledgeResults {
  return { manual: [], skills: [], docs: [], api: [], examples: [], troubleshooting: [] };
}

function groupKnowledgeResults(results: KnowledgeSearchResult[], apiResults: Array<ApiDocRecord & { score: number }> = []): GroupedKnowledgeResults {
  const grouped = emptyKnowledgeResults();
  grouped.api = apiResults;
  for (const result of results) {
    if (result.kind === "manual") grouped.manual.push(result);
    if (result.kind === "skill") grouped.skills.push(result);
    if (result.kind === "docs") grouped.docs.push(result);
    if (result.kind === "examples") grouped.examples.push(result);
    if (result.kind === "troubleshooting") grouped.troubleshooting.push(result);
  }
  return grouped;
}

function dtsFileName(moduleName: string): string {
  const normalized = moduleName.trim();
  if (/^(agent|agent-core|agent-base|agent-services|agent-unified|agent-framework)$/i.test(normalized)) return "agent-unified.d.ts";
  if (/^(processor-pieces|processors)$/i.test(normalized)) return "agent-processor-pieces.d.ts";
  return `${normalized}.d.ts`;
}

async function callWeb(endpoint: string, init?: RequestInit): Promise<any> {
  const response = await fetch(`${docsUrl()}${endpoint}`, {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
  });
  const text = await response.text();
  const body = text ? JSON.parse(text) : undefined;
  if (!response.ok) throw new Error(body?.error || body?.message || `Docs service returned ${response.status}`);
  return body;
}

async function withSource<T>(source: DocsSource, webFn: () => Promise<T>, localFn: () => Promise<T>): Promise<T> {
  if (source === "web") return webFn();
  if (source === "local") return localFn();
  try { return await webFn(); } catch { return localFn(); }
}

async function searchLocal(params: SearchParams) {
  const records = await loadLocalRecords();
  const queryTokens = tokenize(params.query);
  const limit = Math.max(1, Math.min(Number(params.limit || 10), 50));
  return records
    .filter((record) => matchesFilters(record, params))
    .map((record) => ({ record, score: scoreRecord(record, queryTokens) }))
    .filter((item) => queryTokens.length === 0 || item.score > 0)
    .sort((left, right) => right.score - left.score || left.record.id.localeCompare(right.record.id))
    .slice(0, limit)
    .map(({ record, score }) => ({ ...record, score }));
}

async function loadLocalKnowledgeRecords(): Promise<KnowledgeRecord[]> {
  const content = await fsp.readFile(knowledgeIndexPath(), "utf8");
  return content.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => JSON.parse(line) as KnowledgeRecord);
}

async function searchKnowledgeRecordsLocal(params: KnowledgeSearchParams): Promise<KnowledgeSearchResult[]> {
  const records = await loadLocalKnowledgeRecords();
  const queryTokens = tokenize(params.query);
  const limit = Math.max(1, Math.min(Number(params.maxResults || 8), 30));
  return records
    .filter((record) => record.kind !== "api")
    .filter((record) => matchesKnowledgeFilters(record, params))
    .map((record) => ({ record, score: scoreKnowledgeRecord(record, params, queryTokens) }))
    .filter((item) => queryTokens.length === 0 || item.score > 0)
    .sort((left, right) => right.score - left.score || left.record.id.localeCompare(right.record.id))
    .slice(0, limit)
    .map(({ record, score }) => ({
      ...record,
      content: undefined,
      score,
      snippet: createSnippet(record.content, queryTokens),
    } as KnowledgeSearchResult));
}

async function searchKnowledgeLocal(params: KnowledgeSearchParams): Promise<GroupedKnowledgeResults> {
  const mode = params.mode || "auto";
  const maxResults = Math.max(1, Math.min(Number(params.maxResults || 8), 30));
  const shouldSearchKnowledge = mode !== "api";
  const shouldSearchApi = mode === "api" || mode === "auto";
  const knowledgeResults = shouldSearchKnowledge ? await searchKnowledgeRecordsLocal({ ...params, mode }) : [];
  const apiResults = shouldSearchApi ? await searchLocal({ query: params.query, limit: mode === "api" ? maxResults : Math.max(3, Math.ceil(maxResults / 2)), includeDocs: true }) : [];
  return groupKnowledgeResults(knowledgeResults, apiResults);
}

async function getSpecLocal(ids: string[]) {
  const records = await loadLocalRecords();
  const byId = new Map(records.map((record) => [record.id, record]));
  return { specs: ids.map((id) => byId.get(id)).filter(Boolean), missing: ids.filter((id) => !byId.has(id)) };
}

async function getModuleSpecLocal(moduleName: string) {
  const normalized = normalize(moduleName);
  const records = await loadLocalRecords();
  return { module: moduleName, records: records.filter((record) => ["runtime-api", "agent-framework"].includes(record.surface) && normalize(record.category) === normalized) };
}

async function getDtsLocal(modules: string[]) {
  const dir = dtsDir();
  if (!dir) throw new Error("CODEBOLT_DOCS_DTS_DIR is required for local dts lookup.");
  const found: string[] = [];
  const missing: string[] = [];
  const sections: string[] = [];
  for (const moduleName of modules) {
    const filePath = path.join(dir, dtsFileName(moduleName));
    if (!fs.existsSync(filePath)) { missing.push(moduleName); continue; }
    found.push(moduleName);
    sections.push(`// ===== ${path.basename(filePath)} (module: ${moduleName}) =====\n${await fsp.readFile(filePath, "utf8")}`);
  }
  return { content: sections.join("\n\n"), found, missing };
}

async function getManifestLocal() {
  const filePath = manifestPath();
  if (!filePath) return { source: "local", indexPath: indexPath() };
  return JSON.parse(await fsp.readFile(filePath, "utf8"));
}

async function getKnowledgeManifestLocal() {
  const filePath = knowledgeManifestPath();
  if (!filePath) return { source: "local", indexPath: knowledgeIndexPath() };
  return JSON.parse(await fsp.readFile(filePath, "utf8"));
}

function textResult(value: unknown) {
  return { content: [{ type: "text" as const, text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }] };
}

const server = new McpServer({ name: "codebolt-docs", version: "0.1.0" });

server.tool("codebolt_docs_search", "Search CodeBolt API documentation.", {
  query: z.string(),
  limit: z.number().optional(),
  package: z.string().optional(),
  surface: z.string().optional(),
  kind: z.string().optional(),
  category: z.string().optional(),
  risk: z.string().optional(),
  tags: z.array(z.string()).optional(),
  includeDocs: z.boolean().optional(),
  source: z.enum(["auto", "web", "local"]).optional(),
}, async (params: any) => textResult(await withSource(docsSource(params.source), () => callWeb("/v1/search", { method: "POST", body: JSON.stringify(params) }).then((body) => body.results), () => searchLocal(params))));

server.tool("codebolt_docs_get_spec", "Get CodeBolt API docs records by id.", {
  ids: z.array(z.string()),
  source: z.enum(["auto", "web", "local"]).optional(),
}, async (params: any) => textResult(await withSource(docsSource(params.source), () => callWeb("/v1/spec", { method: "POST", body: JSON.stringify({ ids: params.ids }) }), () => getSpecLocal(params.ids))));

server.tool("codebolt_docs_get_module_spec", "Get all API records for a CodeBolt module.", {
  module: z.string(),
  source: z.enum(["auto", "web", "local"]).optional(),
}, async (params: any) => textResult(await withSource(docsSource(params.source), () => callWeb(`/v1/modules/${encodeURIComponent(params.module)}`), () => getModuleSpecLocal(params.module))));

server.tool("codebolt_docs_get_module_dts", "Get TypeScript declarations for CodeBolt modules.", {
  modules: z.array(z.string()),
  source: z.enum(["auto", "web", "local"]).optional(),
}, async (params: any) => textResult(await withSource(docsSource(params.source), () => callWeb("/v1/dts", { method: "POST", body: JSON.stringify({ modules: params.modules }) }), () => getDtsLocal(params.modules))));

server.tool("codebolt_docs_manifest", "Get CodeBolt docs manifest metadata.", {
  source: z.enum(["auto", "web", "local"]).optional(),
}, async (params: any) => textResult(await withSource(docsSource(params.source), () => callWeb("/v1/manifest"), getManifestLocal)));

server.tool("codebolt_knowledge_search", "Search CodeBolt agent knowledge, product docs, skills, examples, troubleshooting, and API reference.", {
  query: z.string(),
  mode: z.enum(["auto", "manual", "docs", "api", "skill", "examples", "troubleshooting"]).optional(),
  audience: z.enum(["agent", "developer", "user"]).optional(),
  maxResults: z.number().optional(),
  source: z.enum(["auto", "web", "local"]).optional(),
}, async (params: any) => textResult(await withSource(docsSource(params.source), () => callWeb("/v1/knowledge/search", { method: "POST", body: JSON.stringify(params) }), () => searchKnowledgeLocal(params))));

server.tool("codebolt_knowledge_manifest", "Get CodeBolt knowledge manifest metadata.", {
  source: z.enum(["auto", "web", "local"]).optional(),
}, async (params: any) => textResult(await withSource(docsSource(params.source), () => callWeb("/v1/knowledge/manifest"), getKnowledgeManifestLocal)));

await server.connect(new StdioServerTransport());

