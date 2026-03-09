import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const DOCUMENT_LINE_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.NUMBER,
    name: 'lineOrder',
    label: 'Line Order',
    icon: 'IconSortAscending',
    defaultValue: 0,
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'articleReference',
    label: 'Article Reference',
    icon: 'IconBarcode',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'designation',
    label: 'Designation',
    icon: 'IconTag',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'description',
    label: 'Description',
    icon: 'IconAlignLeft',
  },
  {
    type: FieldMetadataType.NUMBER,
    name: 'quantity',
    label: 'Quantity',
    icon: 'IconPackage',
    defaultValue: 0,
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'unit',
    label: 'Unit',
    icon: 'IconRuler',
  },
  {
    type: FieldMetadataType.NUMBER,
    name: 'unitPriceHt',
    label: 'Unit Price HT',
    icon: 'IconCurrencyDollar',
    defaultValue: 0,
  },
  {
    type: FieldMetadataType.NUMBER,
    name: 'discountPercent',
    label: 'Discount %',
    icon: 'IconDiscount',
    defaultValue: 0,
  },
  {
    type: FieldMetadataType.NUMBER,
    name: 'tvaRate',
    label: 'TVA Rate',
    icon: 'IconPercentage',
    defaultValue: 19,
  },
  {
    type: FieldMetadataType.NUMBER,
    name: 'totalHt',
    label: 'Total HT',
    icon: 'IconCalculator',
    defaultValue: 0,
  },
];
