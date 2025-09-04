import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import type { ChoiceField } from '../../form-schema';
import type { CommonFieldProps } from './types';

interface SelectProps extends CommonFieldProps {
  field: ChoiceField & { type: 'select' };
}

export const Select: React.FC<SelectProps> = memo(({ field, control, className, commonAria }) => {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue ?? ''}
      render={({ field: fieldProps }) => (
        <select
          id={field.name}
          className={className}
          disabled={field.disabled}
          {...commonAria}
          {...fieldProps}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
  );
});
