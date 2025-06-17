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

export interface CheckboxField extends BaseField {
  type: 'checkbox';
}

export interface SelectField extends BaseField {
  type: 'select' | 'radio';
  options: { label: string; value: string }[];
}

export interface DateField extends BaseField {
  type: 'date';
  min?: string;
  max?: string;
}

export type FormField = TextField | CheckboxField | SelectField | DateField;

export type FormSchema = FormField[];
