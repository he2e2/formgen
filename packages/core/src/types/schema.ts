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
}

export interface TextField extends BaseField {
  type: 'text' | 'email' | 'number' | 'password' | 'textarea';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface ChoiceField extends BaseField {
  type: 'select' | 'radio' | 'checkbox';
  options?: { label: string; value: string }[];
}

export interface DateField extends BaseField {
  type: 'date';
  min?: string;
  max?: string;
}

export type FormField = TextField | ChoiceField | DateField;

export type FormSchema = FormField[];
