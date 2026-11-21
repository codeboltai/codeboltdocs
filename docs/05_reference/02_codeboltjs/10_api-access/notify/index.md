# Notifications

Emit progress and lifecycle notifications across SDK modules.

Notification calls emit progress or lifecycle events. Use the corresponding SDK service for the operation itself.

## SDK methods

### agent.StartSubagentTaskRequestNotify

```text
codebolt.notify.agent.StartSubagentTaskRequestNotify(parentAgentId: string, subagentId: string, task: string, priority?: string, dependencies?: string[], toolUseId?: string): void
```

### agent.StartSubagentTaskResponseNotify

```text
codebolt.notify.agent.StartSubagentTaskResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### agent.SubagentTaskCompletedNotify

```text
codebolt.notify.agent.SubagentTaskCompletedNotify(parentAgentId: string, subagentId: string, taskId: string, result: any, status: string, toolUseId?: string): void
```

### browser.WebFetchRequestNotify

```text
codebolt.notify.browser.WebFetchRequestNotify(url: string, method?: string, headers?: Record<string, string>, body?: any, timeout?: number, toolUseId?: string): void
```

### browser.WebFetchResponseNotify

```text
codebolt.notify.browser.WebFetchResponseNotify(content: string | any, isError?: boolean, toolUseId?: string, data?: WebFetchResponseNotification["data"]): void
```

### browser.WebSearchRequestNotify

```text
codebolt.notify.browser.WebSearchRequestNotify(query: string, maxResults?: number, searchEngine?: string, filters?: any, toolUseId?: string): void
```

### browser.WebSearchResponseNotify

```text
codebolt.notify.browser.WebSearchResponseNotify(content: string | any, isError?: boolean, toolUseId?: string, data?: WebSearchResponseNotification["data"]): void
```

### chat.UserMessageRequestNotify

```text
codebolt.notify.chat.UserMessageRequestNotify(message: string, payload?: any, toolUseId?: string): void
```

### chat.AgentTextResponseNotify

```text
codebolt.notify.chat.AgentTextResponseNotify(content: string | any, isError?: boolean, toolUseId?: string, data?: AgentTextResponseNotification["data"]): void
```

### chat.AgentThinkingNotify

```text
codebolt.notify.chat.AgentThinkingNotify(content: string, toolUseId?: string, options?: { reasoning?: string; stateEvent?: string; }): void
```

### chat.GetChatHistoryRequestNotify

```text
codebolt.notify.chat.GetChatHistoryRequestNotify(data?: GetChatHistoryRequestNotification["data"], toolUseId?: string): void
```

### chat.GetChatHistoryResultNotify

```text
codebolt.notify.chat.GetChatHistoryResultNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### codeutils.GrepSearchRequestNotify

```text
codebolt.notify.codeutils.GrepSearchRequestNotify(pattern: string, filePath?: string, recursive?: boolean, ignoreCase?: boolean, maxResults?: number, toolUseId?: string): void
```

### codeutils.GrepSearchResponseNotify

```text
codebolt.notify.codeutils.GrepSearchResponseNotify(content: string | any, isError?: boolean, toolUseId?: string, data?: GrepSearchResponseNotification["data"]): void
```

### codeutils.GlobSearchRequestNotify

```text
codebolt.notify.codeutils.GlobSearchRequestNotify(pattern: string, basePath?: string, maxDepth?: number, includeDirectories?: boolean, toolUseId?: string): void
```

### codeutils.GlobSearchResponseNotify

```text
codebolt.notify.codeutils.GlobSearchResponseNotify(content: string | any, isError?: boolean, toolUseId?: string, data?: GlobSearchResponseNotification["data"]): void
```

### crawler.CrawlerSearchRequestNotify

```text
codebolt.notify.crawler.CrawlerSearchRequestNotify(url: string, searchQuery?: string, maxDepth?: number, maxPages?: number, includeSubdomains?: boolean, followRedirects?: boolean, toolUseId?: string): void
```

### crawler.CrawlerSearchResponseNotify

```text
codebolt.notify.crawler.CrawlerSearchResponseNotify(content: string | any, isError?: boolean, toolUseId?: string, data?: CrawlerSearchResponseNotification["data"]): void
```

