---
name: addTestimonial
description: Add a testimonial for an agent.
cbbaseinfo:
  description: Add a testimonial for an agent.
data:
  name: addTestimonial
  category: agentPortfolio
  link: addTestimonial.md
---

# addTestimonial

```text
codebolt.agentPortfolio.addTestimonial(toAgentId: string, content: string, projectId?: string): Promise<AddTestimonialResponse>
```

Add a testimonial for an agent

## Parameters

- `toAgentId` — The ID of the agent receiving the testimonial
- `content` — The testimonial content
- `projectId` — Optional project ID to associate with the testimonial

## Returns

Promise resolving to the created testimonial

## When to use it

Record a written assessment after working with an agent. Keep the assessment tied to work you can describe.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const testimonial = await codebolt.agentPortfolio.addTestimonial(
    'agent-123',
    'Outstanding contribution to the e-commerce platform redesign. Expert knowledge of React and state management. Would definitely work together again.',
    'project-456'
  );

  console.log('Added testimonial for project:', testimonial.data?.projectId);
});
```

## More examples

### Add Simple Testimonial

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.agentPortfolio.addTestimonial(
    'agent-123',
    'Excellent work on the frontend development. Very responsive and delivered high-quality code.'
  );

  if (result.success) {
    console.log('Testimonial added:', result.data?.id);
  }
});
```

### Automated Testimonial After Project

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const generateProjectTestimonial = async (
    agentId: string,
    projectData: any
  ) => {
    const { projectName, duration, tasksCompleted, qualityScore, communication } = projectData;

    let content = `Worked on "${projectName}" for ${duration} weeks.\n\n`;

    if (qualityScore >= 0.9) {
      content += 'Delivered exceptional quality work with attention to detail.\n';
    } else if (qualityScore >= 0.7) {
      content += 'Delivered good quality work meeting all requirements.\n';
    }

    if (tasksCompleted > 10) {
      content += `Completed ${tasksCompleted} tasks efficiently.\n`;
    }

    if (communication === 'excellent') {
      content += 'Excellent communication throughout the project.\n';
    }

    content += '\nHighly recommend for future collaborations.';

    return await codebolt.agentPortfolio.addTestimonial(agentId, content, projectData.id);
  };
});
```

### Testimonial with Categories

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const categorizedTestimonials = {
    technical: (agentId: string, skills: string[]) =>
      codebolt.agentPortfolio.addTestimonial(
        agentId,
        `Strong technical skills in: ${skills.join(', ')}. Demonstrated deep understanding and problem-solving abilities.`
      ),

    communication: (agentId: string, examples: string[]) =>
      codebolt.agentPortfolio.addTestimonial(
        agentId,
        `Excellent communication skills. ${examples.join(' ')}. Always clear and responsive.`
      ),

    leadership: (agentId: string, achievements: string[]) =>
      codebolt.agentPortfolio.addTestimonial(
        agentId,
        `Natural leadership abilities. ${achievements.join(' ')}. Great at mentoring team members.`
      ),

    reliability: (agentId: string, evidence: string[]) =>
      codebolt.agentPortfolio.addTestimonial(
        agentId,
        `Highly reliable agent. ${evidence.join(' ')}. Consistently delivers on promises.`
      )
  };

  await categorizedTestimonials.technical('agent-123', ['React', 'Node.js', 'TypeScript']);
});
```

### Post-Project Review

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const postProjectReview = async (agentId: string, project: any) => {
    const review = {
      content: '',
      projectId: project.id
    };

    if (project.performance.exceededExpectations) {
      review.content = 'Far exceeded expectations on this project. ';
    }

    if (project.performance.technicalExcellence) {
      review.content += 'Demonstrated technical excellence and expertise. ';
    }

    if (project.performance.greatCommunication) {
      review.content += 'Communication was clear, timely, and professional. ';
    }

    review.content += 'Would strongly recommend for similar projects.';

    return await codebolt.agentPortfolio.addTestimonial(
      agentId,
      review.content,
      review.projectId
    );
  };
});
```

### Long-Term Partnership Recognition

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const recognizeLongTermPartnership = async (
    agentId: string,
    months: number,
    projects: string[]
  ) => {
    const content = `
    Been working with this agent for ${months} months across ${projects.length} projects.

    Consistent quality and reliability throughout our partnership.
    Key projects include: ${projects.slice(0, 3).join(', ')}${projects.length > 3 ? '...' : ''}.

    Valued team member who consistently delivers excellence.
  `.trim();

    return await codebolt.agentPortfolio.addTestimonial(agentId, content);
  };
});
```
