---
sidebar_label: Chat Summary
---

# Chat Summary

Summarize chat message arrays.

Access these methods through `codebolt.chatSummary` on the default client.

## When to use it

Condense conversation context when a workflow needs a shorter representation of earlier turns.

## Examples

### Quick Start

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Summarize entire conversation history
  const fullSummary = await codebolt.chatSummary.summarizeAll();
  console.log('Full summary:', fullSummary);

  // Summarize specific messages with depth control
  const messages = [
    { role: 'user', content: 'How do I create a React component?' },
    { role: 'assistant', content: 'To create a React component...' }
  ];
  const partialSummary = await codebolt.chatSummary.summarize(messages, 2);
  console.log('Partial summary:', partialSummary);
});
```

### Integration with State Module

```javascript
import codebolt from '@codebolt/codeboltjs';

async function saveConversationState() {
  const summary = await codebolt.chatSummary.summarizeAll();

  // Save summary to agent state
  await codebolt.cbstate.addToAgentState(
    'conversation_summary',
    JSON.stringify(summary)
  );

  await codebolt.cbstate.addToAgentState(
    'last_summary_time',
    new Date().toISOString()
  );

  return summary;
}
```

### Cache Summaries

```javascript
import codebolt from '@codebolt/codeboltjs';

class CachedSummary {
  constructor(ttl = 300000) { // 5 minutes
    this.ttl = ttl;
    this.cache = null;
    this.timestamp = 0;
  }

  async get() {
    const now = Date.now();

    if (!this.cache || now - this.timestamp > this.ttl) {
      this.cache = await codebolt.chatSummary.summarizeAll();
      this.timestamp = now;
    }

    return this.cache;
  }

  invalidate() {
    this.cache = null;
    this.timestamp = 0;
  }
}
```

### Pitfall 1: Summarizing Too Frequently

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Problem: Performance impact
  setInterval(async () => {
    await codebolt.chatSummary.summarizeAll();
  }, 1000); // Every second

  // ✅ Solution: Reasonable interval
  setInterval(async () => {
    await codebolt.chatSummary.summarizeAll();
  }, 300000); // Every 5 minutes
});
```

## SDK methods

### summarizeAll

[`summarizeAll`](summarizeAll.md) · Summarizes the entire chat history.

### summarize

[`summarize`](summarize.md) · Summarizes a specific part of the chat history.
