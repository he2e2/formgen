import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import type { TextField, DateField } from '../../form-schema';
import type { CommonFieldProps } from './types';

interface TextInputProps extends CommonFieldProps {
  field: TextField | DateField;
}

const getInputType = (field: TextField | DateField) => {
  if (field.type === 'date') {
    switch (field.format) {
      case 'datetime-local':
        return 'datetime-local';
      case 'time':
        return 'time';
      case 'date':
      default:
        return 'date';
    }
  }
  return field.type;
};

const getInputProps = (
  field: TextField | DateField,
  className: string,
  commonAria: Record<string, any>,
) => {
  const baseProps = {
    id: field.name,
    type: getInputType(field),
    placeholder: field.placeholder,
    disabled: field.disabled,
    className,
    ...commonAria,
  };

  if (field.type === 'date') {
    if (field.min) (baseProps as any).min = field.min;
    if (field.max) (baseProps as any).max = field.max;
  }

  if (field.type === 'text' && 'pattern' in field && field.pattern) {
    (baseProps as any).pattern =
      field.pattern instanceof RegExp ? field.pattern.source : field.pattern;
  }

  return baseProps;
};

export const TextInput: React.FC<TextInputProps> = memo(
  ({ field, control, className, commonAria }) => {
    return (
      <Controller
        name={field.name}
        control={control}
        defaultValue={field.defaultValue ?? ''}
        render={({ field: fieldProps }) => (
          <input {...getInputProps(field, className, commonAria)} {...fieldProps} />
        )}
      />
    );
  },
);
