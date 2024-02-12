export const MathHelper = {
    equals: (n1: number, n2: number, accuracy: number = 1E-5): boolean => {
        return (n1 + accuracy >= n2 && n1 - accuracy <= n2) || (n2 + accuracy >= n1 && n2 - accuracy <= n1);
    },
    between: (value: number, a: number, b: number, Eps: number = 1E-3): boolean => {
        var min = Math.min.apply(Math, [a, b]),
            max = Math.max.apply(Math, [a, b]);
        return value + Eps > min && value < max + Eps;
    },
    getPercentageOfNumber: (value: number, percentage: number): number => {
        return value / 100 * percentage;
    },
    isFloat: (value: number): boolean => {
        return Number(value) === value && value % 1 !== 0;
    },
    toFixed: (value: number, fractionDigits: number = 3): number => {
        const number = value.toFixed(fractionDigits);
        return parseFloat(number);
    }
}
