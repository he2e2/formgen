import React, { memo, useMemo, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import '../styles/generator.css';
import type { FormField } from '../types/schema';

const combineClasses = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');
const createCommonAria = (error?: string, name?: string) => ({
  'aria-invalid': !!error,
  'aria-describedby': error ? `${name}-error` : undefined,
});

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

const TextInput = memo(({ field, control, inputCls, commonAria }: any) => (
  <Controller
    name={field.name}
    control={control}
    defaultValue={field.defaultValue ?? ''}
    render={({ field: fieldProps }) => (
      <input
        id={field.name}
        type={field.type}
        placeholder={field.placeholder}
        disabled={field.disabled}
        className={inputCls}
        {...commonAria}
        {...fieldProps}
      />
    )}
  />
));

const TextareaInput = memo(({ field, control, inputCls, commonAria }: any) => (
  <Controller
    name={field.name}
    control={control}
    defaultValue={field.defaultValue ?? ''}
    render={({ field: fieldProps }) => (
      <textarea
        id={field.name}
        placeholder={field.placeholder}
        disabled={field.disabled}
        className={inputCls}
        {...commonAria}
        {...fieldProps}
      />
    )}
  />
));

const CheckboxInput = memo(
  ({ field, control, inputCls, labelCls, fieldsetCls, legendCls, commonAria }: any) => {
    const hasOptions = field.options && field.options.length > 0;

    if (hasOptions) {
      return (
        <fieldset className={fieldsetCls}>
          <legend className={legendCls}>{field.label}</legend>
          <Controller
            name={field.name}
            control={control}
            defaultValue={field.defaultValue ?? []}
            render={({ field: { value, onChange } }) => (
              <>
                {field.options.map((opt: any) => (
                  <label key={opt.value} className={labelCls}>
                    <input
                      type="checkbox"
                      className={inputCls}
                      value={opt.value}
                      checked={value?.includes(opt.value)}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...(value || []), opt.value]
                          : value.filter((v: string) => v !== opt.value);
                        onChange(newValue);
                      }}
                      disabled={field.disabled}
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
        name={field.name}
        control={control}
        defaultValue={field.defaultValue ?? false}
        render={({ field: { value, onChange, ref } }) => (
          <label className={labelCls}>
            <input
              id={field.name}
              type="checkbox"
              className={inputCls}
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

const RadioInput = memo(
  ({ field, control, inputCls, labelCls, fieldsetCls, legendCls, commonAria }: any) => (
    <fieldset className={fieldsetCls}>
      <legend className={legendCls}>{field.label}</legend>
      <Controller
        name={field.name}
        control={control}
        defaultValue={field.defaultValue ?? ''}
        render={({ field: fieldProps }) => (
          <>
            {field.options?.map((opt: any) => (
              <label key={opt.value} className={labelCls}>
                <input
                  type="radio"
                  value={opt.value}
                  checked={fieldProps.value === opt.value}
                  onChange={() => fieldProps.onChange(opt.value)}
                  name={fieldProps.name}
                  className={inputCls}
                  disabled={field.disabled}
                  {...commonAria}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </>
        )}
      />
    </fieldset>
  ),
);

const SelectInput = memo(({ field, control, inputCls, commonAria }: any) => (
  <Controller
    name={field.name}
    control={control}
    defaultValue={field.defaultValue ?? ''}
    render={({ field: fieldProps }) => (
      <select
        id={field.name}
        className={inputCls}
        disabled={field.disabled}
        {...commonAria}
        {...fieldProps}
      >
        {field.options?.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    )}
  />
));

const UnsupportedField = memo(({ field, labelCls }: any) => (
  <div className={labelCls}>지원하지 않는 필드 타입입니다: {field.type}</div>
));

const FIELD_RENDERERS = {
  text: TextInput,
  email: TextInput,
  password: TextInput,
  number: TextInput,
  date: TextInput,
  textarea: TextareaInput,
  checkbox: CheckboxInput,
  radio: RadioInput,
  select: SelectInput,
} as const;

export const FormFieldRenderer: React.FC<Props> = memo(
  ({
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
    const { name, label, type } = field;

    const classNames = useMemo(
      () => ({
        wrapper: combineClasses('formgen-field', fieldWrapperClassName),
        fieldset: combineClasses('formgen-fieldset', fieldsetClassName),
        legend: combineClasses('formgen-legend', legendClassName),
        label: combineClasses('formgen-label', labelClassName),
        input: combineClasses('formgen-input', inputClassName),
        error: combineClasses('formgen-error', errorClassName),
      }),
      [
        fieldWrapperClassName,
        fieldsetClassName,
        legendClassName,
        labelClassName,
        inputClassName,
        errorClassName,
      ],
    );

    const commonAria = useMemo(() => createCommonAria(error, name), [error, name]);
    const errorId = useMemo(() => `${name}-error`, [name]);

    const renderField = useCallback(() => {
      const FieldComponent =
        FIELD_RENDERERS[type as keyof typeof FIELD_RENDERERS] || UnsupportedField;

      return (
        <FieldComponent
          field={field}
          control={control}
          inputCls={classNames.input}
          labelCls={classNames.label}
          fieldsetCls={classNames.fieldset}
          legendCls={classNames.legend}
          commonAria={commonAria}
        />
      );
    }, [field, control, classNames, commonAria, type]);

    return (
      <div className={classNames.wrapper}>
        {type !== 'radio' && type !== 'checkbox' && (
          <label htmlFor={name} className={classNames.label}>
            {label}
          </label>
        )}

        {renderField()}

        {error && (
          <p id={errorId} className={classNames.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
