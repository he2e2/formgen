import { useForm, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FormField } from '../types/schema';
import { generateZodSchema } from '../lib/zodGenerator';
import { FormFieldRenderer } from './FormFieldRenderer';

interface Props {
  schema: FormField[];
  onSubmit: (data: Record<string, any>) => void;
}

export const FormGenerator: React.FC<Props> = ({ schema, onSubmit }) => {
  const zodSchema = generateZodSchema(schema);

  const defaultValues = Object.fromEntries(schema.map((f) => [f.name, f.defaultValue ?? '']));

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
        />
      ))}
      <button type="submit">제출</button>
    </form>
  );
};
