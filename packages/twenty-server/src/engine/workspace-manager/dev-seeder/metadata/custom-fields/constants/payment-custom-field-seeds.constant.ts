import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const PAYMENT_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.DATE,
    name: 'paymentDate',
    label: 'Payment Date',
    icon: 'IconCalendar',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'clientName',
    label: 'Client Name',
    icon: 'IconUser',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'factureRefs',
    label: 'Invoice References',
    icon: 'IconFileInvoice',
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'method',
    label: 'Payment Method',
    icon: 'IconCreditCard',
    options: [
      { label: 'Virement', value: 'VIREMENT', position: 0, color: 'blue' },
      { label: 'Ch\u00e8que', value: 'CHEQUE', position: 1, color: 'green' },
      { label: 'Esp\u00e8ces', value: 'ESPECES', position: 2, color: 'yellow' },
      { label: 'Traite', value: 'TRAITE', position: 3, color: 'purple' },
      { label: 'Carte', value: 'CARTE', position: 4, color: 'sky' },
    ],
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
    name: 'currencyCode',
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
    type: FieldMetadataType.NUMBER,
    name: 'exchangeRate',
    label: 'Exchange Rate',
    icon: 'IconArrowsExchange',
    defaultValue: 1,
  },
];
