import { i18n } from '../constants/errors';

export const getUnsupportedFieldMessage = (field: never): string => {
  const currentLang = i18n.getCurrentLanguage();
  const messages = {
    ko: `지원하지 않는 필드 타입: ${JSON.stringify(field)}`,
    en: `Unsupported field type: ${JSON.stringify(field)}`,
    ja: `サポートされていないフィールドタイプ: ${JSON.stringify(field)}`,
  };
  return messages[currentLang as keyof typeof messages] || messages.en;
};
