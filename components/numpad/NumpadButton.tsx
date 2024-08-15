import React from 'react'
import Button, { ButtoPropsType } from '../button/Button'
import { StyleSheet, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const NumpadButton = ({ button, onKeyPress, ...props }: { button: string, onKeyPress: (key: string) => void } & ButtoPropsType) => {
    return (
        <Button
            variant='ghost'
            shape='rounded'
            style={styles.button}
            onPress={() => onKeyPress(button)}
            icon={button === 'delete' ? {
                name: 'backspace',
                size: 16,
            } : undefined}
            IconComonent={button === 'delete' ? <Icon name="backspace" color={"#7e47ff"} /> : undefined}
            size={button === 'delete' ? 'icon' : 'md'}
            {...props}
            textStyle={styles.text}
        >
            {button !== 'delete' && button}
        </Button>
    )
}

const styles = StyleSheet.create({

    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20
    },
});


export default NumpadButton