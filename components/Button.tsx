import React from 'react';
import { ViewStyle, StyleSheet, Text, Pressable, Animated, PressableProps, View } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
type ButtonWidth = 'fixed' | 'dynamic' | 'full';
type ButtonShape = 'square' | 'squareRounded' | 'rounded';
type ButtonAlign = 'left' | 'center' | 'right';

type PropsType = PressableProps & {
    children: React.ReactNode;
    style?: object;
    containerStyle?: ViewStyle;
    textStyle?: object;
    icon?: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    width?: ButtonWidth;
    shape?: ButtonShape;
    align?: ButtonAlign;
};

const Button = ({
    style,
    containerStyle,
    textStyle,
    icon,
    children,
    variant = 'primary',
    size = 'md',
    width = 'dynamic',
    shape = 'squareRounded',
    align = 'center',
    ...props
}: PropsType) => {
    const animated = new Animated.Value(1);

    const fadeIn = () => {
        Animated.timing(animated, {
            toValue: 0.8,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };
    const fadeOut = () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const variantStyles = variants[variant];
    const sizeStyles = sizes[size];
    const widthStyles = widths[width];
    const shapeStyles = shapes[shape];
    const alignStyles = alignments[align];

    return (
        <Pressable
            onPressIn={fadeIn}
            onPressOut={fadeOut}
            style={({ pressed }) => [
                variantStyles.button,
                pressed && variantStyles.buttonPressed,
                sizeStyles.button,
                widthStyles.button,
                shapeStyles.button,
                alignStyles.button,
                style
            ]}
            {...props}>
            <Animated.View
                style={[
                    {
                        opacity: animated,
                    },
                    styles.buttonContainer,
                    sizeStyles.buttonContainer,
                    widthStyles.buttonContainer,
                    shapeStyles.buttonContainer,
                    containerStyle
                ]}
            >
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                {size !== 'icon' && <Text style={[styles.text, variantStyles.text, sizeStyles.text, textStyle]}>{children}</Text>}
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        marginRight: 10
    },
    text: {
        fontSize: 16,
    },
});

const variants = {
    primary: StyleSheet.create({
        button: {
            backgroundColor: '#7e47ff',
        },
        buttonPressed: {
            backgroundColor: '#512DA8',
        },
        text: {
            color: '#ffffff',
            fontWeight: 'bold',
        },
    }),
    secondary: StyleSheet.create({
        button: {
            backgroundColor: '#eeeeee',
        },
        buttonPressed: {
            backgroundColor: '#cccccc',
        },
        text: {
            color: '#333333',
        },
    }),
    destructive: StyleSheet.create({
        button: {
            backgroundColor: '#ff4444',
        },
        buttonPressed: {
            backgroundColor: '#cc0000',
        },
        text: {
            color: '#ffffff',
            fontWeight: 'bold',
        },
    }),
    outline: StyleSheet.create({
        button: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#7e47ff',
        },
        buttonPressed: {
            borderColor: '#512DA8',
        },
        text: {
            color: '#7e47ff',
            fontWeight: 'bold',
        },
    }),
    ghost: StyleSheet.create({
        button: {
            backgroundColor: 'transparent',
        },
        buttonPressed: {
            backgroundColor: '#f0f0ff',
        },
        text: {
            color: '#7e47ff',
            fontWeight: 'bold',
        },
    }),
    link: StyleSheet.create({
        button: {
            backgroundColor: 'transparent',
        },
        buttonPressed: {
        },
        buttonContainer: {
            padding: 0,
        },
        text: {
            color: '#7e47ff',
            textDecorationLine: 'underline',
        },
    }),
};

const sizes = {
    sm: StyleSheet.create({
        button: {
            paddingVertical: 4,
            paddingHorizontal: 8,
        },
        buttonContainer: {
            padding: 4,
        },
        text: {
            fontSize: 16,
        },
    }),
    md: StyleSheet.create({
        button: {
            paddingVertical: 8,
            paddingHorizontal: 12,
        },
        buttonContainer: {
            padding: 8,
        },
        text: {
            fontSize: 18,
        },
    }),
    lg: StyleSheet.create({
        button: {
            paddingVertical: 12,
            paddingHorizontal: 16,
        },
        buttonContainer: {
            padding: 12,
        },
        text: {
            fontSize: 20,
        },
    }),
    icon: StyleSheet.create({
        button: {
            padding: 8,
        },
        buttonContainer: {
            padding: 8,
        },
        text: {
            fontSize: 0,
        },
    }),
};

const widths = {
    fixed: StyleSheet.create({
        button: {
            width: 150,
        },
        buttonContainer: {},
    }),
    dynamic: StyleSheet.create({
        button: {
            alignSelf: 'flex-start',
        },
        buttonContainer: {},
    }),
    full: StyleSheet.create({
        button: {
            width: '100%',
        },
        buttonContainer: {},
    }),
};

const shapes = {
    square: StyleSheet.create({
        button: {
            borderRadius: 0,
        },
        buttonContainer: {},
    }),
    squareRounded: StyleSheet.create({
        button: {
            borderRadius: 8,
        },
        buttonContainer: {},
    }),
    rounded: StyleSheet.create({
        button: {
            borderRadius: 50,
        },
        buttonContainer: {},
    }),
};

const alignments = {
    left: StyleSheet.create({
        button: {
            alignItems: 'flex-start'
        },
        buttonContainer: {},
    }),
    center: StyleSheet.create({
        button: {
            alignItems: 'center',
        },
        buttonContainer: {},
    }),
    right: StyleSheet.create({
        button: {
            alignItems: 'flex-end',
        },
        buttonContainer: {},
    }),
};

export default Button;
