import { z } from 'zod';
import { i18n, DATE_REGEX } from '../constants';
import type { DateField } from '../types';

export const buildDate = (field: DateField): z.ZodTypeAny => {
  const { label, required, min, max, format = 'date' } = field;

  const schema = z.string().regex(DATE_REGEX[format], i18n.getErrorMessage('dateFormat', label));
  const prepared = required
    ? schema.min(1, i18n.getErrorMessage('dateInput', label))
    : schema.optional();

  if (format === 'date') {
    return prepared
      .refine((v) => v !== undefined && (!min || v >= min), {
        message: i18n.getErrorMessage('dateMin', label, min ?? ''),
      })
      .refine((v) => v !== undefined && (!max || v <= max), {
        message: i18n.getErrorMessage('dateMax', label, max ?? ''),
      });
  }
  return prepared;
};
