import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import type { TextField } from '../../form-schema';
import type { CommonFieldProps } from './types';

interface TextareaProps extends CommonFieldProps {
  field: TextField & { type: 'textarea' };
}

export const Textarea: React.FC<TextareaProps> = memo(
  ({ field, control, className, commonAria }) => {
    return (
      <Controller
        name={field.name}
        control={control}
        defaultValue={field.defaultValue ?? ''}
        render={({ field: fieldProps }) => (
          <textarea
            id={field.name}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={className}
            rows={4}
            {...commonAria}
            {...fieldProps}
          />
        )}
      />
    );
  },
);
