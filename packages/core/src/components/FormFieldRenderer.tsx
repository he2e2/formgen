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
        switch (type) {
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

          case 'checkbox': {
            const { options } = field;
            if (options && options.length > 0) {
              return (
                <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                  <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue ?? []}
                    render={({ field: { value, onChange } }) => (
                      <>
                        {field.options!.map((opt) => (
                          <label key={opt.value} style={{ display: 'block', marginBottom: 4 }}>
                            <input
                              type="checkbox"
                              value={opt.value}
                              checked={value?.includes(opt.value)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  onChange([...(value || []), opt.value]);
                                } else {
                                  onChange(value.filter((v: string) => v !== opt.value));
                                }
                              }}
                              disabled={disabled}
                            />
                            {opt.label}
                          </label>
                        ))}
                      </>
                    )}
                  />
                </fieldset>
              );
            }

            return (
              <Controller
                name={name}
                control={control}
                defaultValue={defaultValue ?? false}
                render={({ field: { value, onChange, ref } }) => (
                  <input
                    id={name}
                    name={name}
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                    ref={ref}
                  />
                )}
              />
            );
          }

          case 'radio': {
            const { options } = field;
            return (
              <Controller
                name={name}
                control={control}
                defaultValue={defaultValue ?? ''}
                render={({ field }) => (
                  <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                    {options?.map((opt) => (
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
                    {options?.map((opt) => (
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
