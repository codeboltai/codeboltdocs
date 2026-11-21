---
title: Swarm API
---

# Swarm API

Swarm API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addAgent`](./addAgent) | Add an agent to a swarm. |
| [`applyToVacancy`](./applyToVacancy) | Apply to a vacancy in a swarm. |
| [`approveSpawnRequest`](./approveSpawnRequest) | Approve a spawn request. |
| [`approveTerminationRequest`](./approveTerminationRequest) | Approve a termination request. |
| [`assignRole`](./assignRole) | Assign a role to an agent in a swarm. |
| [`closeVacancy`](./closeVacancy) | Close a vacancy in a swarm. |
| [`createRole`](./createRole) | Create a role in a swarm. |
| [`createSpawnRequest`](./createSpawnRequest) | Create a spawn request for a swarm. |
| [`createSwarm`](./createSwarm) | Create a new swarm. |
| [`createTeam`](./createTeam) | Create a team in a swarm. |
| [`createTerminationRequest`](./createTerminationRequest) | Create a termination request for a swarm. |
| [`createVacancy`](./createVacancy) | Create a vacancy in a swarm. |
| [`deleteRole`](./deleteRole) | Delete a role from a swarm. |
| [`deleteSwarm`](./deleteSwarm) | Delete a swarm by ID. |
| [`deleteTeam`](./deleteTeam) | Delete a team from a swarm. |
| [`getAgentsByStatus`](./getAgentsByStatus) | Get agents filtered by status in a swarm. |
| [`getAgentStatus`](./getAgentStatus) | Get the status of a specific agent in a swarm. |
| [`getConfig`](./getConfig) | Get the configuration of a swarm. |
| [`getExecutionStatus`](./getExecutionStatus) | Get the execution status of a swarm. |
| [`getLayout`](./getLayout) | Get the swarm layout. |
| [`getRole`](./getRole) | Get a role by ID within a swarm. |
| [`getRoleAgents`](./getRoleAgents) | Get agents assigned to a specific role. |
| [`getRoleStatistics`](./getRoleStatistics) | Get role statistics for a swarm. |
| [`getSpawnRegistry`](./getSpawnRegistry) | Get the spawn registry for a swarm. |
| [`getSwarm`](./getSwarm) | Get a swarm by ID. |
| [`getSwarmStatus`](./getSwarmStatus) | Get the overall status of a swarm. |
| [`getTeam`](./getTeam) | Get a team by ID within a swarm. |
| [`getTeamMembers`](./getTeamMembers) | Get the members of a team within a swarm. |
| [`getTeamStatistics`](./getTeamStatistics) | Get team statistics for a swarm. |
| [`getTerminationRegistry`](./getTerminationRegistry) | Get the termination registry for a swarm. |
| [`healthCheck`](./healthCheck) | Health check for swarm service. |
| [`joinTeam`](./joinTeam) | Join a team within a swarm. |
| [`leaveTeam`](./leaveTeam) | Leave a team within a swarm. |
| [`listAgents`](./listAgents) | List agents in a swarm. |
| [`listRoles`](./listRoles) | List roles in a swarm. |
| [`listSpawnRequests`](./listSpawnRequests) | List spawn requests for a swarm. |
| [`listSwarms`](./listSwarms) | List all swarms. |
| [`listTeams`](./listTeams) | List teams in a swarm. |
| [`listTerminationRequests`](./listTerminationRequests) | List termination requests for a swarm. |
| [`listVacancies`](./listVacancies) | List vacancies in a swarm. |
| [`rejectSpawnRequest`](./rejectSpawnRequest) | Reject a spawn request. |
| [`rejectTerminationRequest`](./rejectTerminationRequest) | Reject a termination request. |
| [`removeAgent`](./removeAgent) | Remove an agent from a swarm. |
| [`saveLayout`](./saveLayout) | Save or update the swarm layout. |
| [`startSwarm`](./startSwarm) | Start a swarm. |
| [`stopSwarm`](./stopSwarm) | Stop a swarm. |
| [`unassignRole`](./unassignRole) | Unassign a role from an agent in a swarm. |
| [`updateAgentStatus`](./updateAgentStatus) | Update the status of an agent in a swarm. |
| [`updateConfig`](./updateConfig) | Update the configuration of a swarm. |

## Methods

---

### `addAgent`

```typescript
client.swarm.addAgent(swarmId: string, data: AgentRegistration): Promise<SwarmAgentInfo>
```

Add an agent to a swarm.

Registers a new agent with the swarm, making it available for assignment
to teams and roles. Agents are the worker entities that perform tasks
within the swarm context.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `AgentRegistration` | Yes | The agent registration information |

**Returns:** `Promise<SwarmAgentInfo>` — A promise that resolves to the registered SwarmAgentInfo object

[Full reference →](./addAgent)

---

### `applyToVacancy`

```typescript
client.swarm.applyToVacancy(swarmId: string, vacancyId: string, data?: ApplyToVacancyRequest): Promise<void>
```

Apply to a vacancy in a swarm.

Submits an application from an agent for a specific vacancy. The agent
will be considered for the position and may be selected based on
qualifications and availability.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `vacancyId` | `string` | Yes | The unique identifier of the vacancy |
| `data` | `ApplyToVacancyRequest` | No | Optional application information |

**Returns:** `Promise<void>` — A promise that resolves when the application is submitted

[Full reference →](./applyToVacancy)

---

### `approveSpawnRequest`

```typescript
client.swarm.approveSpawnRequest(swarmId: string, requestId: string, data?: SpawnRequestActionBody): Promise<void>
```

Approve a spawn request.

Approves a pending spawn request, authorizing the creation of new
agent instances. The agents will be spawned according to the
request specifications.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `requestId` | `string` | Yes | The unique identifier of the spawn request |
| `data` | `SpawnRequestActionBody` | No | Optional approval information |

**Returns:** `Promise<void>` — A promise that resolves when the request is approved

[Full reference →](./approveSpawnRequest)

---

### `approveTerminationRequest`

```typescript
client.swarm.approveTerminationRequest(swarmId: string, requestId: string, data?: TerminationRequestActionBody): Promise<void>
```

Approve a termination request.

Approves a pending termination request, authorizing the removal
of specified agent instances. The agents will be terminated
gracefully.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `requestId` | `string` | Yes | The unique identifier of the termination request |
| `data` | `TerminationRequestActionBody` | No | Optional approval information |

**Returns:** `Promise<void>` — A promise that resolves when the request is approved

[Full reference →](./approveTerminationRequest)

---

### `assignRole`

```typescript
client.swarm.assignRole(swarmId: string, roleId: string, data: AssignRoleRequest): Promise<void>
```

Assign a role to an agent in a swarm.

Grants a role to an agent, giving them the associated permissions
and responsibilities. The agent can now perform actions authorized
by this role.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `roleId` | `string` | Yes | The unique identifier of the role to assign |
| `data` | `AssignRoleRequest` | Yes | The role assignment information |

**Returns:** `Promise<void>` — A promise that resolves when the role is assigned

[Full reference →](./assignRole)

---

### `closeVacancy`

```typescript
client.swarm.closeVacancy(swarmId: string, vacancyId: string, data?: CloseVacancyRequest): Promise<void>
```

Close a vacancy in a swarm.

Marks a vacancy as closed, preventing further applications. This is
used when a position has been filled or is no longer available.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `vacancyId` | `string` | Yes | The unique identifier of the vacancy to close |
| `data` | `CloseVacancyRequest` | No | Optional closure information |

**Returns:** `Promise<void>` — A promise that resolves when the vacancy is closed

[Full reference →](./closeVacancy)

---

### `createRole`

```typescript
client.swarm.createRole(swarmId: string, data: CreateRoleRequest): Promise<SwarmRole>
```

Create a role in a swarm.

Creates a new role that agents can be assigned to. Roles define
agent responsibilities, permissions, and capabilities within the
swarm context.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `CreateRoleRequest` | Yes | The role creation information |

**Returns:** `Promise<SwarmRole>` — A promise that resolves to the created SwarmRole object

[Full reference →](./createRole)

---

### `createSpawnRequest`

```typescript
client.swarm.createSpawnRequest(swarmId: string, data: CreateSpawnRequestBody): Promise<SpawnRequest>
```

Create a spawn request for a swarm.

Submits a request to spawn new agent instances within the swarm.
This is used to dynamically scale the swarm by adding more agents
to handle increased workload.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `CreateSpawnRequestBody` | Yes | The spawn request details |

**Returns:** `Promise<SpawnRequest>` — A promise that resolves to the created SpawnRequest object

[Full reference →](./createSpawnRequest)

---

### `createSwarm`

```typescript
client.swarm.createSwarm(data: CreateSwarmRequest): Promise<SwarmData>
```

Create a new swarm.

Initializes a new swarm with the specified configuration. Swarms
are the top-level organizational unit for multi-agent coordination,
containing teams, roles, and agents that work together on tasks.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateSwarmRequest` | Yes | The swarm configuration and metadata |

