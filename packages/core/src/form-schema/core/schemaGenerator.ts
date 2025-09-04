import { z } from 'zod';
import type { FormSchema, FormField, FieldGroup } from '../types';
import { getAllFields } from '../types';
import { i18n } from '../constants';
import { isEmpty, shouldShowField } from '../utils';
import { createComparisonValidator, getComparisonErrorMessage } from '../comparison';
import { buildFieldSchema } from '../builders';

const getGroupValidationMessage = (groupTitle: string): string => {
  const currentLang = i18n.getCurrentLanguage();
  const messages = {
    ko: `${groupTitle} 그룹에서 최소 하나의 항목은 입력해야 합니다`,
    en: `At least one field in ${groupTitle} group must be filled`,
    ja: `${groupTitle}グループで少なくとも1つの項目を入力する必要があります`,
  };
  return messages[currentLang as keyof typeof messages] || messages.en;
};

export const generateZodSchema = (
  schema: FormSchema,
  custom?: z.AnyZodObject,
  formValues: Record<string, any> = {},
): z.ZodTypeAny => {
  const allFields = getAllFields(schema);

  const visibleFields = allFields.filter((field) => {
    if (!field.showWhen) return true;
    return shouldShowField(field.showWhen, formValues);
  });

  const visibleGroups = schema.groups.filter((group) => {
    if (!group.showWhen) return true;
    return shouldShowField(group.showWhen, formValues);
  });

  const fieldSchemas = visibleFields.reduce<Record<string, z.ZodTypeAny>>((acc, field) => {
    acc[field.name] = buildFieldSchema(field);
    return acc;
  }, {});

  let zodSchema: z.ZodTypeAny = z.object(fieldSchemas);

  const fieldsWithComparison = visibleFields.filter((field) => field.compareWith);
  if (fieldsWithComparison.length > 0) {
    fieldsWithComparison.forEach((field) => {
      const comparison = field.compareWith!;
      const targetField = visibleFields.find((f) => f.name === comparison.targetField);

      if (targetField) {
        zodSchema = zodSchema.refine(createComparisonValidator(field, comparison), {
          message: getComparisonErrorMessage(comparison, field.label, targetField.label),
          path: [field.name],
        });
      }
    });
  }

  const requiredGroups = visibleGroups.filter((group) => group.required);
  if (requiredGroups.length > 0) {
    requiredGroups.forEach((group) => {
      const groupFields = group.fields.filter((field) => {
        if (!field.showWhen) return true;
        return shouldShowField(field.showWhen, formValues);
      });

      zodSchema = zodSchema.refine(
        (data) => groupFields.some((field) => !isEmpty(data[field.name])),
        {
          message: getGroupValidationMessage(group.title || group.id),
          path: [`group_${group.id}`],
        },
      );
    });
  }

  if (custom) {
    zodSchema = z.intersection(zodSchema, custom);
  }

  return zodSchema;
};

export const getGroupByFieldName = (
  schema: FormSchema,
  fieldName: string,
): FieldGroup | undefined => {
  return schema.groups.find((group) => group.fields.some((field) => field.name === fieldName));
};

export const getVisibleGroups = (
  schema: FormSchema,
  formValues: Record<string, any> = {},
): FieldGroup[] => {
  return schema.groups.filter((group) => {
    if (!group.showWhen) return true;
    return shouldShowField(group.showWhen, formValues);
  });
};

export const getVisibleFields = (
  schema: FormSchema,
  formValues: Record<string, any> = {},
): FormField[] => {
  const allFields = getAllFields(schema);

  return allFields.filter((field) => {
    if (field.showWhen && !shouldShowField(field.showWhen, formValues)) {
      return false;
    }

    const parentGroup = getGroupByFieldName(schema, field.name);
    if (parentGroup && parentGroup.showWhen && !shouldShowField(parentGroup.showWhen, formValues)) {
      return false;
    }

    return true;
  });
};
