import { z } from 'zod';
import type { FormSchema } from '../types/schema';

export function generateZodSchema(schema: FormSchema) {
  const shape: Record<string, z.ZodTypeAny> = {};

  schema.forEach((field) => {
    const { name, label, required, type } = field;

    switch (type) {
      case 'text':
      case 'textarea':
      case 'password': {
        const base = z.string();
        shape[name] = required ? base.min(1, `${label}은(는) 필수입니다.`) : base.optional();
        break;
      }

      case 'email': {
        const base = z.string().email(`${label} 형식이 올바르지 않습니다.`);
        shape[name] = required ? base : base.optional();
        break;
      }

      case 'number': {
        const base = z
          .string()
          .min(1, `${label}은(는) 필수입니다.`)
          .refine((val) => val === '' || !isNaN(Number(val)), {
            message: `${label}은(는) 숫자여야 합니다.`,
          });
        shape[name] = required ? base : base.optional();
        break;
      }

      case 'select':
      case 'radio':
      case 'checkbox': {
        if (!field.options || field.options.length === 0) {
          if (type === 'checkbox') {
            const base = z.boolean().refine((v) => v === true, {
              message: `${label}을(를) 체크하세요.`,
            });
            shape[name] = required ? base : z.boolean().optional();
          } else {
            const base = z.string();
            shape[name] = required ? base.min(1, `${label}을(를) 선택하세요.`) : base.optional();
          }
          break;
        }

        if (type === 'checkbox') {
          const base = z.array(z.string());
          shape[name] = required
            ? base.min(1, `${label}을(를) 하나 이상 선택하세요.`)
            : base.optional();
        } else {
          const base = z.string();
          shape[name] = required ? base.min(1, `${label}을(를) 선택하세요.`) : base.optional();
        }
        break;
      }

      case 'date': {
        const base = z.string();
        shape[name] = required ? base.min(1, `${label}을(를) 입력하세요.`) : base.optional();
        break;
      }

      default:
        const _exhaustive: never = field;
        throw new Error(`Unhandled field type: ${JSON.stringify(field)}`);
    }
  });

  return z.object(shape);
}
