export const useFormattedDate = () => {
  const formatDate = (
    dateString: string,
    options?: Intl.DateTimeFormatOptions
  ) => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };

    return new Date(dateString).toLocaleString(
      'ko-KR',
      options || defaultOptions
    );
  };

  const formatDateWithTime = (dateString: string) => {
    const timeOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    return formatDate(dateString, timeOptions);
  };

  const formatDateLong = (dateString: string) => {
    const longOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return formatDate(dateString, longOptions);
  };

  return { formatDate, formatDateWithTime, formatDateLong };
};
