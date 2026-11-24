---
title: Register a Remote Agent
---

# Register a Remote Agent

Use **Create Remote Agent** when your agent already lives in another folder or repository and you want to use it in the current project. For example, you can open an app project in Codebolt and point it at an agent in a sibling repository on the same computer. The agent code stays in its original directory. Codebolt creates a registration at `.codebolt/agents/<name>/codeboltagent.yaml` in the open project.

### Remote agent vs remote execution

Choose the mode based on who starts the process:

- **Executed by CodeBolt** — give Codebolt the absolute path to the agent directory on the server’s filesystem. Codebolt launches the agent when you use it.
- **Self-executed** — launch the agent yourself and connect it to the Codebolt server using the agent ID and thread token. This works on the same computer or from a host that can reach the server.

For running workloads in a separate execution environment, see [Remote Execution](../11_agent-infrastructure/09_remote-execution.md).

### Option A — CodeBolt-executed

Codebolt launches and manages the agent process for you. You provide the **full absolute path** to the agent on disk.

**From the CLI:**

```bash
codebolt action agent create-remote --name my-remote-agent --execution-mode codeboltExecuted --remote-path /absolute/path/to/agent
```

**From the desktop app**, open the Chat agent picker and select **Create Agent → Create Remote Agent**. Enter a name, choose **Executed by CodeBolt**, provide the full absolute path to the agent, and click **Create Remote Agent**.

How it works at runtime:

- The UI requires `remotePath` before the create button is enabled.
- Codebolt stores that path in the remote agent manifest it creates under `.codebolt/agents/<name>/`.
- When you run the agent, Codebolt passes that path into the server process manager and starts a child process from that directory.
- If your desktop app/server is running locally, that process runs on the same machine.
- If the remote agent folder has a `package.json` with a `main` field, Codebolt uses that as the entrypoint. Otherwise it falls back to the default entrypoint resolution.

### Option B — Self-executed

You run the agent yourself from your own terminal, CI job, container, or another machine. Codebolt does not spawn a process for this mode. It waits for your external agent to connect back.

**From the CLI:**

```bash
codebolt action agent create-remote --name my-remote-agent --execution-mode selfExecuted
```

**From the desktop app**, open the Chat agent picker and select **Create Agent → Create Remote Agent**. Enter a name, choose **Self-executed**, and click **Create Remote Agent**.

How it works at runtime:

- No `remotePath` is required in the creation form.
- When you use the agent in a thread, Codebolt generates a thread token for that thread.
- In the desktop app, selecting a self-executed remote agent shows a help icon near the model selector. That popover displays the current thread token and lets you copy it.
- If there is no active thread yet, the UI shows `Start a chat to generate a token`.
- When Codebolt attempts to start the self-executed agent, it does not launch a child process. Instead it waits for an external connection and emits a command snippet that sets both `threadToken` and `agentId`.
- This mode can still run on the same machine. "Self-executed" only means Codebolt did not start it for you.

If your external process uses `@codebolt/codeboltjs`, those environment variables are what let it connect back to the `/codebolt` WebSocket endpoint.

### What the desktop flow stores

The `Create Remote Agent` flow creates a local manifest record, not a new agent codebase. The stored manifest includes:

- `type: remoteAgent`
- `isRemoteAgent: true`
- `executionMode: selfExecuted | codeboltExecuted`
- `remotePath` for CodeBolt-executed agents

That is why the same remote agent can appear in the normal agent picker even though its code lives elsewhere.

### When to use remote agents

- Your agent already lives in another folder and you want Codebolt to reference it instead of copying it into the project.
- Your agent is written in a language Codebolt doesn't scaffold (Python, Go, Rust).
- You want Codebolt to launch an external codebase from an absolute path.
- You want to run the process yourself from another terminal, CI job, container, or another machine.
- You want to wrap an existing tool (Claude Code, Codex, etc.) as a Codebolt agent — see [Third-Party Wrapping](./04_third-party-agents.md).