### crawler.CrawlerStartRequestNotify

```text
codebolt.notify.crawler.CrawlerStartRequestNotify(startUrl: string, options?: any, toolUseId?: string): void
```

### crawler.CrawlerStartResponseNotify

```text
codebolt.notify.crawler.CrawlerStartResponseNotify(content: string | any, isError?: boolean, toolUseId?: string, data?: CrawlerStartResponseNotification["data"]): void
```

### dbmemory.AddMemoryRequestNotify

```text
codebolt.notify.dbmemory.AddMemoryRequestNotify(key: string, value: any, toolUseId?: string): void
```

### dbmemory.AddMemoryResultNotify

```text
codebolt.notify.dbmemory.AddMemoryResultNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### dbmemory.GetMemoryRequestNotify

```text
codebolt.notify.dbmemory.GetMemoryRequestNotify(key: string, toolUseId?: string): void
```

### dbmemory.GetMemoryResultNotify

```text
codebolt.notify.dbmemory.GetMemoryResultNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### fs.FileCreateRequestNotify

```text
codebolt.notify.fs.FileCreateRequestNotify(fileName: string, source: string, filePath: string, toolUseId?: string): void
```

### fs.FileCreateResponseNotify

```text
codebolt.notify.fs.FileCreateResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### fs.FolderCreateRequestNotify

```text
codebolt.notify.fs.FolderCreateRequestNotify(folderName: string, folderPath: string, toolUseId?: string): void
```

### fs.FolderCreateResponseNotify

```text
codebolt.notify.fs.FolderCreateResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### fs.FileReadRequestNotify

```text
codebolt.notify.fs.FileReadRequestNotify(filePath: string, startLine?: string, endLine?: string, toolUseId?: string): void
```

### fs.FileReadResponseNotify

```text
codebolt.notify.fs.FileReadResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### fs.FileEditRequestNotify

```text
codebolt.notify.fs.FileEditRequestNotify(fileName: string, filePath: string, newContent: string, toolUseId?: string): void
```

### fs.FileEditResponseNotify

```text
codebolt.notify.fs.FileEditResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### fs.FileDeleteRequestNotify

```text
codebolt.notify.fs.FileDeleteRequestNotify(fileName: string, filePath: string, toolUseId?: string): void
```

### fs.FileDeleteResponseNotify

```text
codebolt.notify.fs.FileDeleteResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### fs.FolderDeleteRequestNotify

```text
codebolt.notify.fs.FolderDeleteRequestNotify(folderName: string, folderPath: string, toolUseId?: string): void
```

### fs.FolderDeleteResponseNotify

```text
codebolt.notify.fs.FolderDeleteResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### fs.ListDirectoryRequestNotify

```text
codebolt.notify.fs.ListDirectoryRequestNotify(dirPath: string, toolUseId?: string): void
```

### fs.ListDirectoryResponseNotify

```text
codebolt.notify.fs.ListDirectoryResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### fs.WriteToFileRequestNotify

```text
codebolt.notify.fs.WriteToFileRequestNotify(filePath: string, text: string, toolUseId?: string): void
```

### fs.WriteToFileResponseNotify

```text
codebolt.notify.fs.WriteToFileResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### fs.AppendToFileRequestNotify

```text
codebolt.notify.fs.AppendToFileRequestNotify(filePath: string, text: string, toolUseId?: string): void
```

### fs.AppendToFileResponseNotify

```text
codebolt.notify.fs.AppendToFileResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### fs.CopyFileRequestNotify

```text
codebolt.notify.fs.CopyFileRequestNotify(sourceFile: string, destinationFile: string, toolUseId?: string): void
```

### fs.CopyFileResponseNotify

```text
codebolt.notify.fs.CopyFileResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### fs.MoveFileRequestNotify

```text
codebolt.notify.fs.MoveFileRequestNotify(sourceFile: string, destinationFile: string, toolUseId?: string): void
```

### fs.MoveFileResponseNotify

