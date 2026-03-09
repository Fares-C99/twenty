import { type ObjectMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/object-metadata-seed.type';

export const PAYMENT_CUSTOM_OBJECT_SEED: ObjectMetadataSeed = {
  labelPlural: 'Payments',
  labelSingular: 'Payment',
  namePlural: 'stcPayments',
  nameSingular: 'stcPayment',
  icon: 'IconCash',
  description: 'Payment records linked to invoices, deals, and companies',
};
