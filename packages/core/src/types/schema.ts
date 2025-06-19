import { z } from 'zod';

export type FieldType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'textarea'
  | 'date';

export interface BaseField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  defaultValue?: any;
  validateWith?: (z: typeof import('zod'), base: z.ZodTypeAny) => z.ZodTypeAny;
}

export interface TextField extends BaseField {
  type: 'text' | 'email' | 'number' | 'password' | 'textarea';
  minLength?: number;
  maxLength?: number;
  pattern?: string | RegExp;
}

export interface CheckboxField extends BaseField {
  type: 'checkbox';
  options?: { label: string; value: string }[];
  minSelected?: number;
  maxSelected?: number;
}

export interface ChoiceField extends BaseField {
  type: 'select' | 'radio';
  options: { label: string; value: string }[];
}

export interface DateField extends BaseField {
  type: 'date';
  min?: string;
  max?: string;
}

export type FormField = TextField | CheckboxField | ChoiceField | DateField;

export type FormSchema = FormField[];
