import { FieldMetadataType, RelationType } from 'twenty-shared/types';

import { ATTACHMENT_CUSTOM_OBJECT_SEED } from 'src/engine/workspace-manager/dev-seeder/metadata/custom-objects/constants/attachment-custom-object-seed.constant';
import { BANK_ACCOUNT_CUSTOM_OBJECT_SEED } from 'src/engine/workspace-manager/dev-seeder/metadata/custom-objects/constants/bank-account-custom-object-seed.constant';
import { BUSINESS_DOCUMENT_CUSTOM_OBJECT_SEED } from 'src/engine/workspace-manager/dev-seeder/metadata/custom-objects/constants/business-document-custom-object-seed.constant';
import { CHEQUE_CUSTOM_OBJECT_SEED } from 'src/engine/workspace-manager/dev-seeder/metadata/custom-objects/constants/cheque-custom-object-seed.constant';
import { CONVERSATION_CUSTOM_OBJECT_SEED } from 'src/engine/workspace-manager/dev-seeder/metadata/custom-objects/constants/conversation-custom-object-seed.constant';
import { DEAL_CONVERSATION_CUSTOM_OBJECT_SEED } from 'src/engine/workspace-manager/dev-seeder/metadata/custom-objects/constants/deal-conversation-custom-object-seed.constant';
import { DOCUMENT_LINE_CUSTOM_OBJECT_SEED } from 'src/engine/workspace-manager/dev-seeder/metadata/custom-objects/constants/document-line-custom-object-seed.constant';
import { EMAIL_MESSAGE_CUSTOM_OBJECT_SEED } from 'src/engine/workspace-manager/dev-seeder/metadata/custom-objects/constants/email-message-custom-object-seed.constant';
import { PAYMENT_CUSTOM_OBJECT_SEED } from 'src/engine/workspace-manager/dev-seeder/metadata/custom-objects/constants/payment-custom-object-seed.constant';
import { SENDER_POLICY_CUSTOM_OBJECT_SEED } from 'src/engine/workspace-manager/dev-seeder/metadata/custom-objects/constants/sender-policy-custom-object-seed.constant';
import { TIMELINE_EVENT_CUSTOM_OBJECT_SEED } from 'src/engine/workspace-manager/dev-seeder/metadata/custom-objects/constants/timeline-event-custom-object-seed.constant';
import { TRAITE_CUSTOM_OBJECT_SEED } from 'src/engine/workspace-manager/dev-seeder/metadata/custom-objects/constants/traite-custom-object-seed.constant';
import { UNSUBSCRIBE_ATTEMPT_CUSTOM_OBJECT_SEED } from 'src/engine/workspace-manager/dev-seeder/metadata/custom-objects/constants/unsubscribe-attempt-custom-object-seed.constant';
import { type FieldMetadataSeed } from 'src/engine/workspace-manager/dev-seeder/metadata/types/field-metadata-seed.type';

type JunctionFieldSeed = {
  sourceObjectName: string;
  name: string;
  label: string;
  icon: string;
  targetObjectName: string;
  targetFieldLabel: string;
  targetFieldIcon: string;
};

type JunctionConfigSeed = {
  objectName: string;
  fieldName: string;
  junctionTargetFieldRef: string;
  label?: string;
};

type MorphRelationSeed = FieldMetadataSeed & {
  targetObjectMetadataNames: string[];
};

type MorphRelationConfig = {
  objectName: string;
  seeds: MorphRelationSeed[];
};

