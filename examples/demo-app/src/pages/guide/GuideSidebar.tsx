import React from 'react';
import { Sidebar } from '../../components';
import { guideCategories } from './data';
import type { GuideSection } from './types';

interface GuideSidebarProps {
  selectedSection: GuideSection | null;
  onSelectSection: (section: GuideSection) => void;
}

export const GuideSidebar: React.FC<GuideSidebarProps> = ({
  selectedSection,
  onSelectSection,
}) => {
  const sidebarCategories = guideCategories.map((category) => ({
    id: category.id,
    title: category.title,
    description: category.description,
    items: category.sections,
  }));

  return (
    <Sidebar
      title="FormGen 가이드"
      subtitle="완전한 사용법과 API 문서"
      categories={sidebarCategories}
      selectedItem={selectedSection}
      onSelectItem={onSelectSection}
      defaultExpandedCategories={['getting-started']}
    />
  );
};
