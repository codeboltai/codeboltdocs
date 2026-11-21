---
name: performMatch
description: Performs a matching operation based on the provided matcher definition and problem patterns.
cbbaseinfo:
  description: Performs a matching operation based on the provided matcher definition and problem patterns.
data:
  name: performMatch
  category: codeutils
  link: performMatch.md
---

# performMatch

```text
codebolt.codeutils.performMatch(matcherDefinition: object, problemPatterns: any[], problems?: any[]): Promise<MatchProblemResponse>
```

Performs a matching operation based on the provided matcher definition and problem patterns.

## Parameters

- `matcherDefinition` — The definition of the matcher (name, pattern, language, etc.).
- `problemPatterns` — The patterns to match against (regex patterns with severity levels).
- `problems` — Optional list of pre-existing problems to include.

## Returns

A promise that resolves with the matching problem response.

## Examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 1: ESLint output processing
  const matcherDefinition = {
    owner: "eslint-compact",
    pattern: [{
      regexp: "^(.+):\\sline\\s(\\d+),\\scol\\s(\\d+),\\s(Error|Warning|Info)\\s-\\s(.+)\\s\\((.+)\\)$",
      file: 1,
      line: 2,
      column: 3,
      severity: 4,
      message: 5,
      code: 6
    }]
  };

  const problemPatterns = matcherDefinition.pattern;

  const testProblems = [
    { line: "src/file1.js: line 10, col 5, Error - Unexpected console statement (no-console)", source: "test" },
    { line: "src/file2.js: line 25, col 8, Warning - 'var' used instead of 'let' or 'const' (no-var)", source: "test" }
  ];

  const result = await codebolt.codeutils.performMatch(matcherDefinition, problemPatterns, testProblems);
  console.log("Matched problems:", result.matches);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Processing compiler output
  const compilerMatcher = {
    owner: "typescript-compiler",
    pattern: [{
      regexp: "^(.+)\\((\\d+),(\\d+)\\):\\s(error|warning)\\s(.+)$",
      file: 1,
      line: 2,
      column: 3,
      severity: 4,
      message: 5
    }]
  };

  const compilerProblems = [
    { line: "src/index.ts(15,8): error TS2304: Cannot find name 'unknownVariable'.", source: "tsc" },
    { line: "src/utils.ts(22,15): warning TS6133: 'unusedParam' is declared but never used.", source: "tsc" }
  ];

  const compilerResult = await codebolt.codeutils.performMatch(
    compilerMatcher,
    compilerMatcher.pattern,
    compilerProblems
  );
  console.log("Compiler issues found:", compilerResult.matches);
});
```
