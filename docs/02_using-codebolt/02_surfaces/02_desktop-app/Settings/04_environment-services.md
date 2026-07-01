---
sidebar_position: 4
title: Environment & Services
description: This section verifies that required runtimes are installed on your machine and lets you store API keys for external services agents may need.
---

# Environment & Services

## Environment & Services

This section verifies that required runtimes are installed on your machine and lets you store API keys for external services agents may need.

### Environments

Each listed tool (e.g. Node.js, Python, Docker) shows a **Check** button. Click it to verify the tool is installed and available on your PATH. A checkmark appears when the check passes. Each entry also has a **How to Install** link pointing to the tool's official documentation.

### Services

External services (APIs, SaaS tools) your agents may call are listed here. Each entry shows:

- The service name and description
- The environment variable name it maps to (e.g. `OPENAI_API_KEY`)
- A **Usage Instruction** link
- A text input to enter the key or credential
- A **Confirm** button to save

Values are encrypted and injected into agent processes at runtime.

---

## Environment Provider

Environment providers determine where agent code runs — locally, in Docker, in a cloud sandbox, or on a remote server. This section lists installed providers and lets you add new ones.

### Installed providers

Each installed provider shows its name, type badge, description, author, and version. Actions:

| Action | Description |
|---|---|
| **Settings** (gear icon) | Open the provider's configuration form |
| **Set as Default** | Make this provider the default for new agent runs |
| **Delete** | Remove the provider |
| **External link** | View the provider's source repository |

The **Default** badge marks whichever provider is currently selected as default.

### Provider configuration

Each provider has a dynamically generated configuration form driven by its YAML definition. Field types rendered:

| Field type | UI control |
|---|---|
| String | Text input |
| Number | Number input |
| Boolean | Toggle switch |
| Secret | Masked text input with show/hide toggle |
| Nested object | Collapsible section |

Click **Save Configuration** to apply changes, or **Reset** to revert to the last saved state.

### Marketplace

Browse available providers from the marketplace. Each card shows the name, version, description, and tags. Click **Install** to download and register the provider. Click the external link icon to view the source repository.

### Adding a custom provider

Click **Add Custom** to define your own provider:

| Field | Description |
|---|---|
| Name | Identifier (used internally) |
| Display Name | Human-readable label |
| Type | `Docker`, `E2B`, `Local`, `Remote`, or `Custom` |
| Description | Short description |
| API Key | (E2B / Remote types only) |
| Endpoint URL | (E2B / Remote types only) |

### Provider types

| Type | Where code runs |
|---|---|
| **Local** | Directly on your machine |
| **Docker** | Inside a Docker container on your machine |
| **E2B** | E2B cloud sandbox |
| **Daytona** | Daytona cloud workspace |
| **Remote** | Any remote server reachable via URL |
| **Custom** | Your own custom runtime |

---

## Merge Config

Controls how changes made inside an environment (e.g. files written by an agent running in Docker) are merged back into your local project.

### Merge Strategy

| Option | Behaviour |
|---|---|
| **Auto Merge** | Changes are merged automatically without review |
| **Manual Merge** | You review and approve changes before they are applied |

### Conflict Resolution

| Option | Behaviour |
|---|---|
| **Manual** | You resolve merge conflicts yourself |
| **Agent** | An AI agent resolves conflicts on your behalf |

When **Agent** is selected, choose which installed agent handles conflict resolution from the dropdown that appears.

Click **Save Merge Config** to persist your selections.
