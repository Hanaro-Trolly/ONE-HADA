export const useFormattedDate = () => {
  const parseDateString = (dateString: string): Date | null => {
    if (!dateString) return null;

    try {
      let date: Date;

      // ISO 형식 (2024-03-10 09:45:00.000000)
      if (dateString.includes('-') && dateString.includes(':')) {
        date = new Date(dateString);
      }
      // 생년월일 형식 (YYYYMMDD)
      else if (dateString.length === 8) {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        date = new Date(Number(year), Number(month) - 1, Number(day));
      }
      // 다른 형식의 날짜는 에러 처리
      else {
        return null;
      }

      return isNaN(date.getTime()) ? null : date;
    } catch (error) {
      console.error('Date parsing error:', error);
      return null;
    }
  };

  const formatDate = (
    dateString: string,
    options?: Intl.DateTimeFormatOptions
  ): string => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };

    const date = parseDateString(dateString);
    if (!date) return '날짜 형식 오류';

    try {
      return date.toLocaleString('ko-KR', options || defaultOptions);
    } catch (error) {
      console.error('Date formatting error:', error);
      return '날짜 형식 오류';
    }
  };

  const formatDateWithTime = (dateString: string): string => {
    const timeOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return formatDate(dateString, timeOptions);
  };

  const formatDateLong = (dateString: string): string => {
    const longOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return formatDate(dateString, longOptions);
  };

  // 날짜를 DB 저장 형식으로 변환하는 함수 추가
  const formatForDatabase = (date: Date): string => {
    return date.toISOString().slice(0, 19).replace('T', ' ') + '.000000';
  };

  // 생년월일을 DB 저장 형식으로 변환하는 함수 추가
  const formatBirthForDatabase = (dateString: string): string => {
    return dateString.replace(/[-.\s]/g, '');
  };

  return {
    formatDate,
    formatDateWithTime,
    formatDateLong,
    formatForDatabase,
    formatBirthForDatabase,
  };
};
