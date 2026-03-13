## STC Mail Transport

This workspace should not use Twenty's native connected-account flow for the
shared STC mailbox.

### Why

- `pop.planet.tn:110` is reachable from the STC servers.
- `smtp.planet.tn` was not reachable from the VPSes used for Twenty and the
  legacy mailer during verification on March 13, 2026.
- The legacy STC stack already uses backend-owned transport:
  - inbound receive through POP
  - outbound send through Brevo

### Product rule

- Twenty is the business UI.
- Mail transport stays backend-owned.
- The shared mailbox should feed `emailMessage` records.
- Native personal account setup should not be part of the STC inbox workflow.

### Expected mail states

- `COMMERCIAL`
- `OPERATIONAL`
- `NEWSLETTER`
- `JUNK`
- `UNCLASSIFIED`

`COMMERCIAL` and `OPERATIONAL` are the visible working inbox.
`NEWSLETTER` and `JUNK` stay outside the main queue.

### Current schema hooks

The STC email message schema now includes:

- `aiSummary`
- `aiCategory`
- `mailState`
- `needsReview`
- `stcRefs`

### Next backend slice

1. Pull POP messages from the shared mailbox.
2. Normalize them into `emailMessage` records.
3. Classify them into `mailState`.
4. Keep outbound replies on the backend transport.
