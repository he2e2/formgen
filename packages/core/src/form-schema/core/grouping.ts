import type { FormSchema, FormField } from '../types';
import { shouldShowField } from '../utils';

export type GroupedFields = Record<string, FormField[]>;

export const getFieldsByGroup = (
  schema: FormSchema,
  formValues: Record<string, any> = {},
): GroupedFields => {
  const result: GroupedFields = {};

  if (schema.ungroupedFields) {
    const visibleUngroupedFields = schema.ungroupedFields.filter((field) => {
      if (!field.showWhen) return true;
      return shouldShowField(field.showWhen, formValues);
    });

    if (visibleUngroupedFields.length > 0) {
      result['__ungrouped'] = visibleUngroupedFields;
    }
  }

  schema.groups.forEach((group) => {
    if (group.showWhen && !shouldShowField(group.showWhen, formValues)) {
      return;
    }

    const visibleGroupFields = group.fields.filter((field) => {
      if (!field.showWhen) return true;
      return shouldShowField(field.showWhen, formValues);
    });

    if (visibleGroupFields.length > 0) {
      result[group.id] = visibleGroupFields;
    }
  });

  return result;
};
