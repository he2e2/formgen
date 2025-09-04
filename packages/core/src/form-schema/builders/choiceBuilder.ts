import { z } from 'zod';
import { i18n } from '../constants/errors';
import type { ChoiceField } from '../types';

const getInvalidValueMessage = (label: string, multiple: boolean): string => {
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

export const buildChoice = (field: ChoiceField) => {
  const { label, required, options, type } = field;
  const validValues = options.map((option) => option.value);
  const isMultiple = type === 'select' && (field as any).multiple;

  if (isMultiple) {
    let arraySchema = z.array(z.string());

    if (required) {
      arraySchema = arraySchema.min(1, i18n.getErrorMessage('select', label));
    }

    const finalSchema = arraySchema.refine(
      (values) => {
        if (!values || values.length === 0) return !required;
        return values.every((value) => validValues.includes(value));
      },
      { message: getInvalidValueMessage(label, true) },
    );

    return required ? finalSchema : finalSchema.optional();
  } else {
    const enumSchema =
      validValues.length > 0
        ? z.enum(validValues as [string, ...string[]], {
            errorMap: () => ({ message: getInvalidValueMessage(label, false) }),
          })
        : z.string();

    if (required) {
      return enumSchema.refine((value) => value.trim().length > 0, {
        message: i18n.getErrorMessage('select', label),
      });
    } else {
      return z.union([enumSchema, z.literal('')]).optional();
    }
  }
};
