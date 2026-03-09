import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { useCombinedGetTotalCount } from '@/object-record/multiple-objects/hooks/useCombinedGetTotalCount';
import { PageBody } from '@/ui/layout/page/components/PageBody';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import { PageHeader } from '@/ui/layout/page/components/PageHeader';
import { styled } from '@linaria/react';
import { AppPath } from 'twenty-shared/types';
import { getAppPath } from 'twenty-shared/utils';
import {
  H2Title,
  type IconComponent,
  IconChevronRight,
  Info,
} from 'twenty-ui/display';
import { Card, CardContent, Section } from 'twenty-ui/layout';
import { UndecoratedLink } from 'twenty-ui/navigation';
import { MOBILE_VIEWPORT, themeCssVariables } from 'twenty-ui/theme-constants';

type StcModuleLink = {
  objectNamePlural: string;
  fallbackLabel: string;
  description: string;
  Icon: IconComponent;
  to?: string;
};

type StcModuleSection = {
  title: string;
  description: string;
  links: StcModuleLink[];
};

type StcModulePageProps = {
  title: string;
  emptyStateText: string;
  Icon: IconComponent;
  sections: StcModuleSection[];
};

type ResolvedStcModuleLink = {
  count?: number;
  description: string;
  Icon: IconComponent;
  key: string;
  label: string;
  to: string;
};

type ResolvedStcModuleSection = {
  description: string;
  links: ResolvedStcModuleLink[];
  title: string;
};

const StyledPageContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[6]};
  overflow-y: auto;
  padding: ${themeCssVariables.spacing[5]};

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    padding: ${themeCssVariables.spacing[3]};
  }
`;

const StyledSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledLinkContainer = styled.div`
  > a {
    color: inherit;
    display: block;
  }
`;

const StyledRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
  min-height: ${themeCssVariables.spacing[8]};
`;

const StyledIconContainer = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  min-width: 0;
`;

const StyledLabel = styled.div`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledDescription = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
  line-height: 1.5;
`;

const StyledRightContainer = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledCount = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

export const StcModulePage = ({
  title,
  emptyStateText,
  Icon,
  sections,
}: StcModulePageProps) => {
  const { findActiveObjectMetadataItemByNamePlural } =
    useFilteredObjectMetadataItems();
  const { totalCountByObjectMetadataItemNamePlural } =
    useCombinedGetTotalCount();

  const resolvedSections: ResolvedStcModuleSection[] = sections
    .map((section) => ({
      ...section,
      links: section.links
        .map((link) => {
          const objectMetadataItem = findActiveObjectMetadataItemByNamePlural(
            link.objectNamePlural,
          );

          if (!objectMetadataItem) {
            return null;
          }

          return {
            count:
              totalCountByObjectMetadataItemNamePlural[link.objectNamePlural],
            description: link.description,
            Icon: link.Icon,
            key: link.objectNamePlural,
            label: objectMetadataItem.labelPlural || link.fallbackLabel,
            to:
              link.to ??
              getAppPath(AppPath.RecordIndexPage, {
                objectNamePlural: objectMetadataItem.namePlural,
              }),
          };
        })
        .filter(
          (link): link is ResolvedStcModuleLink => link !== null,
        ),
    }))
    .filter((section) => section.links.length > 0);

  return (
    <PageContainer>
      <PageHeader title={title} Icon={Icon} />
      <PageBody>
        <StyledPageContent>
          {resolvedSections.length === 0 ? (
            <Info text={emptyStateText} />
          ) : (
            resolvedSections.map((section) => (
              <StyledSectionContainer key={section.title}>
                <Section>
                  <H2Title
                    title={section.title}
                    description={section.description}
                  />
                  <Card fullWidth rounded>
                    {section.links.map((link, index) => (
                      <StyledLinkContainer key={link.key}>
                        <UndecoratedLink to={link.to} fullWidth>
                          <CardContent
                            divider={index < section.links.length - 1}
                            isClickable
                            hasHoverHighlight
                          >
                            <StyledRow>
                              <StyledIconContainer>
                                <link.Icon size={16} />
                              </StyledIconContainer>
                              <StyledTextContainer>
                                <StyledLabel>{link.label}</StyledLabel>
                                <StyledDescription>
                                  {link.description}
                                </StyledDescription>
                              </StyledTextContainer>
                              <StyledRightContainer>
                                <StyledCount>{link.count ?? 0}</StyledCount>
                                <IconChevronRight size={16} />
                              </StyledRightContainer>
                            </StyledRow>
                          </CardContent>
                        </UndecoratedLink>
                      </StyledLinkContainer>
                    ))}
                  </Card>
                </Section>
              </StyledSectionContainer>
            ))
          )}
        </StyledPageContent>
      </PageBody>
    </PageContainer>
  );
};
