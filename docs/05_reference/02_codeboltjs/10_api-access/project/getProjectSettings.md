---
name: getProjectSettings
description: Retrieves the project settings from the server.
cbbaseinfo:
  description: Retrieves the project settings from the server.
data:
  name: getProjectSettings
  category: project
  link: getProjectSettings.md
---

# getProjectSettings

```text
codebolt.project.getProjectSettings(): Promise<GetProjectSettingsResponse>
```

Retrieves the project settings from the server.

## Returns

A promise that resolves with the project settings response.

## When to use it

Inspect stored project configuration before choosing values for a workflow. Use the Settings UI to change user-facing settings.

## Examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 1: Basic project settings retrieval
  const settings = await codebolt.project.getProjectSettings();
  console.log("Project Settings:", settings.projectSettings);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Accessing user information
  const userInfo = await codebolt.project.getProjectSettings();
  if (userInfo.success && userInfo.projectSettings) {
    console.log("User ID:", userInfo.projectSettings.user_userId);
    console.log("Username:", userInfo.projectSettings.user_username);
    console.log("Workspace:", userInfo.projectSettings.workspace_name);
    console.log("Project Path:", userInfo.projectSettings.user_active_project_path);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Getting LLM configuration
  const llmConfig = await codebolt.project.getProjectSettings();
  if (llmConfig.projectSettings) {
    console.log("Default LLM:", llmConfig.projectSettings.userprofile_default_llm);

    // Parse LLM settings if available
    if (llmConfig.projectSettings.userprofile_llm_settings) {
      try {
        const llmSettings = JSON.parse(llmConfig.projectSettings.userprofile_llm_settings);
        console.log("LLM Settings:", llmSettings);
      } catch (error) {
        console.error("Failed to parse LLM settings:", error);
      }
    }
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Workspace information
  const workspaceInfo = async () => {
    const settings = await codebolt.project.getProjectSettings();

    return {
      workspaceId: settings.projectSettings?.workspace_id,
      workspaceName: settings.projectSettings?.workspace_name,
      workspacePath: settings.projectSettings?.workspace_folderPath,
      activeProjectPath: settings.projectSettings?.user_active_project_path
    };
  };
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 5: User profile management
  const getUserProfile = async () => {
    const settings = await codebolt.project.getProjectSettings();

    if (!settings.success) {
      throw new Error("Failed to retrieve project settings");
    }

    return {
      profileId: settings.projectSettings?.userprofile_profileId,
      profileType: settings.projectSettings?.userprofile_profile_type,
      userId: settings.projectSettings?.user_userId,
      username: settings.projectSettings?.user_username,
      imageUrl: settings.projectSettings?.user_userImageUrl
    };
  };
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 6: Project validation and setup
  const validateProjectSetup = async () => {
    const settings = await codebolt.project.getProjectSettings();

    const validation = {
      hasValidUser: !!settings.projectSettings?.user_userId,
      hasValidWorkspace: !!settings.projectSettings?.workspace_id,
      hasValidProject: !!settings.projectSettings?.user_active_project_path,
      hasLLMConfig: !!settings.projectSettings?.userprofile_default_llm
    };

    const isValid = Object.values(validation).every(Boolean);

    return {
      isValid,
      details: validation,
      settings: settings.projectSettings
    };
  };
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 7: Error handling with detailed information
  try {
    const settings = await codebolt.project.getProjectSettings();

    if (!settings.success) {
      console.error("Settings retrieval failed:", settings.message);
      return;
    }

    if (!settings.projectSettings) {
      console.warn("No project settings available");
      return;
    }

    // Process settings
    console.log("Settings retrieved successfully");

  } catch (error) {
    console.error("Error getting project settings:", error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 8: Settings comparison and migration
  const compareSettings = async () => {
    const currentSettings = await codebolt.project.getProjectSettings();

    // Example of settings validation
    const requiredFields = [
      'user_userId',
      'workspace_id',
      'user_active_project_path',
      'userprofile_default_llm'
    ];

    const missingFields = requiredFields.filter(field =>
      !currentSettings.projectSettings?.[field]
    );

    if (missingFields.length > 0) {
      console.warn("Missing required settings:", missingFields);
    }

    return {
      isComplete: missingFields.length === 0,
      missingFields,
      settings: currentSettings.projectSettings
    };
  };
});
```
