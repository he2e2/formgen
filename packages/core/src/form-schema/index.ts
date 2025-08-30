export {
  generateZodSchema,
  generateDefaultValues,
  validateSingleField,
  getFieldsByGroup,
} from './core';

export * from './types';
export type { ValidationResult, GroupedFields } from './core';

export {
  setFormLanguage,
  setGlobalLanguage,
  ERROR,
  i18n,
  type SupportedLanguage,
  DATE_REGEX,
} from './constants';

export {
  buildText,
  buildNumber,
  buildCheckbox,
  buildChoice,
  buildDate,
  buildFieldSchema,
} from './builders';

export { isEmpty, preprocessNumber, withRequired } from './utils/fieldUtils';

export { shouldShowField } from './utils/conditionUtils';

export { createComparisonValidator, getComparisonErrorMessage } from './comparison';
