import React, { ReactNode } from 'react';
import { ViewStyle, Text, Pressable, Animated, PressableProps, View, TextStyle, GestureResponderEvent } from 'react-native';
import { alignments, shapes, sizes, styles, variants, widths } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
type ButtonWidth = 'fixed' | 'dynamic' | 'full';
type ButtonShape = 'square' | 'squareRounded' | 'rounded' | 'roundedFull';
type ButtonAlign = 'left' | 'center' | 'right';

export type ButtoPropsType = PressableProps & {
    children?: React.ReactNode;
    style?: ViewStyle;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    icon?: {
        name: string,
        color?: string,
        size: number,
        style?: TextStyle,
        containerStyle?: ViewStyle,
    };
    IconComonent?: ReactNode,
    variant?: ButtonVariant;
    size?: ButtonSize;
    width?: ButtonWidth;
    shape?: ButtonShape;
    align?: ButtonAlign;
    color?: string;
    numberOfLines?: number;
    disabled?: boolean;
    grow?: number;
    horizontal?: boolean
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
    color,
    numberOfLines,
    disabled = false,
    IconComonent,
    grow,
    horizontal = true,
    ...props
}: ButtoPropsType) => {
    const animated = React.useRef(new Animated.Value(1)).current;

    const fadeIn = (event: GestureResponderEvent) => {
        if (!disabled) {
            Animated.timing(animated, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
            }).start();
            props.onPressIn?.(event);
        }
    };

    const fadeOut = (event: GestureResponderEvent) => {
        if (!disabled) {
            Animated.timing(animated, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
            props.onPressOut?.(event);
        }
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
                grow && {
                    flexGrow: grow
                },
                variantStyles.button,
                pressed && !disabled && variantStyles.buttonPressed,
                sizeStyles.button,
                widthStyles.button,
                shapeStyles.button,
                alignStyles.button,
                color && { backgroundColor: color },
                disabled && variantStyles.buttonDisabled,
                style,
            ]}
            disabled={disabled}
            {...props}
        >
            <Animated.View
                style={[
                    {
                        opacity: animated,

                    },
                    grow && {
                        flexGrow: grow
                    },
                    styles.buttonContainer,
                    !horizontal && {
                        flexDirection: 'column',
                    },
                    sizeStyles.buttonContainer,
                    widthStyles.buttonContainer,
                    shapeStyles.buttonContainer,
                    containerStyle
                ]}
            >
                {(icon || IconComonent) && (
                    <View style={[
                        styles.iconContainer,
                        size === 'icon' && { marginRight: 0 },
                        icon?.containerStyle
                    ]}>
                        {IconComonent || icon && (<Icon name={icon.name} size={icon.size} color={icon.color} style={[icon.style]} />)}

                    </View>
                )}
                {size !== 'icon' && (
                    typeof children === 'string' ? <Text style={[
                        styles.text,
                        variantStyles.text,
                        sizeStyles.text,
                        textStyle,
                        disabled && variantStyles.textDisabled
                    ]}
                        numberOfLines={numberOfLines}>
                        {children}
                    </Text>
                        : children
                )}
            </Animated.View>
        </Pressable>
    );
};

export default Button;
