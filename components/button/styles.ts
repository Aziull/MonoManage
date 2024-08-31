import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingHorizontal: 4
    },
    text: {
        fontSize: 16,
    },
});

export const variants = {
    primary: StyleSheet.create({
        button: { backgroundColor: '#7e47ff' },
        buttonPressed: { backgroundColor: '#512DA8' },
        buttonDisabled: { backgroundColor: '#b3b3b3' },
        text: { color: '#ffffff', fontWeight: 'bold' },
        textDisabled: { color: '#d9d9d9' },
    }),
    secondary: StyleSheet.create({
        button: { backgroundColor: '#eeeeee' },
        buttonPressed: { backgroundColor: '#cccccc' },
        buttonDisabled: { backgroundColor: '#e0e0e0' },
        text: { color: '#333333' },
        textDisabled: { color: '#a6a6a6' },
    }),
    destructive: StyleSheet.create({
        button: { backgroundColor: '#ff4444' },
        buttonPressed: { backgroundColor: '#cc0000' },
        buttonDisabled: { backgroundColor: '#ff9999' },
        text: { color: '#ffffff', fontWeight: 'bold' },
        textDisabled: { color: '#ffe6e6' },
    }),
    outline: StyleSheet.create({
        button: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#7e47ff' },
        buttonPressed: { borderColor: '#512DA8' },
        buttonDisabled: { borderColor: '#b3b3b3' },
        text: { color: '#7e47ff', fontWeight: 'bold' },
        textDisabled: { color: '#b3b3b3' },
    }),
    ghost: StyleSheet.create({
        button: { backgroundColor: 'transparent' },
        buttonPressed: { backgroundColor: '#f0f0ff' },
        buttonDisabled: { backgroundColor: 'transparent' },
        text: { color: '#7e47ff', fontWeight: 'bold' },
        textDisabled: { color: '#b3b3b3' },
    }),
    link: StyleSheet.create({
        button: { backgroundColor: 'transparent' },
        buttonPressed: {},
        buttonContainer: { padding: 0 },
        text: { color: '#7e47ff', textDecorationLine: 'underline' },
        textDisabled: { color: '#b3b3b3', textDecorationLine: 'underline' },
        buttonDisabled: {},
    }),
};

export const sizes = {
    sm: StyleSheet.create({
        button: { paddingVertical: 4, paddingHorizontal: 8 },
        buttonContainer: { padding: 4 },
        text: { fontSize: 16 },
    }),
    md: StyleSheet.create({
        button: { paddingVertical: 8, paddingHorizontal: 12 },
        buttonContainer: { padding: 8 },
        text: { fontSize: 18 },
    }),
    lg: StyleSheet.create({
        button: { paddingVertical: 12, paddingHorizontal: 16 },
        buttonContainer: { padding: 12 },
        text: { fontSize: 20 },
    }),
    icon: StyleSheet.create({
        button: { padding: 8 },
        buttonContainer: { padding: 8 },
        text: { fontSize: 0 },
    }),
};

export const widths = {
    fixed: StyleSheet.create({
        button: { width: 150 },
        buttonContainer: {},
    }),
    dynamic: StyleSheet.create({
        button: { alignSelf: 'flex-start' },
        buttonContainer: {},
    }),
    full: StyleSheet.create({
        button: { width: '100%' },
        buttonContainer: {},
    }),
};

export const shapes = {
    square: StyleSheet.create({
        button: { borderRadius: 0 },
        buttonContainer: {},
    }),
    squareRounded: StyleSheet.create({
        button: { borderRadius: 8 },
        buttonContainer: {},
    }),
    rounded: StyleSheet.create({
        button: { borderRadius: 50 },
        buttonContainer: {},
    }),
    roundedFull: StyleSheet.create({
        button: { borderRadius: 9999 },
        buttonContainer: {},
    })
};

export const alignments = {
    left: StyleSheet.create({
        button: { alignItems: 'flex-start' },
        buttonContainer: {},
    }),
    center: StyleSheet.create({
        button: { alignItems: 'center' },
        buttonContainer: {},
    }),
    right: StyleSheet.create({
        button: { alignItems: 'flex-end' },
        buttonContainer: {},
    }),
};
