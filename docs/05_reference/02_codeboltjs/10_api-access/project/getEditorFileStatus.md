---
name: getEditorFileStatus
description: Requests the current editor file status from the application.
cbbaseinfo:
  description: Requests the current editor file status from the application.
data:
  name: getEditorFileStatus
  category: project
  link: getEditorFileStatus.md
---

# getEditorFileStatus

```text
codebolt.project.getEditorFileStatus(): Promise<any>
```

Requests the current editor file status from the application.

## When to use it

Inspect editor file information where the connected client supplies it. Handle a response without live editor details.

## Examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 1: Basic editor file status retrieval
  const fileStatus = await codebolt.project.getEditorFileStatus();
  console.log("Editor Status:", fileStatus.editorStatus);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Error handling for editor status
  try {
    const statusResult = await codebolt.project.getEditorFileStatus();

    if (!statusResult.success) {
      console.error("Failed to retrieve editor status:", statusResult.message);
      return;
    }

    if (statusResult.editorStatus) {
      console.log("Editor status available");
    } else {
      console.log("Editor status not available - using defaults");
    }
  } catch (error) {
    console.error("Error getting editor file status:", error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Analyzing editor status
  const analyzeEditorStatus = async () => {
    const statusResponse = await codebolt.project.getEditorFileStatus();

    if (!statusResponse.success) {
      return {
        hasStatus: false,
        error: statusResponse.message
      };
    }

    const status = statusResponse.editorStatus || "";

    const analysis = {
      hasStatus: true,
      hasVisibleFiles: status.includes("Codebolt Visible Files"),
      hasOpenTabs: status.includes("Codebolt Open Tabs"),
      isDefault: status.includes("Currently not available - using default values"),
      rawStatus: status,
      timestamp: new Date().toISOString()
    };

    return analysis;
  };
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 5: Editor status monitoring
  const monitorEditorStatus = async () => {
    const statusResult = await codebolt.project.getEditorFileStatus();

    const monitor = {
      status: statusResult.success ? 'active' : 'inactive',
      editorInfo: statusResult.editorStatus,
      lastChecked: new Date().toISOString(),
      message: statusResult.message
    };

    // Log the monitoring information
    console.log("Editor Status Monitor:", monitor);

    return monitor;
  };
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 6: Editor status for debugging
  const debugEditorStatus = async () => {
    console.log("🔍 Debugging editor file status...");

    const statusResponse = await codebolt.project.getEditorFileStatus();

    console.log("Response type:", statusResponse.type);
    console.log("Success:", statusResponse.success);
    console.log("Message:", statusResponse.message);
    console.log("Editor Status Length:", statusResponse.editorStatus?.length || 0);

    if (statusResponse.editorStatus) {
      console.log("Editor Status Preview:",
        statusResponse.editorStatus.substring(0, 100) + "..."
      );
    }

    return statusResponse;
  };
});
```
