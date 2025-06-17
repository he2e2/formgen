import { z } from 'zod';
import type { FormSchema } from '../types/schema';

export function generateZodSchema(schema: FormSchema) {
  const shape: Record<string, z.ZodTypeAny> = {};

  schema.forEach((field) => {
    switch (field.type) {
      case 'text':
      case 'textarea':
      case 'password': {
        const base = z.string();
        shape[field.name] = field.required
          ? base.min(1, `${field.label}은(는) 필수입니다.`)
          : base.optional();
        break;
      }

      case 'email': {
        const base = z.string().email(`${field.label} 형식이 올바르지 않습니다.`);
        shape[field.name] = field.required ? base : base.optional();
        break;
      }

      case 'number': {
        const base = z
          .string()
          .min(1, `${field.label}은(는) 필수입니다.`)
          .refine((val) => val === '' || !isNaN(Number(val)), {
            message: `${field.label}은(는) 숫자여야 합니다.`,
          });
        shape[field.name] = field.required ? base : base.optional();
        break;
      }

      case 'select':
      case 'radio': {
        const base = z.string();
        shape[field.name] = field.required
          ? base.min(1, `${field.label}을(를) 선택하세요.`)
          : base.optional();
        break;
      }

      case 'checkbox': {
        shape[field.name] = z
          .union([z.literal('on'), z.boolean()])
          .refine((val) => val === true || val === 'on', {
            message: `${field.label}을(를) 체크하세요.`,
          });
        break;
      }

      case 'date': {
        const base = z.string();
        shape[field.name] = field.required
          ? base.min(1, `${field.label}을(를) 입력하세요.`)
          : base.optional();
        break;
      }

      default:
        const _exhaustive: never = field;
        return null;
    }
  });

  return z.object(shape);
}