```text
codebolt.notify.fs.MoveFileResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### git.GitInitRequestNotify

```text
codebolt.notify.git.GitInitRequestNotify(path?: string, toolUseId?: string): void
```

### git.GitInitResponseNotify

```text
codebolt.notify.git.GitInitResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### git.GitPullRequestNotify

```text
codebolt.notify.git.GitPullRequestNotify(path?: string, toolUseId?: string): void
```

### git.GitPullResponseNotify

```text
codebolt.notify.git.GitPullResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### git.GitPushRequestNotify

```text
codebolt.notify.git.GitPushRequestNotify(path?: string, toolUseId?: string): void
```

### git.GitPushResponseNotify

```text
codebolt.notify.git.GitPushResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### git.GitStatusRequestNotify

```text
codebolt.notify.git.GitStatusRequestNotify(path?: string, toolUseId?: string): void
```

### git.GitStatusResponseNotify

```text
codebolt.notify.git.GitStatusResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### git.GitAddRequestNotify

```text
codebolt.notify.git.GitAddRequestNotify(path?: string, files?: string[], toolUseId?: string): void
```

### git.GitAddResponseNotify

```text
codebolt.notify.git.GitAddResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### git.GitCommitRequestNotify

```text
codebolt.notify.git.GitCommitRequestNotify(path?: string, message?: string, toolUseId?: string): void
```

### git.GitCommitResponseNotify

```text
codebolt.notify.git.GitCommitResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### git.GitCheckoutRequestNotify

```text
codebolt.notify.git.GitCheckoutRequestNotify(path?: string, branchName?: string, toolUseId?: string): void
```

### git.GitCheckoutResponseNotify

```text
codebolt.notify.git.GitCheckoutResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### git.GitBranchRequestNotify

```text
codebolt.notify.git.GitBranchRequestNotify(path?: string, branchName?: string, toolUseId?: string): void
```

### git.GitBranchResponseNotify

```text
codebolt.notify.git.GitBranchResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### git.GitLogsRequestNotify

```text
codebolt.notify.git.GitLogsRequestNotify(path?: string, toolUseId?: string): void
```

### git.GitLogsResponseNotify

```text
codebolt.notify.git.GitLogsResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### git.GitDiffRequestNotify

```text
codebolt.notify.git.GitDiffRequestNotify(path?: string, toolUseId?: string): void
```

### git.GitDiffResponseNotify

```text
codebolt.notify.git.GitDiffResponseNotify(content: string | GitDiffResult | GitDiffResponseContent, isError?: boolean, toolUseId?: string): void
```

### git.GitRemoteAddRequestNotify

```text
codebolt.notify.git.GitRemoteAddRequestNotify(remoteName: string, remoteUrl: string, path?: string, toolUseId?: string): void
```

### git.GitRemoteAddResponseNotify

```text
codebolt.notify.git.GitRemoteAddResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### git.GitCloneRequestNotify

```text
codebolt.notify.git.GitCloneRequestNotify(repoUrl: string, targetPath?: string, toolUseId?: string): void
```

### git.GitCloneResponseNotify

```text
codebolt.notify.git.GitCloneResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### history.summarizePreviousConversation

```text
codebolt.notify.history.summarizePreviousConversation(data?: SummarizePreviousConversationRequestNotification["data"], toolUseId?: string): void
```

### history.sendSummarizePreviousResult

```text
codebolt.notify.history.sendSummarizePreviousResult(content: string | any, isError?: boolean, toolUseId?: string): void
```

### history.summarizeCurrentMessage

```text
codebolt.notify.history.summarizeCurrentMessage(data: SummarizeCurentMessageRequestNotification["data"], toolUseId?: string): void
```

### history.sendSummarizeCurrentResult

```text
codebolt.notify.history.sendSummarizeCurrentResult(content: string | any, isError?: boolean, toolUseId?: string): void
```

### llm.sendInferenceRequest

```text
codebolt.notify.llm.sendInferenceRequest(data: LLMRequestNotification["data"], toolUseId?: string): void
```

### llm.sendInferenceResponse

```text
codebolt.notify.llm.sendInferenceResponse(content: string | any, isError?: boolean, toolUseId?: string): void
```

