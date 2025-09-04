export const combineClasses = (...classes: (string | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

export const createCommonAria = (error?: string, name?: string) => ({
  'aria-invalid': !!error,
  'aria-describedby': error ? `${name}-error` : undefined,
});

export const createFieldClassNames = (
  baseClassName: string,
  customClassNames: Partial<Record<string, string>> = {},
) => ({
  wrapper: combineClasses(`${baseClassName}-field`, customClassNames.wrapper),
  fieldset: combineClasses(`${baseClassName}-fieldset`, customClassNames.fieldset),
  legend: combineClasses(`${baseClassName}-legend`, customClassNames.legend),
  label: combineClasses(`${baseClassName}-label`, customClassNames.label),
  input: combineClasses(`${baseClassName}-input`, customClassNames.input),
  error: combineClasses(`${baseClassName}-error`, customClassNames.error),
  group: combineClasses(`${baseClassName}-group`, customClassNames.group),
});

export const getFieldError = (
  errors: Record<string, any>,
  fieldName: string,
): string | undefined => {
  const error = errors[fieldName];
  return error?.message || error;
};

export const isRequiredField = (field: { required?: boolean }): boolean => field.required === true;

export const getFieldLabel = (
  label: string,
  required?: boolean,
  showOptionalLabel?: boolean,
): string => {
  if (required) return `${label} *`;
  if (showOptionalLabel) return `${label} (선택)`;
  return label;
};
