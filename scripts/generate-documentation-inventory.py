"""Inventory documentation for the navigation migration without changing routes.

Run from any directory: python3 scripts/generate-documentation-inventory.py
Destinations are proposals based on existing paths, not product verification.
"""

from collections import Counter, defaultdict
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
OUTPUT = ROOT / "planning" / "PAGE_INVENTORY.md"

BUILD = {
    "02_architecture": "Architecture and internals",
    "02_creating-agents": "Create agents",
    "03_agent-extensions": "Extend agents",
    "04_custom-uis": "Build applications",
    "04b_custom-agentic-applications": "Build applications",
    "05_plugins": "Build plugins and gateways",
    "05b_templates": "Templates and publishing",
    "06_extending-codebolt": "Build plugins and gateways",
    "07_eval-and-optimization": "Evaluation and optimization",
    "07a_memory-management": "Memory and context engineering",
    "07b_subsystems": "Architecture and internals",
    "08_multi-agent-orchestration": "Multi-agent orchestration",
    "08a_multi-environment-orchestration": "Environment providers",
    "08b_cloud": "Deployment",
    "09_internals": "Architecture and internals",
    "10_building-integrations": "Build integrations",
    "11_agent-infrastructure": "Deployment",
}
USING = {
    "04_agents": "Agents and execution",
    "04b_agent-extensions": "Tools and extensions",
    "05d_memory": "Context, memory, and knowledge",
    "05e_eval-and-optimization": "Evaluation and optimization",
    "06_planning": "Planning and tasks",
    "06b_deposition-features": "Artifacts and previews",
    "07_multi-agent-usage": "Multi-agent collaboration",
    "07a_parallel-agents": "Multi-agent collaboration",
    "07c_agent-coordination": "Multi-agent collaboration",
    "07d_stigmergic-coordination": "Multi-agent collaboration / Advanced coordination",
    "07z_plugins": "Tools and extensions / Plugins",
    "08d_auto-interactivity": "Automation and routing",
    "08e_external-integrations": "Integrations",
}


def destination(path):
    parts = path.parts
    top = parts[0]
    name = path.stem
    full = path.as_posix().lower()
    if top == "01_get-started":
        if name == "01_overview":
            return "Get Started / Introduction", "Maintain first-task path and shared feature overview link"
        return "Get Started / First run and essential concepts", "Review onboarding scope"
    if top == "02_concepts":
        if "planning" in full:
            return "Using Codebolt / Planning and tasks", "Merge or cross-link concept"
        if "shadow-git" in full:
            return "Using Codebolt / Review and merge", "Merge or cross-link concept"
        if "guardrails" in full:
            return "Configuration / Permissions and guardrails", "Merge or cross-link concept"
        return "Build on Codebolt / Architecture and internals", "Place concept beside relevant builder topic"
    if top == "04_build-on-codebolt":
        group = BUILD.get(parts[1], "Start building" if len(parts) == 2 else "Unassigned")
        return "Build on Codebolt / " + group, "Review canonical home"
    if top == "02_using-codebolt":
        if name == "01_features-overview":
            return "Using Codebolt / Features overview", "Maintain capability rows and related guides; keep setup and architecture in owning sections"
        if parts[1] == "05b_guardrails-and-settings":
            return "Configuration / Permissions and settings", "Review configuration scope"
        if parts[1] == "08a_environments":
            return "Configuration / Environments", "Separate setup from running tasks"
        if parts[1] == "08_integrations":
            group = "Configuration / Models and providers" if any(x in name for x in ("llm", "local-model")) else "Using Codebolt / Integrations"
            return group, "Review setup versus operation"
        if parts[1] == "02_surfaces":
            if "/settings/" in full or "/05_settings/" in full:
                return "Configuration / Platform settings and administration", "Keep platform-specific instructions"
            if "get-started" in name or "onboarding" in name:
                return "Get Started / Platform quickstarts", "Merge repeated installation steps"
            if "marketplace-publishing" in name:
                return "Build on Codebolt / Templates and publishing", "Link from Cloud registry"
            if "headless-server" in name:
                return "Configuration / Deployment", "Link from CLI workflows"
            if "02_cli-commands" in full:
                return "Reference / CLI", "Compare with existing generated CLI reference"
            for token, group in (
                ("04a_application-planning", "Planning and tasks"),
                ("04b_agent-management", "Agents and execution"),
                ("04c_deposition", "Review and merge"),
                ("04d_agent-orchestrations", "Automation and routing"),
                ("04e_memory", "Context, memory, and knowledge"),
            ):
                if token in full:
                    return "Using Codebolt / " + group, "Review overlap with shared feature pages"
            return "Using Codebolt / Platforms and workspace", "Keep surface details; link shared feature home"
        if name == "06a_application-logs":
            return "Using Codebolt / Monitoring and debugging", "Review canonical home"
        if name == "08b_proxy-execution":
            return "Using Codebolt / Automation and routing", "Link configuration and gateway implementation"
        return "Using Codebolt / " + USING.get(parts[1], "Unassigned"), "Review canonical home"
    if top == "03_guides":
        if len(parts) == 2:
            return "Resources / Examples and recipes", "Replace standalone guide hierarchy with index"
        if "self-host" in name:
            group = "Configuration / Deployment"
        elif "connect-a-local" in name or "set-up-git" in name or "07_providers" in full and "byo-provider" not in name:
            group = "Configuration / Providers and integrations"
        elif "install-a-third-party" in name:
            group = "Configuration / Integrations / MCP"
        elif "environment-debug" in name:
            group = "Configuration / Troubleshooting"
        elif "04_everyday" in full or "07a_multi-step" in full:
            group = "Using Codebolt / Workflows"
        elif "08_advanced" in full:
            group = "Using Codebolt / Monitoring and debugging"
        elif "06_multi-agent" in full:
            group = "Build on Codebolt / Multi-agent orchestration"
        elif "03_loops" in full:
            group = "Build on Codebolt / Execution loops and deposition framework"
        else:
            group = "Build on Codebolt / Tutorials"
        return group, "Embed beside feature; retain Resources index link"
    if top == "agent":
        return "Resources / Documentation for agents", "Resolve navigation ownership; validate machine-facing content"
    if top == "1_index.md":
        return "Get Started / Documentation landing", "Review overlap with section landing pages"
    return "Unassigned", "Assign before migration"