**Returns:** `Promise<SwarmData>` — A promise that resolves to the created SwarmData object

[Full reference →](./createSwarm)

---

### `createTeam`

```typescript
client.swarm.createTeam(swarmId: string, data: CreateTeamRequest): Promise<SwarmTeam>
```

Create a team in a swarm.

Creates a new team within the swarm, providing organizational structure
for grouping agents. Teams can be assigned specific goals and tasks,
with agents collaborating within the team context.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `CreateTeamRequest` | Yes | The team creation information |

**Returns:** `Promise<SwarmTeam>` — A promise that resolves to the created SwarmTeam object

[Full reference →](./createTeam)

---

### `createTerminationRequest`

```typescript
client.swarm.createTerminationRequest(swarmId: string, data: CreateTerminationRequestBody): Promise<unknown>
```

Create a termination request for a swarm.

Submits a request to terminate specific agent instances within
the swarm. This is used to reduce swarm size or remove specific
agents.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `CreateTerminationRequestBody` | Yes | The termination request details |

**Returns:** `Promise<unknown>` — A promise that resolves to the created termination request

[Full reference →](./createTerminationRequest)

---

### `createVacancy`

```typescript
client.swarm.createVacancy(swarmId: string, data: CreateVacancyRequest): Promise<SwarmVacancy>
```

