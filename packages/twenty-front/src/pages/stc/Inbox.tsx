import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { PageBody } from '@/ui/layout/page/components/PageBody';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import { PageHeader } from '@/ui/layout/page/components/PageHeader';
import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { AppPath } from 'twenty-shared/types';
import { getAppPath } from 'twenty-shared/utils';
import {
  Callout,
  H2Title,
  type IconComponent,
  IconChevronRight,
  IconFilter,
  IconInbox,
  IconMailOff,
  IconMail,
  IconSend,
  IconShield,
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
  to?: string;
  Icon: IconComponent;
};

export const Inbox = () => {
  const { findActiveObjectMetadataItemByNamePlural } =
    useFilteredObjectMetadataItems();

  const emailMessagesObjectMetadataItem =
    findActiveObjectMetadataItemByNamePlural('emailMessages');

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
      key: 'transport',
      label: t`Shared transport`,
      description: t`Inbound mail is handled by the shared STC backend transport. Outbound replies should also stay on the shared transport, not on personal connected accounts.`,
      Icon: IconSend,
    },
    {
      key: 'triage',
      label: t`Business triage`,
      description: t`Every incoming message should be classified into commercial, operational, newsletter, or junk before the inbox becomes a working queue.`,
      Icon: IconFilter,
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
                description={t`STC uses one shared mailbox. Message receive and send are backend-managed, while Twenty stays focused on triage, qualification, and business follow-up.`}
              />
              <Callout
                variant="info"
                title={t`Connected Accounts are not the STC path`}
                description={t`Do not configure Outlook, Google, or IMAP/SMTP accounts here for the STC mailbox. Planet receive is POP-based and sending is handled outside Twenty's native mailbox stack.`}
                Icon={IconShield}
              />
              <Card fullWidth rounded>
                {mailboxLinks.map((link, index) => (
                  <StyledLinkContainer key={link.key}>
                    {link.to ? (
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
                    ) : (
                      <CardContent divider={index < mailboxLinks.length - 1}>
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
                        </StyledRow>
                      </CardContent>
                    )}
                  </StyledLinkContainer>
                ))}
              </Card>
            </Section>
          </StyledSectionContainer>

          <StyledSectionContainer>
            <Section>
              <H2Title
                title={t`Visible Inbox`}
                description={t`The visible inbox should only contain business mail. Newsletters and junk stay out of the main queue and require explicit review.`}
              />
              <Info
                text={t`Target mail states: COMMERCIAL and OPERATIONAL are visible by default. NEWSLETTER and JUNK stay outside the working inbox.`}
              />
            </Section>
          </StyledSectionContainer>

          <StyledSectionContainer>
            <Section>
              <H2Title
                title={t`Next Step`}
                description={t`The next backend slice is POP ingestion into Email Messages with automatic mail-state classification, so the STC shared mailbox appears here without any user account setup.`}
              />
              <Card fullWidth rounded>
                <CardContent>
                  <StyledRow>
                    <StyledIconContainer>
                      <IconMailOff size={16} />
                    </StyledIconContainer>
                    <StyledTextContainer>
                      <StyledLabel>{t`Native mailbox setup disabled for STC`}</StyledLabel>
                      <StyledDescription>
                        {t`Planet POP receive and Brevo/backend send are the supported transport path. This page is now the shared mailbox hub, not a personal account setup flow.`}
                      </StyledDescription>
                    </StyledTextContainer>
                  </StyledRow>
                </CardContent>
              </Card>
            </Section>
          </StyledSectionContainer>
        </StyledPageContent>
      </PageBody>
    </PageContainer>
  );
};
