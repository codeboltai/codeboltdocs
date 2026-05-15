---
sidebar_position: 2.5
title: Installation & Setup
description: Get Codebolt installed and configured in a few minutes. Pick your interface below — each tab walks through install, sign-in, and first-run setup end to end.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Steps, Step } from '@site/src/components/Steps';
import { OsTabs } from '@site/src/components/OsTabs';

# Installation & Setup

Get Codebolt installed and configured in a few minutes. Pick your interface below — each tab walks through install, sign-in, and first-run setup end to end.

<Tabs groupId="codebolt-interface">
<TabItem value="desktop" label="Desktop App" default>

<Steps variant="dots">

<Step title="Download and install">

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

</Step>

<Step title="Sign in">

Open Codebolt. Click **Sign In** — a browser window opens to the CodeBolt portal. Log in or create a free account. The token is picked up automatically.

**New users** are taken into the setup wizard. **Returning users** go straight to the project dashboard.

</Step>

<Step title="Choose an AI provider">

The wizard opens to **"Select Default AI Models"**. Pick the provider that fits you best:

| Provider | What you need |
|---|---|
| **CodeBolt AI** | Nothing — built-in, no key required (PRO) |
| OpenAI / Anthropic / Gemini / Groq / Mistral / DeepSeek / OpenRouter | API key from the provider's console |
| Ollama / LM Studio | Local URL — the model server must be running |
| AWS Bedrock | Access key + secret + region |
| HuggingFace / Cloudflare AI / Replicate | API token / account ID |

Click your provider, enter the key or URL, then select an **LLM model** and an **Embedding model**. Both must be selected before you can continue.

</Step>

<Step title="Configure workspace and theme">

**Screen: "Review Settings"**

- **Default workspace** — Defaults to your Desktop. Click **Browse** to change. You can always open any folder from any location.
- **CLI installation** — Click **Install** to add `codebolt` to your PATH. Skip to install later via **Settings → Global Settings → CLI Setup**.
- **Theme** — Pick light, dark, or system. More themes available in **Settings → Appearance** any time.

</Step>

<Step title="Pick a default agent">

**Screen: "Select Default Agent"**

Browse or search the agent grid. Click **Add as Default Agent**. Codebolt installs it and sets it as the default for new projects. You can change this at any time from **Settings → Agents**.

</Step>

<Step title="Open your first project">

You land on the **project dashboard**. Click **Open Project** and pick any folder — any git repo works, or create a new empty folder for a clean start.

Codebolt indexes the project in a few seconds, then a chat panel opens.

→ Continue to [Quickstart](../02_quickstart.md) to run your first agent.

</Step>

</Steps>

</TabItem>
<TabItem value="cli" label="CLI">

<Steps variant="dots">

<Step title="Install the CLI">

The CLI gives you the Codebolt server and `codebolt` command without the desktop shell. Requires **Node.js 18+**.

```bash
# npm (cross-platform)
npm install -g codebolt

# Homebrew (macOS / Linux)
brew install codebolt/tap/cli

# apt (Ubuntu / Debian)
curl -fsSL https://pkg.codebolt.ai/gpg | sudo gpg --dearmor -o /usr/share/keyrings/codebolt.gpg
echo "deb [signed-by=/usr/share/keyrings/codebolt.gpg] https://pkg.codebolt.ai/apt stable main" | sudo tee /etc/apt/sources.list.d/codebolt.list
sudo apt update && sudo apt install codebolt-cli

# dnf (Fedora / RHEL)
sudo dnf config-manager --add-repo https://pkg.codebolt.ai/rpm/codebolt.repo
sudo dnf install codebolt-cli
```

If you already have the desktop app installed, the CLI is already there — no separate install needed.

</Step>

<Step title="Authenticate">

```bash
codebolt
```

Start Codebolt and complete any account or provider setup that your build prompts for.

For **CI / headless** environments, set the environment variable instead:

```bash
export CODEBOLT_AUTH_TOKEN=YOUR_TOKEN
codebolt --server
```

The current CLI does not expose the older login or interactive run flows from earlier drafts.

</Step>

<Step title="Configure an AI provider">

```bash
codebolt command llm providers
```

Use the desktop settings UI for end-user provider setup, or update a key through the running server:

```bash
codebolt command llm update-key --provider openai --key sk-...
codebolt command llm set-default --provider openai --model gpt-5
```

</Step>

<Step title="Run an agent on a project">

```bash
cd /path/to/your-project
codebolt
```

This starts the server and launches the TUI. For one-shot prompt execution:

```bash
codebolt --prompt "Explain this project" --agent AGENT_ID
```

</Step>

<Step title="Review and roll back">

Review changes with normal project tooling such as `git diff`. Checkpoint and rollback flows are currently product-surface features rather than a documented standalone CLI command set.

</Step>

</Steps>

</TabItem>
<TabItem value="tui" label="TUI">

<Steps variant="dots">

<Step title="Install the TUI">

The TUI (Terminal UI) gives you a keyboard-driven full-screen interface inside your terminal. It is bundled with the CLI:

```bash
# npm
npm install -g codebolt

# Homebrew
brew install codebolt/tap/cli
```

</Step>

<Step title="Authenticate">

```bash
codebolt
```

Start Codebolt and complete any account or provider setup that your build prompts for. For headless or CI use, set `CODEBOLT_AUTH_TOKEN` instead.

</Step>

<Step title="Configure an AI provider">

```bash
codebolt command llm providers
```

Use the desktop settings UI for end-user provider setup, or update keys through the running server.

</Step>

<Step title="Launch the TUI">

```bash
cd /path/to/your-project
codebolt
```

The full-screen TUI opens with panels for chat, file tree, diff view, and terminal output.

**Key bindings:**

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Move between panels |
| `Enter` | Send message / confirm |
| `Esc` | Cancel / close dialog |
| `Ctrl+R` | Roll back last agent run |
| `Ctrl+P` | Open project picker |
| `Ctrl+Q` | Quit |
| `?` | Show all keybindings |

</Step>

<Step title="Review and roll back">

Press `Ctrl+R` to open the checkpoint list and roll back to any previous state. Changes that haven't been rolled back persist on disk — commit them with git whenever you're ready.

</Step>

</Steps>

</TabItem>
</Tabs>

---

## System requirements

| Resource | Minimum | Recommended |
|---|---|---|
| OS | Windows 10+, macOS 12+, Linux (glibc 2.31+) | Current versions |
| RAM | 4 GB free | 8 GB free |
| Disk | 2 GB | 20+ GB (more for local models) |
| CPU | Any 64-bit x86 or ARM | 4+ cores |

For **local models** (Ollama, llama.cpp), add the model's VRAM/RAM on top — a 7B model typically needs ~8–10 GB extra.

---

## Updating

**Desktop app** — updates automatically. Check **Settings → Updates** to choose the channel (`stable` / `beta` / `nightly`).

**CLI:**

```bash
npm update -g codebolt          # npm
brew upgrade codebolt-cli        # Homebrew
sudo apt upgrade codebolt-cli    # apt
```

---

## Uninstalling

Uninstall removes binaries only — **projects and data are not deleted** by default.

| OS | Desktop app | CLI |
|---|---|---|
| Windows | Settings → Apps → Codebolt → Uninstall | `npm uninstall -g codebolt` |
| macOS | Drag to Trash or `brew uninstall --cask codebolt` | `brew uninstall codebolt-cli` |
| Linux | `sudo apt remove codebolt` or `flatpak uninstall …` | `npm uninstall -g codebolt` |

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
