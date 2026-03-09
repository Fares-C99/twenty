import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const TIMELINE_EVENT_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.SELECT,
    name: 'eventType',
    label: 'Event Type',
    icon: 'IconTimeline',
    options: [
      {
        label: 'Conversation Created',
        value: 'CONVERSATION_CREATED',
        position: 0,
        color: 'blue',
      },
      {
        label: 'Message Sent',
        value: 'MESSAGE_SENT',
        position: 1,
        color: 'green',
      },
      {
        label: 'Message Received',
        value: 'MESSAGE_RECEIVED',
        position: 2,
        color: 'sky',
      },
      {
        label: 'Document Created',
        value: 'DOCUMENT_CREATED',
        position: 3,
        color: 'turquoise',
      },
      {
        label: 'Document Validated',
        value: 'DOCUMENT_VALIDATED',
        position: 4,
        color: 'purple',
      },
      {
        label: 'Payment Recorded',
        value: 'PAYMENT_RECORDED',
        position: 5,
        color: 'yellow',
      },
      {
        label: 'Deal Stage Changed',
        value: 'DEAL_STAGE_CHANGED',
        position: 6,
        color: 'orange',
      },
      {
        label: 'Note Added',
        value: 'NOTE_ADDED',
        position: 7,
        color: 'gray',
      },
    ],
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'description',
    label: 'Description',
    icon: 'IconAlignLeft',
  },
  {
    type: FieldMetadataType.RAW_JSON,
    name: 'metadata',
    label: 'Metadata',
    icon: 'IconCode',
  },
  {
    type: FieldMetadataType.DATE,
    name: 'occurredAt',
    label: 'Occurred At',
    icon: 'IconClock',
  },
];
