import { t } from '@lingui/core/macro';
import {
  IconFile,
  IconFileText,
  IconListDetails,
  IconNumber123,
} from 'twenty-ui/display';

import { StcModulePage } from './components/StcModulePage';

export const Documents = () => {
  return (
    <StcModulePage
      title={t`Documents`}
      emptyStateText={t`STC document objects are not available in this workspace yet.`}
      Icon={IconFileText}
      sections={[
        {
          title: t`Document Operations`,
          description: t`Access the document objects seeded for business and accounting flows.`,
          links: [
            {
              objectNamePlural: 'businessDocuments',
              fallbackLabel: t`Business Documents`,
              description: t`Open issued documents and document-level metadata.`,
              Icon: IconFile,
            },
            {
              objectNamePlural: 'documentLines',
              fallbackLabel: t`Document Lines`,
              description: t`Inspect the individual lines attached to business documents.`,
              Icon: IconListDetails,
            },
            {
              objectNamePlural: 'referenceCounters',
              fallbackLabel: t`Reference Counters`,
              description: t`Monitor numbering sequences used by generated documents.`,
              Icon: IconNumber123,
            },
          ],
        },
      ]}
    />
  );
};
