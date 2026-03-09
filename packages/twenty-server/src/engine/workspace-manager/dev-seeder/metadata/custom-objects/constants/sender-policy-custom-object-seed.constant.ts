import { type ObjectMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/object-metadata-seed.type';

export const SENDER_POLICY_CUSTOM_OBJECT_SEED: ObjectMetadataSeed = {
  labelPlural: 'Sender Policies',
  labelSingular: 'Sender Policy',
  namePlural: 'senderPolicies',
  nameSingular: 'senderPolicy',
  icon: 'IconShieldCheck',
  description:
    'Email sender classification rules: allow, block, or mark as newsletter',
};
