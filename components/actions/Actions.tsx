import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TransactionButton from './ActionItem';

const ButtonsContainer = () => {
  const navigation = useNavigation<any>();

  const [isListView, setIsListView] = useState(true); // Стан для відстеження відображення списку чи статистики

  const toggleView = () => {
    setIsListView(!isListView);
  };
  return (
    <View style={styles.buttonsContainer}>
      <TransactionButton
        iconName="add"
        color="#9575CD"
        onPress={() => navigation.navigate('NewTransaction', { type: 'income' })}
      />

      <TransactionButton
        iconName={isListView ? "bar-chart" : "list"}
        color="#4CAF50"
        onPress={toggleView}
        style={styles.wideButton}
      />

      <TransactionButton
        iconName="remove"
        color="#F8BBD0"
        onPress={() => navigation.navigate('NewTransaction', { type: 'expense' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  wideButton: {
    width: 100,
    justifyContent: 'center',
  },
});

export default ButtonsContainer;