---
sidebar_position: 6
title: Themes
description: Codebolt has a built-in theme system that lets you create, manage, and switch visual themes
---

# Themes

Codebolt has a built-in theme system that lets you create, manage, and switch visual themes. Themes are database-backed, managed via a REST API, and applied at runtime through CSS variables.

## How It Works

1. Themes are stored in a JSON database with 100+ color properties.
2. The `ThemeProvider` reads the active theme and injects CSS variables (`--theme-*`) on the document root.
3. All UI components use these CSS variables for colors, making theme switches instant.
4. Themes are managed via REST API — create, update, delete, set active.

## Color Groups

Each theme defines colors across these groups:

| Group | Examples |
|---|---|
| **Base** | background, foreground |
| **UI Controls** | button, dropdown, input, badge, progress bar |
| **Sidebar & Activity Bar** | background, foreground, borders |
| **Editor** | background, foreground, selection, line numbers, cursor, gutters |
| **Panel & Status Bar** | background, foreground, borders, titles |
| **Terminal** | ANSI colors (16 standard + bright variants) |
| **Chat** | user bubbles, agent bubbles, code blocks, commands |
| **Lists & Trees** | selection, hover states |

## CSS Variables

The ThemeProvider injects variables in the format `--theme-<property>`:

```css
--theme-background
--theme-foreground
--theme-primary
--theme-secondary
--theme-accent
--theme-border
--theme-editor-background
--theme-editor-foreground
--theme-terminal-ansiRed
--theme-sidebar-background
--theme-statusBar-background
/* ... 100+ more */
```

Components reference these variables:

```css
.my-component {
  background: var(--theme-background);
  color: var(--theme-foreground);
  border: 1px solid var(--theme-border);
}
```

## Theme API

Manage themes via REST endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/themes/` | List all themes |
| `GET` | `/themes/:id` | Get a specific theme |
| `POST` | `/themes/` | Create a new theme |
| `PUT` | `/themes/:id` | Update a theme |
| `DELETE` | `/themes/:id` | Delete a theme |
| `POST` | `/themes/set-active` | Set the active theme |
| `GET` | `/themes/active` | Get the current active theme |
| `POST` | `/themes/reset` | Reset to default themes |
| `GET` | `/themes/stats` | Get theme statistics |

### Creating a theme via API

```bash
curl -X POST http://localhost:2719/themes/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Custom Theme",
    "type": "dark",
    "colors": {
      "background": "#0f1117",
      "foreground": "#e2e4f0",
      "primary": "#5b6af0",
      "secondary": "#1a1d27",
      "accent": "#5b6af0",
      "border": "#2a2d3e",
      "editor-background": "#0f1117",
      "editor-foreground": "#e2e4f0",
      "sidebar-background": "#1a1d27",
      "statusBar-background": "#0f1117"
    }
  }'
```

### Setting the active theme

```bash
curl -X POST http://localhost:2719/themes/set-active \
  -H "Content-Type: application/json" \
  -d '{ "themeId": "my-custom-theme-id" }'
```

## Client SDK

The Client SDK provides a `ThemesApi` for programmatic theme management:

```typescript
// List all themes
const themes = await codebolt.themes.getAll();

// Get active theme
const active = await fetch('http://localhost:2719/themes/active').then(res => res.json());

// Create a theme
await codebolt.themes.create({ name: 'My Theme', type: 'dark', colors: { ... } });

// Set active theme
await fetch('http://localhost:2719/themes/set-active', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ themeId: 'my-theme-id' }),
});
```

## Built-in Themes

Codebolt ships with several pre-seeded themes covering light and dark variants. Use `POST /themes/seed-popular` to re-seed popular community themes.

## See Also

- [UI Extensions](./03_ui-extensions.md) — custom panels that use theme variables
- [Plugins Overview](../05_plugins/01_overview.md) — plugin development overview
