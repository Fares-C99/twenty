import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const CONVERSATION_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.TEXT,
    name: 'subject',
    label: 'Subject',
    icon: 'IconTextCaption',
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'category',
    label: 'Category',
    icon: 'IconCategory',
    options: [
      { label: 'Inquiry', value: 'INQUIRY', position: 0, color: 'blue' },
      {
        label: 'Quote Request',
        value: 'QUOTE_REQUEST',
        position: 1,
        color: 'sky',
      },
      {
        label: 'Negotiation',
        value: 'NEGOTIATION',
        position: 2,
        color: 'turquoise',
      },
      { label: 'Order', value: 'ORDER', position: 3, color: 'green' },
      {
        label: 'Follow Up',
        value: 'FOLLOW_UP',
        position: 4,
        color: 'yellow',
      },
      { label: 'Payment', value: 'PAYMENT', position: 5, color: 'orange' },
      { label: 'Shipping', value: 'SHIPPING', position: 6, color: 'purple' },
      { label: 'Complaint', value: 'COMPLAINT', position: 7, color: 'red' },
      { label: 'Info', value: 'INFO', position: 8, color: 'gray' },
      { label: 'Other', value: 'OTHER', position: 9, color: 'gray' },
    ],
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'status',
    label: 'Status',
    icon: 'IconCircleDot',
    options: [
      { label: 'Open', value: 'OPEN', position: 0, color: 'green' },
      { label: 'Closed', value: 'CLOSED', position: 1, color: 'gray' },
      { label: 'Archived', value: 'ARCHIVED', position: 2, color: 'gray' },
    ],
    defaultValue: "'OPEN'",
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'priority',
    label: 'Priority',
    icon: 'IconFlag',
    options: [
      { label: 'Low', value: 'LOW', position: 0, color: 'gray' },
      { label: 'Normal', value: 'NORMAL', position: 1, color: 'blue' },
      { label: 'High', value: 'HIGH', position: 2, color: 'orange' },
      { label: 'Urgent', value: 'URGENT', position: 3, color: 'red' },
    ],
    defaultValue: "'NORMAL'",
  },
  {
    type: FieldMetadataType.DATE,
    name: 'lastMessageAt',
    label: 'Last Message At',
    icon: 'IconClock',
  },
  {
    type: FieldMetadataType.NUMBER,
    name: 'messageCount',
    label: 'Message Count',
    icon: 'IconHash',
    defaultValue: 0,
  },
  {
    type: FieldMetadataType.NUMBER,
    name: 'unreadCount',
    label: 'Unread Count',
    icon: 'IconMailOpened',
    defaultValue: 0,
  },
  {
    type: FieldMetadataType.RICH_TEXT,
    name: 'aiSummary',
    label: 'AI Summary',
    icon: 'IconSparkles',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'aiCategory',
    label: 'AI Category',
    icon: 'IconSparkles',
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'aiSentiment',
    label: 'AI Sentiment',
    icon: 'IconMoodSmile',
    options: [
      { label: 'Positive', value: 'POSITIVE', position: 0, color: 'green' },
      { label: 'Neutral', value: 'NEUTRAL', position: 1, color: 'gray' },
      { label: 'Negative', value: 'NEGATIVE', position: 2, color: 'red' },
    ],
  },
];