// ONE_TO_MANY relations: source (one) → target (many)
// Each creates a field on source and an inverse field on target
export const STC_JUNCTION_FIELDS: JunctionFieldSeed[] = [
  // Company → Conversations
  {
    sourceObjectName: 'company',
    name: 'stcConversations',
    label: 'Conversations',
    icon: 'IconMessages',
    targetObjectName: CONVERSATION_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Company',
    targetFieldIcon: 'IconBuilding',
  },
  // Company → Business Documents
  {
    sourceObjectName: 'company',
    name: 'businessDocuments',
    label: 'Business Documents',
    icon: 'IconFileInvoice',
    targetObjectName: BUSINESS_DOCUMENT_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Company',
    targetFieldIcon: 'IconBuilding',
  },
  // Company → Payments
  {
    sourceObjectName: 'company',
    name: 'companyPayments',
    label: 'Payments',
    icon: 'IconCash',
    targetObjectName: PAYMENT_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Company',
    targetFieldIcon: 'IconBuilding',
  },
  // Company → Cheques
  {
    sourceObjectName: 'company',
    name: 'companyCheques',
    label: 'Cheques',
    icon: 'IconReceipt',
    targetObjectName: CHEQUE_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Company',
    targetFieldIcon: 'IconBuilding',
  },
  // Company → Traites
  {
    sourceObjectName: 'company',
    name: 'companyTraites',
    label: 'Traites',
    icon: 'IconFileDescription',
    targetObjectName: TRAITE_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Company',
    targetFieldIcon: 'IconBuilding',
  },
  // Company → Bank Accounts
  {
    sourceObjectName: 'company',
    name: 'companyBankAccounts',
    label: 'Bank Accounts',
    icon: 'IconBuildingBank',
    targetObjectName: BANK_ACCOUNT_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Company',
    targetFieldIcon: 'IconBuilding',
  },
  // Conversation → Email Messages
  {
    sourceObjectName: CONVERSATION_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'emailMessages',
    label: 'Email Messages',
    icon: 'IconMail',
    targetObjectName: EMAIL_MESSAGE_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Conversation',
    targetFieldIcon: 'IconMessages',
  },
  // Conversation → Attachments
  {
    sourceObjectName: CONVERSATION_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'conversationAttachments',
    label: 'Attachments',
    icon: 'IconPaperclip',
    targetObjectName: ATTACHMENT_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Conversation',
    targetFieldIcon: 'IconMessages',
  },
  // Email Message → Attachments
  {
    sourceObjectName: EMAIL_MESSAGE_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'messageAttachments',
    label: 'Attachments',
    icon: 'IconPaperclip',
    targetObjectName: ATTACHMENT_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Email Message',
    targetFieldIcon: 'IconMail',
  },
  // Business Document → Document Lines
  {
    sourceObjectName: BUSINESS_DOCUMENT_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'documentLines',
    label: 'Document Lines',
    icon: 'IconListNumbers',
    targetObjectName: DOCUMENT_LINE_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Business Document',
    targetFieldIcon: 'IconFileInvoice',
  },
  // Business Document → Child Documents (self-reference)
  {
    sourceObjectName: BUSINESS_DOCUMENT_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'childDocuments',
    label: 'Child Documents',
    icon: 'IconFiles',
    targetObjectName: BUSINESS_DOCUMENT_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Parent Document',
    targetFieldIcon: 'IconFileInvoice',
  },
  // Business Document → Payments
  {
    sourceObjectName: BUSINESS_DOCUMENT_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'documentPayments',
    label: 'Payments',
    icon: 'IconCash',
    targetObjectName: PAYMENT_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Business Document',
    targetFieldIcon: 'IconFileInvoice',
  },
  // Business Document → Cheques
  {
    sourceObjectName: BUSINESS_DOCUMENT_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'documentCheques',
    label: 'Cheques',
    icon: 'IconReceipt',
    targetObjectName: CHEQUE_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Invoice',
    targetFieldIcon: 'IconFileInvoice',
  },
  // Business Document → Traites
  {
    sourceObjectName: BUSINESS_DOCUMENT_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'documentTraites',
    label: 'Traites',
    icon: 'IconFileDescription',
    targetObjectName: TRAITE_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Invoice',
    targetFieldIcon: 'IconFileInvoice',
  },
  // Opportunity → Business Documents
  {
    sourceObjectName: 'opportunity',
    name: 'dealDocuments',
    label: 'Documents',
    icon: 'IconFileInvoice',
    targetObjectName: BUSINESS_DOCUMENT_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Deal',
    targetFieldIcon: 'IconTargetArrow',
  },
  // Opportunity → Payments
  {
    sourceObjectName: 'opportunity',
    name: 'dealPayments',
    label: 'Payments',
    icon: 'IconCash',
    targetObjectName: PAYMENT_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Deal',
    targetFieldIcon: 'IconTargetArrow',
  },
  // Sender Policy → Unsubscribe Attempts
  {
    sourceObjectName: SENDER_POLICY_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'unsubscribeAttempts',
    label: 'Unsubscribe Attempts',
    icon: 'IconMailOff',
    targetObjectName: UNSUBSCRIBE_ATTEMPT_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Sender Policy',
    targetFieldIcon: 'IconShieldCheck',
  },
  // Bank Account → Payments
  {
    sourceObjectName: BANK_ACCOUNT_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'bankPayments',
    label: 'Payments',
    icon: 'IconCash',
    targetObjectName: PAYMENT_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Bank Account',
    targetFieldIcon: 'IconBuildingBank',
  },
  // Bank Account → Cheques
  {
    sourceObjectName: BANK_ACCOUNT_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'bankCheques',
    label: 'Cheques',
    icon: 'IconReceipt',
    targetObjectName: CHEQUE_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Bank Account',
    targetFieldIcon: 'IconBuildingBank',
  },
  // Business Document → Conversation (document sourced from conversation)
  {
    sourceObjectName: CONVERSATION_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'sourceDocuments',
    label: 'Documents',
    icon: 'IconFileInvoice',
    targetObjectName: BUSINESS_DOCUMENT_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Source Conversation',
    targetFieldIcon: 'IconMessages',
  },
  // Unsubscribe Attempt → Email Message
  {
    sourceObjectName: EMAIL_MESSAGE_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'unsubscribeAttempts',
    label: 'Unsubscribe Attempts',
    icon: 'IconMailOff',
    targetObjectName: UNSUBSCRIBE_ATTEMPT_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Email Message',
    targetFieldIcon: 'IconMail',
  },
  // Deal ↔ Conversation junction: Opportunity → DealConversation
  {
    sourceObjectName: 'opportunity',
    name: 'dealConversations',
    label: 'Deal Conversations',
    icon: 'IconMessages',
    targetObjectName: DEAL_CONVERSATION_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Deal',
    targetFieldIcon: 'IconTargetArrow',
  },
  // Deal ↔ Conversation junction: Conversation → DealConversation
  {
    sourceObjectName: CONVERSATION_CUSTOM_OBJECT_SEED.nameSingular,
    name: 'linkedDeals',
    label: 'Linked Deals',
    icon: 'IconTargetArrow',
    targetObjectName: DEAL_CONVERSATION_CUSTOM_OBJECT_SEED.nameSingular,
    targetFieldLabel: 'Conversation',
    targetFieldIcon: 'IconMessages',
  },
];

