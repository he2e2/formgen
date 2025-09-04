import React from 'react';
import { Sidebar } from '../../components';
import { categories } from './data';
import type { Example } from './types';

interface ExamplesSidebarProps {
  selectedExample: Example | null;
  onSelectExample: (example: Example) => void;
}

export const ExamplesSidebar: React.FC<ExamplesSidebarProps> = ({
  selectedExample,
  onSelectExample,
}) => {
  const sidebarCategories = categories.map((category) => ({
    id: category.id,
    title: category.title,
    description: category.description,
    items: category.examples,
  }));

  return (
    <Sidebar
      title="예제 모음"
      subtitle="다양한 폼 예제를 확인해보세요"
      categories={sidebarCategories}
      selectedItem={selectedExample}
      onSelectItem={onSelectExample}
      defaultExpandedCategories={['basic']}
    />
  );
};
