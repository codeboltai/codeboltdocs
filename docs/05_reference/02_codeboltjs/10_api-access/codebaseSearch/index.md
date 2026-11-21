---
sidebar_position: 1
title: Codebase Search Module
---

# Codebase Search

Run semantic codebase search and search for MCP tools.

## When to use it

Locate the implementation of a feature using a natural-language query. Scope the search to likely directories when you know which package owns the code.

## Examples

### Quick Start

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Search for authentication-related code
  const results = await codebolt.codebaseSearch.search(
    'user authentication login flow'
  );

  // Display results
  if (results.results == null) throw new Error('The response is missing results.');
  for (const result of results.results) {
    console.log(`File: ${result.file}`);
    console.log(`Content: ${result.content}`);
    console.log('---');
  }
});
```

### search

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const results = await codebolt.codebaseSearch.search(
    'database connection handling',
    ['src/db', 'src/services']  // Optional: limit to specific directories
  );
});
```

### searchMcpTool

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const tools = await codebolt.codebaseSearch.searchMcpTool(
    'file operations',
    ['filesystem', 'io']
  );
});
```

### Search with Result Ranking

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const results = await codebolt.codebaseSearch.search('API endpoint validation');

  // Rank results by relevance and file type
  if (results.results == null) throw new Error('The response is missing results.');
  const ranked = results.results
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .map(result => ({
      file: result.file,
      score: result.score,
      type: result.file.endsWith('.test.js') ? 'test' : 'source',
      snippet: result.content.substring(0, 100)
    }));

  console.table(ranked);
});
```

### Find Implementation

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Find how error handling is implemented
  const results = await codebolt.codebaseSearch.search(
    'global error handler middleware exception'
  );
});
```

### Explore Patterns

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Find validation patterns
  const validation = await codebolt.codebaseSearch.search(
    'input validation sanitize user data'
  );
});
```

### Scoped Search

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Search only in test files
  const tests = await codebolt.codebaseSearch.search(
    'user registration test',
    ['tests', '__tests__', 'spec']
  );
});
```

## SDK methods

### search

Perform a semantic search across the codebase.

```text
codebolt.codebaseSearch.search(query: string, targetDirectories?: string[]): Promise<CodebaseSearchResponse>
```

### searchMcpTool

Search for MCP tools by query and optional tags.

```text
codebolt.codebaseSearch.searchMcpTool(query: string, tags?: string[]): Promise<McpToolSearchResponse>
```
