import { z } from 'zod';
import { i18n } from '../constants/errors';
import { preprocessNumber, withRequired } from '../utils/fieldUtils';
import type { NumberField } from '../types';

export const buildNumber = (field: NumberField) => {
  const { label, required, min, max, step, integer } = field;

  let schema: z.ZodTypeAny = z.preprocess(preprocessNumber, z.number().or(z.undefined()));

  if (required) {
    schema = withRequired(schema, label);
  }

  if (integer) {
    schema = schema.refine((v) => v === undefined || Number.isInteger(v), {
      message: i18n.getErrorMessage('integer', label),
    });
  }

  if (min !== undefined) {
    schema = schema.refine((v) => v === undefined || v >= min, {
      message: i18n.getErrorMessage('min', label, min),
    });
  }

  if (max !== undefined) {
    schema = schema.refine((v) => v === undefined || v <= max, {
      message: i18n.getErrorMessage('max', label, max),
    });
  }

  if (step !== undefined && step > 0) {
    schema = schema.refine((v) => v === undefined || (v as number) % step === 0, {
      message: i18n.getErrorMessage('multipleOf', label, step),
    });
  }

  return schema;
};
