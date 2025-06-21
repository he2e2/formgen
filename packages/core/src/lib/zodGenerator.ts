import * as z from 'zod';
import type {
  FormSchema,
  FormField,
  TextField,
  NumberField,
  CheckboxField,
  ChoiceField,
  DateField,
} from '../types/schema';
import { ERROR } from '../constants/errors';
import { DATE_REGEX } from '../constants/regex';

const isVoid = (v: unknown) =>
  v === undefined || v === null || (typeof v === 'string' && v.trim() === '');

const preprocessNumber = (value: unknown) => (isVoid(value) ? undefined : Number(value));

const withRequired = <T extends z.ZodTypeAny>(schema: T, label: string) =>
  schema.refine((v) => !isVoid(v), { message: ERROR.required(label) });

const buildText = (field: TextField) => {
  const { label, required, type, minLength, maxLength, pattern } = field;
  let s = type === 'email' ? z.string().email(ERROR.email(label)) : z.string();

  if (minLength !== undefined) s = s.min(minLength, ERROR.minLength(label, minLength));
  if (maxLength !== undefined) s = s.max(maxLength, ERROR.maxLength(label, maxLength));
  if (pattern) {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    s = s.regex(regex, ERROR.pattern(label));
  }

  return required ? withRequired(s, label) : s.optional();
};

const buildNumber = (field: NumberField) => {
  const { label, required, min, max, step, integer } = field;

  let s: z.ZodTypeAny = z.preprocess(preprocessNumber, z.number().or(z.undefined()));

  if (required) s = withRequired(s, label);
  if (integer)
    s = s.refine((v) => v === undefined || Number.isInteger(v), {
      message: ERROR.integer(label),
    });
  if (min !== undefined)
    s = s.refine((v) => v === undefined || v >= min, {
      message: ERROR.min(label, min),
    });
  if (max !== undefined)
    s = s.refine((v) => v === undefined || v <= max, {
      message: ERROR.max(label, max),
    });
  if (step !== undefined && step > 0)
    s = s.refine((v) => v === undefined || (v as number) % step === 0, {
      message: ERROR.multipleOf(label, step),
    });

  return s;
};

const buildChoice = (field: ChoiceField): z.ZodTypeAny => {
  const { label, required, options } = field;
  const values = options.map((o) => o.value);
  const multiple = field.type === 'select' && (field as any).multiple;

  let schema: z.ZodTypeAny = multiple ? z.array(z.string()) : z.string();

  if (required) {
    schema = multiple
      ? (schema as z.ZodArray<z.ZodString>).min(1, ERROR.select(label))
      : (schema as z.ZodString).min(1, ERROR.select(label));
  }

  schema = schema.refine(
    (v) => {
      if (isVoid(v)) return true;
      return multiple
        ? (v as string[]).every((val) => values.includes(val))
        : values.includes(v as string);
    },
    { message: `${label}에 유효하지 않은 값${multiple ? '이 포함되어 있습니다.' : '입니다.'}` },
  );

  return required ? schema : schema.optional();
};

const buildCheckbox = (field: CheckboxField): z.ZodTypeAny => {
  const { label, required, options, minSelected, maxSelected } = field;

  if (options?.length) {
    const values = options.map((o) => o.value);

    let schema = z.array(z.string());

    if (required) schema = schema.min(1, ERROR.select(label));
    if (minSelected !== undefined)
      schema = schema.min(minSelected, ERROR.minSelected(label, minSelected));
    if (maxSelected !== undefined)
      schema = schema.max(maxSelected, ERROR.maxSelected(label, maxSelected));

    const validated = schema.refine((vals) => vals.every((v) => values.includes(v)), {
      message: `${label}에 유효하지 않은 값이 포함되어 있습니다.`,
    });

    return required ? validated : validated.optional();
  }

  let schema: z.ZodTypeAny = z.boolean();
  if (required) {
    schema = schema.refine((v) => v === true, {
      message: ERROR.check(label),
    });
  }
  return required ? schema : schema.optional();
};

const buildDate = (field: DateField): z.ZodTypeAny => {
  const { label, required, min, max, format = 'date' } = field;

  const base = z.string().regex(DATE_REGEX[format], ERROR.dateFormat(label));

  const prepared = required ? base.min(1, ERROR.dateInput(label)) : base.optional();

  const final =
    format === 'date'
      ? prepared
          .refine((v) => v !== undefined && (!min || v >= min), {
            message: ERROR.dateMin(label, min ?? ''),
          })
          .refine((v) => v !== undefined && (!max || v <= max), {
            message: ERROR.dateMax(label, max ?? ''),
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
      throw new Error(`지원하지 않는 필드 타입: ${JSON.stringify(_never)}`);
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
