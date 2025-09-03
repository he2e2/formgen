import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import type { CheckboxField } from '../../form-schema';
import type { CommonFieldProps, FieldClassNames } from './types';

interface CheckboxProps extends CommonFieldProps {
  field: CheckboxField;
  classNames: FieldClassNames;
}

export const Checkbox: React.FC<CheckboxProps> = memo(
  ({ field, control, className, commonAria, classNames }) => {
    const hasOptions = field.options && field.options.length > 0;

    if (hasOptions) {
      return (
        <fieldset className={classNames.fieldset}>
          <legend className={classNames.legend}>{field.label}</legend>
          <Controller
            name={field.name}
            control={control}
            defaultValue={field.defaultValue ?? []}
            render={({ field: { value, onChange } }) => (
              <div className={classNames.group}>
                {field.options!.map((option) => (
                  <label key={option.value} className={classNames.label}>
                    <input
                      type="checkbox"
                      className={className}
                      value={option.value}
                      checked={value?.includes(option.value) || false}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...(value || []), option.value]
                          : (value || []).filter((v: string) => v !== option.value);
                        onChange(newValue);
                      }}
                      disabled={field.disabled || option.disabled}
                      {...commonAria}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </fieldset>
      );
    }

    return (
      <Controller
        name={field.name}
        control={control}
        defaultValue={field.defaultValue ?? false}
        render={({ field: { value, onChange, ref } }) => (
          <label className={classNames.label}>
            <input
              id={field.name}
              type="checkbox"
              className={className}
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              disabled={field.disabled}
              ref={ref}
              {...commonAria}
            />
            <span>{field.label}</span>
          </label>
        )}
      />
    );
  },
);
