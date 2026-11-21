# Chat

Send messages to the Codebolt chat UI and request user input or confirmation.

Register `codebolt.onMessage` to receive incoming messages in an agent. Use `codebolt.chat` to send chat output and interact with the user.

## When to use it

Send progress messages to the current chat, ask the user for input, or inspect messages by thread ID.

## Examples

### Quick Start Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Send a message
  codebolt.chat.sendMessage('Hello! I\'m ready to help.');

  // Wait for a reply
  const reply = await codebolt.chat.waitforReply('What would you like me to do?');
  console.log('User replied:', reply.message);

  // Ask for confirmation
  const confirmed = await codebolt.chat.sendConfirmationRequest(
    'Should I proceed with the task?',
    ['Yes, proceed', 'No, cancel']
  );

  if (confirmed === 'Yes, proceed') {
    // Start a process
    const processControl = codebolt.chat.processStarted(() => {
      console.log('User clicked stop!');
    });

    // Do some work...

    // Notify when finished
    codebolt.chat.processFinished();
  }
});
```

### Sending Notifications

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  // Send different types of notifications
  codebolt.chat.sendNotificationEvent(
    'Starting build process...',
    'terminal'
  );

  codebolt.chat.sendNotificationEvent(
    'Git repository updated',
    'git'
  );

  codebolt.chat.sendNotificationEvent(
    'Browser automation started',
    'browser'
  );
});
```

## SDK methods

### getChatHistory

[`getChatHistory`](getChatHistory.md) · Retrieves the chat history from the server.

### setRequestHandler

[`setRequestHandler`](setRequestHandler.md) · Sets a global request handler for all incoming messages.

### sendMessage

[`sendMessage`](sendMessage.md) · Sends a message through the WebSocket connection.

### waitforReply

[`waitforReply`](waitforReply.md) · Waits for a reply to a sent message.

### processStarted

[`processStarted`](processStarted.md) · Notifies the server that a process has started and sets up a listener for stopProcessClicked events.

### stopProcess

[`stopProcess`](stopProcess.md) · Stops the ongoing process.

### processFinished

[`processFinished`](processFinished.md) · Stops the ongoing process.

### sendConfirmationRequest

[`sendConfirmationRequest`](sendConfirmationRequest.md) · Sends a confirmation request to the server with two options: Yes or No.

### askUser

Ask structured questions and wait for explicit submission.

```text
codebolt.chat.askUser(options: AskUserOptions): Promise<UserQuestionResult>
```

### askQuestion

[`askQuestion`](askQuestion.md) · Legacy question API uses the inline card, retaining the feedback response shape.

### sendNotificationEvent

[`sendNotificationEvent`](sendNotificationEvent.md) · Sends a notification event to the server.

### sendLocalToolExecutionUpdate

Publishes the lifecycle of an agent-local tool to the chat UI.

```text
codebolt.chat.sendLocalToolExecutionUpdate(update: { toolUseId: string; toolName: string; params: Record<string, unknown>; state: "EXECUTING" | "EXECUTION_SUCCESS" | "EXECUTION_ERROR"; result?: unknown; }): void
```

### checkForSteeringMessage

Checks if any steering message has been received.

```text
codebolt.chat.checkForSteeringMessage(): SteeringMessage | null
```

### onSteeringMessageReceived

Waits for a steering message.

```text
codebolt.chat.onSteeringMessageReceived(): Promise<SteeringMessage | null>
```
