---
sidebar_position: 9
title: Build Your First Execution Backend
description: Create a custom execution backend (provider) that manages remote environments where agents run
---

# Build Your First Execution Backend

Create a custom execution backend (provider) that manages remote environments where agents run. Your provider handles environment creation, teardown, file operations, and message transport.

**Prerequisites:** Node.js 18+, npm, familiarity with the target execution environment (Docker, cloud sandbox, remote server, etc.).

---

## Step 1: Create the provider project

```bash
mkdir my-provider && cd my-provider
npm init -y
npm install @codebolt/codeboltjs @codebolt/provider @codebolt/types
npm install -D typescript
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

Add a build script to `package.json`:

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

---

## Step 2: Extend BaseProvider

Create `src/MyProvider.ts`. Extend `BaseProvider` and implement the required abstract methods:

```typescript
import { BaseProvider } from '@codebolt/provider';
import type { ProviderInitVars } from '@codebolt/types/provider';

export class MyProvider extends BaseProvider {

  // Create or connect to the remote environment
  async setupEnvironment(initVars: ProviderInitVars): Promise<void> {
    console.log('[MyProvider] Setting up environment...');
    // Example: create a Docker container, start a VM, connect to a sandbox
    // Store any resource IDs for cleanup later
  }

  // Clean up the environment on shutdown
  async teardownEnvironment(): Promise<void> {
    console.log('[MyProvider] Tearing down environment...');
    // Example: stop and remove the container/VM/sandbox
  }

  // Resolve project paths and metadata
  async resolveProjectContext(initVars: ProviderInitVars): Promise<any> {
    return {
      projectPath: initVars.projectPath,
      projectName: initVars.projectPath?.split('/').pop() || 'project',
    };
  }

  // Resolve the workspace directory in the remote environment
  async resolveWorkspacePath(initVars: ProviderInitVars): Promise<string> {
    return initVars.projectPath || '/workspace';
  }

  // Return file changes in the environment
  async onGetDiffFiles(): Promise<any> {
    return { files: [] };
  }
}
```

### Optional: Override hooks for advanced behavior

```typescript
export class MyProvider extends BaseProvider {
  // ... abstract methods above ...

  // Start the agent server inside the remote environment
  async ensureAgentServer(): Promise<void> {
    // Example: start CodeBolt inside a container and wait for it to be ready
  }

  // Custom health check
  async checkEnvironmentHealth(): Promise<boolean> {
    // Example: run 'echo OK' in the sandbox and check the response
    return true;
  }

  // Clean up orphaned resources from a previous crashed session
  async onEnvironmentRecoveryFailed(resourceId: string): Promise<void> {
    // Example: kill an orphaned sandbox by its persisted ID
  }
}
```

---

## Step 3: Register handlers with the SDK

Create `src/index.ts`. This is the entry point — it creates your provider and registers all handlers:

```typescript
import codebolt from "@codebolt/codeboltjs";
import { MyProvider } from "./MyProvider";

// Create provider instance with configuration
const provider = new MyProvider({
  agentServerPort: parseInt(process.env.REMOTE_EXECUTION_PORT || '3100', 10),
  agentServerHost: 'localhost',
  reconnectAttempts: 5,
  reconnectDelay: 1000,
  transport: 'websocket',
});

// Get lifecycle handlers
const handlers = provider.getEventHandlers();

// Register lifecycle handlers
codebolt.onProviderStart(handlers.onProviderStart);
codebolt.onProviderAgentStart(handlers.onProviderAgentStart);
codebolt.onProviderStop(handlers.onProviderStop);
codebolt.onCloseSignal(handlers.onCloseSignal);
codebolt.onRawMessage(handlers.onRawMessage);
codebolt.onGetDiffFiles(handlers.onGetDiffFiles);

