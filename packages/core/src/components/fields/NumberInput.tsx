import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import type { NumberField } from '../../form-schema';
import type { CommonFieldProps } from './types';

interface NumberInputProps extends CommonFieldProps {
  field: NumberField;
}

export const NumberInput: React.FC<NumberInputProps> = memo(
  ({ field, control, className, commonAria }) => {
    const getInputProps = () => ({
      id: field.name,
      type: 'number',
      placeholder: field.placeholder,
      disabled: field.disabled,
      className,
      min: field.min,
      max: field.max,
      step: field.step,
      ...commonAria,
    });

    return (
      <Controller
        name={field.name}
        control={control}
        defaultValue={field.defaultValue ?? ''}
        render={({ field: fieldProps }) => (
          <input
            {...getInputProps()}
            {...fieldProps}
            onChange={(e) => {
              const value = e.target.value;
              fieldProps.onChange(value === '' ? undefined : Number(value));
            }}
          />
        )}
      />
    );
  },
);
