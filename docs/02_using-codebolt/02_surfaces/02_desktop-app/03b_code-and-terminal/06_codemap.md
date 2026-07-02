---
sidebar_position: 6
title: Codemap
description: The Codemap is a structural dependency visualisation of your project — files, modules, classes, and functions as nodes, with edges representing imports, calls,.
---

# Codemap

The Codemap is a structural dependency visualisation of your project — files, modules, classes, and functions as nodes, with edges representing imports, calls, and inheritance relationships.

Open via: **Debug Tools dropdown → Codemap**

### What Codemap shows

The graph renders your project's architecture at three zoom levels:

| Zoom level | Shows |
|---|---|
| **Project** | Files and folders as nodes, imports as edges |
| **Module** | Classes and top-level functions within each file |
| **Symbol** | Individual methods and their call relationships |

Scroll to zoom in and out. Drag to pan. Click a node to highlight its direct connections (one hop in either direction).

### Navigating from Codemap to code

Double-click any node to jump to that file, class, or function in the Code editor. The editor opens to the exact line and scrolls the Codemap to keep the selected node centred.

### Filtering

- **Search bar** — type to highlight matching nodes; non-matching nodes are dimmed
- **File type filter** — show only `.ts`, `.py`, or other specific file types
- **Depth slider** — control how many hops of dependency to display; set to 1 to see only direct imports

### Using Codemap before agent tasks

Before asking an agent to refactor a module, open the Codemap to see how many other files import it. This tells you the blast radius of the change and helps you frame the task more precisely: "Refactor `PaymentService` — it is imported by `OrderController`, `InvoiceService`, and `WebhookHandler`."

### Codemap updates

The Codemap is rebuilt whenever you save a file. Large projects may take a few seconds to re-render; a spinner appears in the top-right while the index refreshes.
