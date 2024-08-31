
export type RangeNames = "Вручну" | "Місяць" | "Квартал" | "Рік" | "Весь час"

export interface DateRange {
    start?: UnixTimestampSeconds | null;
    end?: UnixTimestampSeconds | null;
    title: RangeNames
}
export type AccountsIds = string[] | undefined;

export type ComplexFilters = {
    timeframe: DateRange;
    accountsId: AccountsIds;
}

export interface FiltersState extends ComplexFilters {
    description: string;
}