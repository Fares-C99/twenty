import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const UNSUBSCRIBE_ATTEMPT_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.DATE,
    name: 'attemptedAt',
    label: 'Attempted At',
    icon: 'IconClock',
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'method',
    label: 'Method',
    icon: 'IconClick',
    options: [
      {
        label: 'Link Click',
        value: 'LINK_CLICK',
        position: 0,
        color: 'blue',
      },
      {
        label: 'Email Reply',
        value: 'EMAIL_REPLY',
        position: 1,
        color: 'green',
      },
      { label: 'Manual', value: 'MANUAL', position: 2, color: 'gray' },
    ],
  },
  {
    type: FieldMetadataType.BOOLEAN,
    name: 'success',
    label: 'Success',
    icon: 'IconCircleCheck',
    defaultValue: false,
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'responseCode',
    label: 'Response Code',
    icon: 'IconCode',
  },
];
