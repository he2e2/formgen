import { i18n } from '../constants/errors';
import type { FieldComparison } from '../types';
import { COMPARISON_TYPES } from '../constants/operators';

const COMPARISON_MESSAGE_TEMPLATES = {
  [COMPARISON_TYPES.EQUALS]: {
    ko: (field: string, target: string) => `${field}이(가) ${target}와(과) 일치하지 않습니다`,
    en: (field: string, target: string) => `${field} does not match ${target}`,
    ja: (field: string, target: string) => `${field}が${target}と一致しません`,
  },
  [COMPARISON_TYPES.NOT_EQUALS]: {
    ko: (field: string, target: string) => `${field}이(가) ${target}와(과) 달라야 합니다`,
    en: (field: string, target: string) => `${field} must be different from ${target}`,
    ja: (field: string, target: string) => `${field}は${target}と異なる必要があります`,
  },
  [COMPARISON_TYPES.GREATER_THAN]: {
    ko: (field: string, target: string) => `${field}이(가) ${target}보다 커야 합니다`,
    en: (field: string, target: string) => `${field} must be greater than ${target}`,
    ja: (field: string, target: string) => `${field}は${target}より大きくなければなりません`,
  },
  [COMPARISON_TYPES.LESS_THAN]: {
    ko: (field: string, target: string) => `${field}이(가) ${target}보다 작아야 합니다`,
    en: (field: string, target: string) => `${field} must be less than ${target}`,
    ja: (field: string, target: string) => `${field}は${target}より小さくなければなりません`,
  },
} as const;

const DEFAULT_ERROR_MESSAGES = {
  ko: (field: string) => `${field} 검증에 실패했습니다`,
  en: (field: string) => `${field} validation failed`,
  ja: (field: string) => `${field}の検証に失敗しました`,
} as const;

export const getComparisonErrorMessage = (
  comparison: FieldComparison,
  fieldLabel: string,
  targetFieldLabel: string,
): string => {
  if (comparison.message) {
    return comparison.message;
  }

  const currentLang = i18n.getCurrentLanguage() as 'ko' | 'en' | 'ja';

  const messageTemplate =
    COMPARISON_MESSAGE_TEMPLATES[comparison.type as keyof typeof COMPARISON_MESSAGE_TEMPLATES];

  if (messageTemplate && messageTemplate[currentLang]) {
    return messageTemplate[currentLang](fieldLabel, targetFieldLabel);
  }

  const defaultMessage = DEFAULT_ERROR_MESSAGES[currentLang] || DEFAULT_ERROR_MESSAGES.en;
  return defaultMessage(fieldLabel);
};
