export const FIELD_OPERATORS = {
  EQUALS: 'equals',
  NOT_EQUALS: 'not-equals',
  CONTAINS: 'contains',
  GREATER_THAN: 'greater-than',
  LESS_THAN: 'less-than',
} as const;

export type FieldOperator = (typeof FIELD_OPERATORS)[keyof typeof FIELD_OPERATORS];

export const COMPARISON_TYPES = {
  EQUALS: 'equals',
  NOT_EQUALS: 'not-equals',
  GREATER_THAN: 'greater-than',
  LESS_THAN: 'less-than',
  CUSTOM: 'custom',
} as const;

export type ComparisonType = (typeof COMPARISON_TYPES)[keyof typeof COMPARISON_TYPES];
