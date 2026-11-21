---
title: validate
---

# `validate`

```typescript
client.themes.validate(): Promise<ThemeValidationResult>
```

Validates theme data for correctness and completeness.

Checks the current theme configuration for errors, inconsistencies,
or missing required fields. Returns detailed validation results
highlighting any issues found.

## Parameters

_No parameters._

## Returns

`Promise<ThemeValidationResult>` — A promise that resolves to a ThemeValidationResult with validation status

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.themes.validate();
console.log(result);
```
