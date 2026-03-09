import { type ObjectMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/object-metadata-seed.type';

export const DOCUMENT_LINE_CUSTOM_OBJECT_SEED: ObjectMetadataSeed = {
  labelPlural: 'Document Lines',
  labelSingular: 'Document Line',
  namePlural: 'documentLines',
  nameSingular: 'documentLine',
  icon: 'IconListNumbers',
  description: 'Line items within a business document',
  skipNameField: true,
};
