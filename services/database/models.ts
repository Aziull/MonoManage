import { Database } from 'expo-sqlite';
import { deleteRow, insertOrUpdate, selectAll } from './databaseHelpers';
import { BaseModel } from './entities';



// Фабрика для створення базових операцій моделі з підтримкою generics
export function createModel<T extends BaseModel>(db: Database, tableName: string) {
    return {
        insertOrUpdateMultiple: async (data: T[], condition?: (item: T) => string) => {
            const insertRows = async () => {
                return Promise.all(data.map(item =>
                    insertOrUpdate(db, tableName, item, condition ? condition(item) : undefined)
                ));
            };
            return db.transaction(async (tx) => {
                await insertRows();
            });
        },
        insertOrUpdate: async (data: T, condition?: string) => {
            return await insertOrUpdate(db, tableName, data, condition);
        },

        selectAll: async (condition: string = '1=1'): Promise<T[]> => {
            const res = await selectAll(db, tableName, condition);
            const rows = res.rows['_array'] || [];

            return rows;
        },
        deleteRow: async (condition: string) => {
            return await deleteRow(db, tableName, condition);
        },
    };
}
