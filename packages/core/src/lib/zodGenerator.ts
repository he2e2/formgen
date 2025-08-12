import { z } from 'zod';
import type {
  FormSchema,
  FormField,
  TextField,
  NumberField,
  CheckboxField,
  ChoiceField,
  DateField,
} from '../types/schema';
import { i18n } from '../constants/errors';
import { DATE_REGEX } from '../constants/regex';

const isVoid = (v: unknown) =>
  v === undefined || v === null || (typeof v === 'string' && v.trim() === '');

const preprocessNumber = (value: unknown) => (isVoid(value) ? undefined : Number(value));

const withRequired = <T extends z.ZodTypeAny>(schema: T, label: string) =>
  schema.refine((v) => !isVoid(v), {
    message: i18n.getErrorMessage('required', label),
  });

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
      if (isVoid(v)) return true;
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
  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'textarea':
      return buildText(field as TextField);

    case 'number':
      return buildNumber(field as NumberField);

    case 'checkbox':
      return buildCheckbox(field as CheckboxField);

    case 'select':
    case 'radio':
      return buildChoice(field as ChoiceField);

    case 'date':
      return buildDate(field as DateField);

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
};

export const generateZodSchema = (
  schema: FormSchema,
  custom?: z.ZodObject<z.ZodRawShape>,
): z.ZodObject<z.ZodRawShape> => {
  const shape = schema.reduce<Record<string, z.ZodTypeAny>>((acc, f) => {
    acc[f.name] = buildForm(f);
    return acc;
  }, {});

  const auto = z.object(shape);
  return custom ? auto.merge(custom) : auto;
};

export const generateDefaultValues = (schema: FormSchema) =>
  schema.reduce<Record<string, any>>((acc, f) => {
    if (f.defaultValue !== undefined) {
      acc[f.name] = f.defaultValue;
      return acc;
    }

    switch (f.type) {
      case 'number':
        acc[f.name] = undefined;
        break;
      case 'checkbox': {
        const cb = f as CheckboxField;
        acc[f.name] = cb.options?.length ? [] : false;
        break;
      }
      case 'select':
      case 'radio':
        acc[f.name] = (f as any).multiple ? [] : '';
        break;
      default:
        acc[f.name] = '';
    }

    return acc;
  }, {});
