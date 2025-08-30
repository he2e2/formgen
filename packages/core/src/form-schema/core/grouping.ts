import type {
  FormSchema,
  GroupedFormSchema,
  LegacyFormSchema,
  FormField,
  FieldGroup,
} from '../types';
import { isLegacySchema } from '../types';
import { shouldShowField } from '../utils/conditionUtils';

export type GroupedFields = Record<string, FormField[]>;

export const getFieldsByGroup = (
  schema: FormSchema | GroupedFormSchema | LegacyFormSchema,
  formValues: Record<string, any> = {},
): GroupedFields => {
  const fields: FormField[] = isLegacySchema(schema) ? schema : schema.fields;
  const groups: FieldGroup[] = isLegacySchema(schema) ? [] : schema.groups || [];

  const visibleFields = fields.filter((field) => {
    if (!field.showWhen) return true;
    return shouldShowField(field.showWhen, formValues);
  });

  const result: GroupedFields = {};

  result['__ungrouped'] = visibleFields.filter((field) => !field.group);

  groups.forEach((group) => {
    if (!group.showWhen || shouldShowField(group.showWhen, formValues)) {
      result[group.id] = visibleFields.filter((field) => field.group === group.id);
    }
  });

  return result;
};
