import type {
  FormSchema,
  GroupedFormSchema,
  LegacyFormSchema,
  FormField,
  CheckboxField,
} from '../types';
import { isLegacySchema } from '../types';
import { shouldShowField } from '../utils/conditionUtils';

const getFieldDefaultValue = (field: FormField): any => {
  if (field.defaultValue !== undefined) {
    return field.defaultValue;
  }

  switch (field.type) {
    case 'number':
      return undefined;

    case 'checkbox': {
      const checkboxField = field as CheckboxField;
      return checkboxField.options?.length ? [] : false;
    }

    case 'select':
    case 'radio': {
      return (field as any).multiple ? [] : '';
    }

    case 'text':
    case 'email':
    case 'password':
    case 'textarea':
    case 'date':
    default:
      return '';
  }
};

export const generateDefaultValues = (
  schema: FormSchema | GroupedFormSchema | LegacyFormSchema,
  formValues: Record<string, any> = {},
): Record<string, any> => {
  const fields: FormField[] = isLegacySchema(schema) ? schema : schema.fields;

  const visibleFields = fields.filter((field) => {
    if (!field.showWhen) return true;
    return shouldShowField(field.showWhen, formValues);
  });

  return visibleFields.reduce<Record<string, any>>((acc, field) => {
    acc[field.name] = getFieldDefaultValue(field);
    return acc;
  }, {});
};
