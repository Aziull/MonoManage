import { DateType } from "react-native-ui-datepicker";

export type RangeNames = "Вручну" | "Місяць" | "Квартал" | "Рік"

export interface DateRange {
    start: number | null | undefined;
    end: number | null | undefined;
    title: RangeNames
}

export interface FiltersState {
    timeframe: DateRange;
    accountsId: string[];
    description: string;
}