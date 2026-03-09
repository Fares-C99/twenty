import { t } from '@lingui/core/macro';
import {
  IconBuildingSkyscraper,
  IconCoins,
  IconCreditCard,
  IconFileText,
  IconMoneybag,
} from 'twenty-ui/display';

import { StcModulePage } from './components/StcModulePage';

export const Treasury = () => {
  return (
    <StcModulePage
      title={t`Treasury`}
      emptyStateText={t`STC treasury objects are not available in this workspace yet.`}
      Icon={IconMoneybag}
      sections={[
        {
          title: t`Treasury Records`,
          description: t`Navigate the payment and banking objects created by the STC metadata seeder.`,
          links: [
            {
              objectNamePlural: 'stcPayments',
              fallbackLabel: t`Payments`,
              description: t`Track payment records and settlement details.`,
              Icon: IconCreditCard,
            },
            {
              objectNamePlural: 'cheques',
              fallbackLabel: t`Cheques`,
              description: t`Review cheque lifecycles and statuses.`,
              Icon: IconFileText,
            },
            {
              objectNamePlural: 'traites',
              fallbackLabel: t`Traites`,
              description: t`Manage traite records in the treasury workflow.`,
              Icon: IconCoins,
            },
            {
              objectNamePlural: 'stcBankAccounts',
              fallbackLabel: t`Bank Accounts`,
              description: t`Browse the bank accounts linked to treasury operations.`,
              Icon: IconBuildingSkyscraper,
            },
          ],
        },
      ]}
    />
  );
};
