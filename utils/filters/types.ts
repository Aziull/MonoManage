export type FilterCriteria = {
    description?: string;
    categories?: string[];
    timeframe?: {
        start?: UnixTimestampSeconds | null,
        end?: UnixTimestampSeconds | null,
    };
    accountsId?: string[];
};