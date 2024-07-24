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
        width: 35,
        marginRight: 10
    },
    text: {
        fontSize: 16,
    },
});

export const variants = {
    primary: StyleSheet.create({
        button: { backgroundColor: '#7e47ff', },
        buttonPressed: { backgroundColor: '#512DA8', },
        text: { color: '#ffffff', fontWeight: 'bold', },
    }),
    secondary: StyleSheet.create({
        button: { backgroundColor: '#eeeeee', },
        buttonPressed: { backgroundColor: '#cccccc', },
        text: { color: '#333333', },
    }),
    destructive: StyleSheet.create({
        button: { backgroundColor: '#ff4444', },
        buttonPressed: { backgroundColor: '#cc0000', },
        text: { color: '#ffffff', fontWeight: 'bold', },
    }),
    outline: StyleSheet.create({
        button: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#7e47ff', },
        buttonPressed: { borderColor: '#512DA8', },
        text: { color: '#7e47ff', fontWeight: 'bold', },
    }),
    ghost: StyleSheet.create({
        button: { backgroundColor: 'transparent', },
        buttonPressed: { backgroundColor: '#f0f0ff', },
        text: { color: '#7e47ff', fontWeight: 'bold', },
    }),
    link: StyleSheet.create({
        button: { backgroundColor: 'transparent', },
        buttonPressed: {},
        buttonContainer: { padding: 0, },
        text: { color: '#7e47ff', textDecorationLine: 'underline', },
    }),
};

export const sizes = {
    sm: StyleSheet.create({
        button: { paddingVertical: 4, paddingHorizontal: 8, },
        buttonContainer: { padding: 4, },
        text: { fontSize: 16, },
    }),
    md: StyleSheet.create({
        button: { paddingVertical: 8, paddingHorizontal: 12, },
        buttonContainer: { padding: 8, },
        text: { fontSize: 18, },
    }),
    lg: StyleSheet.create({
        button: { paddingVertical: 12, paddingHorizontal: 16, },
        buttonContainer: { padding: 12, },
        text: { fontSize: 20, },
    }),
    icon: StyleSheet.create({
        button: { padding: 8, },
        buttonContainer: { padding: 8, },
        text: { fontSize: 0, },
    }),
};

export const widths = {
    fixed: StyleSheet.create({
        button: { width: 150, },
        buttonContainer: {},
    }),
    dynamic: StyleSheet.create({
        button: { alignSelf: 'flex-start', },
        buttonContainer: {},
    }),
    full: StyleSheet.create({
        button: { width: '100%', },
        buttonContainer: {},
    }),
};

export const shapes = {
    square: StyleSheet.create({
        button: { borderRadius: 0, },
        buttonContainer: {},
    }),
    squareRounded: StyleSheet.create({
        button: { borderRadius: 8, },
        buttonContainer: {},
    }),
    rounded: StyleSheet.create({
        button: { borderRadius: 50, },
        buttonContainer: {},
    }),
};

export const alignments = {
    left: StyleSheet.create({
        button: {
            alignItems: 'flex-start'
        },
        buttonContainer: {},
    }),
    center: StyleSheet.create({
        button: { alignItems: 'center', },
        buttonContainer: {},
    }),
    right: StyleSheet.create({
        button: { alignItems: 'flex-end', },
        buttonContainer: {},
    }),
};
