# STC Email Import

This is the first backend ingestion path for STC mail in Twenty.

It does not use Twenty native IMAP/SMTP accounts.
It imports normalized mail payloads into the custom `emailMessage` object.

## Why

- `smtp.planet.tn` is not reachable from the Twenty VPS
- STC currently receives mail through backend-owned POP transport
- Twenty should be the business UI, not the transport owner

## Prerequisites

1. Deploy the latest `stc/main`
2. Reseed metadata because `emailMessage` changed:

```sh
cd /app/packages/twenty-server
node dist/command/command.js workspace:seed:dev --reset
```

## Import Command

```sh
cd /app/packages/twenty-server
node dist/command/command.js workspace:stc:import-email-messages --file /tmp/stc-email-messages.json
```

Optional flags:

```sh
--workspace-id 20202020-1c25-4d02-bf25-6aeccf7ea419
--mailbox chaibi.tarak@planet.tn
```

Default workspace is the seeded Apple workspace.

## Accepted JSON Shape

The file can be:

- a JSON array
- or an object with a `messages` array

Example:

```json
{
  "messages": [
    {
      "headerMessageId": "<msg-001@planet.tn>",
      "subject": "Demande de devis pieces",
      "from": {
        "email": "client@example.com",
        "name": "Client Example"
      },
      "to": ["chaibi.tarak@planet.tn"],
      "cc": ["sales@example.com"],
      "bodyText": "Bonjour, merci de nous envoyer un devis pour les pieces.",
      "direction": "INBOUND",
      "mailbox": "chaibi.tarak@planet.tn",
      "receivedAt": "2026-03-13T09:15:00Z",
      "hasAttachments": true,
      "stcRefs": ["RFQ-2026-0313"],
      "isRead": false
    }
  ]
}
```

Supported aliases:

- `messageId` instead of `headerMessageId`
- `fromAddress` or `fromEmail`
- `toAddresses`
- `ccAddresses`
- `body` or `text` instead of `bodyText`
- `references` instead of `referencesHeader`

## Notes

- imports are idempotent through `headerMessageId`
- `headerMessageId` must be unique in metadata
- `bodyText` is now `RICH_TEXT_V2`, stored as markdown
- `mailState` defaults to `UNCLASSIFIED`
- `needsReview` defaults to `true`

## Current Scope

This command is the bridge for STC mailer integration.

Next step:

- make `stc-mailer` emit this JSON shape directly
- or call Twenty with the same normalized payload contract
