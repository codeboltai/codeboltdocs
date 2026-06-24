---
sidebar_position: 3
title: Self-Host for a Team
description: "A practical walkthrough: set up a Codebolt server for a team of 5-20 people from zero to working in a couple of hours. For the reference docs, see Self-Hosting."
---

# Self-Host for a Team

A practical walkthrough: set up a Codebolt server for a team of 5-20 people from zero to working in a couple of hours. For the reference docs, see [Self-Hosting](../../04_build-on-codebolt/10_self-hosting/01_overview.md).

**You'll need:** a Linux server (Ubuntu 22.04 or similar), a domain name, SSH access, sudo, and either an existing Postgres or willingness to install one.

## Step 1 — provision the server

Minimum realistic:

- 4 vCPUs, 8 GB RAM, 100 GB SSD
- Ubuntu 22.04 LTS or equivalent
- Open inbound: 22 (SSH), 443 (HTTPS)
- Outbound: wherever your LLM provider lives

For 5-20 users this is comfortable. Scale up CPU/RAM if you see pressure.

## Step 2 — install dependencies

```bash
# On the server
sudo apt update
sudo apt install -y postgresql nginx certbot python3-certbot-nginx nodejs npm

# Verify versions
node --version   # should be 18+
postgres --version  # should be 14+
```

## Step 3 — create the database

```bash
sudo -u postgres psql <<SQL
CREATE USER codebolt WITH PASSWORD 'change-this-password';
CREATE DATABASE codebolt OWNER codebolt;
SQL
```

Pick a real password. Store it in a secrets manager, not a shell script.

## Step 4 — install Codebolt

```bash
sudo npm install -g codebolt
sudo useradd -r -s /bin/false codebolt
sudo mkdir -p /var/lib/codebolt /etc/codebolt /var/log/codebolt
sudo chown -R codebolt:codebolt /var/lib/codebolt /var/log/codebolt
```

## Step 5 — configure

Create `/etc/codebolt/codebolt-server.yaml`:

```yaml
database:
  url: postgresql://codebolt:change-this-password@localhost/codebolt

server:
  host: 127.0.0.1
  port: 3456
  public_url: https://codebolt.my-team.com

data_dir: /var/lib/codebolt

logging:
  level: info
  format: json
  output: /var/log/codebolt/server.log

auth:
  mode: oidc
  oidc:
    issuer: https://accounts.google.com
    client_id: your-oidc-client-id
    client_secret_env: OIDC_CLIENT_SECRET
    allowed_domains: ["my-team.com"]

agent_process_manager:
  max_concurrent: 30
  max_per_user: 5

limits:
  cost_cap_usd_per_user_per_day: 20.00

retention:
  event_log_days: 180
  phase_rows_days: 60
```

Adjust for your situation:
- Replace password and OIDC details.
- Set `public_url` to your actual domain.
- Adjust limits for your team size and budget.

## Step 6 — master key

Generate and store the master key:

```bash
sudo -u codebolt openssl rand -base64 32 > /etc/codebolt/master.key
sudo chmod 600 /etc/codebolt/master.key
sudo chown codebolt:codebolt /etc/codebolt/master.key
```

**Back up this key separately** (secrets manager, sealed envelope, anywhere not on this server). Without it, encrypted data in backups is unrecoverable.

## Step 7 — systemd unit

```ini
# /etc/systemd/system/codebolt.service
[Unit]
Description=Codebolt Server
After=network.target postgresql.service
Requires=postgresql.service

[Service]
Type=simple
User=codebolt
Group=codebolt
Environment="CODEBOLT_CONFIG=/etc/codebolt/codebolt-server.yaml"
Environment="CODEBOLT_MASTER_KEY_FILE=/etc/codebolt/master.key"
Environment="OIDC_CLIENT_SECRET=your-oidc-client-secret"
ExecStart=/usr/bin/codebolt --server
Restart=on-failure
RestartSec=5s
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

(Store real secrets via systemd's `EnvironmentFile=` with a 0600 file, not inline as shown for brevity.)

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now codebolt
sudo journalctl -u codebolt -f     # watch it boot
```

Look for "migrations applied" and "server ready" in the logs.

## Step 8 — TLS + reverse proxy

