import React, {useState} from 'react'
import { Pressable, StyleSheet, Text, PressableProps } from 'react-native'

type PropsType = PressableProps & {
    children: React.ReactNode
}

const Button = (props: PropsType) => {
    return <>
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? "#f5b4ff" : '#F194FF',
                },
                s.button,
            ]}
            {...props}>
            <Text style={s.textStyle}>{props.children}</Text>
        </Pressable>
    </>
}

const s = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})


export default Button;