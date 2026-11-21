---
sidebar_position: 1
title: Roadmap Module
---

# Roadmap

Manage roadmap phases, features, and related planning records.

## When to use it

Group features into phases and capture ideas to revisit during planning.

## Examples

### Quick Start

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get the complete roadmap
  const roadmap = await codebolt.roadmap.getRoadmap();

  // Create a new phase
  const phase = await codebolt.roadmap.createPhase({
    name: 'Phase 1: Foundation',
    description: 'Core infrastructure and setup',
    order: 1
  });

  // Add a feature to the phase
  const feature = await codebolt.roadmap.createFeature(phase.phase.id, {
    title: 'User Authentication',
    description: 'Implement OAuth2 login',
    priority: 1,
    status: 'pending'
  });

  // Create an idea
  const idea = await codebolt.roadmap.createIdea({
    title: 'Dark Mode Support',
    description: 'Add toggle for dark mode theme',
    suggestedImpact: 'medium',
    suggestedDifficulty: 'easy'
  });
});
```

### Project Planning

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create project phases
  const phases = ['Research', 'Design', 'Implementation', 'Testing', 'Launch'];
  for (let i = 0; i < phases.length; i++) {
    await codebolt.roadmap.createPhase({
      name: phases[i],
      order: i + 1
    });
  }
});
```

## SDK methods

### getRoadmap

Get the complete roadmap for a project.

```text
codebolt.roadmap.getRoadmap(projectPath?: string): Promise<RoadmapGetResponse>
```

### getPhases

Get all phases in the roadmap.

```text
codebolt.roadmap.getPhases(projectPath?: string): Promise<RoadmapPhasesResponse>
```

### createPhase

[`createPhase`](createPhase.md) · Create a new phase in the roadmap.

### updatePhase

Update an existing phase.

```text
codebolt.roadmap.updatePhase(phaseId: string, data: UpdatePhaseData, projectPath?: string): Promise<RoadmapPhaseResponse>
```

### deletePhase

Delete a phase from the roadmap.

```text
codebolt.roadmap.deletePhase(phaseId: string, projectPath?: string): Promise<RoadmapDeleteResponse>
```

### getFeatures

Get features in a specific phase.

```text
codebolt.roadmap.getFeatures(phaseId: string, projectPath?: string): Promise<RoadmapFeaturesResponse>
```

### getAllFeatures

Get all features across all phases.

```text
codebolt.roadmap.getAllFeatures(projectPath?: string): Promise<RoadmapFeaturesResponse>
```

### createFeature

[`createFeature`](createFeature.md) · Create a new feature in a phase.

### updateFeature

[`updateFeature`](updateFeature.md) · Update an existing feature.

### deleteFeature

Delete a feature.

```text
codebolt.roadmap.deleteFeature(featureId: string, projectPath?: string): Promise<RoadmapDeleteResponse>
```

### moveFeature

Move a feature to a different phase.

```text
codebolt.roadmap.moveFeature(featureId: string, data: MoveFeatureData, projectPath?: string): Promise<RoadmapFeatureResponse>
```

### getIdeas

Get all ideas (pre-roadmap suggestions).

```text
codebolt.roadmap.getIdeas(projectPath?: string): Promise<RoadmapIdeasResponse>
```

### createIdea

[`createIdea`](createIdea.md) · Create a new idea.

### updateIdea

Update an existing idea.

```text
codebolt.roadmap.updateIdea(ideaId: string, data: UpdateIdeaData, projectPath?: string): Promise<RoadmapIdeaResponse>
```

### deleteIdea

Delete an idea.

```text
codebolt.roadmap.deleteIdea(ideaId: string, projectPath?: string): Promise<RoadmapDeleteResponse>
```

### reviewIdea

Review an idea (accept or reject).

```text
codebolt.roadmap.reviewIdea(ideaId: string, data: ReviewIdeaData, projectPath?: string): Promise<RoadmapIdeaResponse>
```

### moveIdeaToRoadmap

Move an accepted idea to the roadmap as a feature.

```text
codebolt.roadmap.moveIdeaToRoadmap(ideaId: string, data: MoveIdeaToRoadmapData, projectPath?: string): Promise<RoadmapMoveToRoadmapResponse>
```
