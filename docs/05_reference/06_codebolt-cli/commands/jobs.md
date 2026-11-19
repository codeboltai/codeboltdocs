---
title: "Job Gateway Commands"
---

Use `codebolt command job` against a running server. Pass `--help` to a subcommand for its full options and accepted values.

| Subcommand | Purpose | Required flags | Help |
| --- | --- | --- | --- |
| `add-dependency` | Adds a dependency between two jobs. The first job (job_id) will depend on the second job (depends_on_job_id). Dependencies can be of different types: 'blocks', 'related', 'parent-child', or 'discovered-from'. | `--job-id`, `--depends-on-job-id` | `codebolt command job add-dependency --help` |
| `bid-add` | Adds a bid from an agent to work on a job. Bidding allows agents to express interest in working on a job, with a reason and priority. Bids can be reviewed and accepted to assign the job to the winning bidder. | `--job-id`, `--agent-id`, `--reason`, `--priority` | `codebolt command job bid-add --help` |
| `create` | Creates a new job in a specified job group. Jobs are work items that can be tracked, assigned, and organized with dependencies, labels, and priorities. | `--group-id`, `--name`, `--type`, `--priority` | `codebolt command job create --help` |
| `delete` | Deletes a job by its ID. This action is permanent and cannot be undone. | `--job-id` | `codebolt command job delete --help` |
| `get` | Retrieves a job by its ID. Returns the full job details including name, description, status, priority, assignees, labels, dependencies, and other metadata. | `--job-id` | `codebolt command job get --help` |
| `get-blocked` | Gets jobs that are blocked by dependencies. Blocked jobs have one or more dependencies that have not yet been completed. Use this to understand work item bottlenecks and dependency chains. | None | `codebolt command job get-blocked --help` |
| `get-ready` | Gets jobs that are ready to be worked on. Ready jobs have no blocking dependencies - all their dependent jobs have been completed. Use this to find actionable work items. | None | `codebolt command job get-ready --help` |
| `group-create` | Creates a new job group. Job groups are containers for organizing related jobs. Each group has a unique shortname used in job IDs (e.g., jobs in group "COD2" have IDs like "COD2-1", "COD2-2", etc.). | None | `codebolt command job group-create --help` |
| `list` | Lists jobs with optional filters. Can filter by status, priority, assignee, labels, type, and more. Supports pagination and sorting. | None | `codebolt command job list --help` |
| `lock` | Acquires a lock on a job for an agent. Locking a job indicates that an agent is actively working on it and prevents other agents from making conflicting changes. The lock should be released when work is complete. | `--job-id`, `--agent-id` | `codebolt command job lock --help` |
| `remove-dependency` | Removes a dependency between two jobs. The dependency from the first job (job_id) on the second job (depends_on_job_id) will be removed, potentially unblocking the first job. | `--job-id`, `--depends-on-job-id` | `codebolt command job remove-dependency --help` |
| `unlock` | Releases a lock on a job. The agent releasing the lock must be the same agent that acquired it. Use this when work on a job is complete or paused. | `--job-id`, `--agent-id` | `codebolt command job unlock --help` |
| `update` | Updates an existing job with new values. Only the fields provided will be updated; other fields remain unchanged. | `--job-id` | `codebolt command job update --help` |
