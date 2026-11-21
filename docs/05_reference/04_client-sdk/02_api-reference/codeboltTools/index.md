---
title: CodeboltTools API
---

# CodeboltTools API

Codebolt Tools API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`execute`](./execute) | Executes a CodeBolt tool with the provided input. |
| [`getConfig`](./getConfig) | Retrieves the current tools configuration. |
| [`getOpenAiFunction`](./getOpenAiFunction) | Retrieves a specific tool formatted as an OpenAI function. |
| [`getOpenAiFunctions`](./getOpenAiFunctions) | Retrieves all tools formatted as OpenAI functions. |
| [`getOpenAiTool`](./getOpenAiTool) | Retrieves a specific tool formatted as an OpenAI tool. |
| [`getOpenAiTools`](./getOpenAiTools) | Retrieves all tools formatted as OpenAI tools. |
| [`getSchema`](./getSchema) | Retrieves the JSON schema for a specific tool. |
| [`list`](./list) | Lists all available CodeBolt tools. |
| [`updateConfig`](./updateConfig) | Updates the tools configuration. |
| [`validate`](./validate) | Validates tool input before execution. |

## Methods

---

### `execute`

```typescript
client.codeboltTools.execute(data: ExecuteToolRequest): Promise<unknown>
```

Executes a CodeBolt tool with the provided input.

Runs the specified tool with the given parameters and returns the
execution result. Tool execution may involve file operations, API calls,
or other platform-specific actions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ExecuteToolRequest` | Yes | Request containing tool execution details |

**Returns:** `Promise<unknown>` — A promise that resolves to the tool execution result

[Full reference →](./execute)

---

### `getConfig`

```typescript
client.codeboltTools.getConfig(): Promise<CodeboltToolsConfig>
```

Retrieves the current tools configuration.

Returns system-wide settings that control tool behavior, availability,
permissions, and other configuration options. Useful for understanding
the current tool setup.

_No parameters._

**Returns:** `Promise<CodeboltToolsConfig>` — A promise that resolves to the CodeboltToolsConfig object

[Full reference →](./getConfig)

---

### `getOpenAiFunction`

```typescript
client.codeboltTools.getOpenAiFunction(toolName: string): Promise<OpenAiFunction>
```

Retrieves a specific tool formatted as an OpenAI function.

Returns a single tool in OpenAI's functions schema format for targeted
integration with the legacy function calling API.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `toolName` | `string` | Yes | The name of the tool to retrieve |

**Returns:** `Promise<OpenAiFunction>` — A promise that resolves to the OpenAiFunction object

[Full reference →](./getOpenAiFunction)

---

### `getOpenAiFunctions`

```typescript
client.codeboltTools.getOpenAiFunctions(): Promise<OpenAiFunction[]>
```

Retrieves all tools formatted as OpenAI functions.

Returns the entire tool catalog in OpenAI's functions schema format,
compatible with the legacy function calling API. Each function includes
its name, description, and parameter schema.

_No parameters._

**Returns:** `Promise<OpenAiFunction[]>` — A promise that resolves to an array of OpenAiFunction objects

[Full reference →](./getOpenAiFunctions)

---

### `getOpenAiTool`

```typescript
client.codeboltTools.getOpenAiTool(toolName: string): Promise<OpenAiTool>
```

Retrieves a specific tool formatted as an OpenAI tool.

Returns a single tool in OpenAI's tools schema format for targeted
integration when only specific tools are needed for function calling.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `toolName` | `string` | Yes | The name of the tool to retrieve |

**Returns:** `Promise<OpenAiTool>` — A promise that resolves to the OpenAiTool object

[Full reference →](./getOpenAiTool)

---

### `getOpenAiTools`

```typescript
client.codeboltTools.getOpenAiTools(): Promise<OpenAiTool[]>
```

Retrieves all tools formatted as OpenAI tools.

Returns the entire tool catalog in OpenAI's tools schema format, suitable
for direct use with OpenAI's API function calling feature. Each tool
includes its type, function definition, and parameters.

_No parameters._

**Returns:** `Promise<OpenAiTool[]>` — A promise that resolves to an array of OpenAiTool objects

[Full reference →](./getOpenAiTools)

---

### `getSchema`

```typescript
client.codeboltTools.getSchema(toolName: string): Promise<CodeboltToolSchema>
```

Retrieves the JSON schema for a specific tool.

Returns the schema definition that describes the tool's input structure,
required parameters, and validation rules. Useful for building dynamic
UI forms or validating tool inputs before execution.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `toolName` | `string` | Yes | The name of the tool to get schema for |

**Returns:** `Promise<CodeboltToolSchema>` — A promise that resolves to the CodeboltToolSchema object

[Full reference →](./getSchema)

---

### `list`

```typescript
client.codeboltTools.list(params?: Record<string, unknown>): Promise<CodeboltTool[]>
```

Lists all available CodeBolt tools.

Returns every registered tool in the system regardless of category or
permission. Use this for comprehensive tool discovery or to populate
tool selection interfaces.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering tools |

**Returns:** `Promise<CodeboltTool[]>` — A promise that resolves to an array of CodeboltTool objects

[Full reference →](./list)

---

### `updateConfig`

```typescript
client.codeboltTools.updateConfig(data: UpdateCodeboltToolsConfigRequest): Promise<CodeboltToolsConfig>
```

Updates the tools configuration.

Modifies system-wide tool settings including enabled/disabled tools,
permissions, rate limits, and other configuration options. Changes
take effect immediately.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateCodeboltToolsConfigRequest` | Yes | Request containing configuration updates |

**Returns:** `Promise<CodeboltToolsConfig>` — A promise that resolves to the updated CodeboltToolsConfig object

[Full reference →](./updateConfig)

---

### `validate`

```typescript
client.codeboltTools.validate(data: ValidateToolRequest): Promise<unknown>
```

Validates tool input before execution.

Checks whether the provided parameters conform to the tool's schema
requirements. Returns validation results highlighting any errors or
warnings without actually executing the tool.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ValidateToolRequest` | Yes | Request containing validation data |

**Returns:** `Promise<unknown>` — A promise that resolves to validation results

[Full reference →](./validate)

