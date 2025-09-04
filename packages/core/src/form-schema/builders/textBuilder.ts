import { z } from 'zod';
import { i18n } from '../constants/errors';
import { withRequired } from '../utils/fieldUtils';
import type { TextField } from '../types';

export const buildText = (field: TextField) => {
  const { label, required, type, minLength, maxLength, pattern } = field;

  let schema =
    type === 'email' ? z.string().email(i18n.getErrorMessage('email', label)) : z.string();

  if (minLength !== undefined) {
    schema = schema.min(minLength, i18n.getErrorMessage('minLength', label, minLength));
  }

  if (maxLength !== undefined) {
    schema = schema.max(maxLength, i18n.getErrorMessage('maxLength', label, maxLength));
  }

  if (pattern) {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    schema = schema.regex(regex, i18n.getErrorMessage('pattern', label));
  }

  return required ? withRequired(schema, label) : schema.optional();
};
