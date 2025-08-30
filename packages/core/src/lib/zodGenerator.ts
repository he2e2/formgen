import { z } from 'zod';
import type {
  FormSchema,
  GroupedFormSchema,
  LegacyFormSchema,
  FormField,
  TextField,
  NumberField,
  CheckboxField,
  ChoiceField,
  DateField,
  FieldGroup,
} from '../form-schema';
import {
  isLegacySchema,
  i18n,
  DATE_REGEX,
  isEmpty,
  preprocessNumber,
  withRequired,
  shouldShowField,
  createComparisonValidator,
  getComparisonErrorMessage,
  buildFieldSchema,
} from '../form-schema';

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

  const shape = visibleFields.reduce<Record<string, z.ZodTypeAny>>((acc, field) => {
    acc[field.name] = buildFieldSchema(field);
    return acc;
  }, {});

  const baseObject = z.object(shape);
  let zodSchema: z.ZodTypeAny = baseObject;

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
          message: (() => {
            const currentLang = i18n.getCurrentLanguage();
            const groupTitle = group.title || group.id;
            switch (currentLang) {
              case 'ko':
                return `${groupTitle} 그룹에서 최소 하나의 항목은 입력해야 합니다`;
              case 'en':
                return `At least one field in ${groupTitle} group must be filled`;
              case 'ja':
                return `${groupTitle}グループで少なくとも1つの項目を入力する必要があります`;
              default:
                return `At least one field in ${groupTitle} group must be filled`;
            }
          })(),
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

export const generateDefaultValues = (
  schema: FormSchema | GroupedFormSchema | LegacyFormSchema,
  formValues: Record<string, any> = {},
) => {
  const fields: FormField[] = isLegacySchema(schema) ? schema : schema.fields;

  const visibleFields = fields.filter((field) => {
    if (!field.showWhen) return true;
    return shouldShowField(field.showWhen, formValues);
  });

  return visibleFields.reduce<Record<string, any>>((acc, field) => {
    if (field.defaultValue !== undefined) {
      acc[field.name] = field.defaultValue;
      return acc;
    }

    switch (field.type) {
      case 'number':
        acc[field.name] = undefined;
        break;
      case 'checkbox': {
        const cb = field as CheckboxField;
        acc[field.name] = cb.options?.length ? [] : false;
        break;
      }
      case 'select':
      case 'radio':
        acc[field.name] = (field as any).multiple ? [] : '';
        break;
      default:
        acc[field.name] = '';
    }

    return acc;
  }, {});
};

export const validateSingleField = (
  field: FormField,
  value: any,
  formValues: Record<string, any>,
): { isValid: boolean; error?: string } => {
  try {
    if (field.showWhen && !shouldShowField(field.showWhen, formValues)) {
      return { isValid: true };
    }

    const fieldSchema = buildFieldSchema(field);
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      return {
        isValid: false,
        error: result.error.errors[0]?.message || '검증에 실패했습니다',
      };
    }

    if (field.compareWith) {
      const comparison = field.compareWith;
      const isValid = createComparisonValidator(
        field,
        comparison,
      )({
        ...formValues,
        [field.name]: value,
      });

      if (!isValid) {
        const targetFieldLabel = comparison.targetField;
        return {
          isValid: false,
          error: getComparisonErrorMessage(comparison, field.label, targetFieldLabel),
        };
      }
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: '검증 중 오류가 발생했습니다',
    };
  }
};

export const getFieldsByGroup = (
  schema: FormSchema | GroupedFormSchema | LegacyFormSchema,
  formValues: Record<string, any> = {},
): Record<string, FormField[]> => {
  const fields: FormField[] = isLegacySchema(schema) ? schema : schema.fields;
  const groups: FieldGroup[] = isLegacySchema(schema) ? [] : schema.groups || [];

  const visibleFields = fields.filter((field) => {
    if (!field.showWhen) return true;
    return shouldShowField(field.showWhen, formValues);
  });

  const result: Record<string, FormField[]> = {};

  result['__ungrouped'] = visibleFields.filter((field) => !field.group);

  groups.forEach((group) => {
    if (!group.showWhen || shouldShowField(group.showWhen, formValues)) {
      result[group.id] = visibleFields.filter((field) => field.group === group.id);
    }
  });

  return result;
};
