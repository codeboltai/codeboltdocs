# Flags

Manage user, project, and thread flags.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.flags.getEffective();
  console.log(result);
});
```

## SDK methods

### getAvailable

```text
codebolt.flags.getAvailable(scope?: FlagScope): Promise<any>
```

### addAvailable

```text
codebolt.flags.addAvailable(scope: "user" | "project", name: string): Promise<any>
```

### removeAvailable

```text
codebolt.flags.removeAvailable(scope: "user" | "project", name: string): Promise<any>
```

### getEnabled

```text
codebolt.flags.getEnabled(scope?: FlagScope): Promise<any>
```

### setEnabled

```text
codebolt.flags.setEnabled(scope: "user" | "project", names: string[]): Promise<any>
```

### enable

```text
codebolt.flags.enable(scope: "user" | "project", name: string): Promise<any>
```

### disable

```text
codebolt.flags.disable(scope: "user" | "project", name: string): Promise<any>
```

### getThreadFlags

```text
codebolt.flags.getThreadFlags(threadId?: string): Promise<any>
```

### setThreadFlags

```text
codebolt.flags.setThreadFlags(threadId: string, names: string[]): Promise<any>
```

### enableThreadFlag

```text
codebolt.flags.enableThreadFlag(threadId: string, name: string): Promise<any>
```

### disableThreadFlag

```text
codebolt.flags.disableThreadFlag(threadId: string, name: string): Promise<any>
```

### getEffective

```text
codebolt.flags.getEffective(threadId?: string): Promise<{ flags: FlagContext; }>
```

### hasFlag

```text
codebolt.flags.hasFlag(name: string, threadId?: string): Promise<{ enabled: boolean; }>
```