def title(path):
    content = path.read_text(encoding="utf-8")
    frontmatter = re.match(r"\A---\s*\n(.*?)\n---", content, re.S)
    match = re.search(r"^title:\s*(.+)$", frontmatter[1], re.M) if frontmatter else None
    if not match:
        match = re.search(r"^#\s+(.+)$", content, re.M)
    return (match[1].strip().strip("\"'") if match else path.stem).replace("|", "\\|")


def main():
    pages = sorted(p for p in DOCS.rglob("*") if p.suffix in {".md", ".mdx"})
    rows, excluded = [], []
    references = defaultdict(list)
    for page in pages:
        relative = page.relative_to(DOCS)
        if relative.parts[0] == "05_reference":
            references[relative.parts[1] if len(relative.parts) > 2 else "01_overview.md"].append(page)
        elif relative.parts[0] == "Excalidraw" or relative.as_posix() in {"Issue.md", "sortspec.md"}:
            excluded.append(relative)
        else:
            target, action = destination(relative)
            rows.append((relative, title(page), target, action))
    counts = Counter(row[2].split(" / ")[0] for row in rows)
    reference_count = sum(map(len, references.values()))
    assert len(rows) + reference_count + len(excluded) == len(pages)
    assert not any("Unassigned" in row[2] for row in rows), "New documentation needs a destination rule"
    lines = [
        "# Codebolt documentation page inventory", "",
        "Generated by `python3 scripts/generate-documentation-inventory.py`. Edit the generator's destination rules and regenerate this file when the source tree changes.", "",
        "Destinations and actions are migration proposals. Every listed page has status **Needs verification**: file presence does not establish completeness, accuracy, or feature availability. Product and SDK verification is a separate acceptance gate in [the plan](../DOCUMENTATION_PLAN.md).", "",
        f"Accounted for **{len(pages)} Markdown and MDX files**: {len(rows)} individually mapped pages, {reference_count} reference pages grouped by package, and {len(excluded)} explicitly excluded authoring files.", "",
        "## Proposed page distribution", "", "| Destination | Pages |", "|---|---:|",
        *[f"| {group} | {count} |" for group, count in sorted(counts.items())], "",
        "## Existing pages", "",
        "Pages sharing a destination are review candidates, not confirmed duplicates. Surface-specific instructions may remain separate and link to a common feature page.", "",
        "| Existing page | Proposed destination | Migration action |", "|---|---|---|",
        *[f"| [{label}](<../docs/{path.as_posix()}>) | {target} | {action} |" for path, label, target, action in rows], "",
        "## Reference bundles", "",
        "Retain every page in each bundle. Curate package entry pages and keep symbol trees nested. These counts include authored introductions and generated reference; generation provenance must be checked before editing individual files.", "",
        "| Current bundle | Pages | Proposed destination |", "|---|---:|---|",
        *[f"| [{bundle}](<../docs/05_reference/{bundle}>) | {len(items)} | Reference / {bundle} |" for bundle, items in sorted(references.items())], "",
        "## Explicit exclusions", "",
        "These paths are excluded by the production docs configuration. Preserve them as authoring material until separately reviewed.", "",
        *[f"- [{path}](<../docs/{path.as_posix()}>)" for path in excluded], "",
    ]
    OUTPUT.parent.mkdir(exist_ok=True)
    OUTPUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUTPUT.relative_to(ROOT)}: {len(rows)} mapped, {reference_count} reference, {len(excluded)} excluded; {len(pages)} total")


if __name__ == "__main__":
    main()
