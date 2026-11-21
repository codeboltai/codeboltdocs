---
name: askQuestion
description: Legacy question API uses the inline card, retaining the feedback response shape.
cbbaseinfo:
  description: Legacy question API uses the inline card, retaining the feedback response shape.
data:
  name: askQuestion
  category: chat
  link: askQuestion.md
---

# askQuestion

```text
codebolt.chat.askQuestion(question: string, buttons?: string[], withFeedback?: boolean): Promise<LegacyQuestionResponse>
```

Legacy question API uses the inline card, retaining the feedback response shape.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 1: Simple question with default options (no buttons)
  const response1 = await codebolt.chat.askQuestion("What would you like to do next?");
  console.log('User response:', response1);

  // Example 2: Question with custom button options
  const response2 = await codebolt.chat.askQuestion(
      "How would you like to proceed?",
      ["Continue", "Skip", "Cancel"]
  );
  console.log('Selected option:', response2);

  // Example 3: Question with buttons and feedback input enabled
  const response3 = await codebolt.chat.askQuestion(
      "Are you satisfied with the current results?",
      ["Yes", "No", "Need Improvements"],
      true
  );
  console.log('User feedback:', response3);

  // Example 4: Configuration choice question
  const configChoice = await codebolt.chat.askQuestion(
      "Which configuration would you like to use?",
      ["Development", "Staging", "Production"],
      false
  );
  console.log('Selected configuration:', configChoice);

  // Example 5: Error handling with question
  const errorAction = await codebolt.chat.askQuestion(
      "An error occurred during processing. What would you like to do?",
      ["Retry", "Skip this step", "Abort process"],
      true
  );
  console.log('Error action choice:', errorAction);

  // Example 6: Accessing the feedback message from response
  const userChoice = await codebolt.chat.askQuestion(
      "Do you want to continue?",
      ["Yes", "No"]
  );
  // Access the actual user selection
  const selectedOption = userChoice.message.feedbackMessage;
  console.log('User selected:', selectedOption);
});
```
