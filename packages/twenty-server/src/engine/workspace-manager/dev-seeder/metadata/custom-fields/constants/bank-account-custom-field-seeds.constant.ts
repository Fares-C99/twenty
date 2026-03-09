import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const BANK_ACCOUNT_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.SELECT,
    name: 'ownerType',
    label: 'Owner Type',
    icon: 'IconUser',
    options: [
      { label: 'STC', value: 'STC', position: 0, color: 'blue' },
      { label: 'Client', value: 'CLIENT', position: 1, color: 'green' },
      { label: 'Supplier', value: 'SUPPLIER', position: 2, color: 'orange' },
    ],
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'bankName',
    label: 'Bank Name',
    icon: 'IconBuildingBank',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'designation',
    label: 'Designation',
    icon: 'IconTag',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'agency',
    label: 'Agency',
    icon: 'IconMapPin',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'swift',
    label: 'SWIFT',
    icon: 'IconWorld',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'iban',
    label: 'IBAN',
    icon: 'IconCreditCard',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'rib',
    label: 'RIB',
    icon: 'IconId',
  },
  {
    type: FieldMetadataType.BOOLEAN,
    name: 'isDefault',
    label: 'Is Default',
    icon: 'IconStar',
    defaultValue: false,
  },
];
