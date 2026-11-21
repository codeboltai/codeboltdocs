---
sidebar_position: 1
title: Project Structure Module
---

# Project Structure

Read and edit the project structure model.

## When to use it

Read or update the modeled packages, routes, and dependencies when planning how a change should fit the project.

## Examples

### Quick Start

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get project metadata
  const metadata = await codebolt.projectStructure.getMetadata();

  // Create a new package
  const pkg = await codebolt.projectStructure.createPackage({
    name: 'api-server',
    path: 'packages/api',
    type: 'backend',
    description: 'REST API server'
  });

  // Add an API route
  await codebolt.projectStructure.addRoute(pkg.package.id, {
    path: '/api/users',
    method: 'GET',
    description: 'List all users',
    handler: 'getUsersHandler'
  });

  // Add a dependency
  await codebolt.projectStructure.addDependency(pkg.package.id, {
    name: 'express',
    version: '^4.18.0',
    type: 'runtime'
  });
});
```

### Document Project Architecture

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get full project structure
  const meta = await codebolt.projectStructure.getMetadata();
  console.log(`Project: ${meta.metadata.name}`);
  console.log(`Packages: ${meta.metadata.packages.length}`);

  for (const pkg of meta.metadata.packages) {
    console.log(`- ${pkg.name} (${pkg.type}): ${pkg.path}`);
  }
});
```

## SDK methods

### getMetadata

Get complete project metadata.

```text
codebolt.projectStructure.getMetadata(workspacePath?: string): Promise<ProjectStructureMetadataResponse>
```

### updateMetadata

Update workspace metadata.

```text
codebolt.projectStructure.updateMetadata(updates: Record<string, any>, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### getPackages

Get all packages in the workspace.

```text
codebolt.projectStructure.getPackages(workspacePath?: string): Promise<ProjectStructurePackagesResponse>
```

### getPackage

Get a specific package by ID.

```text
codebolt.projectStructure.getPackage(packageId: string, workspacePath?: string): Promise<ProjectStructurePackageResponse>
```

### createPackage

Create a new package.

```text
codebolt.projectStructure.createPackage(data: CreatePackageData, workspacePath?: string): Promise<ProjectStructurePackageResponse>
```

### updatePackage

Update a package.

```text
codebolt.projectStructure.updatePackage(packageId: string, updates: UpdatePackageData, workspacePath?: string): Promise<ProjectStructurePackageResponse>
```

### deletePackage

Delete a package.

```text
codebolt.projectStructure.deletePackage(packageId: string, workspacePath?: string): Promise<ProjectStructureDeleteResponse>
```

### addRoute

Add an API route to a package.

```text
codebolt.projectStructure.addRoute(packageId: string, route: Omit<ApiRoute, "id">, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### updateRoute

Update an API route.

```text
codebolt.projectStructure.updateRoute(packageId: string, routeId: string, updates: Partial<ApiRoute>, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### deleteRoute

Delete an API route.

```text
codebolt.projectStructure.deleteRoute(packageId: string, routeId: string, workspacePath?: string): Promise<ProjectStructureDeleteResponse>
```

### addTable

Add a database table to a package.

```text
codebolt.projectStructure.addTable(packageId: string, table: Omit<DatabaseTable, "id">, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### updateTable

Update a database table.

```text
codebolt.projectStructure.updateTable(packageId: string, tableId: string, updates: Partial<DatabaseTable>, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### deleteTable

Delete a database table.

```text
codebolt.projectStructure.deleteTable(packageId: string, tableId: string, workspacePath?: string): Promise<ProjectStructureDeleteResponse>
```

### addDependency

Add a dependency to a package.

```text
codebolt.projectStructure.addDependency(packageId: string, dependency: Omit<Dependency, "id">, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### updateDependency

Update a dependency.

```text
codebolt.projectStructure.updateDependency(packageId: string, dependencyId: string, updates: Partial<Dependency>, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### deleteDependency

Delete a dependency.

```text
codebolt.projectStructure.deleteDependency(packageId: string, dependencyId: string, workspacePath?: string): Promise<ProjectStructureDeleteResponse>
```

### addCommand

Add a run command to a package.

```text
codebolt.projectStructure.addCommand(packageId: string, command: Omit<RunCommand, "id">, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### updateCommand

Update a run command.

```text
codebolt.projectStructure.updateCommand(packageId: string, commandId: string, updates: Partial<RunCommand>, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### deleteCommand

Delete a run command.

```text
codebolt.projectStructure.deleteCommand(packageId: string, commandId: string, workspacePath?: string): Promise<ProjectStructureDeleteResponse>
```

### addUiRoute

Add a UI route to a package.

```text
codebolt.projectStructure.addUiRoute(packageId: string, route: Omit<UiRoute, "id">, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### updateUiRoute

Update a UI route.

```text
codebolt.projectStructure.updateUiRoute(packageId: string, routeId: string, updates: Partial<UiRoute>, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### deleteUiRoute

Delete a UI route.

```text
codebolt.projectStructure.deleteUiRoute(packageId: string, routeId: string, workspacePath?: string): Promise<ProjectStructureDeleteResponse>
```

### addDeployment

Add a deployment config to a package.

```text
codebolt.projectStructure.addDeployment(packageId: string, config: Omit<DeploymentConfig, "id">, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### updateDeployment

Update a deployment config.

```text
codebolt.projectStructure.updateDeployment(packageId: string, configId: string, updates: Partial<DeploymentConfig>, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### deleteDeployment

Delete a deployment config.

```text
codebolt.projectStructure.deleteDeployment(packageId: string, configId: string, workspacePath?: string): Promise<ProjectStructureDeleteResponse>
```

### updateGit

Update git information.

```text
codebolt.projectStructure.updateGit(gitInfo: GitInfo, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### updateDesignGuidelines

Update design guidelines for a package.

```text
codebolt.projectStructure.updateDesignGuidelines(packageId: string, guidelines: DesignGuidelines, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### updateFrontendFramework

Update frontend framework for a package.

```text
codebolt.projectStructure.updateFrontendFramework(packageId: string, framework: FrameworkInfo, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```

### updateSection

Update a specific section of a package.

```text
codebolt.projectStructure.updateSection(packageId: string, section: string, sectionData: any, workspacePath?: string): Promise<ProjectStructureUpdateResponse>
```
