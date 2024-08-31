import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Button from './button/Button';

type TransactionType = 'income' | 'expense';

type PropsType = {
  selectedType: TransactionType;
  onTypeChange: (type: TransactionType) => void;
  style?: ViewStyle;
};

export const colors = {
  income: 'rgba(82, 45, 168, 1)', // Зелений для прибутків
  expense: '#f06f6f', // Червоний для витрат
};

const TransactionTypeSwitcher: React.FC<PropsType> = ({ selectedType, onTypeChange, style }) => {

  return (
    <View style={[styles.switcherContainer, style]}>
      <Button
        size='sm'
        variant='ghost'
        onPress={() => onTypeChange('expense')}
        style={[styles.button,
        selectedType === 'expense' && {
          backgroundColor: '#7e47ff90'
        }
        ]}
        textStyle={{
          color: selectedType === 'expense' ? 'white' : '#7e47ff'
        }}
      >
        Витрата
      </Button>
      <Button
        variant='ghost'
        size='sm'
        onPress={() => onTypeChange('income')}
        style={[styles.button,
        selectedType === 'income' && {
          backgroundColor: '#7e47ff90'
        }
        ]}
        textStyle={{
          color: selectedType === 'income' ? 'white' : '#7e47ff'
        }}
      >
        Прибуток
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  switcherContainer: {
    padding: 3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(82, 45, 168, 0.5)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
  },
  button: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default TransactionTypeSwitcher;