Create a vacancy in a swarm.

Creates a new vacancy that agents can apply for. Vacancies represent
open positions within teams or roles that need to be filled by
qualified agents.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `CreateVacancyRequest` | Yes | The vacancy creation information |

**Returns:** `Promise<SwarmVacancy>` — A promise that resolves to the created SwarmVacancy object

[Full reference →](./createVacancy)

---

### `deleteRole`

```typescript
client.swarm.deleteRole(swarmId: string, roleId: string): Promise<void>
```

Delete a role from a swarm.

Permanently removes a role and unassigns all agents from it.
Agents will lose the permissions and responsibilities associated
with the role.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `roleId` | `string` | Yes | The unique identifier of the role to delete |

**Returns:** `Promise<void>` — A promise that resolves when the role is deleted

[Full reference →](./deleteRole)

---

### `deleteSwarm`

```typescript
client.swarm.deleteSwarm(swarmId: string): Promise<void>
```

Delete a swarm by ID.

Permanently removes a swarm and all its associated resources including
teams, roles, agents, and configurations. This action cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm to delete |

**Returns:** `Promise<void>` — A promise that resolves when the swarm is deleted

[Full reference →](./deleteSwarm)

---

### `deleteTeam`

```typescript
client.swarm.deleteTeam(swarmId: string, teamId: string): Promise<void>
```

Delete a team from a swarm.

Permanently removes a team and all its associated memberships.
Agents will be unassigned from the team but remain in the swarm.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `teamId` | `string` | Yes | The unique identifier of the team to delete |

**Returns:** `Promise<void>` — A promise that resolves when the team is deleted

[Full reference →](./deleteTeam)

---

### `getAgentsByStatus`

```typescript
client.swarm.getAgentsByStatus(swarmId: string, status: string): Promise<SwarmAgentInfo[]>
```

Get agents filtered by status in a swarm.

