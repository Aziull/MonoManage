import { Comparator, Predicate, UpsertPredicate } from "./types";

function minmax<T>(direction: 1 | -1): (array: T[], comparator: Comparator<T>) => T | undefined {
    return (array, comparator) => {
        return array.reduce((prev, current) => {
            if (!prev) return current;
            return comparator(prev, current) * direction > 0 ? current : prev;
        }, undefined as T | undefined);
    };
}


export const ArrayHelper = {
    unique: <T>(array: T[], predicate: Predicate<T>): T[] => {
        return array.reduce((prev: T[], current: T) => {
            if (!prev.find(r => predicate(r, current))) {
                prev.push(current);
            }
            return prev;
        }, []);
    },
    flat: <T>(array: any[], depth: number = 1): T[] => {
        return array.reduce((flat: any[], toFlatten: any) => {
            return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? ArrayHelper.flat<T>(toFlatten, depth - 1) : toFlatten);
        }, []);
    },
    findMax: <T>(array: T[], comparator: Comparator<T>): T | undefined => {
        return minmax<T>(1)(array, comparator);
    },
    findMin: <T>(array: T[], comparator: Comparator<T>): T | undefined => {
        return minmax<T>(-1)(array, comparator);
    },
    simpleDeepCopy: <T>(array: T[]): T[] => {
        return JSON.parse(JSON.stringify(array));
    },
    upsert: <T>(array: T[], newItem: T, predicate: UpsertPredicate<T>): T[] => {
        const index = array.findIndex(item => predicate(item));
        if (index !== -1) {
            array[index] = newItem; // Оновлюємо елемент, якщо він вже існує
        } else {
            array.push(newItem); // Додаємо новий елемент, якщо такий не існує
        }
        return [...array];
    }
};
