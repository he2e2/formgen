import React, { memo, useMemo } from 'react';
import type { Control, FieldErrors } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import type { FormField, FieldGroup } from '../form-schema';
import { shouldShowField } from '../form-schema';
import { FormFieldRenderer } from './FormFieldRenderer';
import type { FormRendererProps } from './FormRenderer';

interface GroupRendererProps {
  group: FieldGroup;
  fields: FormField[];
  control: Control<any>;
  errors: FieldErrors;
  showOptionalLabel: boolean;
  className: FormRendererProps['className'];
}

interface CollapsibleGroupProps extends GroupRendererProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const GroupFields: React.FC<{
  fields: FormField[];
  control: Control<any>;
  errors: FieldErrors;
  showOptionalLabel: boolean;
  className: FormRendererProps['className'];
}> = memo(({ fields, control, errors, showOptionalLabel, className }) => {
  const formValues = useWatch({ control });

  const visibleFields = useMemo(
    () =>
      fields
        .filter((field) => {
          if (!field.showWhen) return true;
          return shouldShowField(field.showWhen, formValues || {});
        })
        .sort((a, b) => (a.order || 0) - (b.order || 0)),
    [fields, formValues],
  );

  return (
    <>
      {visibleFields.map((field) => (
        <FormFieldRenderer
          key={field.name}
          field={field}
          control={control}
          error={errors[field.name]?.message as string}
          showOptionalLabel={showOptionalLabel}
          fieldsetClassName={className?.fieldset}
          legendClassName={className?.legend}
          labelClassName={className?.label}
          inputClassName={className?.input}
          errorClassName={className?.error}
        />
      ))}
    </>
  );
});

export const SectionGroup: React.FC<GroupRendererProps> = memo(
  ({ group, fields, control, errors, showOptionalLabel, className }) => (
    <div
      className={`formgen-group formgen-group--section ${className?.group || ''} ${group.className || ''}`}
    >
      {group.title && (
        <h3 className={`formgen-group-title ${className?.groupTitle || ''}`}>{group.title}</h3>
      )}

      {group.description && (
        <p className={`formgen-group-description ${className?.groupDescription || ''}`}>
          {group.description}
        </p>
      )}

      <GroupFields
        fields={fields}
        control={control}
        errors={errors}
        showOptionalLabel={showOptionalLabel}
        className={className}
      />
    </div>
  ),
);

export const CollapsibleGroup: React.FC<CollapsibleGroupProps> = memo(
  ({ group, fields, control, errors, showOptionalLabel, className, isCollapsed, onToggle }) => (
    <div
      className={`formgen-group formgen-group--collapsible ${className?.collapsibleGroup || ''}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`formgen-collapsible-button ${className?.collapsibleButton || ''}`}
        aria-expanded={!isCollapsed}
        aria-controls={`group-${group.id}-content`}
      >
        {group.title}
        <span className="formgen-collapsible-icon">{isCollapsed ? '▶' : '▼'}</span>
      </button>

      <div
        id={`group-${group.id}-content`}
        className={`formgen-collapsible-content ${isCollapsed ? 'collapsed' : ''} ${className?.collapsibleContent || ''}`}
      >
        {group.description && (
          <p className={`formgen-group-description ${className?.groupDescription || ''}`}>
            {group.description}
          </p>
        )}
        <GroupFields
          fields={fields}
          control={control}
          errors={errors}
          showOptionalLabel={showOptionalLabel}
          className={className}
        />
      </div>
    </div>
  ),
);

GroupFields.displayName = 'GroupFields';
SectionGroup.displayName = 'SectionGroup';
CollapsibleGroup.displayName = 'CollapsibleGroup';
