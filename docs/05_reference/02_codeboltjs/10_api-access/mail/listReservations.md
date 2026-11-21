---
name: listReservations
description: Lists all active file reservations in the system.
cbbaseinfo:
  description: Lists all active file reservations in the system.
data:
  name: listReservations
  category: mail
  link: listReservations.md
---

# listReservations

```text
codebolt.mail.listReservations(params: IListReservationsParams): Promise<IListReservationsResponse>
```

Lists all active file reservations in the system.

## When to use it

Check which paths are reserved and who is responsible for them.

## Examples

### List All Reservations

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.listReservations({});

  console.log('Active file reservations:');
  if (result.reservations == null) throw new Error('The response is missing reservations.');
  result.reservations.forEach(reservation => {
    console.log(`- ${reservation.files.join(', ')}`);
    console.log(`  Reserved by: ${reservation.agentId}`);
    console.log(`  Expires: ${new Date(reservation.expiresAt).toLocaleString()}`);
  });
});
```

### Check Specific Agent's Reservations

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.listReservations({
    agentId: 'agent-001'
  });

  if (result.reservations == null) throw new Error('The response is missing reservations.');
  console.log(`Agent has ${result.reservations.length} active reservations`);
});
```
