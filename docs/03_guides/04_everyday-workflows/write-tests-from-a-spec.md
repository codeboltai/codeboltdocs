---
sidebar_position: 3
title: Write Tests from a Spec
description: "- The /api/users endpoint accepts GET requests"
---

# Write Tests from a Spec

Use an agent to turn a written specification (prose, bullet points, JIRA ticket) into a working test suite.

**Use case:** you have a feature spec and no tests yet, or you want to pin behaviour before refactoring.

## The pattern

1. **Give the agent the spec.**
2. **Give it the production code** to test against.
3. **Let it generate tests.**
4. **Run them — they should mostly pass** (the feature exists).
5. **Any failing tests are bugs** in either the test or the production code. Decide which.

## Step 1 — prepare the spec

The spec should be concrete. Vague specs produce vague tests.

Good spec excerpt:

> - The /api/users endpoint accepts GET requests
> - Returns 200 with a paginated list of users when authenticated
> - Returns 401 when unauthenticated
> - Returns 403 when the user lacks the `read:users` scope
> - Pagination is via `?page=N&per_page=M` (defaults 1 and 20)
> - Maximum `per_page` is 100; requests for more return 400

Bad spec excerpt:

> The /api/users endpoint should work properly with pagination and auth.

Rewrite vague specs before feeding them to the agent, or reject the agent's test output as underspecified.

## Step 2 — the agent call

Open a chat with a test-generating agent (the built-in `tester` or a custom one):

```
I want tests for the /api/users endpoint. Here's the spec:

[paste spec]

The implementation is in src/api/users.ts. Write a full test suite in tests/api/users.test.ts. Use the existing testing framework in this project. Cover every case in the spec. Include both happy-path and error-path tests.
```

The agent should:
1. Read `src/api/users.ts` to understand the implementation.
2. Look at an existing test file to match the project's testing style.
3. Generate `tests/api/users.test.ts`.

## Step 3 — review the generated tests

Before running them, skim the test file:

- **Are all spec cases covered?** One test per spec bullet at minimum.
- **Do the assertions make sense?** `expect(response.status).toBe(200)` is meaningful; `expect(response).toBeDefined()` is lazy.
- **Are edge cases included?** Empty list, max page size, invalid input.
- **Is the test setup right?** Correct mocks, fixtures, database state.

Missing coverage → tell the agent: "also add a test for X case".

## Step 4 — run them

```bash
npm test tests/api/users.test.ts
```

Expected outcomes:

- **All passing** → the feature works as spec'd; tests pin the current behaviour.
- **Some failing** → either the test is wrong or the production code is wrong. Triage each.

## Step 5 — triage failures

For each failing test:

```
The test "returns 400 for per_page > 100" is failing. Debug it: check whether the test is wrong or the production code is.
```

The agent investigates, reports. If the production code is the bug, fix it (with the test as the regression guard). If the test is wrong, fix the test.

## Common pitfalls

- **Tests that always pass.** Easy trap for LLMs — they write tests like `expect(result).toBeTruthy()` that pass for any non-null value. Review assertions carefully.
- **Tests that don't test the spec.** LLM tests what the code does, not what the spec says. If they diverge, you need to decide which is correct.
- **Brittle tests.** Tests coupled to implementation details break on every refactor. Prefer testing behaviour through public interfaces.
- **Overmocking.** Heavily mocked tests don't test anything real. Use real data / test databases where feasible.

## For pure TDD

To use this pattern for TDD (write tests first, implement after):

1. Give the agent the spec only (no implementation).
2. Tell it "write tests that WOULD pass if the implementation were correct".
3. Run the tests — they should all fail.
4. Implement the production code.
5. Re-run the tests — they should pass.

This reverses the order but uses the same pattern. Works well for features with a clear spec.

## See also

- [Code review with an agent](./code-review-with-an-agent.md)
- [Running agents](../../02_using-codebolt/04_agents/03_running-agents.md)
- [Built-in agents](../../02_using-codebolt/04_agents/02_built-in-agents.md)
