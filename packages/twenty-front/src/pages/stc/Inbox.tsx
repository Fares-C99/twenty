import { type ConnectedAccount } from '@/accounts/types/ConnectedAccount';
import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { useGenerateDepthRecordGqlFieldsFromObject } from '@/object-record/graphql/record-gql-fields/hooks/useGenerateDepthRecordGqlFieldsFromObject';
import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { SettingsAccountsConnectedAccountsListCard } from '@/settings/accounts/components/SettingsAccountsConnectedAccountsListCard';
import { SettingsAccountsListEmptyStateCard } from '@/settings/accounts/components/SettingsAccountsListEmptyStateCard';
import { SettingsAccountsMessageChannelsContainer } from '@/settings/accounts/components/SettingsAccountsMessageChannelsContainer';
import { PageBody } from '@/ui/layout/page/components/PageBody';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import { PageHeader } from '@/ui/layout/page/components/PageHeader';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import {
  AppPath,
  CoreObjectNameSingular,
  SettingsPath,
} from 'twenty-shared/types';
import { getAppPath, getSettingsPath } from 'twenty-shared/utils';
import {
  H2Title,
  type IconComponent,
  IconChevronRight,
  IconInbox,
  IconMail,
  IconMailCog,
  IconPlugConnected,
  Info,
} from 'twenty-ui/display';
import { Card, CardContent, Section } from 'twenty-ui/layout';
import { UndecoratedLink } from 'twenty-ui/navigation';
import { MOBILE_VIEWPORT, themeCssVariables } from 'twenty-ui/theme-constants';

const StyledPageContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[6]};
  overflow-y: auto;
  padding: ${themeCssVariables.spacing[5]};

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    padding: ${themeCssVariables.spacing[3]};
  }
`;

const StyledSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledLinkContainer = styled.div`
  > a {
    color: inherit;
    display: block;
  }
`;

const StyledRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
  min-height: ${themeCssVariables.spacing[8]};
`;

const StyledIconContainer = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  min-width: 0;
`;

const StyledLabel = styled.div`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledDescription = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
  line-height: 1.5;
`;

const StyledRightContainer = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
  flex-shrink: 0;
`;

type MailboxLink = {
  key: string;
  label: string;
  description: string;
  to: string;
  Icon: IconComponent;
};

export const Inbox = () => {
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const { findActiveObjectMetadataItemByNamePlural } =
    useFilteredObjectMetadataItems();

  const emailMessagesObjectMetadataItem =
    findActiveObjectMetadataItemByNamePlural('emailMessages');

  const { recordGqlFields } = useGenerateDepthRecordGqlFieldsFromObject({
    objectNameSingular: CoreObjectNameSingular.ConnectedAccount,
    depth: 1,
    shouldOnlyLoadRelationIdentifiers: false,
  });

  const { records: connectedAccounts, loading: isLoadingConnectedAccounts } =
    useFindManyRecords<ConnectedAccount>({
      objectNameSingular: CoreObjectNameSingular.ConnectedAccount,
      filter: {
        accountOwnerId: {
          eq: currentWorkspaceMember?.id,
        },
      },
      recordGqlFields,
      skip: !currentWorkspaceMember?.id,
    });

  const mailboxLinks: MailboxLink[] = [
    emailMessagesObjectMetadataItem
      ? {
          key: 'emailMessages',
          label: emailMessagesObjectMetadataItem.labelPlural || t`Email Messages`,
          description: t`Open the native record index for synced messages and use the action menu to summarize or analyze them.`,
          to: getAppPath(AppPath.RecordIndexPage, {
            objectNamePlural: emailMessagesObjectMetadataItem.namePlural,
          }),
          Icon: IconMail,
        }
      : null,
    {
      key: 'accountsEmails',
      label: t`Email channel settings`,
      description: t`Manage folders, visibility, auto-creation, and sync behavior for each connected mailbox.`,
      to: getSettingsPath(SettingsPath.AccountsEmails),
      Icon: IconMailCog,
    },
    {
      key: 'accounts',
      label: t`Connected accounts`,
      description: t`Connect Outlook, Google, or IMAP/SMTP accounts using Twenty's native provider flow.`,
      to: getSettingsPath(SettingsPath.Accounts),
          Icon: IconPlugConnected,
        },
  ].filter((link): link is MailboxLink => link !== null);

  return (
    <PageContainer>
      <PageHeader title={t`Inbox`} Icon={IconInbox} />
      <PageBody>
        <StyledPageContent>
          <StyledSectionContainer>
            <Section>
              <H2Title
                title={t`Mailbox`}
                description={t`Use Twenty's native account and message-channel flow: connect a provider, sync messages, then work from Email Messages.`}
              />
              <Card fullWidth rounded>
                {mailboxLinks.map((link, index) => (
                  <StyledLinkContainer key={link.key}>
                    <UndecoratedLink to={link.to} fullWidth>
                      <CardContent
                        divider={index < mailboxLinks.length - 1}
                        isClickable
                        hasHoverHighlight
                      >
                        <StyledRow>
                          <StyledIconContainer>
                            <link.Icon size={16} />
                          </StyledIconContainer>
                          <StyledTextContainer>
                            <StyledLabel>{link.label}</StyledLabel>
                            <StyledDescription>
                              {link.description}
                            </StyledDescription>
                          </StyledTextContainer>
                          <StyledRightContainer>
                            <IconChevronRight size={16} />
                          </StyledRightContainer>
                        </StyledRow>
                      </CardContent>
                    </UndecoratedLink>
                  </StyledLinkContainer>
                ))}
              </Card>
            </Section>
          </StyledSectionContainer>

          <StyledSectionContainer>
            <Section>
              <H2Title
                title={t`Accounts`}
                description={t`This is the provider layer. Connect the mailbox here first; the Inbox is only useful after an account is syncing.`}
              />
              {isLoadingConnectedAccounts ? (
                <Info text={t`Loading connected accounts...`} />
              ) : connectedAccounts.length > 0 ? (
                <SettingsAccountsConnectedAccountsListCard
                  accounts={connectedAccounts}
                />
              ) : (
                <SettingsAccountsListEmptyStateCard />
              )}
            </Section>
          </StyledSectionContainer>

          <StyledSectionContainer>
            <Section>
              <H2Title
                title={t`Channel Rules`}
                description={t`Adjust visibility, auto-creation, and folder import rules for the active email channel without leaving the inbox module.`}
              />
              <SettingsAccountsMessageChannelsContainer />
            </Section>
          </StyledSectionContainer>
        </StyledPageContent>
      </PageBody>
    </PageContainer>
  );
};
