---
sidebar_position: 9
title: Remote Execution
description: Running agents somewhere other than the local machine. Covers the user-facing side — when to enable it, how to configure, how to monitor
---

# Remote Execution

Running agents somewhere other than the local machine. Covers the user-facing side — when to enable it, how to configure, how to monitor. For building a custom remote execution backend, see [Remote Environments](../08a_multi-environment-orchestration/02_remote-environments/01_overview.md) and [Creating a Custom Provider](../08a_multi-environment-orchestration/03_creating-a-custom-provider.md).

## When remote execution helps

1. **Sandboxing.** Agents run in a container they can't escape. Their shell commands, file writes, and network calls are isolated from your laptop.
2. **Scale.** Run many agents in parallel without choking your local machine.
3. **Specialised hardware.** GPUs, large memory, specific OS images.
4. **Compliance.** Work happens in a specific environment (VPC, audit zone, customer-controlled infrastructure).
5. **Always-on background work.** A long-running cron agent on a cloud VM instead of tied to your laptop being awake.

## When it's not needed

- **Normal development work.** Local execution is fine. Don't add operational complexity for ordinary tasks.
- **Quick iterations.** Remote spawn has overhead (container start, image pull). Local is instant.
- **Simple workflows.** If your agent only reads files and edits code, there's nothing to sandbox from meaningfully.

## Execution providers

Codebolt supports several remote execution backends:

- **Docker** — local Docker daemon. Good for single-user sandboxing.
- **Kubernetes** — production scale. Pods per run, scheduler handles distribution.
- **SSH** — spawn on a remote Linux host via SSH. Simple, works anywhere.
- **Cloud VMs** — on-demand VM provisioning (AWS, GCP, Azure).
- **Custom** — write your own via [Creating a Custom Provider](../08a_multi-environment-orchestration/03_creating-a-custom-provider.md).

Each is a provider plugin. Install one, configure it, and use it.

## Configuring a provider

**Settings → Execution → Remote providers → Add.** Pick the kind, configure endpoint / credentials / resource defaults.

### Docker

```yaml
providers:
  docker:
    socket: unix:///var/run/docker.sock
    default_image: codebolt/agent-base:latest
    default_resources:
      memory_mb: 4096
      cpu: 2
    network: bridge
    auto_remove: true
```

### Kubernetes

```yaml
providers:
  k8s:
    kubeconfig: ~/.kube/config
    namespace: codebolt
    image_pull_secret: regcred
    default_resources:
      memory_mb: 8192
      cpu: 2
    node_selector:
      codebolt-agents: "true"
```

### SSH

```yaml
providers:
  ssh-box:
    host: agent-runner.my-org.com
    user: codebolt
    key_file: ~/.ssh/codebolt_ed25519
    work_dir: /var/lib/codebolt
```

## Routing an agent to a provider

Three ways:

### Per-agent in manifest

```yaml
# .codebolt/agents/gpu-heavy-agent/agent.yaml
execution:
  provider: k8s
  resources:
    memory_mb: 16384
    gpu_count: 1
```

All runs of this agent go to the k8s provider with the declared resources.

### Per-run on the CLI

```bash
codebolt agent start my-agent --execution docker --task "..."
```

Overrides the manifest's default. Useful for one-off tests.

### Project default

```yaml
# .codebolt/settings.yaml
execution:
  default_provider: k8s
```

Every agent in the project defaults to remote execution unless its own manifest says otherwise.

## What a remote run looks like

From the user's perspective, a remote run is indistinguishable from a local one. The chat panel, the flow view, the event log, the trace — all identical. The difference is in the process model:

- **Local run:** `AgentProcessManager` spawns a child process on your laptop.
- **Remote run:** The execution provider spawns a sandbox (container, pod, VM). The sandbox connects back over WebSocket. All protocol traffic flows through that connection.

Tool calls still happen through the server — the remote agent calls `codebolt_fs.read_file`, the server executes it, the result flows back. This means **the tool execution is still local** to the server. Only the *agent loop* runs remotely.

## Credentials in remote runs

The sandbox needs credentials for:

- Connecting back to the Codebolt server (callback URL + session token).
- Calling provider APIs (LLM keys, if the agent uses them directly — usually the server handles this).
- Accessing user-specific resources.

Codebolt passes these via environment variables in the spawn request. The provider is responsible for passing them to the sandbox securely (encrypted env vars, secrets mount, whatever the provider supports).

**Best practice:** mint short-lived, run-scoped credentials per spawn instead of using long-lived keys. Codebolt supports this natively — the session token passed to a remote run is scoped to that run ID and expires when the run ends.

## Monitoring remote runs

Same as local: trace, history, flow view. Plus:

- **Remote host** shown in the run details.
- **Remote resource usage** (if the provider reports it) in the status bar.
- **Provider-specific logs** accessible via `codebolt agent logs <run_id> --source provider`.

For Kubernetes, you can also use `kubectl` directly to inspect the pod.

## Stopping a remote run

`codebolt agent stop <run_id>` works the same way. The server sends a graceful stop signal; if the agent doesn't comply within the timeout, the server asks the provider to kill the sandbox.

Force-kill via `codebolt agent kill <run_id>`.

## Network and firewall

Remote sandboxes need outbound connectivity to reach the Codebolt server. Two topologies:

1. **Server public** — Codebolt server is reachable at a public (or VPC-public) URL. Sandboxes connect directly. Simplest.
2. **Reverse tunnel** — the sandbox initiates an outbound connection to a tunnel endpoint, Codebolt uses that for bidirectional traffic. Used when the sandbox is behind strict firewalls.

The provider plugin handles this — you don't configure network details on every agent.

## Cost implications

Remote execution is not free. Per-run costs:

- **Docker / K8s** — compute time on your own infrastructure.
- **Cloud VMs** — provider billing (by the minute, often with a minimum).
- **Managed services** — per-run or per-hour fees.

For chatty interactive work where you run agents constantly, remote execution costs can grow. Pick a provider with cheap short runs (Docker, K8s) or reserve remote execution for long-running background work where the fixed overhead is amortised.

## Debugging remote runs

Common failure modes:

- **Sandbox can't reach server.** Check the callback URL, firewall rules, DNS.
- **Image pull failures.** Check image registry credentials.
- **Startup timeout.** The sandbox is taking too long to connect. Increase the timeout or use a smaller image.
- **Resource exhaustion.** The sandbox ran out of memory/CPU. Raise limits in the provider config.

Each provider has its own debug view: `codebolt agent logs <run_id> --source provider`.

## See also

- [Remote Environments](../08a_multi-environment-orchestration/02_remote-environments/01_overview.md) — remote runtime model
- [Creating a Custom Provider](../08a_multi-environment-orchestration/03_creating-a-custom-provider.md) — building one
- [Proxy Execution Gateway](../05_plugins/08_proxy-execution-gateway/01_overview.md) — selective capability proxying
- [Process Model (internals)](../02_architecture/03_process-model.md)
- [Self-hosting](./01_overview.md) — often combined with remote execution
