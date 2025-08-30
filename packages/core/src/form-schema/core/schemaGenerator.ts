import { z } from 'zod';
import type {
  FormSchema,
  GroupedFormSchema,
  LegacyFormSchema,
  FormField,
  FieldGroup,
} from '../types';
import { isLegacySchema } from '../types';
import { i18n } from '../constants/errors';
import { isEmpty } from '../utils/fieldUtils';
import { shouldShowField } from '../utils/conditionUtils';
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
  schema: FormSchema | GroupedFormSchema | LegacyFormSchema,
  custom?: z.AnyZodObject,
  formValues: Record<string, any> = {},
): z.ZodTypeAny => {
  const fields: FormField[] = isLegacySchema(schema) ? schema : schema.fields;
  const groups: FieldGroup[] = isLegacySchema(schema) ? [] : schema.groups || [];

  const visibleFields = fields.filter((field) => {
    if (!field.showWhen) return true;
    return shouldShowField(field.showWhen, formValues);
  });

  const visibleGroups = groups.filter((group) => {
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
      const groupFields = visibleFields.filter((field) => field.group === group.id);

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
