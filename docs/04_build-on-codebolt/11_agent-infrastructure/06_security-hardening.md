---
sidebar_position: 6
title: Security Hardening
description: Checklist-style guide for locking down a self-hosted Codebolt server. Do all of this before putting the server in front of users.
---

# Security Hardening

Checklist-style guide for locking down a self-hosted Codebolt server. Do all of this before putting the server in front of users.

## Network

- [ ] **TLS in front.** Put nginx/caddy/traefik between users and Codebolt, terminating TLS there. Never expose the Codebolt server directly on a public port.
- [ ] **Bind to localhost or a private interface.** `CODEBOLT_HOST=127.0.0.1` or a VPN-only IP, never `0.0.0.0` on a public machine.
- [ ] **Firewall rules.** Inbound only on the reverse proxy port. Deny everything else at the host firewall.
- [ ] **Outbound rules.** Restrict to what the server actually needs: LLM provider APIs, marketplace (if using), OIDC provider, object storage. Deny by default.
- [ ] **No split-horizon DNS tricks.** Codebolt's `public_url` should resolve to the same address internally and externally to avoid SSRF surprises.

## Auth

- [ ] **Never use local accounts for production teams.** Use OIDC / SAML. Local accounts exist for development and bootstrap only.
- [ ] **Enforce SSO for everyone.** Disable local account creation after bootstrap.
- [ ] **Configure session timeouts.** Default 24h is probably too long for shared machines. 1-4h is common.
- [ ] **Enable MFA in your identity provider.** Codebolt honours whatever MFA the OIDC provider enforces.
- [ ] **Rotate the master key** on a schedule. Key rotation is supported via `codebolt admin rotate-master-key`.

## Secrets

- [ ] **Master key stored out of band.** Not in the repo, not in the config file, not in process environment accessible to every user. Use the OS keychain, HashiCorp Vault, AWS Secrets Manager, etc.
- [ ] **Provider API keys encrypted at rest.** Default behaviour; confirm `encrypt_secrets: true` in config.
- [ ] **No plaintext secrets in logs.** Codebolt redacts known secret shapes in logs; double-check by grep-ing your log aggregator.
- [ ] **Secrets injected via env, not files committed to the host.** Your deployment tool (Ansible, Helm, etc.) should be the only thing that knows the secrets.
- [ ] **Short-lived credentials** where possible. For LLM providers that support it (AWS Bedrock, GCP Vertex), use IAM / workload identity instead of static keys.

## Tool and plugin sandboxing

- [ ] **`PluginProcessManager` sandbox is on.** Default. Confirm in config.
- [ ] **Plugins run as a separate user** with minimal privileges. For Docker/K8s deployments, this is automatic; for systemd, use `DynamicUser=yes` or a dedicated user.
- [ ] **Filesystem access limited.** Plugins can only touch their own directories and the project directory, never system paths.
- [ ] **Network egress from plugins.** Decide whether plugins can call the internet. Deny by default for suspicious plugins.

## Agent permissions

- [ ] **Default agent allowlist is conservative.** No agent should have `tools.allow: ["*"]` in production.
- [ ] **Write tools scoped tightly.** `codebolt_fs.write_file` should be denied for reviewers, analysts, and any read-only agent.
- [ ] **`codebolt_git.push` blocked by default.** Agents should never push without explicit human review.
- [ ] **Shell tools scrutinised.** Any agent with shell tools can run arbitrary commands. Limit to trusted agents only.
- [ ] **External API tools audited.** Tools that call external services can exfiltrate data. Review their scopes.

## Guardrails

- [ ] **Default guardrail policy enabled.** Includes path restrictions, push blocks, secret redaction.
- [ ] **Workspace-specific rules layered on top.** Project conventions, compliance rules, etc.
- [ ] **LLM evaluator on for high-stakes operations.** Deletes, migrations, pushes, external calls.
- [ ] **Guardrail verdicts logged.** The event log captures these automatically — ensure the log is monitored, not just stored.

## Data isolation

- [ ] **Project-level isolation is enforced.** Users can't access projects they're not members of.
- [ ] **Persistent memory is project-scoped by default.** Cross-project memory leaks are a risk.
- [ ] **Shadow git repos isolated per project.** Users see only their own checkpoints.

## Auditability

- [ ] **Event log retention set to your compliance requirements.** Default is 365 days; some regulations require longer.
- [ ] **Audit events flow to SIEM.** Every tool call, guardrail verdict, and login attempt should be queryable in your central logging system. Use a hook for this.
- [ ] **Unchangeable audit trail.** The event log is append-only, but someone with DB access could edit it. For strict compliance, mirror to a WORM storage system.
- [ ] **Admin actions logged.** User creation, permission changes, key rotation — all in the event log.

## Updates

- [ ] **Patch promptly.** Security fixes ship in patch releases. Subscribe to the security announcements channel.
- [ ] **Pin dependencies.** Don't run `latest` in production; pin to a known version and upgrade deliberately.
- [ ] **Test upgrades in staging.** Database migrations are forward-only; a bad upgrade is hard to reverse.

## Backup and recovery

- [ ] **Backups tested.** See [Backup and Restore](./07_backup-and-restore.md). An untested backup is not a backup.
- [ ] **Master key backed up separately.** Without the master key, encrypted data in a backup is unrecoverable.
- [ ] **Restore procedure documented.** Someone other than the original deployer should be able to follow it.
- [ ] **RTO/RPO defined.** How long can you be down? How much data can you lose? Design the backup cadence to match.

## Specific attack surfaces

### Prompt injection

LLMs can be tricked by adversarial content in the code they read. Mitigations:

- **Don't let LLM output directly trigger tool calls against untrusted inputs** without guardrail review.
- **Sanitise output before committing** — e.g. a reviewer agent's comments shouldn't be able to contain commands that another tool interprets.
- **Run adversarial tests** — periodically feed the system known prompt-injection samples and verify guardrails catch them.

### SSRF via browser tool

The `codebolt_browser` tool can make arbitrary HTTP requests. Restrict it:

- **Deny localhost, 169.254.169.254 (cloud metadata), private IP ranges.**
- **Rate-limit per agent.**
- **Log all browser tool calls.**

### Capability supply chain

Capability bundles run code. Installing a capability is equivalent to installing a library — do supply chain review:

- **Prefer first-party capabilities** from trusted vendors.
- **Audit third-party capabilities** before installing.
- **Pin capability versions** and review before updating.
- **Use a private registry** that mirrors approved versions, rather than installing directly from the public marketplace.

### DoS via runaway agents

An agent loop without budget limits can burn money fast:

- **Enforce per-agent `max_tokens`, `max_tool_calls`, `max_wall_time`, `max_cost_usd`.**
- **Enforce per-user / per-workspace concurrent run limits.**
- **Alert on unusual activity.**

## See also

- [Self-Hosting Overview](./01_overview.md)
- [Guardrails & Eval (internals)](../07b_subsystems/09_guardrails-and-eval.md)
- [Hooks](../05_plugins/01_overview.md) — implementing custom security hooks
- [Backup and Restore](./07_backup-and-restore.md)
