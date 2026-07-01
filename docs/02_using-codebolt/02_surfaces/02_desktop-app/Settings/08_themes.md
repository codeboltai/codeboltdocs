---
sidebar_position: 8
title: Themes
description: Visual themes for the Desktop App. Use Appearance and Theme Editor to select, copy, edit, import, export, and delete themes.
---

# Themes

Visual themes control the Desktop App colors. Use **Settings -> Appearance** to choose a theme or open the Theme Editor.

## Built-in themes

The current Desktop App includes these built-in base themes:

- **Default Dark**
- **Default Light**
- **Blue**

Built-in themes are protected. To customize one, select it in Theme Editor and save a copy.

## Switching themes

Open **Settings -> Appearance** and select a theme. Theme changes apply through the app theme store.

## Theme Editor

The built-in Theme Editor lets you customize the app's color variables. Select a base theme to start from, then adjust the available color groups. You can also:

- copy a built-in theme into a custom theme
- update a custom theme
- import a `.json` theme file
- export the selected theme
- delete custom themes
- reset back to default themes

![Theme Customization](/productImages/applicationfeatures/Appearance.png)

## Writing a theme

A theme is a JSON file with a name, type, and color variables:

```json
{
  "name": "my-theme",
  "type": "dark",
  "colors": {
    "editorBackground": "#1a1a2e",
    "foreground": "#eaeaea",
    "sideBarBackground": "#16162a",
    "buttonBackground": "#2a2a4a"
  }
}
```

Import the JSON file from **Settings -> Appearance -> Theme Editor**.

## Colour variable reference

The Theme Editor shows the editable color variables available in the current Desktop App.

## See also

- [Settings](./01_overview.md)
- [Layout](../02_application-navigation/02_layout.md)
