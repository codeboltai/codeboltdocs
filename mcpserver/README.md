# CodeBolt Docs MCP Server

Local MCP server for CodeBolt API and knowledge documentation lookup.

By default it calls the hosted docs service at `https://mcp.codebolt.ai`.

## Environment variables

- `CODEBOLT_DOCS_URL`: hosted docs service URL. Defaults to `https://mcp.codebolt.ai`.
- `CODEBOLT_DOCS_SOURCE`: `web`, `local`, or `auto`. Defaults to `web` for this standalone server.
- `CODEBOLT_DOCS_INDEX`: path to a local `api-index.jsonl` file for local/auto API docs mode.
- `CODEBOLT_DOCS_MANIFEST`: optional path to `api-manifest.json`.
- `CODEBOLT_DOCS_DTS_DIR`: optional directory containing `dts/*.d.ts` files.
- `CODEBOLT_KNOWLEDGE_INDEX`: path to a local `knowledge-index.jsonl` file for local/auto knowledge mode.
- `CODEBOLT_KNOWLEDGE_MANIFEST`: optional path to `knowledge-manifest.json`.

## Tools

- `codebolt_docs_search`
- `codebolt_docs_get_spec`
- `codebolt_docs_get_module_spec`
- `codebolt_docs_get_module_dts`
- `codebolt_docs_manifest`
- `codebolt_knowledge_search`
- `codebolt_knowledge_manifest`

## Local knowledge mode

Generate the shared knowledge index from the docs repo first:

```bash
cd /Users/ravirawat/Documents/codeboltai/AiEditor/codeboltdocs
npm run generate:knowledge
```

Then run the local MCP server against local artifacts:

```bash
cd /Users/ravirawat/Documents/codeboltai/AiEditor/codeboltdocs/mcpserver
CODEBOLT_DOCS_SOURCE=local \
CODEBOLT_DOCS_INDEX=/Users/ravirawat/Documents/codeboltai/AiEditor/CodeBolt/sdks/api-docs-index/generated/api-index.jsonl \
CODEBOLT_KNOWLEDGE_INDEX=/Users/ravirawat/Documents/codeboltai/AiEditor/CodeBolt/sdks/api-docs-index/generated/knowledge-index.jsonl \
npm run dev
```

`codebolt_knowledge_search` accepts:

```json
{
  "query": "custom tool registration",
  "mode": "auto",
  "audience": "agent",
  "maxResults": 8,
  "source": "auto"
}
```

It returns grouped results:

```json
{
  "manual": [],
  "skills": [],
  "docs": [],
  "api": [],
  "examples": [],
  "troubleshooting": []
}
```
