import React, { useEffect } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors } from '../../theme';

type Props = {
    value: number
} & ViewProps;


const BORDER_RADIUS = 2.5;

const Progress = ({ value, style, ...props }: Props) => {
    const width = useSharedValue(0);

    useEffect(() => {
        width.value = withTiming(value, { duration: 500 });
    }, [value]);


    const animatedStyles = useAnimatedStyle(() => {
        const borderRadius = width.value < 100 ? BORDER_RADIUS : withTiming(0, { duration: 100 });

        return {
            width: `${width.value}%`,
            borderTopRightRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
        }
    });

    return (
        <View style={[styles.container, style]} {...props}>
            <Animated.View style={[styles.indicator, animatedStyles]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 5,
        overflow: 'hidden',
    },
    indicator: {
        height: '100%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: colors.purple[300],
    },
});

export default Progress;
