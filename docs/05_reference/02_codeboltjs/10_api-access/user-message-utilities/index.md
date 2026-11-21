---
sidebar_label: User Message
---

# User Message

Read the active user message, attachments, mentions, flags, and session data.

Read these values inside `codebolt.onMessage` to access the active agent turn.

## When to use it

Use these helpers inside an agent turn to read text, mentions, or selected context. Use explicit session data keys for temporary workflow values.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(() => {
  const text = codebolt.userMessage.getText();
  console.log(text);
});
```

## More examples

### User Message Utilities vs User Message Manager

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(() => {
  // Utilities API (preferred)
  const text = codebolt.userMessage.getText();
  const files = codebolt.userMessage.getMentionedFiles();
});
```

### Quick Start Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(() => {
  // Check if there's a message
  if (codebolt.userMessage.hasMessage()) {
    // Get message text
    const text = codebolt.userMessage.getText();
    console.log('User said:', text);

    // Get mentions
    const files = codebolt.userMessage.getMentionedFiles();
    const mcpTools = codebolt.userMessage.getMentionedMCPs();

    console.log('Files mentioned:', files);
    console.log('MCP tools mentioned:', mcpTools);

    // Get context
    const currentFile = codebolt.userMessage.getCurrentFile();
    const selection = codebolt.userMessage.getSelection();

    if (currentFile) {
      console.log('Working in file:', currentFile);
    }

    if (selection) {
      console.log('Selected text:', selection);
    }

    // Store session data
    codebolt.userMessage.setSessionData('processingStart', Date.now());

    // Check processing config
    const shouldProcessFiles = codebolt.userMessage.isProcessingEnabled('processMentionedFiles');
    console.log('Process files?', shouldProcessFiles);

    // Clear when done
    codebolt.userMessage.clear();
  }
});
```

## SDK methods

### getCurrent

[`getCurrent`](getCurrent.md) · Get the current user message object.

### getText

Get the user message text content.

```text
codebolt.userMessage.getText(): string
```

### getMentionedMCPs

Get mentioned MCPs from current message.

```text
codebolt.userMessage.getMentionedMCPs(): string[]
```

### getMentionedFiles

Get mentioned files from current message.

```text
codebolt.userMessage.getMentionedFiles(): string[]
```

### getMentionedFolders

Get mentioned folders from current message.

```text
codebolt.userMessage.getMentionedFolders(): string[]
```

### getMentionedAgents

Get mentioned agents from current message.

```text
codebolt.userMessage.getMentionedAgents(): any[]
```

### getSelectedCapabilities

Get selected capabilities from current message.

```text
codebolt.userMessage.getSelectedCapabilities(): string[]
```

### getSelectedCommand

Get selected command from current message.

```text
codebolt.userMessage.getSelectedCommand(): string | undefined
```

### getFlags

```text
codebolt.userMessage.getFlags(): FlagContext | undefined
```

### getEffectiveFlags

```text
codebolt.userMessage.getEffectiveFlags(): string[]
```

### getThreadFlags

```text
codebolt.userMessage.getThreadFlags(): string[]
```

### getMentionedFlags

```text
codebolt.userMessage.getMentionedFlags(): string[]
```

### hasFlag

```text
codebolt.userMessage.hasFlag(name: string): boolean
```

### getRemixPrompt

Get remix prompt from current message.

```text
codebolt.userMessage.getRemixPrompt(): string | undefined
```

### getUploadedImages

Get uploaded images from current message.

```text
codebolt.userMessage.getUploadedImages(): any[]
```

### getCurrentFile

Get current file path.

```text
codebolt.userMessage.getCurrentFile(): string | undefined
```

### getSelection

Get text selection from current message.

```text
codebolt.userMessage.getSelection(): string | undefined
```

### getMessageId

Get message ID.

```text
codebolt.userMessage.getMessageId(): string | undefined
```

### getThreadId

Get thread ID.

```text
codebolt.userMessage.getThreadId(): string | undefined
```

### getProcessingConfig

Get processing configuration.

```text
codebolt.userMessage.getProcessingConfig(): AgentProcessingConfig
```

### isProcessingEnabled

Check if a processing type is enabled.

```text
codebolt.userMessage.isProcessingEnabled(type: "processMentionedMCPs" | "processRemixPrompt" | "processMentionedFiles" | "processMentionedAgents" | "processSelectedCapabilities" | "processSelectedCommand" | "processFlags"): boolean
```

### setSessionData

Set session data.

```text
codebolt.userMessage.setSessionData(key: string, value: any): void
```

### getSessionData

Get session data.

```text
codebolt.userMessage.getSessionData(key: string): any
```

### getTimestamp

Get message timestamp.

```text
codebolt.userMessage.getTimestamp(): string | undefined
```

### hasMessage

Check if there's a current message.

```text
codebolt.userMessage.hasMessage(): boolean
```

### updateProcessingConfig

Update processing configuration.

```text
codebolt.userMessage.updateProcessingConfig(config: any): void
```

### clear

Clear current user message.

```text
codebolt.userMessage.clear(): void
```
