---
sidebar_position: 3
title: Agent Settings
description: Override the default LLM for a specific installed agent, and assign different models to each of that agent's LLM roles.
---

# Agent Settings

## Agent LLM Settings

![Agent Settings](/productImages/applicationfeatures/AgentSetting.png)

Open the **Agents** menu in the desktop bottom bar and select **Agents**. Find the installed agent, choose **View Details**, then open **LLM roles**.

1. Choose a provider and model for **Default Agent LLM**, or choose **Default Application LLM** to inherit the application setting.
2. Assign models to the roles the agent defines.
3. Select **Save Agent Roles**.

Roles are defined by the agent itself, so the list varies per agent.

---

## Universal Agent

The **Universal Agent** settings screen stores a custom endpoint URL and an offline preference. To configure a locally served model for chat, see [Local Models](../../../08_integrations/02_local-models.md).

---

## Agent Steps

**Settings → Agent Steps** stores agent selections for development step names. A workflow determines which agents it runs.

| Step | Purpose |
|---|---|
| `codegeneration` | Writing or modifying code |
| `testing` | Running or generating tests |
| `deploy` | Deployment tasks |
| `documentation` | Generating docs |
| `review` | Code review |
| `userquestion` | Answering user questions mid-workflow |

Select an agent for a step and use **+** to add another when available. **Auto** clears the explicit selection for that row.

---

## Code Editor Setting

Assign agents to two specific editor interactions:

| Setting | Trigger | Description |
|---|---|---|
| **In-Code Edit Agent** | `Ctrl+K` / `Cmd+K` | Agent invoked for inline code editing inside the editor |
| **Codemap Agent** | Codemap generation | Agent used to generate the project dependency graph |

Select an agent from each dropdown. These settings are stored locally per machine.
