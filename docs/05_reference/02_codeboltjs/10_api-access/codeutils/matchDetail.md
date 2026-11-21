---
name: matchDetail
description: Retrieves details of a match.
cbbaseinfo:
  description: Retrieves details of a match.
data:
  name: matchDetail
  category: codeutils
  link: matchDetail.md
---

# matchDetail

```text
codebolt.codeutils.matchDetail(matcher: string): Promise<getMatchDetail>
```

Retrieves details of a match.

## Parameters

- `matcher` — The matcher to retrieve details for (by name or identifier).

## Returns

A promise that resolves with the match detail response.

## Examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 1: Get details for a specific matcher
  const xmllintDetail = await codebolt.codeutils.matchDetail('xmllint');
  if (xmllintDetail.matcher) {
    console.log("Matcher Name:", xmllintDetail.matcher.name);
    console.log("Description:", xmllintDetail.matcher.description);
    console.log("Language:", xmllintDetail.matcher.language);
    console.log("Pattern:", xmllintDetail.matcher.pattern);
    if (xmllintDetail.matcher.examples) {
      console.log("Examples:", xmllintDetail.matcher.examples);
    }
  } else {
    console.error("Failed to get matcher details:", xmllintDetail.error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Error handling for non-existent matcher
  const nonExistentDetail = await codebolt.codeutils.matchDetail('non-existent-matcher');
  if (nonExistentDetail.error) {
    console.error("Matcher not found:", nonExistentDetail.error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Using matcher details with performMatch
  const eslintDetail = await codebolt.codeutils.matchDetail('eslint-compact');
  if (eslintDetail.matcher) {
    // Use the matcher details to understand the pattern structure
    console.log("ESLint pattern:", eslintDetail.matcher.pattern);

    // You can then use this information with performMatch
    const matcherDefinition = {
      owner: eslintDetail.matcher.name,
      pattern: [/* pattern based on the details */]
    };
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 7: Extract pattern information
  const tscDetail = await codebolt.codeutils.matchDetail('tsc');
  if (tscDetail.matcher && tscDetail.matcher.pattern) {
    const patternInfo = {
      regexp: tscDetail.matcher.pattern,
      captureGroups: tscDetail.matcher.pattern.match(/\(/g)?.length || 0,
      hasLookaheads: /\?!=/.test(tscDetail.matcher.pattern),
      hasLookbehinds: /\?<=/.test(tscDetail.matcher.pattern)
    };

    console.log('Pattern analysis:', patternInfo);
  }
});
```
