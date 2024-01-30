import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';
import { RemamedContextType, useRenamedContext } from '../context/RenamedContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Transaction } from '../types/transaction';

const RenamableDescription = ({ transaction }: { transaction: Transaction }) => {
  const { renamed, cancel, editDescription, setEditDescription, save }: RemamedContextType = useRenamedContext();
  const [text, onChangeText] = useState('Useless Text');

  const openNameEdit = (transaction: Transaction) => {
    onChangeText(renamed?.[transaction.description] || transaction.description);
    setEditDescription({
      id: transaction.id,
      description: transaction.description,
    });
  };

  return (
    <>
      {editDescription && editDescription.id === transaction.id ? (
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'space-around',
            gap: 15,
          }}
        >
          <TextInput
            onChangeText={onChangeText}
            onSubmitEditing={() => save(text)}
            autoFocus={true}
            value={text}
            placeholder={renamed?.[transaction.description] || transaction.description}
            placeholderTextColor="gray"
            keyboardType="ascii-capable"
            keyboardAppearance="dark"
            style={[
              styles.input,
              {
                width: '45%',
              },
            ]}
          />

          <Pressable
            style={{ zIndex:12312,}}
            onPress={() => {
              save(text);
              Keyboard.dismiss();
            }}
          >
            <MaterialIcons name="done" size={25} style={{ color: 'green' }} />
          </Pressable>

          <Pressable
            onPress={() => {
              cancel();
              Keyboard.dismiss();
            }}
          >
            <MaterialIcons name="close" size={25} style={{ color: 'red' }} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#343a40' : 'transparent',
            },
          ]}
          onPress={() => {
            openNameEdit(transaction);
          }}
        >
          <Text style={styles.text}>
            {' '}
            {renamed && renamed[transaction.description] ? renamed[transaction.description] : transaction.description}
          </Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    color: 'white',
    fontSize: 16,
  },
});

export default RenamableDescription;