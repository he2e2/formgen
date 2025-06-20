import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import '../styles/generator.css';
import type { FormField } from '../types/schema';

const combineClasses = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

interface Props {
  field: FormField;
  control: Control<any>;
  error?: string;
  fieldWrapperClassName?: string;
  fieldsetClassName?: string;
  legendClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export const FormFieldRenderer: React.FC<Props> = ({
  field,
  control,
  error,
  fieldWrapperClassName,
  fieldsetClassName,
  legendClassName,
  labelClassName,
  inputClassName,
  errorClassName,
}) => {
  const { name, label, type, placeholder, disabled, defaultValue } = field;
  const errorId = `${name}-error`;

  const wrapperCls = combineClasses('formgen-field', fieldWrapperClassName);
  const fieldsetCls = combineClasses('formgen-fieldset', fieldsetClassName);
  const legendCls = combineClasses('formgen-legend', legendClassName);
  const labelCls = combineClasses('formgen-label', labelClassName);
  const inputCls = combineClasses('formgen-input', inputClassName);
  const errorCls = combineClasses('formgen-error', errorClassName);

  const commonAria = {
    'aria-invalid': !!error,
    'aria-describedby': error ? errorId : undefined,
  };

  return (
    <div className={wrapperCls}>
      {type !== 'radio' && type !== 'checkbox' && (
        <label htmlFor={name} className={labelCls}>
          {label}
        </label>
      )}

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
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={inputCls}
                    {...commonAria}
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
                  <textarea
                    id={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={inputCls}
                    {...commonAria}
                    {...field}
                  />
                )}
              />
            );

          case 'checkbox': {
            const { options } = field;

            if (options && options.length > 0) {
              return (
                <fieldset className={fieldsetCls}>
                  <legend className={legendCls}>{label}</legend>
                  <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue ?? []}
                    render={({ field: { value, onChange } }) => (
                      <>
                        {options.map((opt) => (
                          <label key={opt.value} className={labelCls}>
                            <input
                              type="checkbox"
                              className={inputCls}
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
                              {...commonAria}
                            />
                            <span>{opt.label}</span>
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
                  <label className={labelCls}>
                    <input
                      id={name}
                      type="checkbox"
                      className={inputCls}
                      checked={!!value}
                      onChange={(e) => onChange(e.target.checked)}
                      disabled={disabled}
                      ref={ref}
                      {...commonAria}
                    />
                    <span>{label}</span>
                  </label>
                )}
              />
            );
          }

          case 'radio': {
            const { options } = field;

            return (
              <fieldset className={fieldsetCls}>
                <legend className={legendCls}>{label}</legend>
                <Controller
                  name={name}
                  control={control}
                  defaultValue={defaultValue ?? ''}
                  render={({ field }) => (
                    <>
                      {options?.map((opt) => (
                        <label key={opt.value} className={labelCls}>
                          <input
                            type="radio"
                            value={opt.value}
                            checked={field.value === opt.value}
                            onChange={() => field.onChange(opt.value)}
                            name={field.name}
                            className={inputCls}
                            disabled={disabled}
                            {...commonAria}
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </>
                  )}
                />
              </fieldset>
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
                  <select
                    id={name}
                    className={inputCls}
                    disabled={disabled}
                    {...commonAria}
                    {...field}
                  >
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
            return <div className={labelCls}>지원하지 않는 필드 타입입니다: {type}</div>;
        }
      })()}

      {error && (
        <p id={errorId} className={errorCls} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
