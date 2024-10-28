export const formatDate = (input: Date | string): string => {
  const date = typeof input === 'string' ? new Date(input) : input;

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
