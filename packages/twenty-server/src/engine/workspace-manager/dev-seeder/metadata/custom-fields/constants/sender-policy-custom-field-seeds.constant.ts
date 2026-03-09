import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const SENDER_POLICY_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.EMAILS,
    name: 'senderAddress',
    label: 'Sender Address',
    icon: 'IconMail',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'senderDomain',
    label: 'Sender Domain',
    icon: 'IconWorld',
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'policy',
    label: 'Policy',
    icon: 'IconShieldCheck',
    options: [
      { label: 'Allow', value: 'ALLOW', position: 0, color: 'green' },
      { label: 'Block', value: 'BLOCK', position: 1, color: 'red' },
      {
        label: 'Newsletter',
        value: 'NEWSLETTER',
        position: 2,
        color: 'yellow',
      },
    ],
    defaultValue: "'ALLOW'",
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'reason',
    label: 'Reason',
    icon: 'IconNote',
  },
  {
    type: FieldMetadataType.BOOLEAN,
    name: 'isActive',
    label: 'Is Active',
    icon: 'IconToggleLeft',
    defaultValue: true,
  },
];
