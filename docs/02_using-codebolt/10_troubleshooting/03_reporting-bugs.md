---
sidebar_position: 3
title: Reporting Bugs
description: How to report Codebolt bugs effectively. A good bug report gets fixed quickly; a bad one takes days of back-and-forth.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Reporting Bugs

How to report Codebolt bugs effectively. A good bug report gets fixed quickly; a bad one takes days of back-and-forth.

## Generating a diagnostic report

The single most useful thing you can attach is a diagnostic report from the product surface your build exposes.

<Tabs groupId="surface">
<TabItem value="cli" label="CLI" default>

The current CLI does not expose the older diagnostic report command from previous drafts. Collect version info, server-health output, and relevant log excerpts manually if you are working from the terminal only.

</TabItem>
<TabItem value="desktop" label="Desktop">

**Settings → Help → Generate diagnostic report.** Saves a `.txt` file you can attach to a bug report. Includes everything the CLI version includes.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
GET /api/diagnostics/report
```

Returns the same redacted bundle as text/plain.

</TabItem>
</Tabs>

The report is **designed to be safe to share** — secrets are stripped. Review it before sending if you're paranoid.

## Before you file

1. **Check [Common Issues](./01_common-issues.md).** Many problems are known and have fixes.
2. **Update to the latest version.** Your bug may already be fixed.
3. **Search existing issues.** Someone else may have reported it.
4. **Reproduce the bug.** One-off flukes are hard to fix. Reliable reproduction is gold.

If all four are done and the bug persists, file it.

## Where to file

- **Bug tracker** — for defects. Link on the Codebolt website.
- **Security issues** — use the dedicated security contact (never file security bugs in the public tracker).
- **Feature requests** — a different tracker; see below.
- **Questions** — community forum or chat, not the bug tracker.

## The bug report template

```markdown
## Summary
One sentence describing what's wrong.

## Expected behaviour
What you expected to happen.

## Actual behaviour
What actually happened.

## Steps to reproduce
1. Do X
2. Do Y
3. Observe Z

## Environment
(attach the diagnostic report or equivalent environment details)

## Logs
(relevant server or product log excerpts around the failure time)

## Run ID (if agent-related)
run_xyz — include the trace if helpful

## Additional context
Anything else that might help.
```

Copy this into the bug tracker and fill each section.

## The one thing that matters most

**Reliable reproduction.** If you can tell us "do these 5 things and the bug happens every time", we can fix it in an afternoon. If you can tell us "the bug happened once while I was doing some stuff, here's the error", it might take weeks and still not be fixed.

Spend five extra minutes reproducing the bug cleanly before you file.

## Collecting a diagnostic report

Attach the diagnostic report or equivalent manual bundle. Include version info, config summary, recent logs, and any repair or diagnostic output you have available.

## Attaching a trace

For bugs in agent runs, attach the run trace:

Attach the run trace or run-detail export from the product surface your build exposes. If you need to sanitize it, redact prompts, file paths, and private identifiers before sending.

## Minimising the reproduction

The best bug reports include the smallest possible reproduction. If the bug happens in a large project, try to reproduce it in a minimal one:

1. Create a fresh empty project.
2. Add only the files / config needed to trigger the bug.
3. Verify the bug still reproduces.
4. Attach the minimal project (or a link to it) to the report.

Minimal reproductions make bugs easy to triage. They're worth the time.

## What we can't see

When we get a bug report, we don't have access to your machine, your projects, your LLM keys, or your runs. Everything we need to debug must be in the report. That's why attachments matter.

## What NOT to include

- **API keys or credentials** — never paste them. The diagnostic report redacts known shapes, but double-check.
- **Real customer data** — sanitise or mock it.
- **Internal URLs or IPs** — redact if they're sensitive.
- **Your whole project** — unless it's small and non-sensitive. Prefer a minimal reproduction.

## Feature requests

Different tracker. A good feature request:

- **Describes the problem**, not just the solution. "I need to X but Codebolt won't let me" is better than "please add a button for X".
- **Explains the context.** What workflow is this for? What alternatives did you try?
- **Proposes a shape** if you have one, but keep it open to other solutions.

## Security reports

**Do not file security issues in the public bug tracker.** Use the security contact (listed on the Codebolt website). Include:

- Description of the vulnerability.
- Reproduction steps.
- Impact assessment.
- Any proposed mitigation.

We acknowledge within 72 hours and coordinate disclosure.

## Contribution

If you can fix the bug yourself, a PR is the best bug report. Link the PR to the bug tracker issue so both are visible.

See the contributing guide on the Codebolt repo.

## See also

- [Common Issues](./01_common-issues.md)
- [Logs and Diagnostics](./02_logs-and-diagnostics.md)
- [Agent Debug](../05c_agent-observability/02_agent-debug.md)
