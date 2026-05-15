---
sidebar_position: 5
title: Mail and Calendar
description: Codebolt has first-class integrations for email and calendar. Agents can read inboxes, send messages, schedule meetings, and trigger off of incoming mail
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Mail and Calendar

![Mail and Calendar](/productImages/integrations/calender.png)

Codebolt has first-class integrations for email and calendar. Agents can read inboxes, send messages, schedule meetings, and trigger off of incoming mail. Used for:

- Automating repetitive email workflows (triage, follow-ups, responses).
- Scheduling work around team availability.
- Receiving webhook-equivalent data from senders without a webhook endpoint.

## Supported providers

- **Gmail / Google Calendar** — OAuth
- **Microsoft 365 / Outlook** — OAuth
- **IMAP + SMTP** — for self-hosted or other mail systems
- **CalDAV** — generic calendar support

## Connecting an account

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

**Settings → Integrations → Mail** (and **Calendar**). Click **Connect**, choose the provider, OAuth flow opens in a browser, you authorize, the account appears in the list.

</TabItem>
<TabItem value="config" label="Config file">

For IMAP/SMTP or self-hosted CalDAV, you can configure directly:

```yaml
# .codebolt/integrations.yaml
mail:
  - name: work
    type: imap
    host: imap.my-org.com
    user: me@my-org.com
    password_env: WORK_MAIL_PW
calendar:
  - name: work
    type: caldav
    url: https://caldav.my-org.com
    user_env: WORK_CAL_USER
    password_env: WORK_CAL_PW
```

</TabItem>
</Tabs>

## Mail tools

- `codebolt_mail.list_inbox` — list recent messages
- `codebolt_mail.read_message` — read a specific message
- `codebolt_mail.send_message` — send a new message
- `codebolt_mail.reply` — reply to a thread
- `codebolt_mail.mark_read`, `codebolt_mail.archive`, `codebolt_mail.label`

All permission-gated. By default, no agent has mail write access.

## Calendar tools

- `codebolt_calendar.list_events` — upcoming events
- `codebolt_calendar.create_event` — schedule something
- `codebolt_calendar.update_event`, `delete_event`
- `codebolt_calendar.find_availability` — "when are X and Y both free?"

Backed by `calendarSchedulerService` for the availability math.

## Triggering an agent from incoming mail

Useful for "when an email arrives matching X, run agent Y". Configure in an agent manifest:

```yaml
# .codebolt/agents/support-triage/agent.yaml
triggers:
  - type: mail
    match:
      from: "*@customer-domain.com"
      subject_contains: ["bug", "issue", "problem"]
```

When a matching email arrives, the agent is spawned with the email as input. The agent can reply, label, archive, or escalate depending on its prompt.

## Scheduling agents around meetings

An agent can check your calendar before doing work that might conflict:

```
user: run the nightly build if I'm free tonight

agent:
  → calendar.find_availability(after: 19:00, duration: 2h)
  → found free slot 20:00-22:00
  → scheduling build for 20:00
```

Background agents can also self-schedule — a cron trigger can be combined with a calendar check to avoid running during "do not disturb" periods.

## Security and scope

Mail and calendar access is sensitive. Best practices:

- **Scope OAuth tightly.** Grant only the permissions you need (read-only if the agent doesn't need to send).
- **Allowlist agents carefully.** Don't blanket-allow `codebolt_mail.*` to every agent.
- **Audit send actions.** Route every outgoing email through a review hook so you see what agents are sending.
- **Dry-run for new agents.** Test mail-sending agents in a dry-run mode that logs what they would send without actually sending.

```yaml
# .codebolt/hooks/audit-mail.ts
export default {
  phase: "before_tool_call",
  match: { tool: "codebolt_mail.send_message" },
  handler: async (ctx) => {
    ctx.log.info("agent sending mail", { to: ctx.args.to, subject: ctx.args.subject });
    // You could also require human approval here:
    // return { verdict: "deny", reason: "mail send requires human approval" };
    return { verdict: "allow" };
  },
};
```

## Rate limits

Mail providers have send limits (Gmail: ~500/day for free accounts, more for Workspace). Agents that send mail should be aware:

- Don't run mail-sending agents in tight loops.
- Batch sends where possible.
- Monitor provider quotas through the provider and usage surfaces your build exposes.

## See also

- [Tools & MCP Overview](../05a_tools-and-mcp/01_overview.md)
- [Communication (internals)](../../04_build-on-codebolt/09_internals/03_subsystems/11_communication.md)
- [Hooks](../../04_build-on-codebolt/05_plugins/01_overview.md)
