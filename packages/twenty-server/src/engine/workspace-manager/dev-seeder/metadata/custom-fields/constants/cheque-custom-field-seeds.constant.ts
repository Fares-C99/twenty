import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const CHEQUE_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.SELECT,
    name: 'direction',
    label: 'Direction',
    icon: 'IconArrowsLeftRight',
    options: [
      { label: 'Re\u00e7u', value: 'RECU', position: 0, color: 'blue' },
      { label: '\u00c9mis', value: 'EMIS', position: 1, color: 'green' },
    ],
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'chequeNumber',
    label: 'Cheque Number',
    icon: 'IconHash',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'bankName',
    label: 'Bank Name',
    icon: 'IconBuildingBank',
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
      { label: 'Re\u00e7u', value: 'RECU', position: 0, color: 'blue' },
      {
        label: 'Remis Banque',
        value: 'REMIS_BANQUE',
        position: 1,
        color: 'sky',
      },
      {
        label: 'En Attente',
        value: 'EN_ATTENTE',
        position: 2,
        color: 'yellow',
      },
      {
        label: 'Compens\u00e9',
        value: 'COMPENSE',
        position: 3,
        color: 'green',
      },
      { label: 'Impay\u00e9', value: 'IMPAYE', position: 4, color: 'red' },
      {
        label: 'Retourn\u00e9',
        value: 'RETOURNE',
        position: 5,
        color: 'red',
      },
    ],
    defaultValue: "'RECU'",
  },
  {
    type: FieldMetadataType.DATE,
    name: 'receivedDate',
    label: 'Received Date',
    icon: 'IconCalendarEvent',
  },
  {
    type: FieldMetadataType.DATE,
    name: 'remisBanqueDate',
    label: 'Remis Banque Date',
    icon: 'IconCalendarEvent',
  },
  {
    type: FieldMetadataType.DATE,
    name: 'compensationDate',
    label: 'Compensation Date',
    icon: 'IconCalendarEvent',
  },
];