// Junction configs: configure many-to-many traversal through junction objects
export const STC_JUNCTION_CONFIGS: JunctionConfigSeed[] = [
  {
    objectName: 'opportunity',
    fieldName: 'dealConversations',
    junctionTargetFieldRef: `${DEAL_CONVERSATION_CUSTOM_OBJECT_SEED.nameSingular}.conversation`,
  },
  {
    objectName: CONVERSATION_CUSTOM_OBJECT_SEED.nameSingular,
    fieldName: 'linkedDeals',
    junctionTargetFieldRef: `${DEAL_CONVERSATION_CUSTOM_OBJECT_SEED.nameSingular}.deal`,
  },
];

// Morph (polymorphic) relations for TimelineEvent
export const STC_MORPH_RELATIONS: MorphRelationConfig[] = [
  {
    objectName: TIMELINE_EVENT_CUSTOM_OBJECT_SEED.nameSingular,
    seeds: [
      {
        type: FieldMetadataType.MORPH_RELATION,
        label: 'Related Entity',
        name: 'relatedEntity',
        icon: 'IconLink',
        morphRelationsCreationPayload: [
          {
            type: RelationType.MANY_TO_ONE,
            targetObjectMetadataId: 'to-be-resolved-later',
            targetFieldLabel: 'Timeline Events',
            targetFieldIcon: 'IconTimeline',
          },
        ],
        targetObjectMetadataNames: [
          CONVERSATION_CUSTOM_OBJECT_SEED.nameSingular,
          'opportunity',
          BUSINESS_DOCUMENT_CUSTOM_OBJECT_SEED.nameSingular,
          PAYMENT_CUSTOM_OBJECT_SEED.nameSingular,
        ],
      },
    ],
  },
];
