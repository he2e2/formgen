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
} from '../form-schema';

const buildText = (field: TextField) => {
  const { label, required, type, minLength, maxLength, pattern } = field;
  let s = type === 'email' ? z.string().email(i18n.getErrorMessage('email', label)) : z.string();

  if (minLength !== undefined) {
    s = s.min(minLength, i18n.getErrorMessage('minLength', label, minLength));
  }
  if (maxLength !== undefined) {
    s = s.max(maxLength, i18n.getErrorMessage('maxLength', label, maxLength));
  }
  if (pattern) {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    s = s.regex(regex, i18n.getErrorMessage('pattern', label));
  }

  return required ? withRequired(s, label) : s.optional();
};

const buildNumber = (field: NumberField) => {
  const { label, required, min, max, step, integer } = field;

  let s: z.ZodTypeAny = z.preprocess(preprocessNumber, z.number().or(z.undefined()));

  if (required) s = withRequired(s, label);

  if (integer) {
    s = s.refine((v) => v === undefined || Number.isInteger(v), {
      message: i18n.getErrorMessage('integer', label),
    });
  }

  if (min !== undefined) {
    s = s.refine((v) => v === undefined || v >= min, {
      message: i18n.getErrorMessage('min', label, min),
    });
  }

  if (max !== undefined) {
    s = s.refine((v) => v === undefined || v <= max, {
      message: i18n.getErrorMessage('max', label, max),
    });
  }

  if (step !== undefined && step > 0) {
    s = s.refine((v) => v === undefined || (v as number) % step === 0, {
      message: i18n.getErrorMessage('multipleOf', label, step),
    });
  }

  return s;
};

const buildChoice = (field: ChoiceField): z.ZodTypeAny => {
  const { label, required, options } = field;
  const values = options.map((o) => o.value);
  const multiple = field.type === 'select' && (field as any).multiple;

  let schema: z.ZodTypeAny = multiple ? z.array(z.string()) : z.string();

  if (required) {
    schema = multiple
      ? (schema as z.ZodArray<z.ZodString>).min(1, i18n.getErrorMessage('select', label))
      : (schema as z.ZodString).min(1, i18n.getErrorMessage('select', label));
  }

  const getInvalidValueMessage = (label: string, multiple: boolean) => {
    const currentLang = i18n.getCurrentLanguage();
    switch (currentLang) {
      case 'ko':
        return `${label}에 유효하지 않은 값${multiple ? '이 포함되어 있습니다.' : '입니다.'}`;
      case 'en':
        return `${label} contains invalid value${multiple ? 's' : ''}.`;
      case 'ja':
        return `${label}に無効な値${multiple ? 'が含まれています' : 'です'}。`;
      default:
        return `Invalid value${multiple ? 's' : ''} in ${label}.`;
    }
  };

  schema = schema.refine(
    (v) => {
      if (isEmpty(v)) return true;
      return multiple
        ? (v as string[]).every((val) => values.includes(val))
        : values.includes(v as string);
    },
    { message: getInvalidValueMessage(label, multiple) },
  );

  return required ? schema : schema.optional();
};

const buildCheckbox = (field: CheckboxField): z.ZodTypeAny => {
  const { label, required, options, minSelected, maxSelected } = field;

  if (options?.length) {
    const values = options.map((o) => o.value);

    let schema = z.array(z.string());

    if (required) {
      schema = schema.min(1, i18n.getErrorMessage('select', label));
    }
    if (minSelected !== undefined) {
      schema = schema.min(minSelected, i18n.getErrorMessage('minSelected', label, minSelected));
    }
    if (maxSelected !== undefined) {
      schema = schema.max(maxSelected, i18n.getErrorMessage('maxSelected', label, maxSelected));
    }

    const getInvalidCheckboxMessage = (label: string) => {
      const currentLang = i18n.getCurrentLanguage();
      switch (currentLang) {
        case 'ko':
          return `${label}에 유효하지 않은 값이 포함되어 있습니다.`;
        case 'en':
          return `${label} contains invalid values.`;
        case 'ja':
          return `${label}に無効な値が含まれています。`;
        default:
          return `Invalid values in ${label}.`;
      }
    };

    const validated = schema.refine((vals) => vals.every((v) => values.includes(v)), {
      message: getInvalidCheckboxMessage(label),
    });

    return required ? validated : validated.optional();
  }

  let schema: z.ZodTypeAny = z.boolean();
  if (required) {
    schema = schema.refine((v) => v === true, {
      message: i18n.getErrorMessage('check', label),
    });
  }
  return required ? schema : schema.optional();
};

const buildDate = (field: DateField): z.ZodTypeAny => {
  const { label, required, min, max, format = 'date' } = field;

  const base = z.string().regex(DATE_REGEX[format], i18n.getErrorMessage('dateFormat', label));

  const prepared = required
    ? base.min(1, i18n.getErrorMessage('dateInput', label))
    : base.optional();

  const final =
    format === 'date'
      ? prepared
          .refine((v) => v !== undefined && (!min || v >= min), {
            message: i18n.getErrorMessage('dateMin', label, min ?? ''),
          })
          .refine((v) => v !== undefined && (!max || v <= max), {
            message: i18n.getErrorMessage('dateMax', label, max ?? ''),
          })
      : prepared;

  return final;
};

const buildForm = (field: FormField): z.ZodTypeAny => {
  let baseSchema: z.ZodTypeAny;

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'textarea':
      baseSchema = buildText(field as TextField);
      break;

    case 'number':
      baseSchema = buildNumber(field as NumberField);
      break;

    case 'checkbox':
      baseSchema = buildCheckbox(field as CheckboxField);
      break;

    case 'select':
    case 'radio':
      baseSchema = buildChoice(field as ChoiceField);
      break;

    case 'date':
      baseSchema = buildDate(field as DateField);
      break;

    default: {
      const _never: never = field;
      const getUnsupportedFieldMessage = () => {
        const currentLang = i18n.getCurrentLanguage();
        switch (currentLang) {
          case 'ko':
            return `지원하지 않는 필드 타입: ${JSON.stringify(_never)}`;
          case 'en':
            return `Unsupported field type: ${JSON.stringify(_never)}`;
          case 'ja':
            return `サポートされていないフィールドタイプ: ${JSON.stringify(_never)}`;
          default:
            return `Unsupported field type: ${JSON.stringify(_never)}`;
        }
      };
      throw new Error(getUnsupportedFieldMessage());
    }
  }

  if (field.validateWith) {
    baseSchema = field.validateWith(baseSchema);
  }

  return baseSchema;
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

  const shape = visibleFields.reduce<Record<string, z.ZodTypeAny>>((acc, field) => {
    acc[field.name] = buildForm(field);
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

    const fieldSchema = buildForm(field);
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