// Register file operation handlers
codebolt.onReadFile(provider.onReadFile.bind(provider));
codebolt.onWriteFile(provider.onWriteFile.bind(provider));
codebolt.onDeleteFile(provider.onDeleteFile.bind(provider));
codebolt.onDeleteFolder(provider.onDeleteFolder.bind(provider));
codebolt.onRenameItem(provider.onRenameItem.bind(provider));
codebolt.onCreateFolder(provider.onCreateFolder.bind(provider));
codebolt.onCopyFile(provider.onCopyFile.bind(provider));
codebolt.onCopyFolder(provider.onCopyFolder.bind(provider));
codebolt.onGetTreeChildren(provider.onGetProject.bind(provider));
codebolt.onGetFullProject(provider.onGetFullProject.bind(provider));
```

---

## Step 4: Implement file operations

If your environment needs custom file handling (e.g., files live in a remote sandbox), override the file operation methods:

```typescript
export class MyProvider extends BaseProvider {
  // ... lifecycle methods ...

  async onReadFile(params: any): Promise<any> {
    // Read file from remote environment
    // Example: execute 'cat <path>' in sandbox, or use an API
    const content = await this.remoteExec(`cat ${params.path}`);
    return { content };
  }

  async onWriteFile(params: any): Promise<any> {
    // Write file to remote environment
    await this.remoteWrite(params.path, params.content);
    return { success: true };
  }

  async onDeleteFile(params: any): Promise<any> {
    await this.remoteExec(`rm ${params.path}`);
    return { success: true };
  }

  async onCreateFolder(params: any): Promise<any> {
    await this.remoteExec(`mkdir -p ${params.path}`);
    return { success: true };
  }
}
```

If your environment uses the local filesystem (e.g., git worktree), you can skip these — BaseProvider provides default implementations.

---

## Step 5: Build and install

### Build

```bash
npm run build
```

### Install

Providers can be installed from the marketplace (UI) or locally:

```bash
# Copy to a location the server can discover
cp -r my-provider ~/.codebolt/providers/my-provider
```

Or install via the server API:

```bash
curl -X POST http://localhost:2719/environments/installed-providers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-provider",
    "displayName": "My Custom Provider",
    "type": "remote",
    "description": "Custom execution backend"
  }'
```

### Configure

1. Open **Settings** in Codebolt.
2. Go to **Environment Providers**.
3. Find your provider and configure it (API keys, endpoints, etc.).
4. Optionally set it as the default provider.

### Test

1. Create a new environment using your provider.
2. Run an agent — it should execute in your remote environment.
3. Check that file operations work (read, write, create folder).
4. Verify the agent can communicate back to the local platform.

---

## Provider configuration

The server passes these environment variables when spawning your provider:

| Variable | Description |
|---|---|
| `PROVIDER_ID` | Unique provider instance ID |
| `ENVIRONMENT_NAME` | Name of the environment |
| `PROJECT_PATH` | Local project path |
| `ENVIRONMENT_CONFIG` | JSON string with provider-specific config |
| `REMOTE_EXECUTION_PORT` | Port for the agent server (default: 3100) |

Your provider reads these from `process.env` or receives them in `initVars`.

---

## What BaseProvider gives you

You don't need to implement these — they're built into BaseProvider:

- **Message queueing** — messages sent before transport is ready are queued and flushed.
- **WebSocket reconnection** — exponential backoff, configurable max attempts.
- **Keepalive pings** — prevents idle disconnects.
- **Request timeouts** — automatic timeout for pending requests.
- **Resource ID persistence** — persist sandbox/container IDs for crash recovery.
- **Health checks** — periodic environment monitoring.

---

## Project structure

```
my-provider/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts          # Entry point — register handlers with SDK
│   └── MyProvider.ts     # BaseProvider subclass — environment lifecycle
└── dist/
    └── index.js
```

---

## See Also

- [Execution Backends Overview](./06_execution-backends.md) — concepts, provider interface, server API
- [Plugins Overview](../05_plugins/01_overview.md) — plugin development overview
