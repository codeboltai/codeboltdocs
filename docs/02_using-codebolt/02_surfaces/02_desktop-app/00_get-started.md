---
sidebar_position: 0
title: Get Started
description: Install the desktop app, sign in, configure a provider, and run your first agent task.
---

import { Steps, Step } from '@site/src/components/Steps';
import { OsTabs } from '@site/src/components/OsTabs';
import { TryItCard } from '@site/src/components/TryItCard';

# Desktop App — Get Started

Get the desktop app installed and configured, then run your first agent task. About 5–10 minutes end to end.

---

## 1. Download and install

<OsTabs
  mac={<>

Download the `.dmg` from the Codebolt website, open it, and drag **Codebolt.app** to `/Applications`.

```bash
# or via Homebrew
brew install --cask codebolt
```

**Apple Silicon** is recommended over Intel — local model performance is 3–5× faster on ARM64.

  </>}
  windows={<>

Download `Codebolt-Setup-x64.exe` from the Codebolt website and run the installer. No admin rights are needed for day-to-day use.

```powershell
# or via Winget
winget install Codebolt.Codebolt

# or via Scoop
scoop bucket add codebolt https://github.com/codebolt-app/scoop-bucket
scoop install codebolt
```

  </>}
  linux={<>

| Format | Command |
|---|---|
| AppImage | Download → `chmod +x Codebolt-x86_64.AppImage` → run |
| .deb (Ubuntu/Debian) | `sudo dpkg -i codebolt.deb` |
| .rpm (Fedora/RHEL) | `sudo rpm -i codebolt.rpm` |
| Arch | `yay -S codebolt` |
| Flatpak | `flatpak install flathub com.codebolt.Codebolt` |

**Note:** user namespaces must be enabled — `sysctl kernel.unprivileged_userns_clone=1`.

  </>}
/>

**System requirements:** Windows 10+, macOS 12+, or Linux (glibc 2.31+). 4 GB RAM minimum, 2 GB disk. First launch takes ~30 seconds while the local server initialises.

---

## 2. Sign in

Open Codebolt. Click **Sign In** — a browser window opens to the CodeBolt portal. Log in or create a free account. The token is picked up automatically.

**New users** are taken into the setup wizard. **Returning users** go straight to the project dashboard.

---

## 3. Choose an AI provider

The wizard opens to **"Select Default AI Models"**. Pick the provider that fits you best:

| Provider | What you need |
|---|---|
| **CodeBolt AI** | Nothing — built-in, no key required (PRO) |
| OpenAI / Anthropic / Gemini / Groq / Mistral / DeepSeek / OpenRouter | API key from the provider's console |
| Ollama / LM Studio | Local URL — the model server must be running |
| AWS Bedrock | Access key + secret + region |
| HuggingFace / Cloudflare AI / Replicate | API token / account ID |

Click your provider, enter the key or URL, then select an **LLM model** and an **Embedding model**. Both must be selected before you can continue.

---

## 4. Configure workspace and theme

**Screen: "Review Settings"**

- **Default workspace** — Defaults to your Desktop. Click **Browse** to change. You can always open any folder from any location.
- **CLI installation** — Click **Install** to add `codebolt` to your PATH. Skip to install later via **Settings → Global Settings → CLI Setup**.
- **Theme** — Pick light, dark, or system. More themes available in **Settings → Appearance** any time.

---

## 5. Pick a default agent

**Screen: "Select Default Agent"**

Browse or search the agent grid. Click **Add as Default Agent**. Codebolt installs it and sets it as the default for new projects. You can change this at any time from **Settings → Agents**.

---

## 6. Open a project

You land on the **project dashboard**. Click **Open Project** and pick any folder — any git repo works, or create a new empty folder for a clean start.

Codebolt indexes the project (file tree, symbols, codemap) in a few seconds, then a chat panel opens.

---

## 7. Run your first agent

A chat panel opens. Ask the agent to understand your codebase first:

<TryItCard prompt="Read the codebase and give me a one-paragraph summary of what this project does." />

Watch it read files in real time. Then try something that makes a change:

<TryItCard prompt="Add a short CONTRIBUTING.md explaining how to run the project locally." />

The agent reads your existing README, writes the file, and shows you the diff.

---

## 8. Review and keep — or roll back

Every change is checkpointed automatically. Click the **checkpoint badge** at the top of the chat to see the snapshot created before the agent ran. You have three options:

- **Keep it** — the file stays as written. Commit to git whenever you're ready using the git panel or your own terminal.
- **Roll back** — click **Rollback**. Every file returns to exactly where it was before the agent ran. Real git history is untouched.
- **Iterate** — type a follow-up. The agent keeps the full context from the previous turn.

---

That's the core loop. Every other feature builds on this.

**Next:** [Desktop App Overview](./01_workspace-and-projects/01_overview.md) · [Chat](../../03_chat/01_overview.md) · [Agents](../../04_agents/01_what-is-an-agent.md)

---

## Updating

The desktop app updates automatically. Check **Settings → Updates** to choose the channel (`stable` / `beta` / `nightly`).

---

## Uninstalling

Uninstall removes binaries only — **projects and data are not deleted** by default.

| OS | How to uninstall |
|---|---|
| Windows | Settings → Apps → Codebolt → Uninstall |
| macOS | Drag to Trash or `brew uninstall --cask codebolt` |
| Linux | `sudo apt remove codebolt` or `flatpak uninstall …` |

To **remove all data** (chat history, settings, runs — irreversible):

```bash
# Linux
rm -rf ~/.config/CodeBolt
# macOS
rm -rf ~/Library/Application\ Support/CodeBolt
# Windows (PowerShell)
Remove-Item -Recurse -Force $env:APPDATA\CodeBolt
```

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Port in use on startup | Change port in **Settings → Server** |
| Permission error on Windows | Run installer as administrator once |
| Missing build tools on Linux | Install `build-essential` (Debian) or `gcc make` (Fedora) |
| Rosetta 2 required on macOS | Download the `arm64` build instead of `x64` |
| Antivirus blocking on Windows | Whitelist `Codebolt.exe` — Electron apps are commonly flagged |
| `glibc` version error on Linux | Upgrade to Ubuntu 20.04+ or use the Docker install |
