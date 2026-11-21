---
title: Themes API
---

# Themes API

Themes API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`create`](./create) | Creates a new custom theme. |
| [`delete`](./delete) | Deletes a theme from the system. |
| [`getAll`](./getAll) | Retrieves all available themes in the system. |
| [`getById`](./getById) | Retrieves a specific theme by its unique identifier. |
| [`getStats`](./getStats) | Retrieves theme statistics and metrics. |
| [`reset`](./reset) | Resets themes to their default configuration. |
| [`seedPopular`](./seedPopular) | Seeds the system with popular theme presets. |
| [`update`](./update) | Updates an existing theme's configuration. |
| [`updateColors`](./updateColors) | Updates the color scheme of a theme. |
| [`validate`](./validate) | Validates theme data for correctness and completeness. |

## Methods

---

### `create`

```typescript
client.themes.create(data: CreateThemeRequest): Promise<Theme>
```

Creates a new custom theme.

Registers a new theme with the system using the provided configuration.
The theme can be customized with specific colors, fonts, and styling
preferences to match design requirements.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateThemeRequest` | Yes | Request containing the new theme configuration |

**Returns:** `Promise<Theme>` — A promise that resolves to the created Theme object

[Full reference →](./create)

---

### `delete`

```typescript
client.themes.delete(themeId: string): Promise<unknown>
```

Deletes a theme from the system.

Permanently removes the specified theme. If the theme is currently
active, another theme will need to be set as active. This operation
cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `themeId` | `string` | Yes | The unique identifier of the theme to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the theme has been deleted

[Full reference →](./delete)

---

### `getAll`

```typescript
client.themes.getAll(): Promise<Theme[]>
```

Retrieves all available themes in the system.

Returns every theme regardless of whether it's active or inactive.
Use this for comprehensive theme browsing or to populate theme selection UIs.

_No parameters._

**Returns:** `Promise<Theme[]>` — A promise that resolves to an array of Theme objects

[Full reference →](./getAll)

---

### `getById`

```typescript
client.themes.getById(themeId: string): Promise<Theme>
```

Retrieves a specific theme by its unique identifier.

Returns detailed information about a single theme including its
configuration, colors, settings, and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `themeId` | `string` | Yes | The unique identifier of the theme to retrieve |

**Returns:** `Promise<Theme>` — A promise that resolves to the requested Theme object

[Full reference →](./getById)

---

### `getStats`

```typescript
client.themes.getStats(): Promise<ThemeStats>
```

Retrieves theme statistics and metrics.

Returns aggregated data about themes including counts, usage statistics,
and other analytical information useful for monitoring and reporting.

_No parameters._

**Returns:** `Promise<ThemeStats>` — A promise that resolves to a ThemeStats object containing metrics

[Full reference →](./getStats)

---

### `reset`

```typescript
client.themes.reset(data?: Record<string, unknown>): Promise<unknown>
```

Resets themes to their default configuration.

Restores all theme settings to the original system defaults.
Optionally accepts custom data to control the reset behavior.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>` | No | Optional parameters for controlling the reset operation |

**Returns:** `Promise<unknown>` — A promise that resolves when themes have been reset

[Full reference →](./reset)

---

### `seedPopular`

```typescript
client.themes.seedPopular(data?: Record<string, unknown>): Promise<unknown>
```

Seeds the system with popular theme presets.

Creates a collection of well-known and widely-used themes based on
popular color schemes and design systems. Useful for initializing
the theme catalog with common options.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>` | No | Optional parameters to control the seeding process |

**Returns:** `Promise<unknown>` — A promise that resolves when popular themes have been seeded

[Full reference →](./seedPopular)

---

### `update`

```typescript
client.themes.update(themeId: string, data: UpdateThemeRequest): Promise<Theme>
```

Updates an existing theme's configuration.

Modifies the properties, colors, or settings of a theme identified
by its ID. Use this to make incremental changes to a theme without
recreating it from scratch.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `themeId` | `string` | Yes | The unique identifier of the theme to update |
| `data` | `UpdateThemeRequest` | Yes | Request containing the theme updates to apply |

**Returns:** `Promise<Theme>` — A promise that resolves to the updated Theme object

[Full reference →](./update)

---

### `updateColors`

```typescript
client.themes.updateColors(data: UpdateThemeColorsRequest): Promise<unknown>
```

Updates the color scheme of a theme.

Modifies the color palette for one or more themes. This includes
primary colors, background colors, text colors, and other color
variables used throughout the interface.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateThemeColorsRequest` | Yes | Request containing theme color update information |

**Returns:** `Promise<unknown>` — A promise that resolves when colors have been updated

[Full reference →](./updateColors)

---

### `validate`

```typescript
client.themes.validate(): Promise<ThemeValidationResult>
```

Validates theme data for correctness and completeness.

Checks the current theme configuration for errors, inconsistencies,
or missing required fields. Returns detailed validation results
highlighting any issues found.

_No parameters._

**Returns:** `Promise<ThemeValidationResult>` — A promise that resolves to a ThemeValidationResult with validation status

[Full reference →](./validate)

