# Swarm

Manage swarms, teams, roles, and agent membership.

## Create a swarm and add a team

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const created = await codebolt.swarm.createSwarm({
    name: 'Project maintenance',
    description: 'Coordinate review and maintenance work.',
  });
  const swarmId = created.data?.swarm.id;
  if (!created.success || !swarmId) {
    throw new Error(created.error?.message ?? 'Could not create the swarm.');
  }

  const team = await codebolt.swarm.createTeam(swarmId, { name: 'Documentation', createdBy: 'coordinator-agent-id' });
  console.log(team);
});
```

## When to use it

Create a swarm to organize related agents, then use teams and roles to describe how those agents work together.

## SDK methods

### createSwarm

[`createSwarm`](createSwarm.md) · Create a new swarm.

### listSwarms

[`listSwarms`](listSwarms.md) · List all available swarms.

### getSwarm

Get details of a specific swarm.

```text
codebolt.swarm.getSwarm(swarmId: string): Promise<GetSwarmResponse>
```

### getSwarmAgents

Get all agents in a swarm.

```text
codebolt.swarm.getSwarmAgents(swarmId: string): Promise<GetSwarmAgentsResponse>
```

### registerAgent

[`registerAgent`](registerAgent.md) · Register an agent to a swarm.

### unregisterAgent

Unregister an agent from a swarm.

```text
codebolt.swarm.unregisterAgent(swarmId: string, agentId: string): Promise<UnregisterAgentResponse>
```

### createTeam

[`createTeam`](createTeam.md) · Create a new team in a swarm.

### listTeams

List all teams in a swarm.

```text
codebolt.swarm.listTeams(swarmId: string): Promise<ListTeamsResponse>
```

### getTeam

Get details of a specific team.

```text
codebolt.swarm.getTeam(swarmId: string, teamId: string): Promise<GetTeamResponse>
```

### joinTeam

Add an agent to a team.

```text
codebolt.swarm.joinTeam(swarmId: string, teamId: string, agentId: string): Promise<JoinTeamResponse>
```

### leaveTeam

Remove an agent from a team.

```text
codebolt.swarm.leaveTeam(swarmId: string, teamId: string, agentId: string): Promise<LeaveTeamResponse>
```

### deleteTeam

Delete a team from a swarm.

```text
codebolt.swarm.deleteTeam(swarmId: string, teamId: string): Promise<DeleteTeamResponse>
```

### createRole

[`createRole`](createRole.md) · Create a new role in a swarm.

### listRoles

List all roles in a swarm.

```text
codebolt.swarm.listRoles(swarmId: string): Promise<ListRolesResponse>
```

### getRole

Get details of a specific role.

```text
codebolt.swarm.getRole(swarmId: string, roleId: string): Promise<GetRoleResponse>
```

### assignRole

[`assignRole`](assignRole.md) · Assign a role to an agent.

### unassignRole

Unassign a role from an agent.

```text
codebolt.swarm.unassignRole(swarmId: string, roleId: string, agentId: string): Promise<UnassignRoleResponse>
```

### getAgentsByRole

Get all agents with a specific role.

```text
codebolt.swarm.getAgentsByRole(swarmId: string, roleId: string): Promise<GetAgentsByRoleResponse>
```

### deleteRole

Delete a role from a swarm.

```text
codebolt.swarm.deleteRole(swarmId: string, roleId: string): Promise<DeleteRoleResponse>
```

### createVacancy

Create a new vacancy in a swarm.

```text
codebolt.swarm.createVacancy(swarmId: string, data: CreateVacancyRequest): Promise<CreateVacancyResponse>
```

### listVacancies

List all vacancies in a swarm.

```text
codebolt.swarm.listVacancies(swarmId: string): Promise<ListVacanciesResponse>
```

### applyForVacancy

Apply for a vacancy.

```text
codebolt.swarm.applyForVacancy(swarmId: string, vacancyId: string, agentId: string, message?: string): Promise<ApplyForVacancyResponse>
```

### closeVacancy

Close a vacancy.

```text
codebolt.swarm.closeVacancy(swarmId: string, vacancyId: string, reason: string): Promise<CloseVacancyResponse>
```

### updateAgentStatus

[`updateAgentStatus`](updateAgentStatus.md) · Update an agent's status.

### getSwarmStatusSummary

Get status summary for a swarm.

```text
codebolt.swarm.getSwarmStatusSummary(swarmId: string): Promise<GetStatusSummaryResponse>
```

### getDefaultJobGroup

Get the default job group ID associated with a swarm.

```text
codebolt.swarm.getDefaultJobGroup(swarmId: string): Promise<GetDefaultJobGroupResponse>
```

### getSwarmConfig

Get the configuration for a specific swarm.

```text
codebolt.swarm.getSwarmConfig(swarmId: string): Promise<GetSwarmConfigResponse>
```

### updateSwarmConfig

Start a swarm run: spawn the configured agents and hand them the initial prompt.

```text
codebolt.swarm.updateSwarmConfig(swarmId: string, config: SwarmConfig): Promise<GetSwarmConfigResponse>
```

### getExecutionStatus

```text
codebolt.swarm.getExecutionStatus(swarmId: string): Promise<SwarmExecutionStatusResponse>
```

### getCoordination

```text
codebolt.swarm.getCoordination(swarmId: string): Promise<SwarmResponse & { data?: any; }>
```

### addWorkers

```text
codebolt.swarm.addWorkers(swarmId: string, data: { runId: string; requestId: string; workers: Array<{ agentId: string; count: number; }>; reason: string; causedByEventId?: string; }): Promise<SwarmResponse & { data?: any; }>
```

### resumeSwarm

Resume interrupted workers in their existing threads with saved context.

```text
codebolt.swarm.resumeSwarm(swarmId: string): Promise<SwarmResponse & { data?: { status: string; resumedThreads: string[]; reusedThreads: string[]; queuedThreads?: string[]; message?: string; error?: string; }; }>
```

### stopSwarm

```text
codebolt.swarm.stopSwarm(swarmId: string): Promise<SwarmResponse>
```

### startSwarm

```text
codebolt.swarm.startSwarm(swarmId: string, request?: StartSwarmRequest): Promise<StartSwarmResponse>
```
