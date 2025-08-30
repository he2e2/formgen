import type { FormField } from '../types';
import { shouldShowField } from '../utils/conditionUtils';
import { createComparisonValidator, getComparisonErrorMessage } from '../comparison';
import { buildFieldSchema } from '../builders';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateSingleField = (
  field: FormField,
  value: any,
  formValues: Record<string, any>,
): ValidationResult => {
  try {
    if (field.showWhen && !shouldShowField(field.showWhen, formValues)) {
      return { isValid: true };
    }

    const fieldSchema = buildFieldSchema(field);
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      return {
        isValid: false,
        error: result.error.errors[0]?.message || '검증에 실패했습니다',
      };
    }

    if (field.compareWith) {
      const comparison = field.compareWith;
      const isComparisonValid = createComparisonValidator(
        field,
        comparison,
      )({
        ...formValues,
        [field.name]: value,
      });

      if (!isComparisonValid) {
        return {
          isValid: false,
          error: getComparisonErrorMessage(comparison, field.label, comparison.targetField),
        };
      }
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: '검증 중 오류가 발생했습니다',
    };
  }
};
