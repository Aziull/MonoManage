import React, { useState, useEffect, useRef, useReducer } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Button from './Button';

type TransactionType = 'income' | 'expense';

type PropsType = {
  selectedType: TransactionType;
  onTypeChange: (type: TransactionType) => void;
  style?: ViewStyle
};

export const colors = {
  income: 'rgba(82, 45, 168, 1)', // Зелений для прибутків
  expense: '#f06f6f', // Червоний для витрат
};



const TransactionTypeSwitcher: React.FC<PropsType> = ({ selectedType, onTypeChange, style }) => {
  const animation = useRef(new Animated.Value(selectedType === 'income' ? 0 : 1)).current;
  useEffect(() => {
    Animated.timing(animation, {
      toValue: selectedType === 'income' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedType]);

  const marginLeft = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });
  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.income, colors.expense],
  });
  //todo: use debounce
  return (
    <View style={[styles.switcherContainer, {
      ...style
    }]}>
      <Animated.View style={[styles.slider, { marginLeft, backgroundColor }]} />
      <Button
        style={styles.button}
        onPress={() => onTypeChange('income')}
      >
        <Text style={styles.buttonText}>Прибуток</Text>
      </Button>
      <Button
        style={styles.button}
        onPress={() => onTypeChange('expense')}
      >
        <Text style={styles.buttonText}>Витрата</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  switcherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(82, 45, 168, 0.7)",
    borderColor: "rgba(82, 45, 168, 0.7)",
    overflow: 'hidden',
    padding: 3,
    width: '75%'
  },
  slider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 3,
    width: '50%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(82, 45, 168, 0.6)',
    margin: 3,
  },
  button: {
    flex: 1,
    paddingVertical: 5,
  },
  buttonText: {
    color: '#eee',
    alignSelf: 'center',
  },
});

export default TransactionTypeSwitcher;
