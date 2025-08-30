import { z } from 'zod';
import { i18n } from '../constants/errors';

export const isEmpty = (v: unknown): boolean =>
  v === undefined || v === null || (typeof v === 'string' && v.trim() === '');

export const preprocessNumber = (value: unknown) => (isEmpty(value) ? undefined : Number(value));

export const withRequired = <T extends z.ZodTypeAny>(schema: T, label: string) =>
  schema.refine((v) => !isEmpty(v), {
    message: i18n.getErrorMessage('required', label),
  });
