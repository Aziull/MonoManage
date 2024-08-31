export type CurrencyCode = 'UAH' | 'USD' | 'EUR' | string;

interface FormatCurrencyOptions {
    currency: CurrencyCode;
    locale?: string;
}

const formatCurrency = (
    amount: number,
    { currency, locale = 'uk-UA' }: FormatCurrencyOptions
): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount / 100);
};

const toMinorUnits = (amount: number): number => Math.round(amount * 100);

const toMajorUnits = (amount: number): number => parseFloat((amount / 100).toFixed(2));

const addAmounts = (...amounts: number[]): number => parseFloat(amounts.reduce((acc, val) => acc + val, 0).toFixed(2));

const subtractAmounts = (baseAmount: number, ...amounts: number[]): number =>
    parseFloat(amounts.reduce((acc, val) => acc - val, baseAmount).toFixed(2));

const calculatePercentage = (amount: number, percentage: number): number =>
    Math.round((amount * percentage) / 100);

const parseCurrency = (amountStr: string): number | null => {
    const parsed = parseFloat(amountStr);
    return isNaN(parsed) ? null : parseFloat(parsed.toFixed(2));
};

// Експортуємо всі методи в одному об'єкті
const CurrencyUtils = {
    formatCurrency,
    toMinorUnits,
    toMajorUnits,
    addAmounts,
    subtractAmounts,
    calculatePercentage,
    parseCurrency,
};

export default CurrencyUtils;
