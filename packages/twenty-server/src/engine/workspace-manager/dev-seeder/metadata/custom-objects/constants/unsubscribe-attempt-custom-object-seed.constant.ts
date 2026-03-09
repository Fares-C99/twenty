import { type ObjectMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/object-metadata-seed.type';

export const UNSUBSCRIBE_ATTEMPT_CUSTOM_OBJECT_SEED: ObjectMetadataSeed = {
  labelPlural: 'Unsubscribe Attempts',
  labelSingular: 'Unsubscribe Attempt',
  namePlural: 'unsubscribeAttempts',
  nameSingular: 'unsubscribeAttempt',
  icon: 'IconMailOff',
  description: 'Tracking of newsletter unsubscribe attempts and outcomes',
  skipNameField: true,
};
