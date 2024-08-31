import dayjs, { Dayjs } from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(quarterOfYear);
dayjs.extend(isBetween);

type DateInput = string | number | Dayjs | Date | null | undefined;

const isMilliseconds = (timestamp: number): boolean => {
    return String(timestamp).length === 13;
};

const normalizeToSeconds = (timestamp: number): UnixTimestampSeconds => {
    return isMilliseconds(timestamp) ? Math.floor(timestamp / 1000) : timestamp;
};

const createUnixTimestamp = (timestamp: number): UnixTimestampSeconds => {
    return normalizeToSeconds(timestamp);
};

export const getCurrentUnixTime = (): UnixTimestampSeconds => dayjs().unix();

export const getUnixTime30DaysAgo = (): UnixTimestampSeconds => dayjs().subtract(30, 'day').unix();

export const getStartOfCurrentMonthUnixTime = (): UnixTimestampSeconds => dayjs().startOf('month').unix();
export const getEndOfCurrentMonthUnixTime = (): UnixTimestampSeconds => dayjs().endOf('month').unix();

export const getStartOfCurrentQuarterUnixTime = (): UnixTimestampSeconds => dayjs().startOf('quarter').unix();
export const getEndOfCurrentQuarterUnixTime = (): UnixTimestampSeconds => dayjs().endOf('quarter').unix();

export const getStartOfCurrentYearUnixTime = (): UnixTimestampSeconds => dayjs().startOf('year').unix();
export const getEndOfCurrentYearUnixTime = (): UnixTimestampSeconds => dayjs().endOf('year').unix();

export const getStartOfUnixDay = (unixTime?: UnixTimestampSeconds): UnixTimestampSeconds => {
    return unixTime ? dayjs.unix(normalizeToSeconds(unixTime)).startOf('day').unix() : dayjs().startOf('day').unix();
};

export const getEndOfUnixDay = (unixTime?: UnixTimestampSeconds): UnixTimestampSeconds => {
    return unixTime ? dayjs.unix(normalizeToSeconds(unixTime)).endOf('day').unix() : dayjs().endOf('day').unix();
};

export const getStartOfCurrentWeekUnixTime = (): UnixTimestampSeconds => dayjs().startOf('week').unix();

export const getEndOfCurrentWeekUnixTime = (): UnixTimestampSeconds => dayjs().endOf('week').unix();

export const getUnixTimeRange = (startDate: DateInput, endDate: DateInput): { start: UnixTimestampSeconds, end: UnixTimestampSeconds } => ({
    start: dayjs(startDate).startOf('day').unix(),
    end: dayjs(endDate).endOf('day').unix(),
});

export const isDateInRange = (date: DateInput, startDate: DateInput, endDate: DateInput): boolean =>
    dayjs(date).isBetween(dayjs(startDate), dayjs(endDate), null, '[]');

export const addDaysUnixTime = (days: UnixTimestampSeconds): UnixTimestampSeconds => dayjs().add(days, 'day').unix();

export const subtractDaysUnixTime = (days: UnixTimestampSeconds): UnixTimestampSeconds => dayjs().subtract(days, 'day').unix();

export const convertToUnix = (input: DateInput): UnixTimestampSeconds => {
    if (input === undefined || input === null) {
        throw new Error('Date input is required');
    }

    if (typeof input === 'number') {
        return createUnixTimestamp(input);
    }

    const parsed = dayjs(input);
    if (!parsed.isValid()) {
        throw new Error(`Invalid date input: ${input}`);
    }
    return parsed.unix();
};

export const convertUnixToDate = (unixTime: UnixTimestampSeconds): Date => {
    return dayjs.unix(createUnixTimestamp(unixTime)).toDate();
};

const getDaysBetween = (startUnix: UnixTimestampSeconds, endUnix: UnixTimestampSeconds): number => {
    const start = dayjs.unix(normalizeToSeconds(startUnix));
    const end = dayjs.unix(normalizeToSeconds(endUnix));
    return end.diff(start, 'day');
};

export const twoDigitMonthFormatter = new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: '2-digit', year: 'numeric' });
export const shortMotnthFormatter = new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' });

const DateUtils = {
    getDaysBetween,
    getCurrentUnixTime,
    getUnixTime30DaysAgo,
    getStartOfCurrentMonthUnixTime,
    getEndOfCurrentMonthUnixTime,
    getStartOfCurrentQuarterUnixTime,
    getEndOfCurrentQuarterUnixTime,
    getStartOfCurrentYearUnixTime,
    getEndOfCurrentYearUnixTime,
    getStartOfUnixDay,
    getEndOfUnixDay,
    getStartOfCurrentWeekUnixTime,
    getEndOfCurrentWeekUnixTime,
    getUnixTimeRange,
    isDateInRange,
    addDaysUnixTime,
    subtractDaysUnixTime,
    convertToUnix,
    convertUnixToDate,
    formatters: {
        twoDigitMonthFormatter,
        shortMotnthFormatter,
    },
};

export default DateUtils;