import { useState } from 'react';

interface SidebarItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface SidebarCategory {
  id: string;
  title: string;
  description: string;
  items: SidebarItem[];
}

interface SidebarProps<T extends SidebarItem> {
  title: string;
  subtitle: string;
  categories: SidebarCategory[];
  selectedItem: T | null;
  onSelectItem: (item: T) => void;
  defaultExpandedCategories?: string[];
}

export function Sidebar<T extends SidebarItem>({
  title,
  subtitle,
  categories,
  selectedItem,
  onSelectItem,
  defaultExpandedCategories = [],
}: SidebarProps<T>) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    defaultExpandedCategories
  );

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
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
      </div>

      <div className="p-4">
        {categories.map((category) => (
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
                {category.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectItem(item as T)}
                    className={`w-full text-left px-4 py-3 text-sm rounded-md transition-colors ${
                      selectedItem?.id === item.id
                        ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.description}
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
}
