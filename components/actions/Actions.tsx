import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../context/AuthContext';
import Action from './ActionItem';

const Actions = () => {
  const navigation = useNavigation<any>();
  const { signOut } = useAuthContext();

  return (
    <View style={styles.container}>
        <Action action={() => navigation.navigate('NewTransaction')} actionIconName='add' />
        <Action action={signOut} actionIconName='logout' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "center",
  },
});

export default Actions;