import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { NavigationDrawerAnimatedCollapseWrapper } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerAnimatedCollapseWrapper';
import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';
import { useNavigationSection } from '@/ui/navigation/navigation-drawer/hooks/useNavigationSection';
import { useLocation } from 'react-router-dom';
import { AppPath } from 'twenty-shared/types';
import { getAppPath, isDefined } from 'twenty-shared/utils';
import {
  IconFileText,
  IconInbox,
  IconMoneybag,
  useIcons,
} from 'twenty-ui/display';
import { AnimatedExpandableContainer } from 'twenty-ui/layout';
import { useLingui } from '@lingui/react/macro';

const STC_NAVIGATION_SECTION_ID = 'STC';

export const StcNavigationDrawerSection = () => {
  const { t } = useLingui();
  const location = useLocation();
  const { getIcon } = useIcons();
  const { findActiveObjectMetadataItemByNamePlural } =
    useFilteredObjectMetadataItems();
  const { isNavigationSectionOpen, toggleNavigationSection } =
    useNavigationSection(STC_NAVIGATION_SECTION_ID);

  const conversationsObjectMetadataItem =
    findActiveObjectMetadataItemByNamePlural('conversations');
  const opportunitiesObjectMetadataItem =
    findActiveObjectMetadataItemByNamePlural('opportunities');

  if (!isDefined(conversationsObjectMetadataItem)) {
    return null;
  }

  const isObjectRouteActive = ({
    objectNamePlural,
    objectNameSingular,
  }: {
    objectNamePlural: string;
    objectNameSingular: string;
  }) =>
    location.pathname ===
      getAppPath(AppPath.RecordIndexPage, { objectNamePlural }) ||
    location.pathname.startsWith(`/object/${objectNameSingular}/`);

  return (
    <NavigationDrawerSection>
      <NavigationDrawerAnimatedCollapseWrapper>
        <NavigationDrawerSectionTitle
          label={t`STC`}
          onClick={toggleNavigationSection}
          isOpen={isNavigationSectionOpen}
        />
      </NavigationDrawerAnimatedCollapseWrapper>
      <AnimatedExpandableContainer
        isExpanded={isNavigationSectionOpen}
        dimension="height"
        mode="fit-content"
        containAnimation
        initial={false}
      >
        <NavigationDrawerItem
          label={t`Inbox`}
          to={AppPath.InboxPage}
          Icon={IconInbox}
          active={location.pathname === AppPath.InboxPage}
        />
        <NavigationDrawerItem
          label={conversationsObjectMetadataItem.labelPlural}
          to={getAppPath(AppPath.RecordIndexPage, {
            objectNamePlural: conversationsObjectMetadataItem.namePlural,
          })}
          Icon={getIcon(conversationsObjectMetadataItem.icon)}
          active={isObjectRouteActive({
            objectNamePlural: conversationsObjectMetadataItem.namePlural,
            objectNameSingular: conversationsObjectMetadataItem.nameSingular,
          })}
        />
        {isDefined(opportunitiesObjectMetadataItem) && (
          <NavigationDrawerItem
            label={opportunitiesObjectMetadataItem.labelPlural}
            to={AppPath.OpportunitiesPage}
            Icon={getIcon(opportunitiesObjectMetadataItem.icon)}
            active={isObjectRouteActive({
              objectNamePlural: opportunitiesObjectMetadataItem.namePlural,
              objectNameSingular: opportunitiesObjectMetadataItem.nameSingular,
            })}
          />
        )}
        <NavigationDrawerItem
          label={t`Documents`}
          to={AppPath.DocumentsPage}
          Icon={IconFileText}
          active={location.pathname === AppPath.DocumentsPage}
        />
        <NavigationDrawerItem
          label={t`Treasury`}
          to={AppPath.TreasuryPage}
          Icon={IconMoneybag}
          active={location.pathname === AppPath.TreasuryPage}
        />
      </AnimatedExpandableContainer>
    </NavigationDrawerSection>
  );
};
