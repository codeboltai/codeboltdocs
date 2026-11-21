---
name: createIdea
description: Create a new idea.
cbbaseinfo:
  description: Create a new idea.
data:
  name: createIdea
  category: roadmap
  link: createIdea.md
---

# createIdea

```text
codebolt.roadmap.createIdea(data: CreateIdeaData, projectPath?: string): Promise<RoadmapIdeaResponse>
```

Create a new idea

## When to use it

Capture a proposal or technical debt item before deciding whether it belongs in a planned phase.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create idea in specific project
  const result = await codebolt.roadmap.createIdea({
    title: 'Plugin System',
    description: 'Allow third-party plugins to extend functionality',
    category: 'Architecture',
    suggestedImpact: 'high',
    suggestedDifficulty: 'hard'
  }, '/path/to/project');

  console.log('Idea created for specific project');
});
```

## More examples

### Create Basic Idea

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a simple idea
  const result = await codebolt.roadmap.createIdea({
    title: 'Dark Mode Support'
  });

  console.log('Idea created:', result.idea.id);
  console.log('Title:', result.idea.title);
  console.log('Status:', result.idea.status); // 'pending'
});
```

### Create Detailed Idea

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create idea with full details
  const result = await codebolt.roadmap.createIdea({
    title: 'AI-Powered Search Suggestions',
    description: 'Implement machine learning-based search suggestions that learn from user behavior and provide intelligent autocomplete.',
    category: 'Search',
    suggestedImpact: 'high',
    suggestedDifficulty: 'hard',
    tags: ['ai', 'search', 'machine-learning', 'innovation'],
    createdBy: {
      id: 'user_123',
      name: 'Product Manager',
      type: 'user'
    }
  });

  console.log('Idea created with full details');
});
```

### Create Idea with Agent Attribution

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Agent suggests an idea
  const result = await codebolt.roadmap.createIdea({
    title: 'Automated Testing Pipeline',
    description: 'AI-powered test generation and execution',
    category: 'Testing',
    suggestedImpact: 'high',
    suggestedDifficulty: 'hard',
    createdBy: {
      id: 'agent_qa_001',
      name: 'QA Agent',
      type: 'agent'
    }
  });

  console.log('Idea suggested by agent');
});
```
