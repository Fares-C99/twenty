import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { Command, CommandRunner, Option } from 'nest-commander';
import { Repository } from 'typeorm';

import { ApiKeyService } from 'src/engine/core-modules/api-key/services/api-key.service';
import { buildApiKeyAuthContext } from 'src/engine/core-modules/auth/utils/build-api-key-auth-context.util';
import { UpsertRecordService } from 'src/engine/core-modules/record-crud/services/upsert-record.service';
import { WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';
import { SEED_APPLE_WORKSPACE_ID } from 'src/engine/workspace-manager/dev-seeder/core/constants/seeder-workspaces.constant';

type ImportEmailMessagesCommandOptions = {
  filePath: string;
  file?: string;
  workspaceId: string;
  mailbox?: string;
};

type EmailAddressInput =
  | string
  | {
      email?: string | null;
      address?: string | null;
      name?: string | null;
    };

type StcEmailMessageImportPayload = {
  subject?: string | null;
  from?: EmailAddressInput | null;
  fromAddress?: EmailAddressInput | null;
  fromEmail?: string | null;
  fromName?: string | null;
  to?: EmailAddressInput[] | string | null;
  toAddresses?: EmailAddressInput[] | string | null;
  cc?: EmailAddressInput[] | string | null;
  ccAddresses?: EmailAddressInput[] | string | null;
  body?: string | null;
  bodyText?: string | null;
  text?: string | null;
  direction?: string | null;
  headerMessageId?: string | null;
  messageId?: string | null;
  inReplyTo?: string | null;
  references?: string[] | string | null;
  referencesHeader?: string | null;
  mailbox?: string | null;
  receivedAt?: string | null;
  hasAttachments?: boolean | null;
  attachments?: Array<unknown> | null;
  stcRefs?: string[] | null;
  isRead?: boolean | null;
  aiSummary?: string | null;
  aiCategory?: string | null;
  mailState?: string | null;
  needsReview?: boolean | null;
};

type EmailRecordInput = {
  subject: string;
  fromAddress: {
    primaryEmail: string | undefined;
    additionalEmails: string[] | undefined;
  };
  fromName: string | undefined;
  toAddresses: string[] | undefined;
  ccAddresses: string[] | undefined;
  bodyText: {
    markdown: string | null;
    blocknote: string | null;
  } | null;
  direction: 'INBOUND' | 'OUTBOUND';
  headerMessageId: string;
  inReplyTo: string | undefined;
  referencesHeader: string | undefined;
  mailbox: string | undefined;
  receivedAt: string | undefined;
  hasAttachments: boolean;
  stcRefs: string[] | undefined;
  isRead: boolean;
  aiSummary: string | undefined;
  aiCategory:
    | 'INQUIRY'
    | 'QUOTE_REQUEST'
    | 'NEGOTIATION'
    | 'ORDER'
    | 'PAYMENT'
    | 'SHIPPING'
    | 'SPARE_PARTS'
    | 'TECHNICAL_SUPPORT'
    | 'COMPLAINT'
    | 'OTHER'
    | undefined;
  mailState:
    | 'UNCLASSIFIED'
    | 'COMMERCIAL'
    | 'OPERATIONAL'
    | 'NEWSLETTER'
    | 'JUNK'
    | undefined;
  needsReview: boolean;
};

const AI_CATEGORIES = new Set<NonNullable<EmailRecordInput['aiCategory']>>([
  'INQUIRY',
  'QUOTE_REQUEST',
  'NEGOTIATION',
  'ORDER',
  'PAYMENT',
  'SHIPPING',
  'SPARE_PARTS',
  'TECHNICAL_SUPPORT',
  'COMPLAINT',
  'OTHER',
]);

const MAIL_STATES = new Set<NonNullable<EmailRecordInput['mailState']>>([
  'UNCLASSIFIED',
  'COMMERCIAL',
  'OPERATIONAL',
  'NEWSLETTER',
  'JUNK',
]);

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();

const normalizeString = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const normalizedValue = normalizeWhitespace(value);

  return normalizedValue.length > 0 ? normalizedValue : undefined;
};

