import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import type { ChoiceField } from '../../form-schema';
import type { CommonFieldProps, FieldClassNames } from './types';

interface RadioProps extends CommonFieldProps {
  field: ChoiceField & { type: 'radio' };
  classNames: FieldClassNames;
}

export const Radio: React.FC<RadioProps> = memo(
  ({ field, control, className, commonAria, classNames }) => {
    return (
      <fieldset className={classNames.fieldset}>
        <legend className={classNames.legend}>{field.label}</legend>
        <Controller
          name={field.name}
          control={control}
          defaultValue={field.defaultValue ?? ''}
          render={({ field: fieldProps }) => (
            <div className={classNames.group}>
              {field.options?.map((option) => (
                <label key={option.value} className={classNames.label}>
                  <input
                    type="radio"
                    value={option.value}
                    checked={fieldProps.value === option.value}
                    onChange={() => fieldProps.onChange(option.value)}
                    name={fieldProps.name}
                    className={className}
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
  },
);
