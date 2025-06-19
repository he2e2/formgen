import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodObject, ZodRawShape } from 'zod';
import type { FormField } from '../types/schema';
import { generateZodSchema } from '../lib/zodGenerator';
import { FormFieldRenderer } from './FormFieldRenderer';

interface Props {
  schema: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  customSchema?: ZodObject<ZodRawShape>;
  fieldWrapperClassName?: string;
  fieldsetClassName?: string;
  legendClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export const FormGenerator: React.FC<Props> = ({
  schema,
  onSubmit,
  customSchema,
  fieldWrapperClassName,
  fieldsetClassName,
  legendClassName,
  labelClassName,
  inputClassName,
  errorClassName,
}) => {
  const zodSchema = generateZodSchema(schema, customSchema);

  const defaultValues = Object.fromEntries(
    schema.map((f) => {
      if (f.type === 'checkbox') {
        const isMulti = Array.isArray((f as any).options) && (f as any).options.length > 0;
        return [f.name, f.defaultValue ?? (isMulti ? [] : false)];
      }
      return [f.name, f.defaultValue ?? ''];
    }),
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

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
      <button type="submit">제출</button>
    </form>
  );
};
