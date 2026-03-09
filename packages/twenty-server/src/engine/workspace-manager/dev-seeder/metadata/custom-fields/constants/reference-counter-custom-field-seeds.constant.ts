import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const REFERENCE_COUNTER_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.TEXT,
    name: 'prefix',
    label: 'Prefix',
    icon: 'IconLetterCase',
  },
  {
    type: FieldMetadataType.NUMBER,
    name: 'year',
    label: 'Year',
    icon: 'IconCalendar',
  },
  {
    type: FieldMetadataType.NUMBER,
    name: 'lastNumber',
    label: 'Last Number',
    icon: 'IconSortAscendingNumbers',
    defaultValue: 0,
  },
];