### llm.getTokenCount

```text
codebolt.notify.llm.getTokenCount(data: LLMGetTokenCountRequestNotification["data"], toolUseId?: string): void
```

### llm.sendTokenCountResponse

```text
codebolt.notify.llm.sendTokenCountResponse(content: string | any, isError?: boolean, toolUseId?: string, data?: LLMGetTokenCountResponseNotification["data"]): void
```

### mcp.GetEnabledMCPServersRequestNotify

```text
codebolt.notify.mcp.GetEnabledMCPServersRequestNotify(toolUseId?: string): void
```

### mcp.GetEnabledMCPServersResultNotify

```text
codebolt.notify.mcp.GetEnabledMCPServersResultNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### mcp.ListToolsFromMCPServersRequestNotify

```text
codebolt.notify.mcp.ListToolsFromMCPServersRequestNotify(toolboxes: string[], toolUseId?: string): void
```

### mcp.ListToolsFromMCPServersResultNotify

```text
codebolt.notify.mcp.ListToolsFromMCPServersResultNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### mcp.GetToolsRequestNotify

```text
codebolt.notify.mcp.GetToolsRequestNotify(tools: { toolbox: string; toolName: string; }[], toolUseId?: string): void
```

### mcp.GetToolsResultNotify

```text
codebolt.notify.mcp.GetToolsResultNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### mcp.ExecuteToolRequestNotify

```text
codebolt.notify.mcp.ExecuteToolRequestNotify(toolbox: string, toolName: string, params: any, toolUseId?: string): void
```

### mcp.ExecuteToolResultNotify

```text
codebolt.notify.mcp.ExecuteToolResultNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### search.SearchInitRequestNotify

```text
codebolt.notify.search.SearchInitRequestNotify(engine?: string, toolUseId?: string): void
```

### search.SearchInitResultNotify

```text
codebolt.notify.search.SearchInitResultNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### search.SearchRequestNotify

```text
codebolt.notify.search.SearchRequestNotify(query: string, toolUseId?: string): void
```

### search.SearchResultNotify

```text
codebolt.notify.search.SearchResultNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### search.GetFirstLinkRequestNotify

```text
codebolt.notify.search.GetFirstLinkRequestNotify(query: string, toolUseId?: string): void
```

### search.GetFirstLinkResultNotify

```text
codebolt.notify.search.GetFirstLinkResultNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### system.AgentInitNotify

```text
codebolt.notify.system.AgentInitNotify(onStopClicked?: boolean, toolUseId?: string): void
```

### system.AgentCompletionNotify

```text
codebolt.notify.system.AgentCompletionNotify(resultString: string, sessionId?: string, duration?: string, toolUseId?: string): void
```

### terminal.CommandExecutionRequestNotify

```text
codebolt.notify.terminal.CommandExecutionRequestNotify(command: string, returnEmptyStringOnSuccess?: boolean, executeInMain?: boolean, toolUseId?: string): void
```

### terminal.CommandExecutionResponseNotify

```text
codebolt.notify.terminal.CommandExecutionResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### todo.AddTodoRequestNotify

```text
codebolt.notify.todo.AddTodoRequestNotify(title?: string, agentId?: string, description?: string, phase?: string, category?: string, priority?: string, tags?: string[], toolUseId?: string): void
```

### todo.AddTodoResponseNotify

```text
codebolt.notify.todo.AddTodoResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### todo.GetTodoRequestNotify

```text
codebolt.notify.todo.GetTodoRequestNotify(filters?: any, toolUseId?: string): void
```

### todo.GetTodoResponseNotify

```text
codebolt.notify.todo.GetTodoResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```

### todo.EditTodoTaskRequestNotify

```text
codebolt.notify.todo.EditTodoTaskRequestNotify(taskId?: string, title?: string, description?: string, phase?: string, category?: string, priority?: string, tags?: string[], status?: string, toolUseId?: string): void
```

### todo.EditTodoTaskResponseNotify

```text
codebolt.notify.todo.EditTodoTaskResponseNotify(content: string | any, isError?: boolean, toolUseId?: string): void
```
