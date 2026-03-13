import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { useGenerateDepthRecordGqlFieldsFromObject } from '@/object-record/graphql/record-gql-fields/hooks/useGenerateDepthRecordGqlFieldsFromObject';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { useOpenRecordInSidePanel } from '@/side-panel/hooks/useOpenRecordInSidePanel';
import { PageBody } from '@/ui/layout/page/components/PageBody';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import { PageHeader } from '@/ui/layout/page/components/PageHeader';
import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { useState } from 'react';
import { AppPath } from 'twenty-shared/types';
import { getAppPath } from 'twenty-shared/utils';
import {
  Avatar,
  Callout,
  H2Title,
  IconAlertCircle,
  IconArrowUpRight,
  IconChevronRight,
  IconInbox,
  IconMail,
  IconPaperclip,
  IconSparkles,
  OverflowingTextWithTooltip,
} from 'twenty-ui/display';
import {
  AnimatedPlaceholder,
  AnimatedPlaceholderEmptyContainer,
  AnimatedPlaceholderEmptySubTitle,
  AnimatedPlaceholderEmptyTextContainer,
  AnimatedPlaceholderEmptyTitle,
  Card,
  CardContent,
  EMPTY_PLACEHOLDER_TRANSITION_PROPS,
  Section,
} from 'twenty-ui/layout';
import { UndecoratedLink } from 'twenty-ui/navigation';
import { MOBILE_VIEWPORT, themeCssVariables } from 'twenty-ui/theme-constants';

type EmailMessageRecord = ObjectRecord & {
  aiSummary?: string | null;
  bodyText?: unknown;
  fromAddress?: string | null;
  fromName?: string | null;
  hasAttachments?: boolean | null;
  id: string;
  isRead?: boolean | null;
  mailState?:
    | 'COMMERCIAL'
    | 'JUNK'
    | 'NEWSLETTER'
    | 'OPERATIONAL'
    | 'UNCLASSIFIED'
    | null;
  needsReview?: boolean | null;
  receivedAt?: string | null;
  stcRefs?: unknown;
  subject?: string | null;
};

type InboxTab = 'ALL' | 'REVIEW' | 'WORKING';

const StyledPageContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[5]};
  overflow-y: auto;
  padding: ${themeCssVariables.spacing[5]};

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    padding: ${themeCssVariables.spacing[3]};
  }
`;

const StyledTopGrid = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[4]};
  grid-template-columns: minmax(0, 2.2fr) minmax(260px, 0.8fr);

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    grid-template-columns: 1fr;
  }
`;

const StyledPrimaryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
  min-width: 0;
`;

const StyledSecondaryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
  min-width: 0;
`;

const StyledMetrics = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[3]};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    grid-template-columns: 1fr;
  }
`;

const StyledMetricValue = styled.div`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.xl};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  line-height: 1;
`;

const StyledMetricLabel = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
  margin-top: ${themeCssVariables.spacing[2]};
`;

const StyledToolbar = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
  margin-bottom: ${themeCssVariables.spacing[3]};

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const StyledTabList = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledTab = styled.button<{ active: boolean }>`
  align-items: center;
  background: ${({ active }) =>
    active
      ? themeCssVariables.background.primary
      : themeCssVariables.background.secondary};
  border: 1px solid
    ${({ active }) =>
      active
        ? themeCssVariables.border.color.strong
        : themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.pill};
  color: ${({ active }) =>
    active
      ? themeCssVariables.font.color.inverted
      : themeCssVariables.font.color.secondary};
  cursor: pointer;
  display: inline-flex;
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
  gap: ${themeCssVariables.spacing[1]};
  padding: ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[3]};
`;

const StyledTabCount = styled.span<{ active: boolean }>`
  color: inherit;
  opacity: ${({ active }) => (active ? 0.9 : 0.7)};
`;

const StyledLinkContainer = styled.div`
  > a {
    color: inherit;
    display: block;
  }
`;

const StyledMailboxList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMailboxRow = styled.button<{ unread: boolean }>`
  align-items: stretch;
  background: ${({ unread }) =>
    unread
      ? themeCssVariables.background.tertiary
      : themeCssVariables.background.primary};
  border: 0;
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  cursor: pointer;
  display: grid;
  gap: ${themeCssVariables.spacing[3]};
  grid-template-columns: auto minmax(0, 1fr) auto;
  padding: ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[4]};
  text-align: left;
  width: 100%;

  &:hover {
    background: ${themeCssVariables.background.secondary};
  }

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    grid-template-columns: auto minmax(0, 1fr);
  }
`;

