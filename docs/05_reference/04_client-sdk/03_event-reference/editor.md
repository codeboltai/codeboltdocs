---
title: editor
---

# editor

Editor synchronization. Access via `client.sockets.editor`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.editor.on(event, handler)`:

| Event |
|---|
| `fileChanged` |
| `folderContents` |
| `folderAdded` |
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.editor.on('fileChanged', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `readFolder()` |
| `writeFile()` |
| `deleteFile()` |
| `createFile()` |
| `createFolder()` |
| `moveItem()` |
| `watchFolder()` |
| `unwatchFolder()` |
| `ping()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.editor.on('fileChanged', (data) => {
  console.log('fileChanged:', data);
});

// Send
client.sockets.editor.readFolder();
```