Retrieves all agents in a swarm that match a specific status, such as
all available agents or all agents in error state. This is useful for
finding agents ready for task assignment.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `status` | `string` | Yes | The status to filter by (available, busy, offline, etc.) |

**Returns:** `Promise<SwarmAgentInfo[]>` — A promise that resolves to an array of matching SwarmAgentInfo objects

[Full reference →](./getAgentsByStatus)

---

### `getAgentStatus`

```typescript
client.swarm.getAgentStatus(swarmId: string, agentId: string): Promise<SwarmAgentInfo>
```

Get the status of a specific agent in a swarm.

Retrieves current status information for an agent including its
state, last activity timestamp, and any status messages. Use this
for monitoring agent availability and health.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `agentId` | `string` | Yes | The unique identifier of the agent |

**Returns:** `Promise<SwarmAgentInfo>` — A promise that resolves to the SwarmAgentInfo object with status details

[Full reference →](./getAgentStatus)

---

### `getConfig`

```typescript
client.swarm.getConfig(swarmId: string): Promise<SwarmConfig>
```

Get the configuration of a swarm.

Retrieves the current configuration settings for a swarm, including
operational parameters, limits, and behavioral settings. Use this
to view swarm settings or for configuration management.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

**Returns:** `Promise<SwarmConfig>` — A promise that resolves to the SwarmConfig object

[Full reference →](./getConfig)

---

### `getExecutionStatus`

```typescript
client.swarm.getExecutionStatus(swarmId: string): Promise<SwarmStatusUpdate>
```

Get the execution status of a swarm.

Retrieves real-time information about swarm execution including
current tasks, agent activity, progress metrics, and any errors
or warnings encountered.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

**Returns:** `Promise<SwarmStatusUpdate>` — A promise that resolves to the SwarmStatusUpdate object with execution details

[Full reference →](./getExecutionStatus)

---

### `getLayout`

```typescript
client.swarm.getLayout(): Promise<SwarmLayout>
```

Get the swarm layout.

Retrieves the current layout configuration for swarms in the system.
The layout defines how swarms, teams, and agents are organized and
displayed in user interfaces.

_No parameters._

**Returns:** `Promise<SwarmLayout>` — A promise that resolves to the SwarmLayout object

[Full reference →](./getLayout)

---

### `getRole`

```typescript
client.swarm.getRole(swarmId: string, roleId: string): Promise<SwarmRole>
```

Get a role by ID within a swarm.

Retrieves detailed information about a specific role including its
permissions and assigned agents. Use this for displaying role details
or managing role assignments.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `roleId` | `string` | Yes | The unique identifier of the role |

**Returns:** `Promise<SwarmRole>` — A promise that resolves to the SwarmRole object

[Full reference →](./getRole)

---

### `getRoleAgents`

```typescript
client.swarm.getRoleAgents(swarmId: string, roleId: string): Promise<SwarmAgentInfo[]>
```

Get agents assigned to a specific role.

Retrieves all agents that currently have the specified role assigned
to them. Use this to view role membership or manage role assignments.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `roleId` | `string` | Yes | The unique identifier of the role |

**Returns:** `Promise<SwarmAgentInfo[]>` — A promise that resolves to an array of SwarmAgentInfo objects with the role

[Full reference →](./getRoleAgents)

---

### `getRoleStatistics`

```typescript
client.swarm.getRoleStatistics(swarmId: string): Promise<SwarmRoleStatistics[]>
```

Get role statistics for a swarm.

Retrieves statistical information about all roles in a swarm,
including assignment counts, utilization rates, and activity metrics.
Use this for monitoring role distribution and workload balance.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

**Returns:** `Promise<SwarmRoleStatistics[]>` — A promise that resolves to an array of SwarmRoleStatistics objects

[Full reference →](./getRoleStatistics)

---

### `getSpawnRegistry`

```typescript
client.swarm.getSpawnRegistry(swarmId: string): Promise<unknown>
```

Get the spawn registry for a swarm.

Retrieves the spawn registry containing information about all
agents that have been spawned for the swarm, including their
configuration and lifecycle status.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

**Returns:** `Promise<unknown>` — A promise that resolves to the spawn registry data

