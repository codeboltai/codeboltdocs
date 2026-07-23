# CodeBolt Docs MCP Server

Local MCP server for CodeBolt API documentation lookup.

By default it calls the hosted docs service at `https://mcp.codebolt.ai`.

Environment variables:

- `CODEBOLT_DOCS_URL`: hosted docs service URL. Defaults to `https://mcp.codebolt.ai`.
- `CODEBOLT_DOCS_SOURCE`: `web`, `local`, or `auto`. Defaults to `web` for this standalone server.
- `CODEBOLT_DOCS_INDEX`: path to a local `api-index.jsonl` file for local/auto mode.
- `CODEBOLT_DOCS_MANIFEST`: optional path to `api-manifest.json`.
- `CODEBOLT_DOCS_DTS_DIR`: optional directory containing `dts/*.d.ts` files.

Tools:

- `codebolt_docs_search`
- `codebolt_docs_get_spec`
- `codebolt_docs_get_module_spec`
- `codebolt_docs_get_module_dts`
- `codebolt_docs_manifest`