const normalizeEmailAddress = (
  value: EmailAddressInput | null | undefined,
): { email?: string; name?: string } => {
  if (typeof value === 'string') {
    const normalizedEmail = normalizeString(value)?.toLowerCase();

    return normalizedEmail ? { email: normalizedEmail } : {};
  }

  if (!value) {
    return {};
  }

  const normalizedEmail = normalizeString(value.email ?? value.address)?.toLowerCase();
  const normalizedName = normalizeString(value.name ?? undefined);

  return {
    email: normalizedEmail,
    name: normalizedName,
  };
};

const normalizeEmailList = (
  value: EmailAddressInput[] | string | null | undefined,
): string[] | undefined => {
  if (!value) {
    return undefined;
  }

  if (typeof value === 'string') {
    const normalizedValues = value
      .split(',')
      .map((entry) => normalizeString(entry)?.toLowerCase())
      .filter((entry): entry is string => Boolean(entry));

    return normalizedValues.length > 0 ? Array.from(new Set(normalizedValues)) : undefined;
  }

  const normalizedValues = value
    .map((entry) => normalizeEmailAddress(entry).email)
    .filter((entry): entry is string => Boolean(entry));

  return normalizedValues.length > 0 ? Array.from(new Set(normalizedValues)) : undefined;
};

const normalizeDirection = (value: unknown): 'INBOUND' | 'OUTBOUND' => {
  return normalizeString(value)?.toUpperCase() === 'OUTBOUND'
    ? 'OUTBOUND'
    : 'INBOUND';
};

const normalizeAiCategory = (
  value: unknown,
): EmailRecordInput['aiCategory'] => {
  const normalizedValue = normalizeString(value)?.toUpperCase();

  return normalizedValue && AI_CATEGORIES.has(normalizedValue as NonNullable<EmailRecordInput['aiCategory']>)
    ? (normalizedValue as NonNullable<EmailRecordInput['aiCategory']>)
    : undefined;
};

const normalizeMailState = (
  value: unknown,
): EmailRecordInput['mailState'] => {
  const normalizedValue = normalizeString(value)?.toUpperCase();

  return normalizedValue && MAIL_STATES.has(normalizedValue as NonNullable<EmailRecordInput['mailState']>)
    ? (normalizedValue as NonNullable<EmailRecordInput['mailState']>)
    : undefined;
};

const normalizeReferences = (
  value: string[] | string | null | undefined,
): string | undefined => {
  if (Array.isArray(value)) {
    const normalizedValues = value
      .map((entry) => normalizeString(entry))
      .filter((entry): entry is string => Boolean(entry));

    return normalizedValues.length > 0 ? normalizedValues.join(' ') : undefined;
  }

  return normalizeString(value);
};

const normalizeReceivedAt = (value: unknown): string | undefined => {
  const normalizedValue = normalizeString(value);

  if (!normalizedValue) {
    return undefined;
  }

  const parsedDate = new Date(normalizedValue);

  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString();
};

const normalizeBody = (payload: StcEmailMessageImportPayload) => {
  const rawBody =
    normalizeString(payload.bodyText) ??
    normalizeString(payload.body) ??
    normalizeString(payload.text);

  if (!rawBody) {
    return null;
  }

  return {
    markdown: rawBody,
    blocknote: null,
  };
};

const normalizePayload = (
  payload: StcEmailMessageImportPayload,
  defaultMailbox?: string,
): EmailRecordInput => {
  const fromValue =
    payload.fromAddress ?? payload.from ?? payload.fromEmail ?? undefined;
  const normalizedFromAddress = normalizeEmailAddress(fromValue);
  const normalizedHeaderMessageId =
    normalizeString(payload.headerMessageId) ?? normalizeString(payload.messageId);

  if (!normalizedHeaderMessageId) {
    throw new Error('Missing headerMessageId/messageId');
  }

  return {
    subject: normalizeString(payload.subject) ?? '(No subject)',
    fromAddress: {
      primaryEmail: normalizedFromAddress.email,
      additionalEmails: undefined,
    },
    fromName:
      normalizeString(payload.fromName) ?? normalizedFromAddress.name ?? undefined,
    toAddresses: normalizeEmailList(payload.toAddresses ?? payload.to),
    ccAddresses: normalizeEmailList(payload.ccAddresses ?? payload.cc),
    bodyText: normalizeBody(payload),
    direction: normalizeDirection(payload.direction),
    headerMessageId: normalizedHeaderMessageId,
    inReplyTo: normalizeString(payload.inReplyTo),
    referencesHeader:
      normalizeString(payload.referencesHeader) ??
      normalizeReferences(payload.references),
    mailbox: normalizeString(payload.mailbox) ?? normalizeString(defaultMailbox),
    receivedAt: normalizeReceivedAt(payload.receivedAt),
    hasAttachments:
      payload.hasAttachments ??
      (Array.isArray(payload.attachments) ? payload.attachments.length > 0 : false),
    stcRefs: payload.stcRefs?.filter((value): value is string => Boolean(normalizeString(value))),
    isRead: payload.isRead ?? false,
    aiSummary: normalizeString(payload.aiSummary),
    aiCategory: normalizeAiCategory(payload.aiCategory),
    mailState: normalizeMailState(payload.mailState) ?? 'UNCLASSIFIED',
    needsReview: payload.needsReview ?? true,
  };
};

