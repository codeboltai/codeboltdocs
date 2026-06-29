---
sidebar_position: 8
title: Plans, Usage & Billing
description: Manage your subscription plan, track token/request/cost usage by model, and handle payments, credit, and transactions.
---

# Plans, Usage & Billing

The **Subscription** area of Settings has three pages covering the commercial side of your Codebolt Cloud account.

## Plans (`/plan`)

Browse available subscription tiers and a **pricing page** comparing them. From here you can:

- **Upgrade** or **downgrade** your plan
- Compare feature limits and included usage across tiers

Plan data is pulled from the API's `/users/plan` endpoint. Your current plan also shows on [General Settings](./01_overview.md).

## Usage (`/usage`, `/usage/model`)

**Usage** tracks your consumption so you can see what you're spending and on what.

- **Overview** (`/usage`) — aggregate token, request, and cost charts over time.
- **By Model** (`/usage/model`) — the same metrics broken down per model, so you can spot which models drive cost.

Charts render from your usage events; use them to decide when to upgrade, switch models, or set internal limits.

## Billing (`/billing`, `/transaction`)

**Billing** handles money:

| Action | Where |
|---|---|
| **Add credit** | Add a one-time credit balance to your account |
| **Request credit** | Request credit (e.g. for a trial or support case) |
| **Payment methods** | Manage cards on file |
| **Transactions** (`/transaction`) | Full transaction history |

The add-credit and request-credit flows show success/failure dialogs so you know immediately whether a payment posted.

## How they connect

- **Plan** sets your allowance and rate card.
- **Usage** measures consumption against that allowance.
- **Billing** collects payment for overages, credit top-ups, and plan fees.

If you're on a team plan, billing is typically managed by a team admin — see [Team Settings](./09_team-settings.md).

## See also

- [Settings Overview](./01_overview.md)
- [Team Settings](./09_team-settings.md)
- [General Settings](./01_overview.md) — shows your current plan
