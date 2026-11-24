---
sidebar_position: 4
title: Agent Flows
description: Edit a visual agent graph and follow its messages in Chat.
---

# Agent Flows

Use a visual flow when you can describe the steps and connections in advance. A flow agent stores its graph in a JSON `.agentflow` file. To delegate based on what an agent discovers during a run, see [Manager–Worker](./03_patterns/manager-worker.md).

## Open and edit a flow

1. Open **Agents**, filter for **Flow** agents, and choose **Open Flow Editor** on the agent you want to edit.
2. Inspect the nodes and the connections between their inputs and outputs. Use the node palette to add a step and connect the ports on the canvas.
3. Select **Save**, choose the flow agent in Chat, and send a message to exercise the graph.

## Example graph

The basic message example in Codebolt’s application tests has three nodes. When the agent receives a message, it sends a fixed reply to Chat. To try the same behavior, connect the following ports in the editor.

| From | To | Purpose |
|---|---|---|
| `events/onmessage` → `message_received` | `codebolt/chat/sendmessage` → `onTrigger` | Run the send step when a message arrives |
| `basic/const_string` → `value` | `codebolt/chat/sendmessage` → `message` | Supply the reply text |

Set the string value to `agentflow-basic-smoke-ok`, save, and send a message to the agent. Look for that text in Chat. Change the value, save again, and send another message to verify the edit.

<details>
<summary>View the example .agentflow file</summary>

```json
{
  "id": "basic-message-smoke",
  "revision": 0,
  "last_node_id": 3,
  "last_link_id": 2,
  "nodes": [
    {
      "id": 1,
      "type": "events/onmessage",
      "pos": [
        40,
        120
      ],
      "size": [
        210,
        78
      ],
      "flags": {},
      "order": 0,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "name": "message_received",
          "type": -1,
          "links": [
            1
          ]
        },
        {
          "name": "message",
          "type": "object",
          "links": null
        }
      ],
      "properties": {
        "showSplitOutputs": false,
        "message": null
      }
    },
    {
      "id": 2,
      "type": "basic/const_string",
      "pos": [
        300,
        230
      ],
      "size": [
        210,
        58
      ],
      "flags": {},
      "order": 1,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "name": "value",
          "type": "string",
          "links": [
            2
          ]
        }
      ],
      "properties": {
        "value": "agentflow-basic-smoke-ok"
      }
    },
    {
      "id": 3,
      "type": "codebolt/chat/sendmessage",
      "pos": [
        620,
        120
      ],
      "size": [
        220,
        100
      ],
      "flags": {},
      "order": 2,
      "mode": 3,
      "inputs": [
        {
          "name": "onTrigger",
          "type": -1,
          "link": 1
        },
        {
          "name": "message",
          "type": "string",
          "link": 2
        }
      ],
      "outputs": [
        {
          "name": "messageSent",
          "type": -1,
          "links": []
        },
        {
          "name": "success",
          "type": "boolean",
          "links": null
        }
      ],
      "properties": {}
    }
  ],
  "links": [
    [
      1,
      1,
      0,
      3,
      0,
      -1
    ],
    [
      2,
      2,
      0,
      3,
      1,
      "string"
    ]
  ],
  "groups": [],
  "config": {},
  "extra": {
    "ds": {
      "scale": 1,
      "offset": [
        0,
        0
      ]
    }
  },
  "version": 0.4
}
```

</details>

## Follow a run

Use the Chat thread to read the agent’s replies. For recorded activity or process logs, use the Thread Panel or Agent Debug. [Reading a Flow](../../02_using-codebolt/07_multi-agent-usage/03_reading-a-flow.md)
