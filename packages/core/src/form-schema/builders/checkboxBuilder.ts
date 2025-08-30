import { z } from 'zod';
import { i18n } from '../constants/errors';
import type { CheckboxField } from '../types';

const getInvalidCheckboxMessage = (label: string): string => {
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

export const buildCheckbox = (field: CheckboxField) => {
  const { label, required, options, minSelected, maxSelected } = field;

  if (options?.length) {
    const validValues = options.map((option) => option.value);
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

    const finalSchema = schema.refine(
      (values) => {
        if (!values || values.length === 0) return !required;
        return values.every((value) => validValues.includes(value));
      },
      { message: getInvalidCheckboxMessage(label) },
    );

    return required ? finalSchema : finalSchema.optional();
  }

  if (required) {
    return z.literal(true, {
      errorMap: () => ({ message: i18n.getErrorMessage('check', label) }),
    });
  } else {
    return z.boolean().optional();
  }
};
