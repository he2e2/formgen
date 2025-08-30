import type { FormField, FieldComparison } from '../types';
import { isEmpty } from '../utils/fieldUtils';
import { COMPARISON_TYPES } from '../constants/operators';

const COMPARISON_STRATEGIES = {
  [COMPARISON_TYPES.EQUALS]: (value: any, targetValue: any) => value === targetValue,

  [COMPARISON_TYPES.NOT_EQUALS]: (value: any, targetValue: any) => value !== targetValue,

  [COMPARISON_TYPES.GREATER_THAN]: (value: any, targetValue: any) =>
    Number(value) > Number(targetValue),

  [COMPARISON_TYPES.LESS_THAN]: (value: any, targetValue: any) =>
    Number(value) < Number(targetValue),

  [COMPARISON_TYPES.CUSTOM]: (value: any, targetValue: any, customValidator?: Function) =>
    customValidator ? customValidator(value, targetValue) : true,
} as const;

export const createComparisonValidator = (field: FormField, comparison: FieldComparison) => {
  return (data: Record<string, any>) => {
    const value = data[field.name];
    const targetValue = data[comparison.targetField];

    if (isEmpty(value) || isEmpty(targetValue)) return true;

    const strategy = COMPARISON_STRATEGIES[comparison.type];

    if (!strategy) {
      console.warn(`Unknown comparison type: ${comparison.type}`);
      return true;
    }

    if (comparison.type === COMPARISON_TYPES.CUSTOM) {
      return strategy(value, targetValue, comparison.customValidator);
    }

    return strategy(value, targetValue);
  };
};
