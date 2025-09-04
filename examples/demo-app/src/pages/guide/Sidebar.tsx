import React, { useState } from 'react';
import { guideCategories } from './data';
import type { GuideSection } from './types';

interface SidebarProps {
  selectedSection: GuideSection | null;
  onSelectSection: (section: GuideSection) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedSection,
  onSelectSection,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'getting-started',
  ]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto sticky top-0 h-screen">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">FormGen 가이드</h2>
        <p className="text-sm text-gray-600 mt-1">완전한 사용법과 API 문서</p>
      </div>

      <div className="p-4">
        {guideCategories.map((category) => (
          <div key={category.id} className="mb-4">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div>
                <div className="font-semibold">{category.title}</div>
                <div className="text-xs text-gray-500">
                  {category.description}
                </div>
              </div>
              <span className="formgen-accordion-icon">
                {expandedCategories.includes(category.id) ? '▼' : '▶'}
              </span>
            </button>

            {expandedCategories.includes(category.id) && (
              <div className="mt-2 space-y-1">
                {category.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => onSelectSection(section)}
                    className={`w-full text-left px-4 py-3 text-sm rounded-md transition-colors ${
                      selectedSection?.id === section.id
                        ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    <div className="font-medium">{section.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {section.description}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