```nginx
# /etc/nginx/sites-available/codebolt
server {
    listen 443 ssl http2;
    server_name codebolt.my-team.com;

    ssl_certificate /etc/letsencrypt/live/codebolt.my-team.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/codebolt.my-team.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3456;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $proxy_scheme;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }
}

server {
    listen 80;
    server_name codebolt.my-team.com;
    return 301 https://$host$request_uri;
}
```

Enable and get a certificate:

```bash
sudo ln -s /etc/nginx/sites-available/codebolt /etc/nginx/sites-enabled/
sudo nginx -t
sudo certbot --nginx -d codebolt.my-team.com
sudo systemctl reload nginx
```

## Step 9 — verify from a client

On your laptop:

```bash
codebolt config set server https://codebolt.my-team.com
codebolt config set token ''           # clear any local token
codebolt app status
```

Should say "not authenticated". Open the desktop app, point it at the new URL, sign in via SSO. Verify you land in the team workspace.

## Step 10 — invite the team

**Settings → Team → Members → Invite**, or if using OIDC group membership, add users to the right OIDC group and they'll appear on next sign-in.

First team members should include at least two admins (bus factor).

## Step 11 — configure shared defaults

As an admin, set up team-wide defaults:

- **Providers** — configure one or two LLM providers centrally so users don't each paste their own keys. See [LLM Providers](../../02_using-codebolt/08_integrations/01_llm-providers.md).
- **Guardrails** — workspace-level rules that apply to everyone. See [Guardrails & Eval](../../04_build-on-codebolt/07b_subsystems/09_guardrails-and-eval.md).
- **Portfolio** — curated set of agents available to everyone. See [Agent Portfolios](../../02_using-codebolt/04_agents/06_agent-portfolios.md).
- **Review policies** — default behaviour for merge requests. See [Review & Merge](../../02_using-codebolt/07_multi-agent-usage/04_review-and-merge.md).

## Step 12 — set up backups

```bash
# /usr/local/bin/codebolt-backup.sh
#!/bin/bash
set -euo pipefail
DEST=/backups/codebolt/$(date +%Y%m%d_%H%M%S)
mkdir -p "$DEST"
sudo -u postgres pg_dump -Fc codebolt > "$DEST/main.dump"
rsync -a /var/lib/codebolt/shadow-git/ "$DEST/shadow-git/"
rsync -a /var/lib/codebolt/vectordb/ "$DEST/vectordb/"
rsync -a /var/lib/codebolt/kg/ "$DEST/kg/"
```

Schedule with cron (daily). Verify restore at least monthly on a separate machine.

See [Backup and Restore](../../04_build-on-codebolt/10_self-hosting/07_backup-and-restore.md) for the full version.

## Step 13 — monitoring

Enable Prometheus metrics in `codebolt-server.yaml`:

```yaml
metrics:
  prometheus:
    enabled: true
    path: /metrics
    port: 9091
```

Point your monitoring (Prometheus, Datadog, whatever) at `:9091/metrics`. Key dashboards: run throughput, LLM latency, cost per hour, event log ingest lag.

## Maintenance

- **Daily:** spot-check logs for errors.
- **Weekly:** check backup success, review team usage.
- **Monthly:** test a backup restore, update Codebolt if a patch release is available.
- **Quarterly:** review team portfolio, prune old data, rotate master key if policy requires.

## Things that go wrong

- **Runaway costs** — a buggy agent burns through the budget. Fix by tightening per-user cost caps.
- **Hanging agents** — occasional stuck runs. Usually a tool issue; restart the tool.
- **Database growth** — event log gets large. Enable retention cleanup.
- **User onboarding friction** — OIDC group membership lag. Document the lookup path.

All of these have solutions in the full [Self-Hosting](../../04_build-on-codebolt/10_self-hosting/01_overview.md) docs.

## See also

- [Self-Hosting Overview](../../04_build-on-codebolt/10_self-hosting/01_overview.md)
- [Running the server](../../04_build-on-codebolt/10_self-hosting/02_running-the-server.md)
- [Security hardening](../../04_build-on-codebolt/10_self-hosting/06_security-hardening.md)
- [Backup and restore](../../04_build-on-codebolt/10_self-hosting/07_backup-and-restore.md)
- [Upgrade guide](../../04_build-on-codebolt/10_self-hosting/08_upgrade-guide.md)
