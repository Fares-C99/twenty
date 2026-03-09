import { type ObjectMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/object-metadata-seed.type';

export const REFERENCE_COUNTER_CUSTOM_OBJECT_SEED: ObjectMetadataSeed = {
  labelPlural: 'Reference Counters',
  labelSingular: 'Reference Counter',
  namePlural: 'referenceCounters',
  nameSingular: 'referenceCounter',
  icon: 'IconSortAscendingNumbers',
  description:
    'Sequential numbering counters per document type prefix and year',
  skipNameField: true,
};
