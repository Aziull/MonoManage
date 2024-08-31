import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button, { ButtoPropsType } from '../button/Button';

type Type = { isActive?: boolean, button: string, onKeyPress: (key: string) => void } & ButtoPropsType

const Container = ({ isActive, children }: { isActive: boolean, children: ReactNode }) => {
    const styles = makeStyle(isActive);
    return <View style={styles.container}>
        {children}
        {isActive && <View style={{
            position: 'absolute',
            bottom: 5,
            alignSelf: 'center',
            width: '40%',
            borderWidth: 1.5,
            borderRadius: 10,
            borderColor: '#7e47ff'
        }} />}
    </View>
}

const TabButton = ({ isActive = false, button, onKeyPress, icon, ...props }: Type) => {
    const styles = makeStyle(isActive);
    return (
        <>
            <Button
                shape='square'
                size='sm'
                variant='ghost'
                style={styles.button}
                onPress={() => onKeyPress(button)}
                horizontal={false}
                textStyle={styles.text}
                containerStyle={styles.buttonContainer}
                icon={icon && {
                    name: icon.name,
                    size: icon.size,
                    color: isActive ? icon.color : "#49169c",
                    containerStyle: {
                        marginRight: 0,
                        padding: 0
                    }
                }}
                {...props}
            >
                {button}
            </Button>
        </>

    )
}

const TabSymbolIconButton = ({ isActive = false, iconSign, onKeyPress, button, ...props }: { iconSign?: string } & Type) => {
    const styles = makeStyle(isActive);
    
    return <>
        <Button
            shape='square'
            size='sm'
            variant='ghost'
            style={styles.button}
            onPress={() => onKeyPress(button)}
            horizontal={false}
            textStyle={styles.text}
            containerStyle={styles.buttonContainer}

            {...props}
        >
            <>
                <Text style={{ fontSize: 20, lineHeight: 20, color: isActive ? '#7e47ff' : "#49169c" }}>
                    {iconSign}
                </Text>
                <Text style={{ fontSize: 14, color: "#49169c" }}>
                    {button}
                </Text>
            </>
        </Button>
    </>
}


const makeStyle = (isActive: boolean) => StyleSheet.create({
    container: {

    },
    button: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
    },
    buttonContainer: {
        rowGap: 8,
        padding: 0,
    },
    text: {
        fontWeight: 'normal',
        fontSize: 14,
        color: "#49169c",
    }

});



export { TabButton, TabSymbolIconButton };
