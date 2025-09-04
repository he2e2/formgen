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

export interface FieldComparison {
  type: 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'custom';
  targetField: string;
  message?: string;
  customValidator?: (value: any, targetValue: any) => boolean;
}

export interface FieldCondition {
  when: string;
  is: any;
  operator?: 'equals' | 'not-equals' | 'contains' | 'greater-than' | 'less-than';
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
  validateWith?: (base: z.ZodTypeAny) => z.ZodTypeAny;
  compareWith?: FieldComparison;
  showWhen?: FieldCondition;
  order?: number;
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

export interface FieldGroup {
  id: string;
  title?: string;
  description?: string;
  fields: FormField[];
  collapsible?: boolean;
  collapsed?: boolean;
  showWhen?: FieldCondition;
  className?: string;
  order?: number;
  required?: boolean;
}

export interface FormSchema {
  groups: FieldGroup[];
  ungroupedFields?: FormField[];
  settings?: {
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    showOptionalLabel?: boolean;
    groupLayout?: 'tabs' | 'sections' | 'accordion';
  };
}

export const getAllFields = (schema: FormSchema): FormField[] => {
  const groupedFields = schema.groups.flatMap((group) => group.fields);
  const ungroupedFields = schema.ungroupedFields || [];
  return [...groupedFields, ...ungroupedFields];
};

export const getFieldByName = (schema: FormSchema, name: string): FormField | undefined => {
  return getAllFields(schema).find((field) => field.name === name);
};

export const getGroupByFieldName = (
  schema: FormSchema,
  fieldName: string,
): FieldGroup | undefined => {
  return schema.groups.find((group) => group.fields.some((field) => field.name === fieldName));
};
