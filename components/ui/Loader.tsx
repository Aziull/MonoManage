import { useTheme } from '@react-navigation/native';
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Loader = ({ text }: { text: string }) => {
    const { colors } = useTheme();
    const styles = makeStyles({ colors });
    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const makeStyles = ({ colors }: { colors: any }) => StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 20,
        color: colors.primary,
        fontSize: 18,
        textAlign: 'center',
    },
});


export default Loader