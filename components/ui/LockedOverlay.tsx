import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../theme';


const LockedOverlay = ({message = 'Цей блок коду не можна редагувати'}: {message?: string}) => {
    return (
        <View style={styles.container}>
            <BlurView intensity={90} style={styles.absolute} tint='systemUltraThinMaterialLight' >
                <View style={styles.content}>
                    <Icon name="lock" size={50} color={colors.purple[600]} />
                    <Text style={styles.text}>{message}</Text>
                </View>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    text: {
        marginTop: 10,
        fontSize: 18,
        color: colors.purple[600],
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default LockedOverlay;
