import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const OPPORTUNITY_STC_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.TEXT,
    name: 'nextAction',
    label: 'Next Action',
    icon: 'IconPlayerPlay',
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'riskLevel',
    label: 'Risk Level',
    icon: 'IconAlertTriangle',
    options: [
      { label: 'Low', value: 'LOW', position: 0, color: 'green' },
      { label: 'Medium', value: 'MEDIUM', position: 1, color: 'yellow' },
      { label: 'High', value: 'HIGH', position: 2, color: 'red' },
    ],
  },
  {
    type: FieldMetadataType.RICH_TEXT,
    name: 'aiSummary',
    label: 'AI Summary',
    icon: 'IconSparkles',
  },
  {
    type: FieldMetadataType.RAW_JSON,
    name: 'aiAnalysis',
    label: 'AI Analysis',
    icon: 'IconSparkles',
  },
  {
    type: FieldMetadataType.RAW_JSON,
    name: 'products',
    label: 'Products',
    icon: 'IconPackage',
  },
  {
    type: FieldMetadataType.RAW_JSON,
    name: 'keyContacts',
    label: 'Key Contacts',
    icon: 'IconUsers',
  },
  {
    type: FieldMetadataType.RAW_JSON,
    name: 'financialSummary',
    label: 'Financial Summary',
    icon: 'IconReportMoney',
  },
  {
    type: FieldMetadataType.RAW_JSON,
    name: 'documentRefs',
    label: 'Document References',
    icon: 'IconFileInvoice',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'ocrContext',
    label: 'OCR Context',
    icon: 'IconScan',
  },
  {
    type: FieldMetadataType.DATE,
    name: 'lastActivityAt',
    label: 'Last Activity At',
    icon: 'IconClock',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'dealSource',
    label: 'Deal Source',
    icon: 'IconArrowRight',
  },
  {
    type: FieldMetadataType.BOOLEAN,
    name: 'isActive',
    label: 'Is Active',
    icon: 'IconToggleLeft',
    defaultValue: true,
  },
];
