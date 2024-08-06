import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TransactionButton from './ActionItem';
import Button from '../button/Button';

const ButtonsContainer = () => {
  const navigation = useNavigation<any>();

  const [isListView, setIsListView] = useState(true); // Стан для відстеження відображення списку чи статистики

  const toggleView = () => {
    setIsListView(!isListView);
  };
  return (
    <View style={styles.buttonsContainer}>
      <Button
        size='icon'
        color="#9575CD"
        shape='rounded'
        icon={{
          name: 'plus',
          size: 28,
          color: "#fff"
        }}
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        onPress={() => navigation.navigate('NewTransaction', { type: 'income' })}
      />
      {/* <Button
        size='icon'
        color="#4CAF50"
        shape='rounded'
        icon={{
          name: isListView ? "bar-chart" : "list",
          color: "#fff",
          size: 28
        }}
        onPress={toggleView}
        style={styles.wideButton}
      /> */}
      <Button
        size='icon'
        color="#F8BBD0"
        shape='rounded'
        icon={{
          name: 'remove',
          color: "#fff",
          size: 28
        }}
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        onPress={() => navigation.navigate('NewTransaction', { type: 'expense' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    alignSelf: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    padding: 10,
    paddingBottom: 0,
    backgroundColor: '#ff0000',
    borderTopEndRadius: 60,
    borderTopStartRadius: 60,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  wideButton: {
    width: 100,
    justifyContent: 'center',
  },
});

export default ButtonsContainer;