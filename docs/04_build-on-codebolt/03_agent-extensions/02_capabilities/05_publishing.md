---
sidebar_position: 5
title: Marketplace and Publishing
description: "Full CLI reference: Capability CLI"
---

# Marketplace and Publishing

## Codebolt Marketplace

The Codebolt marketplace hosts both capabilities and executors that can be browsed, searched, and installed.

### Marketplace API endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /capabilities/getall` | List all published capabilities |
| `GET /capabilities/:id` | Get capability detail |
| `GET /capabilities/search?q=&type=` | Search capabilities |
| `GET /capabilities/download/:id` | Download capability zip |
| `GET /capabilityexecutors/getall` | List all published executors |
| `GET /capabilityexecutors/:id` | Get executor detail |
| `GET /capabilityexecutors/download/:id` | Download executor zip |

Base URL: `https://api.codebolt.com`

### Marketplace capability fields

```ts
{
  id: string;
  name: string;
  type: string;          // skill, power, talent, etc.
  version: string;
  description: string;
  author: string;
  downloads: number;
  rating: number;
  tags: string[];
  downloadUrl: string;
}
```

### Marketplace executor fields

```ts
{
  id: string;
  name: string;
  version: string;
  description: string;
  supportedTypes: string[];
  author: string;
  downloads: number;
  downloadUrl: string;
}
```

---

## Download and installation flow

When a capability or executor is installed from the marketplace:

1. Fetch the item's info from the marketplace API
2. Download the zip archive from the `downloadUrl`
3. Extract the zip into the appropriate directory:
   - Capabilities: `.codebolt/capabilities/<type>/<name>/`
   - Executors: `.codebolt/capabilities/executors/<name>/`
4. Refresh the registry to pick up the new item
5. Emit WebSocket events (`capabilityChanged`/`executorChanged` + `registryRefreshed`)

Installation can be triggered via:
- The REST API (`POST /capability/download` or `/download-executor`)
- The UI marketplace panel
- Electron IPC (`capability:download`, `capability:downloadExecutor`)

---

## Creating capabilities

### Via CLI

The `codebolt action capability` command group provides the primary way to create, publish, and list capabilities.

#### Create a capability

```bash
codebolt action capability create [options]
```

| Option | Description |
|--------|-------------|
| `--name <name>` | Name for the new capability |
| `--path <path>` | Target directory (where the capability will be created) |
| `--project <path>` | Project directory for server context |
| `--template <name>` | Template to use for scaffolding |
| `--id <id>` | Unique identifier for the capability |
| `--description <text>` | Description of the capability |
| `--skip-install` | Skip `npm install` after creation |

**Examples:**

```bash
# Create a capability with a name and description
codebolt action capability create --name frontend-refactor --description "Refactor React components"

# Create in a specific directory
codebolt action capability create --name my-skill --path ./my-extensions

# Skip dependency installation during scaffolding
codebolt action capability create --name api-gen --skip-install
```

This scaffolds a capability directory with `capability.yaml`, `package.json`, entry point, and all required files.

#### Publish a capability

```bash
codebolt action capability publish [options]
```

| Option | Description |
|--------|-------------|
| `--path <path>` | Path to the capability directory to publish |
| `--project <path>` | Project directory for server context |

```bash
codebolt action capability publish --path ./my-extensions/frontend-refactor
```

#### List published capabilities

```bash
codebolt action capability list
```

Lists all capabilities published to the Codebolt registry.

> **Full CLI reference:** [Capability CLI](/docs/reference/codebolt-cli/actions/capability)

### Via REST API

```bash
curl -X POST http://localhost:PORT/capability/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-capability",
    "type": "skill",
    "version": "1.0.0",
    "description": "My custom capability",
    "author": "my-team",
    "tags": ["custom"],
    "inputs": [{ "name": "target", "type": "string", "required": true }],
    "outputs": [{ "name": "result", "type": "string" }]
  }'
```

This creates:
- `<project>/.codebolt/capabilities/<type>/<name>/capability.yaml`
- `<project>/.codebolt/capabilities/<type>/<name>/index.js` (placeholder)

### Via REST API (executors)

```bash
curl -X POST http://localhost:PORT/capability/executors/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-executor",
    "version": "1.0.0",
    "description": "Custom executor for my types",
    "supportedTypes": ["power", "talent"],
    "entryPoint": "dist/index.js",
    "author": "my-team"
  }'
```

This creates:
- `<project>/.codebolt/capabilities/executors/<name>/executor.yaml`
- `<project>/.codebolt/capabilities/executors/<name>/dist/index.js` (placeholder)

### Manually

You can also create capabilities by hand — just create the directory structure and files:

```bash
mkdir -p .codebolt/capabilities/skill/my-skill
```

Then create `capability.yaml` and your implementation files. Refresh the registry afterwards:

```bash
curl -X POST http://localhost:PORT/capability/refresh
```

---

## UI Capability Panel

The Codebolt UI provides a **Capability Panel** with three main tabs:

### Capabilities tab
- **Installed** — lists all locally discovered capabilities with type badges and source indicators
- **Marketplace** — browse and install capabilities from the marketplace
- **Skills** — browse skills available from the backend skills API
- Type filter dropdown to narrow by capability type
- Search across name, description, and type
- Click any installed capability to view full details

### Executors tab
- **Installed** — lists local executors with their supported types shown as badges
- **Marketplace** — browse and install executors
- Each executor shows which capability types it can handle

### Skills tab
- Lists skills from the backend skills index
- Shows name, category, version, author, tags, and description
- Refresh triggers a re-index of the skills directory

---

## Publishing workflow

1. Create the capability locally (CLI or API)
2. Implement the logic in `index.js` or your entry point
3. Test by loading it in a local project and activating from a test agent
4. Inspect execution traces and results via the WebSocket events or UI panel
5. Publish to the marketplace once the package is stable

### Common mistakes

- Wrapping a single skill in unnecessary bundle structure — use a standalone skill instead
- Forgetting to declare `supportedTypes` in executor config
- Not testing with the actual executor that will run the capability in production
- Publishing with hard environment requirements that aren't documented

## See also

- [Structure and Schema](./02_structure-and-schema.md)
- [API Reference](./04_bundling-skills-and-tools.md)
- [Capabilities Overview](./01_overview.md)
