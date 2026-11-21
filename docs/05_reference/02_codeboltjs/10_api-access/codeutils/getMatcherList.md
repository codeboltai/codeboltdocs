---
name: getMatcherList
description: Retrieves the list of matchers.
cbbaseinfo:
  description: Retrieves the list of matchers.
data:
  name: getMatcherList
  category: codeutils
  link: getMatcherList.md
---

# getMatcherList

```text
codebolt.codeutils.getMatcherList(): Promise<GetMatcherListTreeResponse>
```

Retrieves the list of matchers.

## Returns

A promise that resolves with the list of matchers response.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.codeutils.getMatcherList();

  if (result.matchers) {
    const validMatchers = result.matchers.filter(matcher => {
      const isValid = matcher.name &&
                      typeof matcher.name === 'string' &&
                      matcher.name.length > 0;

      if (!isValid) {
        console.warn('Invalid matcher found:', matcher);
      }

      return isValid;
    });

    console.log(`Found ${validMatchers.length} valid matchers`);
  }
});
```

## More examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 1: Get all available matchers
  const matcherListResult = await codebolt.codeutils.getMatcherList();
  if (matcherListResult.matchers) {
    console.log("Available matchers:", matcherListResult.matchers.length);
    matcherListResult.matchers.forEach(matcher => {
      console.log(`${matcher.name} (${matcher.language}): ${matcher.description}`);
    });
  } else {
    console.error("Failed to retrieve matchers:", matcherListResult.error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Filter matchers by language
  const result = await codebolt.codeutils.getMatcherList();
  if (result.matchers) {
    const javascriptMatchers = result.matchers.filter(matcher =>
      matcher.language.toLowerCase().includes('javascript')
    );
    console.log("JavaScript matchers:", javascriptMatchers);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Error handling
  try {
    const result = await codebolt.codeutils.getMatcherList();
    if (result.success) {
      console.log("Successfully retrieved matcher list");
      console.log("Total matchers available:", result.matchers?.length || 0);
    } else {
      console.error("Failed to get matcher list:", result.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Find specific matcher by name
  const result = await codebolt.codeutils.getMatcherList();
  if (result.matchers) {
    const eslintMatcher = result.matchers.find(matcher =>
      matcher.name.toLowerCase().includes('eslint')
    );
    if (eslintMatcher) {
      console.log("ESLint matcher found:", eslintMatcher);
    }
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 6: Create matcher selection UI
  const result = await codebolt.codeutils.getMatcherList();
  if (result.matchers) {
    const options = result.matchers.map(matcher => ({
      value: matcher.name,
      label: `${matcher.name} - ${matcher.description}`,
      language: matcher.language
    }));

    console.log('Matcher options:', options);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 8: Get matchers for specific ecosystem
  const result = await codebolt.codeutils.getMatcherList();
  if (result.matchers) {
    const pythonMatchers = result.matchers.filter(m =>
      m.language.toLowerCase().includes('python')
    );

    const ecosystemMatchers = {
      linting: pythonMatchers.filter(m => m.name.includes('lint')),
      formatting: pythonMatchers.filter(m => m.name.includes('format') || m.name.includes('black')),
      testing: pythonMatchers.filter(m => m.name.includes('pytest') || m.name.includes('unittest'))
    };

    console.log('Python ecosystem matchers:', ecosystemMatchers);
  }
});
```
