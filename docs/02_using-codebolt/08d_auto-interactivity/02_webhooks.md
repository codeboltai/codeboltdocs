---
sidebar_position: 2
title: Webhooks
description: Send authenticated HTTP events to an agent through the Routing Gateway.
---

# Webhooks

![Webhooks](/productImages/aultiagentcoordination/webhook.png)

A webhook routes an incoming HTTP request to a specific agent. Open **System → Routing Gateway → Webhooks** in the desktop panel picker.

## Creating a webhook

1. Select **Add Webhook**. Enter a name, select an agent, and choose a **Thread Strategy**.
2. Leave **Target URL** blank for one-way delivery, or enter a callback endpoint you control to receive agent replies.
3. Select **Create**. Copy the endpoint path from the webhook card and append it to your Codebolt API base URL.
4. Configure the sender to POST JSON with the webhook's shared secret in the `X-Webhook-Secret` header.

A request with a valid secret receives HTTP `202 Accepted` before routing finishes. Check **Activity Log** for the routing outcome.

## Thread strategies

| Strategy | How messages are grouped |
|---|---|
| **Per Message** | A new thread for each request |
| **Single** | A shared thread for this webhook |
| **Per User** | One thread per `userId` |
| **Per Conversation** | One thread per `threadId` in the request |

## Webhook security

Use **Show** on the webhook card to reveal the secret. **Regenerate** replaces it, so update the sender after rotating it. If the event source cannot attach a custom header, use an integration that can receive the event and forward an authenticated request to Codebolt.

## Payload format

Codebolt uses `message` or `text` as the agent's instruction. If both are absent, it serializes the JSON body as the instruction.

```json
{
  "text": "Summarize the new issue and suggest a priority.",
  "userId": "reporter-123",
  "threadId": "issue-456"
}
```

To test a webhook, set `CODEBOLT_WEBHOOK_URL` to its full URL and `CODEBOLT_WEBHOOK_SECRET` to its secret, then run the command below.

```bash
curl --fail-with-body "$CODEBOLT_WEBHOOK_URL" \
  -H "X-Webhook-Secret: $CODEBOLT_WEBHOOK_SECRET" \
  -H 'Content-Type: application/json' \
  --data '{"text":"Confirm that this test message reached the agent."}'
```

## Reply routing

If you configure a **Target URL**, the gateway posts its reply envelope to that URL. Outbound callbacks carry an HMAC-SHA256 signature in `X-Webhook-Signature`, calculated from the callback body with the webhook's secret.
