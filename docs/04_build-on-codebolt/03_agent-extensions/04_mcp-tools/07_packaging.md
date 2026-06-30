---
sidebar_position: 7
title: Packaging
description: How to wrap your MCP server for distribution. Packaging is about making it easy for someone else to install your server without fighting their environment.
---

# Packaging

How to wrap your MCP server for distribution. Packaging is about making it easy for someone else to install your server without fighting their environment.

## Local project distribution

For project-specific tools, place them directly in `.codebolt/tools/{toolName}/` with a `codebolttool.yaml` config. Codebolt discovers and registers them automatically — no packaging needed. See [Quickstart](./02_quickstart-local-mcp.md) for the full setup.

This is the simplest path when the tool is specific to your project or team.

## External distribution shapes

| Shape | How users install | Good for |
|---|---|---|
| **npm package** | `npm install` + run via node | JavaScript/TypeScript servers |
| **Standalone binary** | Download + run | Servers with heavy dependencies or non-JS/TS languages |
| **Docker image** | Pull + run | Servers with complex runtime requirements |

Most MCP servers are npm packages. Binaries and Docker are for special cases.

## npm package layout

```
my-mcp-server/
├── package.json
├── README.md
├── LICENSE
├── src/
│   └── server.js
├── bin/
│   └── my-mcp-server      ← executable shim
└── test/
    └── server.test.js
```

### `package.json`

```json
{
  "name": "my-mcp-server",
  "version": "0.1.0",
  "description": "MCP server for... (one-sentence description)",
  "type": "module",
  "main": "src/server.js",
  "bin": {
    "my-mcp-server": "bin/my-mcp-server"
  },
  "scripts": {
    "start": "node src/server.js",
    "test": "node --test test/"
  },
  "keywords": ["mcp", "codebolt", "your-domain"],
  "license": "MIT",
  "dependencies": {
    "@codebolt/codeboltjs": "^1.0.0"
  },
  "files": [
    "src/",
    "bin/",
    "README.md",
    "LICENSE"
  ]
}
```

Key fields:

- **`bin`** — provides an executable users can invoke by name after `npm install -g`. The shim in `bin/my-mcp-server` is a 2-line script: `#!/usr/bin/env node\nimport('../src/server.js');`.
- **`files`** — what gets published. Exclude `test/`, `.github/`, source maps, etc.
- **`type: "module"`** — use ESM. MCP SDK is ESM-first.

### README requirements

Every published MCP server needs a README that covers:

1. **What the server does.** One sentence.
2. **Which tools it provides.** List them with a one-line description each.
3. **How to install.** `npm install -g my-mcp-server`.
4. **How to configure.** Env vars, config files, required credentials.
5. **How to add to Codebolt.** A copy-pastable `.codebolt/mcp-servers.yaml` snippet.
6. **Security notes.** What access does this server need? What's the blast radius?
7. **License.**

This is not optional. An MCP server without a README is unusable by anyone but the author.

## Configuration

Servers should be configurable without editing code. Use environment variables for everything config-able:

```js
const config = {
  apiKey: process.env.MY_API_KEY,
  endpoint: process.env.MY_ENDPOINT ?? "https://api.example.com",
  timeout: parseInt(process.env.MY_TIMEOUT_MS ?? "10000"),
};
```

Document the env vars in the README:

```
Environment variables:
  MY_API_KEY       Required. API key for the example service.
  MY_ENDPOINT      Optional. Override the default API endpoint.
  MY_TIMEOUT_MS    Optional. Per-request timeout in ms (default 10000).
```

The user's `.codebolt/mcp-servers.yaml` sets them:

```yaml
servers:
  my-server:
    command: my-mcp-server
    env:
      MY_API_KEY: ${MY_API_KEY}     # reads from shell env
      MY_ENDPOINT: https://staging.example.com
```

**Never** accept secrets as command-line arguments. They'd show up in process listings and logs.

## Capability bundles vs plain MCP servers

Plain MCP servers are standalone executables. [Capability bundles](../../03_agent-extensions/02_capabilities/01_overview.md) are Codebolt-specific packages that can include MCP servers alongside prompts, hooks, and UI panels.

| Plain MCP server | Capability bundle |
|---|---|
| Works in any MCP host | Codebolt-specific |
| Just tools | Tools + prompts + hooks + UI |
| Simple to author | More surface area |
| Good default | Use when you need the extras |

If your server only provides tools, ship it as a plain MCP server. If you need to bundle tools with prompts, agent presets, or UI panels that only make sense together, use a capability bundle.

## Dependencies

Keep dependencies minimal. Every dep is a vulnerability surface, a version conflict waiting to happen, and a distribution size multiplier.

- **Lock your dependencies.** Use `package-lock.json`.
- **Pin major versions** of the MCP SDK. Breaking changes happen on major version bumps.
- **Prefer the standard library** for anything non-critical. Don't pull in a fifteen-megabyte dep for something you could do in ten lines.
- **Audit dependencies before publishing.** `npm audit`. Fix critical/high vulnerabilities.

## Binary distribution

If your server is in Go, Rust, or another language, or has heavy native dependencies:

1. Build for each target platform (linux-x64, linux-arm64, darwin-x64, darwin-arm64, windows-x64).
2. Package each as a separate archive (`.tar.gz` or `.zip`).
3. Ship a manifest (JSON) listing each binary with its platform triple and SHA-256.
4. Users download the appropriate binary for their OS and add it to `mcp-servers.yaml` with an absolute path.

Codebolt may offer a helper for this in future ("install from URL"), but today binary distribution requires users to download and extract manually. Favor npm when possible.

## Docker

For servers with heavy or awkward runtime requirements:

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY src ./src
USER nobody
ENTRYPOINT ["node", "src/server.js"]
```

Configure in `mcp-servers.yaml`:

```yaml
servers:
  my-docker-server:
    command: docker
    args:
      - run
      - --rm
      - -i
      - --env-file=.env
      - my-mcp-image:latest
```

The `-i` is required for stdin (stdio transport). Docker adds overhead; use only when necessary.

## Versioning

Follow semver strictly:

- **Patch** — bug fixes, no tool changes.
- **Minor** — new tools, optional fields added to existing tool schemas.
- **Major** — breaking changes to tool schemas, removed tools, incompatible behaviour.

Keep a `CHANGELOG.md`. Users deciding whether to upgrade will read it.

## Security checklist before publishing

- [ ] No hard-coded secrets anywhere in the source.
- [ ] No real API keys in examples or tests.
- [ ] Input validation on every tool argument.
- [ ] No arbitrary code execution from tool inputs (no `eval`, no `exec` with user strings).
- [ ] File path arguments are validated against directory traversal.
- [ ] Shell command arguments are properly escaped or avoided.
- [ ] Network requests have timeouts.
- [ ] Dependencies are audited.
- [ ] README documents the server's blast radius.

MCP servers run with the user's credentials. Don't abuse that trust.

## See also

- [MCP Tools Overview](./01_overview.md)
- [Publishing](../../02_creating-agents/99_publishing.md) — after packaging comes publishing
- [Quickstart](./02_quickstart-local-mcp.md)
- [MCP & Tools (internals)](../../07b_subsystems/02_mcp-and-tools.md)
