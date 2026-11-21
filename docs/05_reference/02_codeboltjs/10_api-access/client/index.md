# Client and lifecycle

The default export is a shared `Codebolt` instance. Importing it starts SDK initialization. Read `codebolt.ready` to check whether initialization finished.

Register `onMessage` to handle incoming agent turns. The SDK waits for the WebSocket connection before registering the listener. The handler receives the normalized user message and may receive a second argument containing additional variables. `getMessage()` returns the active or queued message, or waits for one. For handling the original message envelope, use `onRawMessage`. Action Block entry points use `onActionBlockInvocation`.

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(() => {
  const text = codebolt.userMessage.getText();
  console.log(text);
});
```

Use `onReady` to run startup code once the SDK connects. Scripts that need to control when their own execution resumes can use the promise returned by `waitForReady()`.

## Agent entry points

```text
codebolt.ready: boolean
codebolt.waitForReady(): Promise<void>
codebolt.onReady(handler: () => void | Promise<void>): void
codebolt.getMessage(): Promise<FlatUserMessage>
codebolt.onMessage(handler: (userMessage: FlatUserMessage, additionalVariable?: Record<string, string | undefined>) => void | Promise<void> | any | Promise<any>): void
codebolt.onActionBlockInvocation(handler: (threadContext: any, metadata: { sideExecutionId: string; threadId: string; parentAgentId: string; parentAgentInstanceId: string; timestamp: string; }) => void | Promise<void> | any | Promise<any>): void
codebolt.onRawMessage(handler: (userMessage: RawMessageForAgent) => void | Promise<void> | any | Promise<any>): void
```

## Package exports

Import the client using the package's default export. The CommonJS build assigns the singleton to `module.exports`, so some named exports in the TypeScript declarations are unavailable at runtime. Use the instance methods in this reference for services and message helpers.

| Declaration | Runtime API |
| --- | --- |
| `state` | [`codebolt.cbstate`](../cbstate/index.md) |
| `userMessageUtilities` and named message helpers | [`codebolt.userMessage`](../user-message-utilities/index.md) |
| Browser and vector helper exports | [`codebolt.browser`](../browser/index.md) and [`codebolt.vectordb`](../vectordb/index.md) |
| `toolGateway` | [`codebolt.tools`](../tools/index.md) |
| `webSearch` | [Web Search tool](../webSearch/index.md) |
| `channel`, `evalService` | No callable service on the built client |

## Provider callbacks

A provider registers callbacks on the same client. See [Environment Providers](../../../../02_using-codebolt/08a_environments/03_environment-providers.md) for the provider role.
