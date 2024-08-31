import dayjs, { Dayjs } from 'dayjs'; // Припускаючи, що ви використовуєте dayjs у вашому проекті

export type DateType = string | number | Dayjs | Date | null | undefined;

export const setStartOfDay = (date: Date | null): number | undefined => {
  if (!date) return undefined;
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay.getTime();
};

export const setEndOfDay = (date: Date | null): number | undefined => {
  if (!date) return undefined;
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.getTime();
};


export function convertToDate(date: DateType): Date | null {
  if (!date) {
    return null; // Повертаємо null для null або undefined
  }

  if (date instanceof dayjs) {
    return new Date(date.valueOf());
  }
  if (typeof date === 'number') {
    return new Date(date); // Число трактуємо як timestamp
  }

  if (typeof date === 'string') {
    const parsedDate = Date.parse(date);
    if (!isNaN(parsedDate)) {
      return new Date(parsedDate); // Спробуємо розпарсити рядок
    }
    return null; // Якщо рядок не може бути розпарсений, повертаємо null
  }

  if ('toDate' in date && typeof date.toDate === 'function') {
    return date.toDate(); // Для об'єктів Dayjs викликаємо метод toDate()
  }

  if (date instanceof Date) {
    return date; // Якщо це вже об'єкт Date, просто повертаємо його
  }

  return null; // Для будь-яких інших випадків, які ми не обробили, повертаємо null
}