[Full reference →](./getSpawnRegistry)

---

### `getSwarm`

```typescript
client.swarm.getSwarm(swarmId: string): Promise<SwarmData>
```

Get a swarm by ID.

Retrieves detailed information about a specific swarm including
its configuration, teams, roles, and agents. Use this for displaying
swarm details or managing swarm state.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

**Returns:** `Promise<SwarmData>` — A promise that resolves to the SwarmData object

[Full reference →](./getSwarm)

---

### `getSwarmStatus`

```typescript
client.swarm.getSwarmStatus(swarmId: string): Promise<SwarmStatusUpdate>
```

Get the overall status of a swarm.

Retrieves comprehensive status information about a swarm including
its operational state, agent availability, team health, and overall
readiness to execute tasks.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

**Returns:** `Promise<SwarmStatusUpdate>` — A promise that resolves to the SwarmStatusUpdate object

[Full reference →](./getSwarmStatus)

---

### `getTeam`

```typescript
client.swarm.getTeam(swarmId: string, teamId: string): Promise<SwarmTeam>
```

Get a team by ID within a swarm.

Retrieves detailed information about a specific team including its
members, roles, and configuration. Use this for displaying team
details or managing team state.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `teamId` | `string` | Yes | The unique identifier of the team |

**Returns:** `Promise<SwarmTeam>` — A promise that resolves to the SwarmTeam object

[Full reference →](./getTeam)

---

### `getTeamMembers`

```typescript
client.swarm.getTeamMembers(swarmId: string, teamId: string): Promise<SwarmAgentInfo[]>
```

Get the members of a team within a swarm.

Retrieves all agents that are currently members of the specified team.
Use this to view team composition or manage team membership.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `teamId` | `string` | Yes | The unique identifier of the team |

**Returns:** `Promise<SwarmAgentInfo[]>` — A promise that resolves to an array of SwarmAgentInfo objects representing team members

[Full reference →](./getTeamMembers)

---

### `getTeamStatistics`

```typescript
client.swarm.getTeamStatistics(swarmId: string): Promise<SwarmTeamStatistics[]>
```

Get team statistics for a swarm.

Retrieves statistical information about all teams in a swarm,
including member counts, activity levels, and performance metrics.
Use this for monitoring team health and utilization.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

**Returns:** `Promise<SwarmTeamStatistics[]>` — A promise that resolves to an array of SwarmTeamStatistics objects

[Full reference →](./getTeamStatistics)

---

### `getTerminationRegistry`

```typescript
client.swarm.getTerminationRegistry(swarmId: string): Promise<unknown>
```

Get the termination registry for a swarm.

Retrieves the termination registry containing information about
all agents that have been terminated from the swarm, including
their lifecycle history and termination reasons.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

**Returns:** `Promise<unknown>` — A promise that resolves to the termination registry data

[Full reference →](./getTerminationRegistry)

---

### `healthCheck`

```typescript
client.swarm.healthCheck(): Promise<object>
```

Health check for swarm service.

Returns service status, useful for monitoring and health dashboards.

_No parameters._

**Returns:** `Promise<object>` — A promise that resolves to service status

[Full reference →](./healthCheck)

---

### `joinTeam`

```typescript
client.swarm.joinTeam(swarmId: string, teamId: string, data?: JoinTeamRequest): Promise<void>
```

Join a team within a swarm.

Adds an agent to a team as a member. The agent will be associated
with the team and can participate in team-specific tasks and
activities.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `teamId` | `string` | Yes | The unique identifier of the team to join |
| `data` | `JoinTeamRequest` | No | Optional join request information |

**Returns:** `Promise<void>` — A promise that resolves when the agent has joined the team

[Full reference →](./joinTeam)

---

### `leaveTeam`

```typescript
client.swarm.leaveTeam(swarmId: string, teamId: string, data?: LeaveTeamRequest): Promise<void>
```

Leave a team within a swarm.

Removes an agent from a team, ending their membership. The agent
will no longer participate in team activities but remains in the
swarm.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `teamId` | `string` | Yes | The unique identifier of the team to leave |
| `data` | `LeaveTeamRequest` | No | Optional leave request information |

