import React from 'react';
import { ViewStyle, Text, Pressable, Animated, PressableProps, View } from 'react-native';
import { alignments, shapes, sizes, styles, variants, widths } from './styles';

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


export default Button;
