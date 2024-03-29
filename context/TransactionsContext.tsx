import { createContext, useContext, useEffect, useReducer } from "react";
import { getTransactions } from "../api/monoApi";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useAuthContext } from "./AuthContext";
import { Transaction } from "../types/transaction";

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const SET_IGNORED_TRANSCTIONS = 'SET_IGNORED_TRANSCTIONS';
const SET_TRANSCTIONS = 'SET_TRANSCTIONS';

type AddItemAction = {
    type: typeof ADD_ITEM;
    payload: {
        transaction: Transaction;
    };
};

type RemoveItemAction = {
    type: typeof REMOVE_ITEM;
    payload: {
        transaction: Transaction;
    };
};

type SetDataAction = {
    type: typeof SET_IGNORED_TRANSCTIONS;
    payload: {
        data: Transaction[];
    };
};

type SetTransactionsAction = {
    type: typeof SET_TRANSCTIONS;
    payload: {
        data: Transaction[];
    };
};



type Action = AddItemAction | RemoveItemAction | SetDataAction | SetTransactionsAction;

type StateType = {
    transactions: Transaction[],
    ignoredTransactions: Transaction[],
}
// Дії
const addToIgnored = (transaction: Transaction): AddItemAction => ({ type: ADD_ITEM, payload: { transaction } });
const removeFromIgnored = (transaction: Transaction): RemoveItemAction => ({ type: REMOVE_ITEM, payload: { transaction } });
const setData = (data: Transaction[]): SetDataAction => ({ type: SET_IGNORED_TRANSCTIONS, payload: { data } });
const setTransactions = (data: Transaction[]): SetTransactionsAction => ({ type: SET_TRANSCTIONS, payload: { data } });

// Редуктор
const reducer = (state: StateType, action: Action): StateType => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                transactions: state.transactions.filter(el => el.id !== action.payload.transaction.id),
                ignoredTransactions: [...state.ignoredTransactions, action.payload.transaction]
            };
        case REMOVE_ITEM:
            return {
                ...state,
                transactions: [...state.transactions, action.payload.transaction],
                ignoredTransactions: state.ignoredTransactions.filter((item) => item.id !== action.payload.transaction.id)
            }
        case SET_IGNORED_TRANSCTIONS:
            return {
                ...state,
                ignoredTransactions: [...action.payload.data]
            }
        case SET_TRANSCTIONS:
            return {
                ...state,
                transactions: [...action.payload.data]
            }
        default:
            return state;
    }
};

// Initial State
const initialState: StateType = {
    transactions: [],
    ignoredTransactions: [],
};

// Create Context
const IgnoredTransactionsContext = createContext(null);

export const IgnoredTransactionsProvider = ({ children }) => {
    const { isAuth } = useAuthContext();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { getItem, setItem } = useAsyncStorage('ignored-transactions');
    const { getItem: getCreated, setItem: setCreated } = useAsyncStorage('created-transactions');

    const contextValue = {
        state: state,
        addToIgnored: async (transaction: Transaction) => {
            const json: string = await getItem();
            const data: Transaction[] = JSON.parse(json)  || [];

            const newData = JSON.stringify([...data, transaction])
            await setItem(newData)

            return dispatch(addToIgnored(transaction))
        },
        removeFromIgnored: async (transaction: Transaction) => {
            const json = await getItem();
            const data: Transaction[] = JSON.parse(json) || [];
            const newData = JSON.stringify(data.filter(el => el.id !== transaction.id))
            await setItem(newData)

            return dispatch(removeFromIgnored(transaction))
        },
        setTransactions: (data: Transaction[]) => dispatch(setTransactions(data)),
        create: async (transaction: Transaction) => {
            const json: string = await getCreated();
            const oldData: Transaction[] = JSON.parse(json) || [];
            const newData: string = JSON.stringify([...oldData, transaction]);
            await setCreated(newData)

            dispatch(setTransactions([...state.transactions, transaction]))

        }
    };

    useEffect(() => {

        const init = async () => {
            if (!isAuth) return;
            const account = 0;
            const today = new Date();
            const from = new Date(today.getFullYear(), today.getMonth(), 1);

            const transactions: Transaction[] = await getTransactions(account, from, today);
            const customJSON = await getCreated();
            const storageDataJson = await getItem();

            const storageData = JSON.parse(storageDataJson)  || [];

            const custonData: Transaction[] = JSON.parse(customJSON) || [];

            const filteredTransactions = [...custonData, ...transactions].filter(
                (transaction) => !storageData.some((data) => data.id === transaction.id)
            );
            dispatch(setTransactions(filteredTransactions));
            dispatch(setData(storageData))
        }

        init();
    }, [isAuth])
    
    return <IgnoredTransactionsContext.Provider value={contextValue}>{children}</IgnoredTransactionsContext.Provider>;
};


// Custom Hook for Accessing the Context
export const useIgnoredTransactionsContext = () => {
    const context = useContext(IgnoredTransactionsContext);
    if (!context) {
        throw new Error('useMyContext must be used within a IgnoredTransactionsProvider');
    }
    return context;
};
