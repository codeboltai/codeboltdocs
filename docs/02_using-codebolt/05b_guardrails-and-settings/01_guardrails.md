---
sidebar_position: 1
title: Guardrails
description: Configure tool permissions and approval requests with policy profiles.
---

# Guardrails

Policy profiles control how the runtime handles agent tool requests. Open **Policy Profiles** in the desktop app to review the built-in profiles or create your own.

## Policy Profiles

Choose a profile for the thread or use the project default. Use **Make default** in the panel to change the default profile. A profile groups rules by tool type and has a fallback decision.

## Tool Permissions

Add rules for the tool types you want to control. Depending on the tool and rule, the profile can allow the request, deny it, ask for approval, or allow it with constraints. The fallback decision applies when no specific rule matches.

## Approval Requests

When the active profile requires approval, review the tool name and its arguments in the prompt. Approve the action to let it proceed or deny it to block it. The rules depend on the active profile and can differ across threads.

## Guardrail files

CodeBolt stores project policy profiles in `.codebolt/policy-profiles.json`. Manage the file through the **Policy Profiles** panel so profile IDs, the project default, and rule settings stay consistent.
