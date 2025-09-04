import React from 'react';
import type { BaseFieldComponentProps } from './types';

import { TextInput } from './TextInput';
import { NumberInput } from './NumberInput';
import { Textarea } from './Textarea';
import { Checkbox } from './Checkbox';
import { Radio } from './Radio';
import { Select } from './Select';

export type FieldComponent = React.ComponentType<BaseFieldComponentProps>;

export const FIELD_COMPONENTS: Record<string, FieldComponent> = {
  text: TextInput as FieldComponent,
  email: TextInput as FieldComponent,
  password: TextInput as FieldComponent,
  date: TextInput as FieldComponent,
  number: NumberInput as FieldComponent,
  textarea: Textarea as FieldComponent,
  checkbox: Checkbox as FieldComponent,
  radio: Radio as FieldComponent,
  select: Select as FieldComponent,
} as const;

export const UnsupportedField: React.FC<BaseFieldComponentProps> = ({ field, classNames }) => (
  <div className={classNames.wrapper}>
    <div className={classNames.error}>Unsupported field type: {field.type}</div>
  </div>
);

export const getFieldComponent = (fieldType: string): FieldComponent => {
  return FIELD_COMPONENTS[fieldType] || UnsupportedField;
};

export const registerFieldComponent = (fieldType: string, component: FieldComponent): void => {
  FIELD_COMPONENTS[fieldType] = component;
};

export const getSupportedFieldTypes = (): string[] => {
  return Object.keys(FIELD_COMPONENTS);
};
