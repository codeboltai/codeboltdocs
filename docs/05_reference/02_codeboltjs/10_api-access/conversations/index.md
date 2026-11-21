# Conversations

Create conversations, manage members, and send or list conversation messages.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const conversations = await codebolt.conversations.list();
  for (const conversation of conversations) {
    console.log(conversation);
  }
});
```

## SDK methods

### create

```text
codebolt.conversations.create(input: CreateConversationInput): Promise<Conversation>
```

### list

```text
codebolt.conversations.list(input?: ListConversationsInput): Promise<Conversation[]>
```

### get

```text
codebolt.conversations.get(input: { conversationId: string; memberId?: string; }): Promise<Conversation>
```

### update

```text
codebolt.conversations.update(input: { conversationId: string; memberId?: string; name?: string; members?: ConversationMember[]; teamIds?: string[]; rules?: RoomRule[]; status?: "open" | "closed" | "archived"; }): Promise<Conversation>
```

### listMessages

```text
codebolt.conversations.listMessages(input: ListConversationMessagesInput & { memberId?: string; }): Promise<ConversationMessagePage>
```

### sendMessage

```text
codebolt.conversations.sendMessage(input: SendConversationMessageInput): Promise<SendConversationMessageResult>
```

### markRead

```text
codebolt.conversations.markRead(input: { conversationId: string; memberId?: string; sequence: number; }): Promise<{ success: true; }>
```

### retryDelivery

```text
codebolt.conversations.retryDelivery(input: { conversationId: string; messageId: string; memberId?: string; }): Promise<ConversationActivation[]>
```

### createTeam

```text
codebolt.conversations.createTeam(input: { memberId?: string; name: string; members: ConversationMember[]; }): Promise<ConversationTeam>
```

### listTeams

```text
codebolt.conversations.listTeams(input?: { memberId?: string; }): Promise<ConversationTeam[]>
```

### updateTeam

```text
codebolt.conversations.updateTeam(input: { teamId: string; memberId?: string; name?: string; members?: ConversationMember[]; }): Promise<ConversationTeam>
```
