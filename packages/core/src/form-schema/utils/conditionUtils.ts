import type { FieldCondition } from '../types';
import { FIELD_OPERATORS } from '../constants/operators';

export const shouldShowField = (
  condition: FieldCondition,
  formValues: Record<string, any>,
): boolean => {
  const targetValue = formValues[condition.when];
  const expectedValue = condition.is;
  const operator = condition.operator || FIELD_OPERATORS.EQUALS;

  switch (operator) {
    case FIELD_OPERATORS.EQUALS:
      return targetValue === expectedValue;

    case FIELD_OPERATORS.NOT_EQUALS:
      return targetValue !== expectedValue;

    case FIELD_OPERATORS.CONTAINS:
      return Array.isArray(targetValue)
        ? targetValue.includes(expectedValue)
        : String(targetValue).includes(String(expectedValue));

    case FIELD_OPERATORS.GREATER_THAN:
      return Number(targetValue) > Number(expectedValue);

    case FIELD_OPERATORS.LESS_THAN:
      return Number(targetValue) < Number(expectedValue);

    default:
      return true;
  }
};
