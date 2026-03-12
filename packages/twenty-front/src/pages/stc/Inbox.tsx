import { t } from '@lingui/core/macro';
import { Navigate } from 'react-router-dom';
import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { AppPath } from 'twenty-shared/types';
import { getAppPath } from 'twenty-shared/utils';
import {
  IconInbox,
  IconMail,
  IconMailCog,
  IconMailX,
  IconPaperclip,
} from 'twenty-ui/display';

import { StcModulePage } from './components/StcModulePage';

export const Inbox = () => {
  const { findActiveObjectMetadataItemByNamePlural } =
    useFilteredObjectMetadataItems();

  const emailMessagesObjectMetadataItem =
    findActiveObjectMetadataItemByNamePlural('emailMessages');

  if (emailMessagesObjectMetadataItem) {
    return (
      <Navigate
        replace
        to={getAppPath(AppPath.RecordIndexPage, {
          objectNamePlural: emailMessagesObjectMetadataItem.namePlural,
        })}
      />
    );
  }

  return (
    <StcModulePage
      title={t`Inbox`}
      emptyStateText={t`STC inbox objects are not available in this workspace yet.`}
      Icon={IconInbox}
      sections={[
        {
          title: t`Messages`,
          description: t`Work from individual emails first, then branch into documents and downstream records when needed.`,
          links: [
            {
              objectNamePlural: 'emailMessages',
              fallbackLabel: t`Email Messages`,
              description: t`Review inbound and outbound messages in the native record view.`,
              Icon: IconMail,
            },
            {
              objectNamePlural: 'stcAttachments',
              fallbackLabel: t`Attachments`,
              description: t`Browse files received or sent with each email.`,
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
