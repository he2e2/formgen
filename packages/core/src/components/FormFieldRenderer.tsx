import React from 'react';
import type { FormField } from '../types/schema';
import type { Control } from 'react-hook-form';

interface Props {
  field: FormField;
  control: Control<any>;
  error?: string;
}

export const FormFieldRenderer: React.FC<Props> = ({ field, error }) => {
  const { name, label, type, required, placeholder, disabled, defaultValue } = field;

  const commonProps = {
    name,
    id: name,
    required,
    placeholder,
    disabled,
    defaultValue,
  };

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
            return <input type={field.type} {...commonProps} />;

          case 'textarea':
            return <textarea {...commonProps} />;

          case 'checkbox':
            return (
              <input type="checkbox" {...commonProps} defaultChecked={defaultValue} value="on" />
            );

          case 'radio':
            return (
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontWeight: 500, marginBottom: 8 }}>{label}</legend>
                {field.options.map((opt) => (
                  <label key={opt.value} style={{ display: 'block', marginBottom: 4 }}>
                    <input
                      type="radio"
                      name={name}
                      value={opt.value}
                      defaultChecked={defaultValue === opt.value}
                      disabled={disabled}
                    />
                    {opt.label}
                  </label>
                ))}
              </fieldset>
            );

          case 'select':
            return (
              <select {...commonProps}>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            );

          default:
            return <div>지원하지 않는 필드 타입입니다: {type}</div>;
        }
      })()}
      {error && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{error}</p>}
    </div>
  );
};
