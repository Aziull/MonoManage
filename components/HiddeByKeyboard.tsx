import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { useKeyboardVisible } from '../hook/useKeyboardVisible';

const HiddeOnKeyboard = ({ invert = false, children, style }: { invert?: boolean, children: ReactNode, style?: ViewStyle }) => {
    const isOpen = useKeyboardVisible();
    return (
        <>
            {((invert && isOpen) || (!invert && !isOpen)) && children}
        </>
    )
}

export default HiddeOnKeyboard