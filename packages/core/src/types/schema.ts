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

export interface FieldOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface BaseField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  defaultValue?: any;
  validateWith?: <T extends z.ZodTypeAny>(z: typeof import('zod'), base: T) => z.ZodTypeAny;
}

export interface TextField extends BaseField {
  type: 'text' | 'email' | 'password' | 'textarea';
  minLength?: number;
  maxLength?: number;
  pattern?: string | RegExp;
}

export interface NumberField extends BaseField {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
  integer?: boolean;
}

export interface CheckboxField extends BaseField {
  type: 'checkbox';
  options?: FieldOption[];
  minSelected?: number;
  maxSelected?: number;
  multiple?: boolean;
}

export interface ChoiceField extends BaseField {
  type: 'select' | 'radio';
  options: FieldOption[];
  multiple?: boolean;
}

export interface DateField extends BaseField {
  type: 'date';
  min?: string;
  max?: string;
  format?: 'date' | 'datetime-local' | 'time';
}

export type FormField = TextField | NumberField | CheckboxField | ChoiceField | DateField;

export type FormSchema = FormField[];
