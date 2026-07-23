#!/usr/bin/env node
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
const DEFAULT_DOCS_URL = "https://mcp.codebolt.ai";
function docsUrl() {
    return (process.env.CODEBOLT_DOCS_URL || DEFAULT_DOCS_URL).replace(/\/+$/, "");
}
function docsSource(source) {
    const configured = (source || process.env.CODEBOLT_DOCS_SOURCE || "web").toLowerCase();
    return configured === "local" || configured === "auto" ? configured : "web";
}
function indexPath() {
    const configured = process.env.CODEBOLT_DOCS_INDEX;
    if (!configured)
        throw new Error("CODEBOLT_DOCS_INDEX is required for local docs mode.");
    return path.resolve(configured);
}
function manifestPath() {
    return process.env.CODEBOLT_DOCS_MANIFEST ? path.resolve(process.env.CODEBOLT_DOCS_MANIFEST) : undefined;
}
function dtsDir() {
    return process.env.CODEBOLT_DOCS_DTS_DIR ? path.resolve(process.env.CODEBOLT_DOCS_DTS_DIR) : undefined;
}
function parseJsonl(content) {
    return content.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => JSON.parse(line));
}
async function loadLocalRecords() {
    return parseJsonl(await fsp.readFile(indexPath(), "utf8"));
}
function normalize(value) {
    return typeof value === "string" ? value.trim().toLowerCase() : "";
}
function tokenize(value) {
    return normalize(String(value || "")).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[._:/\\-]/g, " ").split(/\s+/).filter(Boolean);
}
function recordText(record) {
    return [record.id, record.title, record.summary, record.description, record.signature, record.importPath, record.category, record.risk, ...(record.tags || [])].filter(Boolean).join(" ");
}
function matchesFilters(record, params) {
    if (params.package && normalize(record.package) !== normalize(params.package))
        return false;
    if (params.surface && normalize(record.surface) !== normalize(params.surface))
        return false;
    if (!params.surface && !params.includeDocs && !["runtime-api", "agent-framework"].includes(record.surface))
        return false;
    if (params.kind && normalize(record.kind) !== normalize(params.kind))
        return false;
    if (params.category && normalize(record.category) !== normalize(params.category))
        return false;
    if (params.risk && normalize(record.risk) !== normalize(params.risk))
        return false;
    if (params.tags && params.tags.length > 0) {
        const tags = new Set((record.tags || []).map(normalize));
        if (!params.tags.every((tag) => tags.has(normalize(tag))))
            return false;
    }
    return true;
}
function scoreRecord(record, queryTokens) {
    const haystack = new Set(tokenize(recordText(record)));
    let score = 0;
    for (const token of queryTokens) {
        if (haystack.has(token))
            score += 10;
        if (normalize(record.title).includes(token))
            score += 8;
        if (normalize(record.id).includes(token))
            score += 6;
        if (normalize(record.summary).includes(token))
            score += 4;
        if (normalize(record.signature).includes(token))
            score += 3;
    }
    return score;
}
function dtsFileName(moduleName) {
    const normalized = moduleName.trim();
    if (/^(agent|agent-core|agent-base|agent-services|agent-unified|agent-framework)$/i.test(normalized))
        return "agent-unified.d.ts";
    if (/^(processor-pieces|processors)$/i.test(normalized))
        return "agent-processor-pieces.d.ts";
    return `${normalized}.d.ts`;
}
async function callWeb(endpoint, init) {
    const response = await fetch(`${docsUrl()}${endpoint}`, {
        ...init,
        headers: { "content-type": "application/json", ...(init?.headers || {}) },
    });
    const text = await response.text();
    const body = text ? JSON.parse(text) : undefined;
    if (!response.ok)
        throw new Error(body?.error || body?.message || `Docs service returned ${response.status}`);
    return body;
}
async function withSource(source, webFn, localFn) {
    if (source === "web")
        return webFn();
    if (source === "local")
        return localFn();
    try {
        return await webFn();
    }
    catch {
        return localFn();
    }
}
async function searchLocal(params) {
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
async function getSpecLocal(ids) {
    const records = await loadLocalRecords();
    const byId = new Map(records.map((record) => [record.id, record]));
    return { specs: ids.map((id) => byId.get(id)).filter(Boolean), missing: ids.filter((id) => !byId.has(id)) };
}
async function getModuleSpecLocal(moduleName) {
    const normalized = normalize(moduleName);
    const records = await loadLocalRecords();
    return { module: moduleName, records: records.filter((record) => ["runtime-api", "agent-framework"].includes(record.surface) && normalize(record.category) === normalized) };
}
async function getDtsLocal(modules) {
    const dir = dtsDir();
    if (!dir)
        throw new Error("CODEBOLT_DOCS_DTS_DIR is required for local dts lookup.");
    const found = [];
    const missing = [];
    const sections = [];
    for (const moduleName of modules) {
        const filePath = path.join(dir, dtsFileName(moduleName));
        if (!fs.existsSync(filePath)) {
            missing.push(moduleName);
            continue;
        }
        found.push(moduleName);
        sections.push(`// ===== ${path.basename(filePath)} (module: ${moduleName}) =====\n${await fsp.readFile(filePath, "utf8")}`);
    }
    return { content: sections.join("\n\n"), found, missing };
}
async function getManifestLocal() {
    const filePath = manifestPath();
    if (!filePath)
        return { source: "local", indexPath: indexPath() };
    return JSON.parse(await fsp.readFile(filePath, "utf8"));
}
function textResult(value) {
    return { content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }] };
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
}, async (params) => textResult(await withSource(docsSource(params.source), () => callWeb("/v1/search", { method: "POST", body: JSON.stringify(params) }).then((body) => body.results), () => searchLocal(params))));
server.tool("codebolt_docs_get_spec", "Get CodeBolt API docs records by id.", {
    ids: z.array(z.string()),
    source: z.enum(["auto", "web", "local"]).optional(),
}, async (params) => textResult(await withSource(docsSource(params.source), () => callWeb("/v1/spec", { method: "POST", body: JSON.stringify({ ids: params.ids }) }), () => getSpecLocal(params.ids))));
server.tool("codebolt_docs_get_module_spec", "Get all API records for a CodeBolt module.", {
    module: z.string(),
    source: z.enum(["auto", "web", "local"]).optional(),
}, async (params) => textResult(await withSource(docsSource(params.source), () => callWeb(`/v1/modules/${encodeURIComponent(params.module)}`), () => getModuleSpecLocal(params.module))));
server.tool("codebolt_docs_get_module_dts", "Get TypeScript declarations for CodeBolt modules.", {
    modules: z.array(z.string()),
    source: z.enum(["auto", "web", "local"]).optional(),
}, async (params) => textResult(await withSource(docsSource(params.source), () => callWeb("/v1/dts", { method: "POST", body: JSON.stringify({ modules: params.modules }) }), () => getDtsLocal(params.modules))));
server.tool("codebolt_docs_manifest", "Get CodeBolt docs manifest metadata.", {
    source: z.enum(["auto", "web", "local"]).optional(),
}, async (params) => textResult(await withSource(docsSource(params.source), () => callWeb("/v1/manifest"), getManifestLocal)));
await server.connect(new StdioServerTransport());
