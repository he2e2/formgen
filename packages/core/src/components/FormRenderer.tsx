import React, { memo } from 'react';
import type { Control, FieldErrors } from 'react-hook-form';

import type { FormSchema } from '../form-schema';
import { useFormRenderer } from '../form-schema';
import { GroupFields, SectionGroup, CollapsibleGroup } from './GroupComponents';
import { TabsLayout, AccordionLayout } from './LayoutComponents';

export interface FormRendererProps {
  schema: FormSchema;
  control: Control<any>;
  errors: FieldErrors;
  showOptionalLabel?: boolean;
  className?: {
    form?: string;
    group?: string;
    groupTitle?: string;
    groupDescription?: string;
    ungroupedSection?: string;
    collapsibleGroup?: string;
    collapsibleButton?: string;
    collapsibleContent?: string;
    tabsContainer?: string;
    tabsList?: string;
    tabButton?: string;
    tabPanel?: string;
    accordionItem?: string;
    accordionHeader?: string;
    accordionContent?: string;
    fieldWrapper?: string;
    fieldset?: string;
    legend?: string;
    label?: string;
    input?: string;
    error?: string;
    fieldGroup?: string;
  };
}

export const FormRenderer: React.FC<FormRendererProps> = memo(
  ({ schema, control, errors, showOptionalLabel = false, className = {} }) => {
    const {
      groupedFields,
      visibleGroups,
      collapsedGroups,
      toggleCollapse,
      activeTab,
      setActiveTab,
      expandedGroups,
      toggleAccordion,
    } = useFormRenderer({ schema, control });

    const renderSectionsLayout = () => {
      return visibleGroups.map((group) => {
        const fields = groupedFields[group.id] || [];
        if (fields.length === 0) return null;

        if (group.collapsible) {
          return (
            <CollapsibleGroup
              key={group.id}
              group={group}
              fields={fields}
              control={control}
              errors={errors}
              showOptionalLabel={showOptionalLabel}
              className={className}
              isCollapsed={collapsedGroups.has(group.id)}
              onToggle={() => toggleCollapse(group.id)}
            />
          );
        }

        return (
          <SectionGroup
            key={group.id}
            group={group}
            fields={fields}
            control={control}
            errors={errors}
            showOptionalLabel={showOptionalLabel}
            className={className}
          />
        );
      });
    };

    const renderGroupLayout = () => {
      const groupLayout = schema.settings?.groupLayout || 'sections';

      switch (groupLayout) {
        case 'tabs':
          return (
            <TabsLayout
              groups={visibleGroups}
              groupedFields={groupedFields}
              control={control}
              errors={errors}
              showOptionalLabel={showOptionalLabel}
              className={className}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          );

        case 'accordion':
          return (
            <AccordionLayout
              groups={visibleGroups}
              groupedFields={groupedFields}
              control={control}
              errors={errors}
              showOptionalLabel={showOptionalLabel}
              className={className}
              expandedGroups={expandedGroups}
              toggleGroup={toggleAccordion}
            />
          );

        case 'sections':
        default:
          return renderSectionsLayout();
      }
    };

    return (
      <div className="formgen-renderer">
        {groupedFields.__ungrouped && (
          <div className={`formgen-ungrouped-section ${className?.ungroupedSection || ''}`}>
            <GroupFields
              fields={groupedFields.__ungrouped}
              control={control}
              errors={errors}
              showOptionalLabel={showOptionalLabel}
              className={className}
            />
          </div>
        )}
        {renderGroupLayout()}
      </div>
    );
  },
);

FormRenderer.displayName = 'FormRenderer';