**Returns:** `Promise<void>` — A promise that resolves when the agent has left the team

[Full reference →](./leaveTeam)

---

### `listAgents`

```typescript
client.swarm.listAgents(swarmId: string, params?: Record<string, unknown>): Promise<SwarmAgentInfo[]>
```

List agents in a swarm.

Retrieves all agents registered with a specific swarm, optionally
filtered by query parameters. Use this to view available agents
or populate agent selection interfaces.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering agents |

**Returns:** `Promise<SwarmAgentInfo[]>` — A promise that resolves to an array of SwarmAgentInfo objects

[Full reference →](./listAgents)

---

### `listRoles`

```typescript
client.swarm.listRoles(swarmId: string, params?: Record<string, unknown>): Promise<SwarmRole[]>
```

List roles in a swarm.

Retrieves all roles defined in a swarm, optionally filtered by query
parameters. Use this to view available roles or populate role
selection interfaces.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering roles |

**Returns:** `Promise<SwarmRole[]>` — A promise that resolves to an array of SwarmRole objects

[Full reference →](./listRoles)

---

### `listSpawnRequests`

```typescript
client.swarm.listSpawnRequests(swarmId: string, params?: Record<string, unknown>): Promise<SpawnRequest[]>
```

List spawn requests for a swarm.

Retrieves all spawn requests associated with a swarm, including
pending, approved, and completed requests. Use this to track
spawn request status and history.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering requests |

**Returns:** `Promise<SpawnRequest[]>` — A promise that resolves to an array of SpawnRequest objects

[Full reference →](./listSpawnRequests)

---

### `listSwarms`

```typescript
client.swarm.listSwarms(params?: Record<string, unknown>): Promise<SwarmSummary[]>
```

List all swarms.

Retrieves all swarms in the system, optionally filtered by query
parameters. Use this to discover available swarms or populate
swarm selection interfaces.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering swarms |

**Returns:** `Promise<SwarmSummary[]>` — A promise that resolves to an array of SwarmSummary objects

[Full reference →](./listSwarms)

---

### `listTeams`

```typescript
client.swarm.listTeams(swarmId: string, params?: Record<string, unknown>): Promise<SwarmTeam[]>
```

List teams in a swarm.

Retrieves all teams within a swarm, optionally filtered by query
parameters. Use this to view team structure or populate team
selection interfaces.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering teams |

**Returns:** `Promise<SwarmTeam[]>` — A promise that resolves to an array of SwarmTeam objects

[Full reference →](./listTeams)

---

### `listTerminationRequests`

```typescript
client.swarm.listTerminationRequests(swarmId: string, params?: Record<string, unknown>): Promise<unknown[]>
```

List termination requests for a swarm.

Retrieves all termination requests associated with a swarm, including
pending, approved, and completed requests. Use this to track
termination request status and history.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering requests |

**Returns:** `Promise<unknown[]>` — A promise that resolves to an array of termination requests

[Full reference →](./listTerminationRequests)

---

### `listVacancies`

```typescript
client.swarm.listVacancies(swarmId: string, params?: Record<string, unknown>): Promise<SwarmVacancy[]>
```

List vacancies in a swarm.

Retrieves all open vacancies in a swarm, optionally filtered by query
parameters. Use this to find available positions for agents to apply.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering vacancies |

**Returns:** `Promise<SwarmVacancy[]>` — A promise that resolves to an array of SwarmVacancy objects

[Full reference →](./listVacancies)

---

### `rejectSpawnRequest`

```typescript
client.swarm.rejectSpawnRequest(swarmId: string, requestId: string, data?: SpawnRequestActionBody): Promise<void>
```

Reject a spawn request.

Rejects a pending spawn request, preventing the creation of new
agent instances. The request will be marked as rejected and
no agents will be spawned.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `requestId` | `string` | Yes | The unique identifier of the spawn request |
| `data` | `SpawnRequestActionBody` | No | Optional rejection information |

**Returns:** `Promise<void>` — A promise that resolves when the request is rejected

[Full reference →](./rejectSpawnRequest)

---

