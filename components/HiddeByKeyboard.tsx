import React, { ReactNode } from 'react'
import { useKeyboardVisible } from '../hook/useKeyboardVisible'
import { ViewStyle } from 'react-native';
import { View } from 'lucide-react-native';

const HiddeOnKeyboard = ({ invert = false, children, style }: { invert?: boolean, children: ReactNode, style?: ViewStyle }) => {
    const isOpen = useKeyboardVisible();
    return (
        <>
            {((invert && isOpen) || (!invert && !isOpen)) && children}
        </>
    )
}

export default HiddeOnKeyboard