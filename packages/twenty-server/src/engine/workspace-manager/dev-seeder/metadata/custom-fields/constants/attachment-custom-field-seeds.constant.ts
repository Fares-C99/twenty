import { FieldMetadataType } from 'twenty-shared/types';

import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

export const ATTACHMENT_CUSTOM_FIELD_SEEDS: FieldMetadataSeed[] = [
  {
    type: FieldMetadataType.TEXT,
    name: 'filename',
    label: 'Filename',
    icon: 'IconFile',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'filepath',
    label: 'File Path',
    icon: 'IconFolder',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'fileType',
    label: 'File Type',
    icon: 'IconFileTypography',
  },
  {
    type: FieldMetadataType.NUMBER,
    name: 'fileSize',
    label: 'File Size',
    icon: 'IconDatabase',
  },
  {
    type: FieldMetadataType.SELECT,
    name: 'category',
    label: 'Category',
    icon: 'IconCategory',
    options: [
      {
        label: 'Email Attachment',
        value: 'EMAIL_ATTACHMENT',
        position: 0,
        color: 'blue',
      },
      {
        label: 'Case File',
        value: 'CASE_FILE',
        position: 1,
        color: 'green',
      },
      {
        label: 'Generated PDF',
        value: 'GENERATED_PDF',
        position: 2,
        color: 'purple',
      },
      { label: 'Upload', value: 'UPLOAD', position: 3, color: 'gray' },
    ],
  },
  {
    type: FieldMetadataType.RICH_TEXT,
    name: 'ocrText',
    label: 'OCR Text',
    icon: 'IconScan',
  },
  {
    type: FieldMetadataType.TEXT,
    name: 'storagePath',
    label: 'Storage Path',
    icon: 'IconCloud',
  },
];
