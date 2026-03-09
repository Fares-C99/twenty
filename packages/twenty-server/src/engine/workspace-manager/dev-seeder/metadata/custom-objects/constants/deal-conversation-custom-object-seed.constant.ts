import { type ObjectMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/object-metadata-seed.type';

export const DEAL_CONVERSATION_CUSTOM_OBJECT_SEED: ObjectMetadataSeed = {
  labelPlural: 'Deal Conversations',
  labelSingular: 'Deal Conversation',
  namePlural: 'dealConversations',
  nameSingular: 'dealConversation',
  icon: 'IconLink',
  description: 'Junction linking deals to conversations',
  skipNameField: true,
};
