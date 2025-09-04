import React, { memo } from 'react';
import type { Control, FieldErrors } from 'react-hook-form';

import type { FormField, FieldGroup } from '../form-schema';
import type { FormRendererProps } from './FormRenderer';
import { GroupFields } from './GroupComponents';

interface LayoutProps {
  groups: FieldGroup[];
  groupedFields: Record<string, FormField[]>;
  control: Control<any>;
  errors: FieldErrors;
  showOptionalLabel: boolean;
  className: FormRendererProps['className'];
}

interface TabsLayoutProps extends LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface AccordionLayoutProps extends LayoutProps {
  expandedGroups: Set<string>;
  toggleGroup: (groupId: string) => void;
}

export const TabsLayout: React.FC<TabsLayoutProps> = memo(
  ({
    groups,
    groupedFields,
    control,
    errors,
    showOptionalLabel,
    className,
    activeTab,
    setActiveTab,
  }) => (
    <div className={`formgen-tabs ${className?.tabsContainer || ''}`}>
      <div className={`formgen-tabs-list ${className?.tabsList || ''}`} role="tablist">
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            aria-selected={activeTab === group.id}
            aria-controls={`tabpanel-${group.id}`}
            className={`formgen-tab-button ${activeTab === group.id ? 'active' : ''} ${className?.tabButton || ''}`}
            onClick={() => setActiveTab(group.id)}
          >
            {group.title || group.id}
          </button>
        ))}
      </div>

      {groups.map((group) => (
        <div
          key={group.id}
          id={`tabpanel-${group.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${group.id}`}
          className={`formgen-tab-panel ${activeTab === group.id ? 'active' : ''} ${className?.tabPanel || ''}`}
          hidden={activeTab !== group.id}
        >
          {group.description && (
            <p className={`formgen-group-description ${className?.groupDescription || ''}`}>
              {group.description}
            </p>
          )}
          <GroupFields
            fields={groupedFields[group.id] || []}
            control={control}
            errors={errors}
            showOptionalLabel={showOptionalLabel}
            className={className}
          />
        </div>
      ))}
    </div>
  ),
);

export const AccordionLayout: React.FC<AccordionLayoutProps> = memo(
  ({
    groups,
    groupedFields,
    control,
    errors,
    showOptionalLabel,
    className,
    expandedGroups,
    toggleGroup,
  }) => (
    <div className="formgen-accordion">
      {groups.map((group) => {
        const isExpanded = expandedGroups.has(group.id);

        return (
          <div
            key={group.id}
            className={`formgen-accordion-item ${className?.accordionItem || ''}`}
          >
            <button
              type="button"
              className={`formgen-accordion-header ${className?.accordionHeader || ''}`}
              aria-expanded={isExpanded}
              aria-controls={`accordion-${group.id}`}
              onClick={() => toggleGroup(group.id)}
            >
              {group.title || group.id}
              <span className="formgen-accordion-icon">{isExpanded ? '▼' : '▶'}</span>
            </button>

            <div
              id={`accordion-${group.id}`}
              className={`formgen-accordion-content ${isExpanded ? 'expanded' : ''} ${className?.accordionContent || ''}`}
              hidden={!isExpanded}
            >
              {group.description && (
                <p className={`formgen-group-description ${className?.groupDescription || ''}`}>
                  {group.description}
                </p>
              )}
              <GroupFields
                fields={groupedFields[group.id] || []}
                control={control}
                errors={errors}
                showOptionalLabel={showOptionalLabel}
                className={className}
              />
            </div>
          </div>
        );
      })}
    </div>
  ),
);

TabsLayout.displayName = 'TabsLayout';
AccordionLayout.displayName = 'AccordionLayout';
