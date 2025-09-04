import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodObject, ZodRawShape } from 'zod';

import type { FormSchema, SupportedLanguage } from '../form-schema';
import { generateZodSchema, generateDefaultValues, i18n } from '../form-schema';
import { FormRenderer, FormRendererProps } from './FormRenderer';
import '../styles/form-renderer.css';

interface Props {
  schema: FormSchema;
  onSubmit: (data: Record<string, any>) => void;
  customSchema?: ZodObject<ZodRawShape>;
  language?: SupportedLanguage;
  showOptionalLabel?: boolean;
  className?: FormRendererProps['className'] & { button?: string };
  submitButtonText?: string;
}

const submitTextMap: Record<SupportedLanguage, string> = {
  ko: '제출',
  en: 'Submit',
  ja: '送信',
};

export const FormGenerator: React.FC<Props> = ({
  schema,
  onSubmit,
  customSchema,
  language,
  showOptionalLabel = false,
  className = {},
  submitButtonText,
}) => {
  useEffect(() => {
    if (language) i18n.setLanguage(language);
  }, [language]);

  const normalizedSchema: FormSchema = useMemo(
    () => ({
      groups: schema.groups || [],
      ungroupedFields: schema.ungroupedFields || [],
      settings: {
        validateOnChange: true,
        validateOnBlur: true,
        showOptionalLabel,
        ...schema.settings,
      },
    }),
    [schema, showOptionalLabel],
  );

  const zodSchema = useMemo(
    () => generateZodSchema(normalizedSchema, customSchema),
    [normalizedSchema, customSchema, language],
  );

  const defaultValues = useMemo(() => generateDefaultValues(normalizedSchema), [normalizedSchema]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  const getSubmitButtonText = () =>
    submitButtonText || submitTextMap[i18n.getCurrentLanguage() as SupportedLanguage] || 'Submit';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`formgen-form ${className?.form || ''}`}>
      <FormRenderer
        schema={normalizedSchema}
        control={control}
        errors={errors}
        showOptionalLabel={showOptionalLabel}
        className={className}
      />
      <button type="submit" className={`formgen-button ${className?.button || ''}`}>
        {getSubmitButtonText()}
      </button>
    </form>
  );
};

FormGenerator.displayName = 'FormGenerator';
