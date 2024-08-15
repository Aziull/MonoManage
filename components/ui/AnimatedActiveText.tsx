import { forwardRef, ReactNode, useEffect, useRef } from "react";
import { Animated, TextInput, TextInputProps, TextProps } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
const FONT_SIZE = 16
const ACTIVE_FONT_SIZE = 24

const AnimatedActiveText = ({ children, isSelected, color, style, initialFontSize = FONT_SIZE,
    selectedFontSize = ACTIVE_FONT_SIZE, }: {
        children: ReactNode, isSelected: boolean, color?: string, initialFontSize?: number;
        selectedFontSize?: number;
    } & TextProps) => {
    const fontSize = useRef(new Animated.Value(initialFontSize)).current;

    useEffect(() => {
        Animated.timing(fontSize, {
            toValue: isSelected ? selectedFontSize : initialFontSize,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isSelected]);

    return (
        <Animated.Text style={[style, { fontSize }, { color }]}>
            {children}
        </Animated.Text>
    );
};

interface AnimatedTextInputProps {
    isSelected: boolean;
    initialFontSize?: number;
    selectedFontSize?: number;
    style?: any;
    [key: string]: any;
}
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedActiveTextInput = forwardRef<TextInput, AnimatedTextInputProps>(({
    isSelected,
    initialFontSize = FONT_SIZE,
    selectedFontSize = ACTIVE_FONT_SIZE,
    style,
    ...props
}, ref) => {
    const fontSize = useRef(new Animated.Value(initialFontSize)).current;

    useEffect(() => {
        Animated.timing(fontSize, {
            toValue: isSelected ? selectedFontSize : initialFontSize,
            duration: 300, // тривалість анімації у мілісекундах
            useNativeDriver: false, // `fontSize` не підтримує native driver
        }).start();
    }, [isSelected]);

    return (
        <AnimatedTextInput
            ref={ref}
            {...props}
            style={[style, { fontSize }]} // поєднання стилів користувача зі стилями анімації
        />
    );
})

export { AnimatedActiveText, AnimatedActiveTextInput };