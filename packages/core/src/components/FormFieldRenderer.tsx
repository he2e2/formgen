import React from 'react';
import type { FormField } from '../types/schema';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

interface Props {
  field: FormField;
  control: Control<any>;
  error?: string;
}

export const FormFieldRenderer: React.FC<Props> = ({ field, control, error }) => {
  const { name, label, type, placeholder, disabled, defaultValue } = field;

  return (
    <div>
      <label htmlFor={name} style={{ display: 'block', marginBottom: 4 }}>
        {label}
      </label>

      {(() => {
        switch (field.type) {
          case 'text':
          case 'email':
          case 'password':
          case 'number':
          case 'date':
            return (
              <Controller
                name={name}
                control={control}
                defaultValue={defaultValue ?? ''}
                render={({ field }) => (
                  <input
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...field}
                  />
                )}
              />
            );

          case 'textarea':
            return (
              <Controller
                name={name}
                control={control}
                defaultValue={defaultValue ?? ''}
                render={({ field }) => (
                  <textarea id={name} placeholder={placeholder} disabled={disabled} {...field} />
                )}
              />
            );

          case 'checkbox':
            return (
              <Controller
                name={name}
                control={control}
                defaultValue={defaultValue ?? false}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    id={name}
                    disabled={disabled}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    ref={field.ref}
                  />
                )}
              />
            );

          case 'radio': {
            const { options } = field;
            return (
              <Controller
                name={name}
                control={control}
                defaultValue={defaultValue ?? ''}
                render={({ field }) => (
                  <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                    <legend style={{ fontWeight: 500, marginBottom: 8 }}>{label}</legend>
                    {options.map((opt) => (
                      <label key={opt.value} style={{ display: 'block', marginBottom: 4 }}>
                        <input
                          type="radio"
                          value={opt.value}
                          checked={field.value === opt.value}
                          onChange={() => field.onChange(opt.value)}
                          name={field.name}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </fieldset>
                )}
              />
            );
          }

          case 'select': {
            const { options } = field;
            return (
              <Controller
                name={name}
                control={control}
                defaultValue={defaultValue ?? ''}
                render={({ field }) => (
                  <select id={name} disabled={disabled} {...field}>
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            );
          }

          default:
            return <div>지원하지 않는 필드 타입입니다: {type}</div>;
        }
      })()}
      {error && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{error}</p>}
    </div>
  );
};
