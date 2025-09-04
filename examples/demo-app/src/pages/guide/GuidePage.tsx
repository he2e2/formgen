import React, { useState } from 'react';
import { GuideSidebar } from './GuideSideBar';
import { guideCategories } from './data';
import type { GuideSection } from './types';
import {
  InstallationContent,
  BasicUsageContent,
  LanguageSetupContent,
  TextFieldsContent,
  NumberFieldsContent,
  ChoiceFieldsContent,
  DateFieldsContent,
  LayoutContent,
  FieldComparisonContent,
  ConditionalFieldsContent,
  StylingContent,
} from './content';

const getContentComponent = (sectionId: string) => {
  const contentMap: Record<string, React.ComponentType> = {
    installation: InstallationContent,
    'basic-usage': BasicUsageContent,
    'language-setup': LanguageSetupContent,
    'text-fields': TextFieldsContent,
    'number-fields': NumberFieldsContent,
    'choice-fields': ChoiceFieldsContent,
    'date-fields': DateFieldsContent,
    'basic-layout': LayoutContent,
    'tab-layout': LayoutContent,
    'accordion-layout': LayoutContent,
    'field-comparison': FieldComparisonContent,
    'conditional-fields': ConditionalFieldsContent,
    styling: StylingContent,
  };

  const ContentComponent = contentMap[sectionId];

  if (ContentComponent) {
    return <ContentComponent />;
  }

  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        준비 중입니다
      </h2>
      <p className="text-gray-500">
        이 섹션의 내용은 곧 업데이트될 예정입니다.
      </p>
    </div>
  );
};

export const GuidePage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<GuideSection | null>(
    guideCategories[0].sections[0]
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <GuideSidebar
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
      />

      <div className="flex-1">
        {selectedSection ? (
          <div className="p-8 max-w-4xl mx-auto">
            {getContentComponent(selectedSection.id)}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                가이드 섹션을 선택하세요
              </h2>
              <p className="text-gray-500">
                왼쪽 사이드바에서 확인하고 싶은 섹션을 클릭해보세요
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
