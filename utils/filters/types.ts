export type FilterCriteria = {
    description?: string;
    categories?: string[];
    timeframe?: {
        start?: number | null,
        end?: number | null,
    };
    accountsId?: string[];
};