import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const EMAIL_MESSAGE_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.TEXT,
    name: 'subject',
    label: 'Subject',
    icon: 'IconTextCaption',
  },
  {
    type: FieldMetadataType.EMAILS,
    name: 'fromAddress',
    label: 'From',
    icon: 'IconMailForward',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'fromName',
    label: 'From Name',
    icon: 'IconUser',
  },
  {
    type: FieldMetadataType.ARRAY,
    name: 'toAddresses',
    label: 'To',
    icon: 'IconUsers',
  },
  {
    type: FieldMetadataType.ARRAY,
    name: 'ccAddresses',
    label: 'CC',
    icon: 'IconUsers',
  },
  {
    type: FieldMetadataType.RICH_TEXT,
    name: 'bodyText',
    label: 'Body',
    icon: 'IconFileText',
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'direction',
    label: 'Direction',
    icon: 'IconArrowsLeftRight',
    options: [
      { label: 'Inbound', value: 'INBOUND', position: 0, color: 'blue' },
      { label: 'Outbound', value: 'OUTBOUND', position: 1, color: 'green' },
    ],
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'headerMessageId',
    label: 'Message ID',
    icon: 'IconId',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'inReplyTo',
    label: 'In Reply To',
    icon: 'IconCornerUpLeft',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'referencesHeader',
    label: 'References',
    icon: 'IconLink',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'mailbox',
    label: 'Mailbox',
    icon: 'IconInbox',
  },
  {
    type: FieldMetadataType.DATE,
    name: 'receivedAt',
    label: 'Received At',
    icon: 'IconClock',
  },
  {
    type: FieldMetadataType.BOOLEAN,
    name: 'hasAttachments',
    label: 'Has Attachments',
    icon: 'IconPaperclip',
    defaultValue: false,
  },
  {
    type: FieldMetadataType.ARRAY,
    name: 'stcRefs',
    label: 'STC References',
    icon: 'IconTag',
  },
  {
    type: FieldMetadataType.BOOLEAN,
    name: 'isRead',
    label: 'Is Read',
    icon: 'IconEye',
    defaultValue: false,
  },
];
