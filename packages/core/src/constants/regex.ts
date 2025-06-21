export const DATE_REGEX = {
  date: /^\d{4}-\d{2}-\d{2}$/,
  'datetime-local': /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
  time: /^\d{2}:\d{2}$/,
} as const;
