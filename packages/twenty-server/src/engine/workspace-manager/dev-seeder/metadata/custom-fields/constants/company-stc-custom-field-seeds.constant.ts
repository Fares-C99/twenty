import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const COMPANY_STC_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.SELECT,
    name: 'companyType',
    label: 'Company Type',
    icon: 'IconBuilding',
    options: [
      { label: 'Client', value: 'CLIENT', position: 0, color: 'blue' },
      { label: 'Supplier', value: 'SUPPLIER', position: 1, color: 'orange' },
      { label: 'Dual', value: 'DUAL', position: 2, color: 'purple' },
    ],
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'taxId',
    label: 'Tax ID (MF)',
    icon: 'IconId',
    description: 'Matricule Fiscal - Tunisian tax identification number',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'tradeRegister',
    label: 'Trade Register',
    icon: 'IconCertificate',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'paymentTermsDefault',
    label: 'Payment Terms Default',
    icon: 'IconCalendarStats',
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'currencyDefault',
    label: 'Currency Default',
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
    type: FieldMetadataType.TEXT,
    name: 'paymentConditionsDefault',
    label: 'Payment Conditions Default',
    icon: 'IconCreditCard',
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'riskLevel',
    label: 'Risk Level',
    icon: 'IconAlertTriangle',
    options: [
      { label: 'Low', value: 'LOW', position: 0, color: 'green' },
      { label: 'Medium', value: 'MEDIUM', position: 1, color: 'yellow' },
      { label: 'High', value: 'HIGH', position: 2, color: 'red' },
    ],
  },
  {
    type: FieldMetadataType.NUMBER,
    name: 'balance',
    label: 'Balance',
    icon: 'IconWallet',
    defaultValue: 0,
  },
];
