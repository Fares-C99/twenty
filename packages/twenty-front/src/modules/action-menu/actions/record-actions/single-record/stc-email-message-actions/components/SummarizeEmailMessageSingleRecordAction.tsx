import { Action } from '@/action-menu/actions/components/Action';
import { useSelectedRecordIdOrThrow } from '@/action-menu/actions/record-actions/single-record/hooks/useSelectedRecordIdOrThrow';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { useAtomFamilyStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomFamilyStateValue';
import { useLingui } from '@lingui/react/macro';
import { isDefined } from 'twenty-shared/utils';

import { buildEmailMessageInsights } from '../utils/buildEmailMessageInsights';

export const SummarizeEmailMessageSingleRecordAction = () => {
  const recordId = useSelectedRecordIdOrThrow();
  const emailMessage = useAtomFamilyStateValue(recordStoreFamilyState, recordId);
  const { updateOneRecord } = useUpdateOneRecord();
  const { enqueueErrorSnackBar, enqueueSuccessSnackBar } = useSnackBar();
  const { t } = useLingui();

  const handleClick = async () => {
    if (!isDefined(emailMessage)) {
      enqueueErrorSnackBar({
        message: t`Email message could not be loaded.`,
      });

      return;
    }

    try {
      const { aiSummary } = buildEmailMessageInsights(emailMessage);

      await updateOneRecord({
        objectNameSingular: 'emailMessage',
        idToUpdate: recordId,
        updateOneRecordInput: {
          aiSummary,
        },
      });

      enqueueSuccessSnackBar({
        message: t`Email summary updated.`,
      });
    } catch {
      enqueueErrorSnackBar({
        message: t`Failed to summarize this email.`,
      });
    }
  };

  return <Action onClick={handleClick} />;
};
