import React, { useState, useCallback, useContext, createContext } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ActionSheetModal from '../modal/ActionSheetModal';
import { Transaction } from '../features/transaction/types';

type ContextType = {
    showActionSheet: (transaction: Transaction) => void,
    hideActionSheet: () => void,
    transaction: Transaction | null,
    isVisible: boolean,
}

// Контекст для доступу до функціоналу модального вікна
export const ActionSheetContext = createContext<ContextType| null>(null);

// Провайдер контексту
export const ActionSheetProvider = ({ children }: { children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [transaction, setTransaction] = useState<Transaction | null>(null);

    // Функція для відкриття модального вікна
    const showActionSheet = useCallback((transactionItem: Transaction) => {
        setTransaction(transactionItem);
        setIsVisible(true);
    }, []);

    // Функція для закриття модального вікна
    const hideActionSheet = useCallback(() => {
        setIsVisible(false);
    }, []);

    const value: ContextType = { showActionSheet, hideActionSheet, transaction, isVisible }

    return (
        <ActionSheetContext.Provider value={value}>
            {children}
            {isVisible && <ActionSheetModal transaction={transaction} onClose={hideActionSheet} />}
        </ActionSheetContext.Provider>
    );
};