const extractMessages = (
  parsedFile: unknown,
): StcEmailMessageImportPayload[] => {
  if (Array.isArray(parsedFile)) {
    return parsedFile as StcEmailMessageImportPayload[];
  }

  if (
    parsedFile &&
    typeof parsedFile === 'object' &&
    Array.isArray((parsedFile as { messages?: unknown }).messages)
  ) {
    return (parsedFile as { messages: StcEmailMessageImportPayload[] }).messages;
  }

  throw new Error('Expected a JSON array or an object with a "messages" array');
};

@Command({
  name: 'workspace:stc:import-email-messages',
  description: 'Import normalized STC email messages into the emailMessage object',
})
export class StcImportEmailMessagesCommand extends CommandRunner {
  private readonly logger = new Logger(StcImportEmailMessagesCommand.name);

  constructor(
    @InjectRepository(WorkspaceEntity)
    private readonly workspaceRepository: Repository<WorkspaceEntity>,
    private readonly apiKeyService: ApiKeyService,
    private readonly upsertRecordService: UpsertRecordService,
  ) {
    super();
  }

  @Option({
    flags: '-f, --file <filePath>',
    description: 'Path to a JSON array of normalized email messages',
    required: true,
  })
  parseFilePath(value: string): string {
    return value;
  }

  @Option({
    flags: '-w, --workspace-id <workspaceId>',
    description: 'Workspace ID to import into',
    defaultValue: SEED_APPLE_WORKSPACE_ID,
  })
  parseWorkspaceId(value: string): string {
    return value;
  }

  @Option({
    flags: '-m, --mailbox <mailbox>',
    description: 'Default mailbox value to apply when the payload omits it',
    required: false,
  })
  parseMailbox(value: string): string {
    return value;
  }

  async run(
    _passedParams: string[],
    options: ImportEmailMessagesCommandOptions,
  ): Promise<void> {
    const filePathOption = options.filePath ?? options.file;

    if (!filePathOption) {
      throw new Error('Missing required --file option');
    }

    const workspace = await this.workspaceRepository.findOne({
      where: { id: options.workspaceId },
    });

    if (!workspace) {
      throw new Error(`Workspace ${options.workspaceId} not found`);
    }

    const [apiKey] = await this.apiKeyService.findActiveByWorkspaceId(
      options.workspaceId,
    );

    if (!apiKey) {
      throw new Error(
        `No active API key found for workspace ${options.workspaceId}. Seed the dev workspace or generate one first.`,
      );
    }

    const filePath = resolve(process.cwd(), filePathOption);
    const rawFile = await readFile(filePath, 'utf8');
    const parsedFile = JSON.parse(rawFile) as unknown;
    const payloads = extractMessages(parsedFile);
    const authContext = buildApiKeyAuthContext({ workspace, apiKey });

    let importedCount = 0;
    let failedCount = 0;

    for (const [index, payload] of payloads.entries()) {
      try {
        const normalizedPayload = normalizePayload(payload, options.mailbox);
        const result = await this.upsertRecordService.execute({
          objectName: 'emailMessage',
          objectRecord: normalizedPayload,
          authContext,
          slimResponse: true,
        });

        if (!result.success) {
          throw new Error(result.error ?? 'Unknown upsert failure');
        }

        importedCount += 1;
      } catch (error) {
        failedCount += 1;
        this.logger.error(
          `Failed to import message #${index + 1}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }

    this.logger.log(
      `STC email import finished. Imported ${importedCount} messages, ${failedCount} failed.`,
    );
  }
}
