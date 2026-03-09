import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const TRAITE_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.SELECT,
    name: 'direction',
    label: 'Direction',
    icon: 'IconArrowsLeftRight',
    options: [
      { label: '\u00c9mise', value: 'EMISE', position: 0, color: 'blue' },
      { label: 'Re\u00e7ue', value: 'RECUE', position: 1, color: 'green' },
    ],
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'traiteNumber',
    label: 'Traite Number',
    icon: 'IconHash',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'tireur',
    label: 'Tireur (Drawer)',
    icon: 'IconUser',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'beneficiaire',
    label: 'B\u00e9n\u00e9ficiaire',
    icon: 'IconUser',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'companyName',
    label: 'Company Name',
    icon: 'IconBuilding',
  },
  {
    type: FieldMetadataType.NUMBER,
    name: 'amount',
    label: 'Amount',
    icon: 'IconCash',
    defaultValue: 0,
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'currency',
    label: 'Currency',
    icon: 'IconCurrencyDollar',
    options: [
      { label: 'TND', value: 'TND', position: 0, color: 'green' },
      { label: 'EUR', value: 'EUR', position: 1, color: 'blue' },
      { label: 'USD', value: 'USD', position: 2, color: 'sky' },
      { label: 'GBP', value: 'GBP', position: 3, color: 'purple' },
    ],
    defaultValue: "'TND'",
  },
  {
    type: FieldMetadataType.DATE,
    name: 'issueDate',
    label: 'Issue Date',
    icon: 'IconCalendar',
  },
  {
    type: FieldMetadataType.DATE,
    name: 'dueDate',
    label: 'Due Date',
    icon: 'IconCalendarDue',
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'status',
    label: 'Status',
    icon: 'IconCircleDot',
    options: [
      { label: 'En Cours', value: 'EN_COURS', position: 0, color: 'blue' },
      {
        label: 'Honor\u00e9e',
        value: 'HONOREE',
        position: 1,
        color: 'green',
      },
      { label: 'Impay\u00e9e', value: 'IMPAYEE', position: 2, color: 'red' },
      {
        label: 'Protest\u00e9e',
        value: 'PROTESTEE',
        position: 3,
        color: 'red',
      },
    ],
    defaultValue: "'EN_COURS'",
  },
];
