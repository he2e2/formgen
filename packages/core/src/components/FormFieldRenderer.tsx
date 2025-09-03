import React, { memo, useMemo } from 'react';
import type { Control } from 'react-hook-form';
import type { FormField } from '../form-schema';
import {
  getFieldComponent,
  createCommonAria,
  createFieldClassNames,
  getFieldLabel,
  isRequiredField,
} from './fields';
import type { FieldRendererProps } from './fields';

interface FormFieldRendererProps extends FieldRendererProps {
  field: FormField;
  control: Control<any>;
  showOptionalLabel?: boolean;
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = memo(
  ({
    field,
    control,
    error,
    showOptionalLabel = false,
    fieldWrapperClassName,
    fieldsetClassName,
    legendClassName,
    labelClassName,
    groupClassName,
    inputClassName,
    errorClassName,
  }) => {
    const { name, label, type } = field;

    const classNames = useMemo(
      () =>
        createFieldClassNames('formgen', {
          wrapper: fieldWrapperClassName,
          fieldset: fieldsetClassName,
          legend: legendClassName,
          label: labelClassName,
          input: inputClassName,
          error: errorClassName,
          group: groupClassName,
        }),
      [
        fieldWrapperClassName,
        fieldsetClassName,
        legendClassName,
        labelClassName,
        groupClassName,
        inputClassName,
        errorClassName,
      ],
    );

    const commonAria = useMemo(() => createCommonAria(error, name), [error, name]);
    const errorId = useMemo(() => `${name}-error`, [name]);
    const fieldLabel = useMemo(
      () => getFieldLabel(label, isRequiredField(field), showOptionalLabel),
      [label, field, showOptionalLabel],
    );

    const FieldComponent = useMemo(() => getFieldComponent(type), [type]);

    const needsExternalLabel = type !== 'radio' && type !== 'checkbox';

    return (
      <div className={classNames.wrapper}>
        {needsExternalLabel && (
          <label htmlFor={name} className={classNames.label}>
            {fieldLabel}
          </label>
        )}

        <FieldComponent
          field={field}
          control={control}
          className={classNames.input}
          commonAria={commonAria}
          classNames={classNames}
        />

        {error && (
          <p id={errorId} className={classNames.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormFieldRenderer.displayName = 'FormFieldRenderer';
