---
sidebar_position: 4
title: Chat Widget
description: Embed Codebolt Chat in a React application.
---

# Chat Widget

Use the `ChatWidget` component from `@codebolt/chat-widget` to connect a React application to Codebolt Chat. The widget supplies its own stylesheet.

## How to Use

### Option 1: Full Widget

Pass the server URLs and the IDs of the thread and agent you want to use.

```tsx
import { ChatWidget } from '@codebolt/chat-widget';

function ProjectChat({ threadId, agentId }: { threadId: string; agentId: string }) {
  return <ChatWidget wsUrl="ws://localhost:2719/ws/chat"
    backendUrl="http://localhost:2719" threadId={threadId} agentId={agentId} />;
}
```

### Option 2: Compose Lower-Level Pieces

`useChatSocket` supplies send functions. Read the connection state and per-thread messages from `useChatStore`. This example sends a request and displays the number of messages in the thread.

```tsx
import { useChatSocket, useChatStore } from '@codebolt/chat-widget';

function ChatControls({ threadId, agentId }: { threadId: string; agentId: string }) {
  const { sendMessage } = useChatSocket('ws://localhost:2719/ws/chat', threadId, 'http://localhost:2719');
  const connected = useChatStore(state => state.isConnected);
  const count = useChatStore(state => state.messages.get(threadId)?.length ?? 0);
  return <div>
    <p>{count} messages</p>
    <button disabled={!connected} onClick={() => sendMessage('Summarize this project', agentId)}>
      Ask agent
    </button>
  </div>;
}
```

## See Also

- [Client SDK](./02_client-sdk.md) — full API access beyond chat
- [Dynamic Panels](./05_dynamic-panels.md) — embed UI inside the existing app
- [Existing UIs](./03_existing-uis.md) — see how the built-in apps use these components
- [Build your first custom UI](../../03_guides/02_first-steps/build-your-first-custom-ui.md) — hands-on tutorial
