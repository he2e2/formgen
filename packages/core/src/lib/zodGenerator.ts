import * as z from 'zod';
import type { FormSchema, TextField, NumberField, CheckboxField } from '../types/schema';

export function generateZodSchema(schema: FormSchema, custom?: z.ZodObject<z.ZodRawShape>) {
  const shape: Record<string, z.ZodTypeAny> = {};

  schema.forEach((field) => {
    const { name, label, required, type } = field;

    let base: z.ZodTypeAny;

    switch (type) {
      case 'text':
      case 'textarea':
      case 'password': {
        const f = field as TextField;
        base = z.string();

        if (required) base = (base as z.ZodString).min(1, `${label}은(는) 필수 입력 항목입니다.`);
        if (f.minLength)
          base = (base as z.ZodString).min(
            f.minLength,
            `${label}은(는) 최소 ${f.minLength}자 입니다.`,
          );
        if (f.maxLength)
          base = (base as z.ZodString).max(
            f.maxLength,
            `${label}은(는) 최대 ${f.maxLength}자 입니다.`,
          );
        if (f.pattern) {
          const regex = typeof f.pattern === 'string' ? new RegExp(f.pattern) : f.pattern;
          base = (base as z.ZodString).regex(regex, `${label} 형식이 올바르지 않습니다.`);
        }
        break;
      }

      case 'email':
        base = z.string().email(`${label} 형식이 올바르지 않습니다.`);
        if (required) base = (base as z.ZodString).min(1, `${label}은(는) 필수 입력 항목입니다.`);
        else base = base.optional();
        break;

      case 'number': {
        const f = field as NumberField;

        base = z.preprocess(
          (val) => {
            if (typeof val === 'string' && val.trim() === '') return undefined;
            const num = Number(val);
            return isNaN(num) ? val : num;
          },
          z.number({ required_error: `${label}은(는) 필수입니다.` }),
        );

        if (!required) {
          base = base.optional();
        }

        if (f.min != null) {
          base = base.refine((val) => val === undefined || val >= f.min!, {
            message: `${label}은(는) ${f.min} 이상이어야 합니다.`,
          });
        }

        if (f.max != null) {
          base = base.refine((val) => val === undefined || val <= f.max!, {
            message: `${label}은(는) ${f.max} 이하이어야 합니다.`,
          });
        }

        break;
      }

      case 'select':
      case 'radio':
        base = z.string();
        if (required) base = (base as z.ZodString).min(1, `${label}을(를) 선택하세요.`);
        else base = base.optional();
        break;

      case 'checkbox': {
        const f = field as CheckboxField;

        if (f.options?.length) {
          base = z.array(z.string());

          if (required)
            base = (base as z.ZodArray<z.ZodString>).min(1, `${label}을(를) 선택하세요.`);

          if (f.minSelected)
            base = (base as z.ZodArray<z.ZodString>).min(
              f.minSelected,
              `${label}을(를) 최소 ${f.minSelected}개 선택하셔야 합니다.`,
            );

          if (f.maxSelected)
            base = (base as z.ZodArray<z.ZodString>).max(
              f.maxSelected,
              `${label}을(를) 최대 ${f.maxSelected}개 선택하셔야 합니다.`,
            );

          if (!required) base = base.optional();
        } else {
          base = z.boolean();
          if (required)
            base = base.refine((v) => v === true, { message: `${label}을(를) 체크하세요.` });
          else base = base.optional();
        }
        break;
      }

      case 'date':
        base = z.string();
        if (required) base = (base as z.ZodString).min(1, `${label}을(를) 입력하세요.`);
        else base = base.optional();
        break;

      default:
        const _exhaustive: never = field;
        throw new Error(`Unhandled field type: ${JSON.stringify(_exhaustive)}`);
    }

    if (field.validateWith) {
      base = field.validateWith(z, base);
    }

    shape[name] = base;
  });

  const autoSchema = z.object(shape);

  return custom ? autoSchema.merge(custom) : autoSchema;
}
