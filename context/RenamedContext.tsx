import { createContext, useEffect, useState, useContext } from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export type RenamedType = Record<string, string>;

export type EditDescriptionType = {
    id: string,
    description: string,
} | null;

export type RemamedContextType = {
    renamed: RenamedType,
    editDescription: EditDescriptionType,
    setEditDescription: Function,
    save: (name: string) => Promise<void>,
    cancel: () => void
}

const RenamedContext = createContext(null);

export const RenamedProvider = ({ children }) => {
    const [renamedTransactions, setRenamedTransactions] = useState<RenamedType>({});
    const [editDescription, setEditDescription] = useState<EditDescriptionType>(null);
    const { getItem, setItem } = useAsyncStorage('renamed-transactions');
    const contextValue: RemamedContextType = {
        renamed: renamedTransactions as RenamedType,
        editDescription: editDescription,
        setEditDescription: setEditDescription,
        save: async (name) => {
            if (editDescription === null) return;
            const newData = {
                ...renamedTransactions,
                [editDescription.description]: name
            }
            setRenamedTransactions(newData)
            const json = JSON.stringify(newData);

            await setItem(json);
            setEditDescription(null);
        },
        cancel: () => setEditDescription(null)
    }

    useEffect(() => {
        const init = async () => {
            const storageDataJson = await getItem();
            const storageData = JSON.parse(storageDataJson);
            setRenamedTransactions(storageData);
        }
        init();
    }, [])
    return <RenamedContext.Provider value={contextValue}>{children}</RenamedContext.Provider>
}

// Custom Hook for Accessing the Context
export const useRenamedContext = () => {
    const context = useContext(RenamedContext);
    if (!context) {
        throw new Error('useMyContext must be used within a IgnoredTransactionsProvider');
    }
    return context;
};