### `rejectTerminationRequest`

```typescript
client.swarm.rejectTerminationRequest(swarmId: string, requestId: string, data?: TerminationRequestActionBody): Promise<void>
```

Reject a termination request.

Rejects a pending termination request, preventing the removal of
agent instances. The agents will continue operating in the swarm.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `requestId` | `string` | Yes | The unique identifier of the termination request |
| `data` | `TerminationRequestActionBody` | No | Optional rejection information |

**Returns:** `Promise<void>` — A promise that resolves when the request is rejected

[Full reference →](./rejectTerminationRequest)

---

### `removeAgent`

```typescript
client.swarm.removeAgent(swarmId: string, agentId: string): Promise<void>
```

Remove an agent from a swarm.

Unregisters an agent from the swarm, removing it from all teams
and roles. The agent will no longer participate in swarm activities.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `agentId` | `string` | Yes | The unique identifier of the agent to remove |

**Returns:** `Promise<void>` — A promise that resolves when the agent is removed

[Full reference →](./removeAgent)

---

### `saveLayout`

```typescript
client.swarm.saveLayout(data: SaveLayoutRequest): Promise<void>
```

Save or update the swarm layout.

Persists a new layout configuration for swarms. The layout defines
how swarms, teams, and agents are organized and displayed. Use
this to save custom arrangements or update the structure.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SaveLayoutRequest` | Yes | The layout configuration to save |

**Returns:** `Promise<void>` — A promise that resolves when the layout is saved

[Full reference →](./saveLayout)

---

### `startSwarm`

```typescript
client.swarm.startSwarm(swarmId: string, data?: StartSwarmRequest): Promise<void>
```

Start a swarm.

Activates a swarm, enabling it to begin processing tasks and
coordinating agent activities. The swarm will start executing
its assigned workflow according to its configuration.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `StartSwarmRequest` | No | Optional start parameters |

**Returns:** `Promise<void>` — A promise that resolves when the swarm has started

[Full reference →](./startSwarm)

---

### `stopSwarm`

```typescript
client.swarm.stopSwarm(swarmId: string, data?: Record<string, unknown>): Promise<void>
```

Stop a swarm.

Deactivates a swarm, halting all in-progress tasks and agent
activities. The swarm will gracefully shut down and return to
an idle state.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `Record<string, unknown>` | No | Optional stop parameters |

**Returns:** `Promise<void>` — A promise that resolves when the swarm has stopped

[Full reference →](./stopSwarm)

---

### `unassignRole`

```typescript
client.swarm.unassignRole(swarmId: string, roleId: string, data: UnassignRoleRequest): Promise<void>
```

Unassign a role from an agent in a swarm.

Removes a role from an agent, revoking the associated permissions
and responsibilities. The agent will no longer be able to perform
actions authorized by this role.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `roleId` | `string` | Yes | The unique identifier of the role to unassign |
| `data` | `UnassignRoleRequest` | Yes | The role unassignment information |

**Returns:** `Promise<void>` — A promise that resolves when the role is unassigned

[Full reference →](./unassignRole)

---

### `updateAgentStatus`

```typescript
client.swarm.updateAgentStatus(swarmId: string, agentId: string, data: AgentStatusUpdateRequest): Promise<void>
```

Update the status of an agent in a swarm.

Changes the operational status of an agent, such as marking it as
available, busy, offline, or in error. Status updates affect agent
assignment and task distribution.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `data` | `AgentStatusUpdateRequest` | Yes | The status update information |

**Returns:** `Promise<void>` — A promise that resolves when the status is updated

[Full reference →](./updateAgentStatus)

---

### `updateConfig`

```typescript
client.swarm.updateConfig(swarmId: string, data: UpdateSwarmConfigRequest): Promise<void>
```

Update the configuration of a swarm.

Modifies the configuration settings for a swarm. Changes take effect
immediately and affect all subsequent swarm operations. Use this
to adjust swarm behavior and operational parameters.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `UpdateSwarmConfigRequest` | Yes | The configuration updates |

**Returns:** `Promise<void>` — A promise that resolves when the configuration is updated

[Full reference →](./updateConfig)

