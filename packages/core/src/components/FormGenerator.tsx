import React from 'react';
import type { FormSchema } from '../types/schema';
import { FormFieldRenderer } from './FormFieldRenderer';

interface Props {
  schema: FormSchema;
  onSubmit?: (data: Record<string, any>) => void;
}

export const FormGenerator: React.FC<Props> = ({ schema, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {schema.map((field) => (
        <FormFieldRenderer key={field.name} field={field} />
      ))}
      <button type="submit">제출</button>
    </form>
  );
};
