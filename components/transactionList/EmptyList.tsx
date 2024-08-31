import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../theme';

const EmptyList = () => {
  return (
    <View style={styles.container}><Text style={styles.text}>Немає здійснених транзакцій</Text></View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        paddingTop: 64,
    },
    text: {
        fontSize: 32,
        textAlign: 'center',
        color: colors.purple[500],
    },
});

export default EmptyList