const StyledAvatarColumn = styled.div`
  align-items: flex-start;
  display: flex;
  padding-top: 2px;
`;

const StyledMailboxMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[2]};
  min-width: 0;
`;

const StyledMailboxRowHeader = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  min-width: 0;
`;

const StyledUnreadDot = styled.div<{ unread: boolean }>`
  background: ${({ unread }) =>
    unread ? themeCssVariables.color.blue : 'transparent'};
  border-radius: 999px;
  flex-shrink: 0;
  height: 8px;
  width: 8px;
`;

const StyledSender = styled.div<{ unread: boolean }>`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${({ unread }) =>
    unread
      ? themeCssVariables.font.weight.semiBold
      : themeCssVariables.font.weight.medium};
  min-width: 0;
`;

const StyledSubject = styled.div<{ unread: boolean }>`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${({ unread }) =>
    unread
      ? themeCssVariables.font.weight.semiBold
      : themeCssVariables.font.weight.medium};
`;

const StyledSnippet = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
  line-height: 1.5;
`;

const StyledMetaRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledMetaText = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.xs};
  line-height: 1;
`;

const StyledBadge = styled.span<{ tone: 'default' | 'danger' | 'success' | 'warning' }>`
  align-items: center;
  background: ${({ tone }) =>
    tone === 'success'
      ? themeCssVariables.color.turquoise1
      : tone === 'warning'
        ? themeCssVariables.color.orange1
        : tone === 'danger'
          ? themeCssVariables.color.red1
          : themeCssVariables.color.gray1};
  border-radius: ${themeCssVariables.border.radius.pill};
  color: ${({ tone }) =>
    tone === 'success'
      ? themeCssVariables.color.turquoise9
      : tone === 'warning'
        ? themeCssVariables.color.orange9
        : tone === 'danger'
          ? themeCssVariables.color.red9
          : themeCssVariables.color.gray9};
  display: inline-flex;
  font-size: ${themeCssVariables.font.size.xs};
  font-weight: ${themeCssVariables.font.weight.medium};
  padding: 3px ${themeCssVariables.spacing[2]};
`;

const StyledRefBadge = styled(StyledBadge)`
  background: ${themeCssVariables.background.secondary};
  color: ${themeCssVariables.font.color.secondary};
`;

const StyledMailboxAside = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[2]};

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    align-items: flex-start;
    grid-column: 2;
  }
`;

const StyledTimestamp = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
  white-space: nowrap;
`;

const StyledTransportRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledTransportIcon = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
`;

const StyledTransportText = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  min-width: 0;
`;

const StyledTransportLabel = styled.div`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledTransportDescription = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
  line-height: 1.5;
`;

const getStringValue = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }

  return '';
};

const collectText = (value: unknown): string[] => {
  if (typeof value === 'string') {
    const trimmedValue = value.trim();

    if (
      (trimmedValue.startsWith('{') && trimmedValue.endsWith('}')) ||
      (trimmedValue.startsWith('[') && trimmedValue.endsWith(']'))
    ) {
      try {
        return collectText(JSON.parse(trimmedValue));
      } catch {
        return [trimmedValue];
      }
    }

    return [trimmedValue];
  }

  if (Array.isArray(value)) {
    return value.flatMap((entry) => collectText(entry));
  }

  if (value && typeof value === 'object') {
    return Object.values(value).flatMap((entry) => collectText(entry));
  }

  return [];
};

const toPlainText = (value: unknown) =>
  collectText(value)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

const getMessageSender = (message: EmailMessageRecord) =>
  getStringValue(message.fromName).trim() ||
  toPlainText(message.fromAddress).replace(/\s+/g, ', ').trim() ||
  t`Unknown sender`;

const getMessageSubject = (message: EmailMessageRecord) =>
  getStringValue(message.subject).trim() || t`No subject`;

const getMessageSummary = (message: EmailMessageRecord) => {
  const aiSummary = getStringValue(message.aiSummary).trim();

  if (aiSummary.length > 0) {
    return aiSummary;
  }

  const bodyPreview = toPlainText(message.bodyText);

  if (bodyPreview.length === 0) {
    return t`No preview available yet.`;
  }

  return bodyPreview.length > 220
    ? `${bodyPreview.slice(0, 217).trimEnd()}...`
    : bodyPreview;
};

