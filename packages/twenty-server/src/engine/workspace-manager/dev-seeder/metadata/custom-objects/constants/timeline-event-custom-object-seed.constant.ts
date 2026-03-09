import { type ObjectMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/object-metadata-seed.type';

export const TIMELINE_EVENT_CUSTOM_OBJECT_SEED: ObjectMetadataSeed = {
  labelPlural: 'Timeline Events',
  labelSingular: 'Timeline Event',
  namePlural: 'stcTimelineEvents',
  nameSingular: 'stcTimelineEvent',
  icon: 'IconTimeline',
  description:
    'Chronological activity stream for deals, conversations, and documents',
  skipNameField: true,
};
