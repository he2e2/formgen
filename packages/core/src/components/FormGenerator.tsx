import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodObject, ZodRawShape } from 'zod';

import type { FormField } from '../types/schema';
import { generateZodSchema, generateDefaultValues } from '../lib/zodGenerator';
import { FormFieldRenderer } from './FormFieldRenderer';
import { i18n, type SupportedLanguage } from '../constants/errors';
import '../styles/generator.css';
import { useEffect, useMemo } from 'react';

interface Props {
  schema: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  customSchema?: ZodObject<ZodRawShape>;
  language?: SupportedLanguage;
  fieldWrapperClassName?: string;
  fieldsetClassName?: string;
  legendClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  buttonClassName?: string;
  submitButtonText?: string;
}

export const FormGenerator: React.FC<Props> = ({
  schema,
  onSubmit,
  customSchema,
  language,
  fieldWrapperClassName,
  fieldsetClassName,
  legendClassName,
  labelClassName,
  inputClassName,
  errorClassName,
  buttonClassName,
  submitButtonText,
}) => {
  useEffect(() => {
    if (language) {
      i18n.setLanguage(language);
    }
  }, [language]);

  const zodSchema = useMemo(() => {
    return generateZodSchema(schema, customSchema);
  }, [schema, customSchema, language]);

  const defaultValues = useMemo(() => {
    return generateDefaultValues(schema);
  }, [schema]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  const getSubmitButtonText = () => {
    if (submitButtonText) return submitButtonText;

    const currentLang = i18n.getCurrentLanguage();
    switch (currentLang) {
      case 'ko':
        return '제출';
      case 'en':
        return 'Submit';
      case 'ja':
        return '送信';
      default:
        return 'Submit';
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {schema.map((field) => (
        <FormFieldRenderer
          key={field.name}
          field={field}
          error={errors[field.name]?.message as string}
          control={control}
          fieldWrapperClassName={fieldWrapperClassName}
          fieldsetClassName={fieldsetClassName}
          legendClassName={legendClassName}
          labelClassName={labelClassName}
          inputClassName={inputClassName}
          errorClassName={errorClassName}
        />
      ))}
      <button type="submit" className={`formgen-button ${buttonClassName || ''}`}>
        {getSubmitButtonText()}
      </button>
    </form>
  );
};