const getMessageRefs = (message: EmailMessageRecord) =>
  Array.isArray(message.stcRefs)
    ? message.stcRefs
        .map((value) => (typeof value === 'string' ? value.trim() : ''))
        .filter((value) => value.length > 0)
        .slice(0, 3)
    : [];

const formatMailboxTimestamp = (value: string | null | undefined) => {
  if (!value) {
    return t`No date`;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return t`No date`;
  }

  const now = new Date();
  const isSameDay = date.toDateString() === now.toDateString();

  if (isSameDay) {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  if (date.getFullYear() === now.getFullYear()) {
    return new Intl.DateTimeFormat(undefined, {
      day: '2-digit',
      month: 'short',
    }).format(date);
  }

  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const getMailStateLabel = (mailState: EmailMessageRecord['mailState']) => {
  switch (mailState) {
    case 'COMMERCIAL':
      return t`Commercial`;
    case 'OPERATIONAL':
      return t`Operational`;
    case 'NEWSLETTER':
      return t`Newsletter`;
    case 'JUNK':
      return t`Junk`;
    case 'UNCLASSIFIED':
    default:
      return t`Needs review`;
  }
};

const getMailStateTone = (
  mailState: EmailMessageRecord['mailState'],
): 'default' | 'danger' | 'success' | 'warning' => {
  switch (mailState) {
    case 'COMMERCIAL':
      return 'success';
    case 'OPERATIONAL':
      return 'default';
    case 'NEWSLETTER':
      return 'warning';
    case 'JUNK':
      return 'danger';
    case 'UNCLASSIFIED':
    default:
      return 'warning';
  }
};

const isVisibleInInbox = (message: EmailMessageRecord) =>
  !['JUNK', 'NEWSLETTER'].includes(message.mailState ?? 'UNCLASSIFIED');

const getFilteredMessages = (
  messages: EmailMessageRecord[],
  selectedTab: InboxTab,
) => {
  if (selectedTab === 'ALL') {
    return messages;
  }

  if (selectedTab === 'REVIEW') {
    return messages.filter(
      (message) =>
        message.needsReview === true ||
        !message.mailState ||
        message.mailState === 'UNCLASSIFIED',
    );
  }

  return messages.filter(isVisibleInInbox);
};

const InboxMailbox = ({
  objectNamePlural,
}: {
  objectNamePlural: string;
}) => {
  const { recordGqlFields } = useGenerateDepthRecordGqlFieldsFromObject({
    objectNameSingular: 'emailMessage',
    depth: 0,
    shouldOnlyLoadRelationIdentifiers: false,
  });
  const { openRecordInSidePanel } = useOpenRecordInSidePanel();
  const [selectedTab, setSelectedTab] = useState<InboxTab>('WORKING');

  const { records, totalCount, loading } = useFindManyRecords<EmailMessageRecord>(
    {
      objectNameSingular: 'emailMessage',
      limit: 100,
      orderBy: [{ receivedAt: 'DescNullsLast' }, { createdAt: 'DescNullsLast' }],
      recordGqlFields,
    },
  );

  const workingMessages = records.filter(isVisibleInInbox);
  const reviewMessages = records.filter(
    (message) =>
      message.needsReview === true ||
      !message.mailState ||
      message.mailState === 'UNCLASSIFIED',
  );
  const hiddenMessages = records.filter(
    (message) => !isVisibleInInbox(message),
  );
  const visibleMessages = getFilteredMessages(records, selectedTab);

  return (
    <StyledTopGrid>
      <StyledPrimaryColumn>
        <Section>
          <H2Title
            title={t`Shared inbox`}
            description={t`This is the STC working queue. Commercial and operational messages stay visible, while newsletters and junk remain outside the main flow.`}
          />
          <StyledMetrics>
            <Card fullWidth rounded>
              <CardContent>
                <StyledMetricValue>{workingMessages.length}</StyledMetricValue>
                <StyledMetricLabel>{t`Visible queue`}</StyledMetricLabel>
              </CardContent>
            </Card>
            <Card fullWidth rounded>
              <CardContent>
                <StyledMetricValue>{reviewMessages.length}</StyledMetricValue>
                <StyledMetricLabel>{t`Needs review`}</StyledMetricLabel>
              </CardContent>
            </Card>
            <Card fullWidth rounded>
              <CardContent>
                <StyledMetricValue>{hiddenMessages.length}</StyledMetricValue>
                <StyledMetricLabel>{t`Hidden from inbox`}</StyledMetricLabel>
              </CardContent>
            </Card>
          </StyledMetrics>
        </Section>

        <Section>
          <StyledToolbar>
            <StyledTabList>
              {[
                {
                  count: workingMessages.length,
                  key: 'WORKING' as const,
                  label: t`Working`,
                },
                {
                  count: reviewMessages.length,
                  key: 'REVIEW' as const,
                  label: t`Review`,
                },
                {
                  count: totalCount ?? records.length,
                  key: 'ALL' as const,
                  label: t`All mail`,
                },
              ].map((tab) => (
                <StyledTab
                  key={tab.key}
                  active={selectedTab === tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  type="button"
                >
                  {tab.label}
                  <StyledTabCount active={selectedTab === tab.key}>
                    {tab.count}
                  </StyledTabCount>
                </StyledTab>
              ))}
            </StyledTabList>

            <StyledLinkContainer>
              <UndecoratedLink
                to={getAppPath(AppPath.RecordIndexPage, {
                  objectNamePlural,
                })}
              >
                <Card rounded>
                  <CardContent isClickable hasHoverHighlight>
                    <StyledTransportRow>
                      <StyledTransportIcon>
                        <IconArrowUpRight size={16} />
                      </StyledTransportIcon>
                      <StyledTransportText>
                        <StyledTransportLabel>{t`Open raw table`}</StyledTransportLabel>
                      </StyledTransportText>
                      <IconChevronRight size={16} />
                    </StyledTransportRow>
                  </CardContent>
                </Card>
              </UndecoratedLink>
            </StyledLinkContainer>
          </StyledToolbar>

          <Card fullWidth rounded>
            {loading ? (
              <CardContent>{t`Loading inbox...`}</CardContent>
            ) : visibleMessages.length === 0 ? (
              <AnimatedPlaceholderEmptyContainer
                {...EMPTY_PLACEHOLDER_TRANSITION_PROPS}
              >
                <AnimatedPlaceholder type="emptyInbox" />
                <AnimatedPlaceholderEmptyTextContainer>
                  <AnimatedPlaceholderEmptyTitle>
                    {t`No messages in this queue`}
                  </AnimatedPlaceholderEmptyTitle>
                  <AnimatedPlaceholderEmptySubTitle>
                    {selectedTab === 'WORKING'
                      ? t`Once imported and classified, commercial and operational emails will appear here.`
                      : selectedTab === 'REVIEW'
                        ? t`Messages that stay unclassified or explicitly need review will appear here.`
                        : t`Import or sync email messages to populate the shared mailbox.`}
                  </AnimatedPlaceholderEmptySubTitle>
                </AnimatedPlaceholderEmptyTextContainer>
              </AnimatedPlaceholderEmptyContainer>
            ) : (
              <StyledMailboxList>
                {visibleMessages.map((message, index) => {
                  const sender = getMessageSender(message);
                  const subject = getMessageSubject(message);
                  const summary = getMessageSummary(message);
                  const refs = getMessageRefs(message);
                  const unread = message.isRead !== true;

                  return (
                    <StyledMailboxRow
                      key={message.id}
                      onClick={() =>
                        openRecordInSidePanel({
                          objectNameSingular: 'emailMessage',
                          recordId: message.id,
                        })
                      }
                      unread={unread}
                      type="button"
                    >
                      <StyledAvatarColumn>
                        <Avatar
                          placeholder={sender}
                          placeholderColorSeed={sender}
                          size="md"
                          type="rounded"
                        />
                      </StyledAvatarColumn>

                      <StyledMailboxMain>
                        <StyledMailboxRowHeader>
                          <StyledUnreadDot unread={unread} />
                          <StyledSender unread={unread}>
                            <OverflowingTextWithTooltip text={sender} />
                          </StyledSender>
                        </StyledMailboxRowHeader>

                        <StyledSubject unread={unread}>
                          <OverflowingTextWithTooltip text={subject} />
                        </StyledSubject>

                        <StyledSnippet>
                          <OverflowingTextWithTooltip text={summary} />
                        </StyledSnippet>

                        <StyledMetaRow>
                          <StyledBadge
                            tone={getMailStateTone(message.mailState)}
                          >
                            {getMailStateLabel(message.mailState)}
                          </StyledBadge>

                          {message.hasAttachments ? (
                            <StyledMetaText>
                              <IconPaperclip size={12} /> {t`Attachment`}
                            </StyledMetaText>
                          ) : null}

                          {message.needsReview ? (
                            <StyledMetaText>
                              <IconSparkles size={12} /> {t`Review required`}
                            </StyledMetaText>
                          ) : null}

                          {refs.map((ref) => (
                            <StyledRefBadge key={`${message.id}-${ref}`} tone="default">
                              {ref}
                            </StyledRefBadge>
                          ))}
                        </StyledMetaRow>
                      </StyledMailboxMain>

                      <StyledMailboxAside>
                        <StyledTimestamp>
                          {formatMailboxTimestamp(message.receivedAt)}
                        </StyledTimestamp>
                        {index === 0 ? (
                          <StyledMetaText>{t`Latest`}</StyledMetaText>
                        ) : null}
                      </StyledMailboxAside>
                    </StyledMailboxRow>
                  );
                })}
              </StyledMailboxList>
            )}
          </Card>
        </Section>
      </StyledPrimaryColumn>

      <StyledSecondaryColumn>
        <Section>
          <Callout
            variant="info"
            title={t`Backend-managed transport`}
            description={t`Receive and send stay on the shared STC transport. This page is the operational view on top of imported Email Message records.`}
            Icon={IconMail}
          />
        </Section>

        <Section>
          <Card fullWidth rounded>
            <CardContent>
              <StyledTransportRow>
                <StyledTransportIcon>
                  <IconInbox size={16} />
                </StyledTransportIcon>
                <StyledTransportText>
                  <StyledTransportLabel>{t`Visible inbox rule`}</StyledTransportLabel>
                  <StyledTransportDescription>
                    {t`Commercial and operational mail stays in the main queue. Newsletters and junk should not distract the team by default.`}
                  </StyledTransportDescription>
                </StyledTransportText>
              </StyledTransportRow>
            </CardContent>
            <CardContent divider>
              <StyledTransportRow>
                <StyledTransportIcon>
                  <IconSparkles size={16} />
                </StyledTransportIcon>
                <StyledTransportText>
                  <StyledTransportLabel>{t`Analyze from the record panel`}</StyledTransportLabel>
                  <StyledTransportDescription>
                    {t`Open any email to use Summarize email and Analyze email in the normal Twenty action menu.`}
                  </StyledTransportDescription>
                </StyledTransportText>
              </StyledTransportRow>
            </CardContent>
            <CardContent>
              <StyledTransportRow>
                <StyledTransportIcon>
                  <IconAlertCircle size={16} />
                </StyledTransportIcon>
                <StyledTransportText>
                  <StyledTransportLabel>{t`Current source of truth`}</StyledTransportLabel>
                  <StyledTransportDescription>
                    {t`If a message looks wrong here, fix the import payload or classification logic first. This page intentionally mirrors imported Email Message records.`}
                  </StyledTransportDescription>
                </StyledTransportText>
              </StyledTransportRow>
            </CardContent>
          </Card>
        </Section>
      </StyledSecondaryColumn>
    </StyledTopGrid>
  );
};

export const Inbox = () => {
  const { findActiveObjectMetadataItemByNamePlural } =
    useFilteredObjectMetadataItems();

  const emailMessagesObjectMetadataItem =
    findActiveObjectMetadataItemByNamePlural('emailMessages');

  return (
    <PageContainer>
      <PageHeader title={t`Inbox`} Icon={IconInbox} />
      <PageBody>
        <StyledPageContent>
          {emailMessagesObjectMetadataItem ? (
            <InboxMailbox
              objectNamePlural={emailMessagesObjectMetadataItem.namePlural}
            />
          ) : (
            <Section>
              <Callout
                variant="info"
                title={t`Email Messages metadata is missing`}
                description={t`Redeploy and rerun the STC workspace seed so the inbox can query emailMessage records.`}
                Icon={IconAlertCircle}
              />
            </Section>
          )}
        </StyledPageContent>
      </PageBody>
    </PageContainer>
  );
};
