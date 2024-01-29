import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

type ActionProps = {
    action: () => void,
    actionIconName: string
}

const Action = ({action, actionIconName}: ActionProps) => {
  const navigation = useNavigation<any>();

  return (
      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed ? '#6c757d' : '#343a40',
          },
        ]}
        onPress={action}
      >
        <MaterialIcons name={actionIconName} size={30} style={styles.icon} />
      </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 10,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  icon: {
    color: 'white',
  },
});

export default Action;