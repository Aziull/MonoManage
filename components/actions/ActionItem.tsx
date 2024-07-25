import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface TransactionButtonProps {
  iconName?: string;
  color: string;
  title?: string;
  onPress: () => void;
  style?: object;
}

const TransactionButton: React.FC<TransactionButtonProps> = ({ iconName, color, title, onPress, style }) => {

  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: color}, style]} onPress={onPress}>
      {iconName && <MaterialIcons name={iconName} size={28} color="#FFF" />}
      {title && <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    elevation: 3,
    margin: 5, // Додано трохи відступу для кращого вигляду
  },
  buttonText: {
    color: '#FFF',
    marginLeft: 5,
  },
});

export default TransactionButton;