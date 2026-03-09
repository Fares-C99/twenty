import { t } from '@lingui/core/macro';
import {
  IconInbox,
  IconMail,
  IconMailCog,
  IconMailX,
  IconMessage,
  IconPaperclip,
} from 'twenty-ui/display';

import { StcModulePage } from './components/StcModulePage';

export const Inbox = () => {
  return (
    <StcModulePage
      title={t`Inbox`}
      emptyStateText={t`STC inbox objects are not available in this workspace yet.`}
      Icon={IconInbox}
      sections={[
        {
          title: t`Communications`,
          description: t`Review message flows and related records from the seeded STC workspace objects.`,
          links: [
            {
              objectNamePlural: 'conversations',
              fallbackLabel: t`Conversations`,
              description: t`Track conversation threads across the workspace.`,
              Icon: IconMessage,
            },
            {
              objectNamePlural: 'emailMessages',
              fallbackLabel: t`Email Messages`,
              description: t`Inspect imported or generated email messages.`,
              Icon: IconMail,
            },
            {
              objectNamePlural: 'stcAttachments',
              fallbackLabel: t`Attachments`,
              description: t`Browse communication files and linked artifacts.`,
              Icon: IconPaperclip,
            },
          ],
        },
        {
          title: t`Deliverability`,
          description: t`Keep sender settings and unsubscribe controls close to the communication flow.`,
          links: [
            {
              objectNamePlural: 'senderPolicies',
              fallbackLabel: t`Sender Policies`,
              description: t`Manage outbound sender policy definitions.`,
              Icon: IconMailCog,
            },
            {
              objectNamePlural: 'unsubscribeAttempts',
              fallbackLabel: t`Unsubscribe Attempts`,
              description: t`Review unsubscribe requests and delivery safeguards.`,
              Icon: IconMailX,
            },
          ],
        },
      ]}
    />
  );
};
