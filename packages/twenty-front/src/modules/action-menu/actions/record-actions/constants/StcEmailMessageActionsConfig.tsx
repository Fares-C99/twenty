import { SingleRecordActionKeys } from '@/action-menu/actions/record-actions/single-record/types/SingleRecordActionsKey';
import { inheritActionsFromDefaultConfig } from '@/action-menu/actions/record-actions/utils/inheritActionsFromDefaultConfig';
import { ActionScope } from '@/action-menu/actions/types/ActionScope';
import { ActionType } from '@/action-menu/actions/types/ActionType';
import { ActionViewType } from 'twenty-shared/types';
import { msg } from '@lingui/core/macro';
import { IconSearch, IconSparkles } from 'twenty-ui/display';

import { AnalyzeEmailMessageSingleRecordAction } from '@/action-menu/actions/record-actions/single-record/stc-email-message-actions/components/AnalyzeEmailMessageSingleRecordAction';
import { SummarizeEmailMessageSingleRecordAction } from '@/action-menu/actions/record-actions/single-record/stc-email-message-actions/components/SummarizeEmailMessageSingleRecordAction';
import { StcEmailMessageSingleRecordActionKeys } from '@/action-menu/actions/record-actions/single-record/stc-email-message-actions/types/StcEmailMessageSingleRecordActionKeys';

export const STC_EMAIL_MESSAGE_ACTIONS_CONFIG =
  inheritActionsFromDefaultConfig({
    config: {
      [StcEmailMessageSingleRecordActionKeys.SUMMARIZE]: {
        key: StcEmailMessageSingleRecordActionKeys.SUMMARIZE,
        label: msg`Summarize email`,
        shortLabel: msg`Summarize`,
        description: msg`Generate a short operational summary on the email record.`,
        isPinned: true,
        position: 3,
        Icon: IconSparkles,
        type: ActionType.Standard,
        scope: ActionScope.RecordSelection,
        shouldBeRegistered: ({ selectedRecord }) => !!selectedRecord,
        availableOn: [
          ActionViewType.SHOW_PAGE,
          ActionViewType.INDEX_PAGE_SINGLE_RECORD_SELECTION,
        ],
        component: <SummarizeEmailMessageSingleRecordAction />,
      },
      [StcEmailMessageSingleRecordActionKeys.ANALYZE]: {
        key: StcEmailMessageSingleRecordActionKeys.ANALYZE,
        label: msg`Analyze email`,
        shortLabel: msg`Analyze`,
        description: msg`Classify the email and extract STC references.`,
        isPinned: true,
        position: 4,
        Icon: IconSearch,
        type: ActionType.Standard,
        scope: ActionScope.RecordSelection,
        shouldBeRegistered: ({ selectedRecord }) => !!selectedRecord,
        availableOn: [
          ActionViewType.SHOW_PAGE,
          ActionViewType.INDEX_PAGE_SINGLE_RECORD_SELECTION,
        ],
        component: <AnalyzeEmailMessageSingleRecordAction />,
      },
    },
    actionKeys: [
      SingleRecordActionKeys.NAVIGATE_TO_PREVIOUS_RECORD,
      SingleRecordActionKeys.NAVIGATE_TO_NEXT_RECORD,
      SingleRecordActionKeys.DELETE,
      SingleRecordActionKeys.RESTORE,
      SingleRecordActionKeys.DESTROY,
      SingleRecordActionKeys.ADD_TO_FAVORITES,
      SingleRecordActionKeys.REMOVE_FROM_FAVORITES,
      SingleRecordActionKeys.EXPORT_FROM_RECORD_INDEX,
      SingleRecordActionKeys.EXPORT_FROM_RECORD_SHOW,
    ],
    propertiesToOverwrite: {
      [SingleRecordActionKeys.NAVIGATE_TO_PREVIOUS_RECORD]: {
        position: 0,
      },
      [SingleRecordActionKeys.NAVIGATE_TO_NEXT_RECORD]: {
        position: 1,
      },
      [SingleRecordActionKeys.DELETE]: {
        position: 5,
      },
      [SingleRecordActionKeys.ADD_TO_FAVORITES]: {
        position: 6,
        isPinned: false,
      },
      [SingleRecordActionKeys.REMOVE_FROM_FAVORITES]: {
        position: 6,
        isPinned: false,
      },
      [SingleRecordActionKeys.EXPORT_FROM_RECORD_INDEX]: {
        position: 7,
      },
      [SingleRecordActionKeys.EXPORT_FROM_RECORD_SHOW]: {
        position: 7,
      },
      [SingleRecordActionKeys.RESTORE]: {
        position: 8,
      },
      [SingleRecordActionKeys.DESTROY]: {
        position: 9,
      },
    },
  });
