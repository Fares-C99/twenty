import { type ObjectRecord } from '@/object-record/types/ObjectRecord';

type EmailMessageInsight = {
  aiCategory:
    | 'INQUIRY'
    | 'QUOTE_REQUEST'
    | 'NEGOTIATION'
    | 'ORDER'
    | 'PAYMENT'
    | 'SHIPPING'
    | 'SPARE_PARTS'
    | 'TECHNICAL_SUPPORT'
    | 'COMPLAINT'
    | 'OTHER';
  aiSummary: string;
  stcRefs: string[];
};

const SENTENCE_BREAK = /(?<=[.!?])\s+/;
const REF_MATCH = /\b[A-Z0-9][A-Z0-9/-]{3,}\b/g;

const CATEGORY_RULES: Array<{
  category: EmailMessageInsight['aiCategory'];
  keywords: string[];
}> = [
  {
    category: 'PAYMENT',
    keywords: ['payment', 'paiement', 'virement', 'cheque', 'traite'],
  },
  {
    category: 'ORDER',
    keywords: ['purchase order', 'bon de commande', 'commande', 'order confirmation'],
  },
  {
    category: 'QUOTE_REQUEST',
    keywords: ['quote', 'quotation', 'devis', 'rfq', 'offer request'],
  },
  {
    category: 'NEGOTIATION',
    keywords: ['discount', 'remise', 'prix', 'price revision', 'negotiat'],
  },
  {
    category: 'SHIPPING',
    keywords: ['shipping', 'shipment', 'livraison', 'delivery', 'transit', 'expedition'],
  },
  {
    category: 'SPARE_PARTS',
    keywords: ['spare part', 'spare parts', 'piece', 'pieces', 'part number', 'reference'],
  },
  {
    category: 'TECHNICAL_SUPPORT',
    keywords: ['support', 'maintenance', 'panne', 'technician', 'breakdown', 'intervention'],
  },
  {
    category: 'COMPLAINT',
    keywords: ['complaint', 'claim', 'reclamation', 'problem', 'issue', 'urgent'],
  },
];

const normalizeWhitespace = (value: string) =>
  value.replace(/\s+/g, ' ').trim();

const collectText = (value: unknown): string[] => {
  if (typeof value === 'string') {
    const trimmedValue = value.trim();

    if (
      (trimmedValue.startsWith('{') && trimmedValue.endsWith('}')) ||
      (trimmedValue.startsWith('[') && trimmedValue.endsWith(']'))
    ) {
      try {
        return collectText(JSON.parse(trimmedValue));
      } catch {
        return [trimmedValue];
      }
    }

    return [trimmedValue];
  }

  if (Array.isArray(value)) {
    return value.flatMap((entry) => collectText(entry));
  }

  if (value && typeof value === 'object') {
    return Object.values(value).flatMap((entry) => collectText(entry));
  }

  return [];
};

const toPlainText = (value: unknown): string =>
  normalizeWhitespace(collectText(value).join(' '));

const guessCategory = (content: string): EmailMessageInsight['aiCategory'] => {
  const normalizedContent = content.toLowerCase();

  for (const rule of CATEGORY_RULES) {
    if (
      rule.keywords.some((keyword) =>
        normalizedContent.includes(keyword.toLowerCase()),
      )
    ) {
      return rule.category;
    }
  }

  return normalizedContent.length > 0 ? 'INQUIRY' : 'OTHER';
};

const buildSummary = ({
  bodyText,
  fromName,
  fromAddress,
  subject,
}: {
  bodyText: string;
  fromAddress: string;
  fromName: string;
  subject: string;
}) => {
  const excerpt = bodyText
    .split(SENTENCE_BREAK)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0)
    .slice(0, 2)
    .join(' ');

  const sender = fromName || fromAddress || 'Unknown sender';

  if (excerpt.length === 0) {
    return `${subject || 'Email'} from ${sender}.`;
  }

  const trimmedExcerpt =
    excerpt.length > 220 ? `${excerpt.slice(0, 217).trimEnd()}...` : excerpt;

  return `${subject || 'Email'} from ${sender}. ${trimmedExcerpt}`;
};

const extractReferences = (content: string, existingRefs: string[]) => {
  const extractedRefs = content.match(REF_MATCH) ?? [];

  return Array.from(
    new Set(
      [...existingRefs, ...extractedRefs]
        .map((value) => value.trim())
        .filter((value) => value.length >= 4),
    ),
  ).slice(0, 8);
};

export const buildEmailMessageInsights = (
  record: ObjectRecord,
): EmailMessageInsight => {
  const subject = normalizeWhitespace(String(record.subject ?? ''));
  const fromName = normalizeWhitespace(String(record.fromName ?? ''));
  const fromAddress = normalizeWhitespace(
    toPlainText(record.fromAddress).replace(/\s+/g, ', '),
  );
  const bodyText = toPlainText(record.bodyText);
  const combinedContent = normalizeWhitespace(`${subject} ${bodyText}`);

  return {
    aiCategory: guessCategory(combinedContent),
    aiSummary: buildSummary({
      bodyText,
      fromAddress,
      fromName,
      subject,
    }),
    stcRefs: extractReferences(
      combinedContent,
      Array.isArray(record.stcRefs)
        ? record.stcRefs
            .map((value) => (typeof value === 'string' ? value : ''))
            .filter((value) => value.length > 0)
        : [],
    ),
  };
};
