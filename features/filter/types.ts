import { DateType } from "react-native-ui-datepicker";

export interface DateRange {
    start: number | null | undefined;
    end: number | null | undefined;
}

export interface FiltersState {
    dateRange: DateRange;
    accountsId: string[];
    description: string;
}