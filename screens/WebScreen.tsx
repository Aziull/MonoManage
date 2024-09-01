import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Linking, SafeAreaView, StyleSheet } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import Loader from '../components/ui/Loader';
import { setAuthToken } from '../features/authToken/slice';
import { getUserAsync } from '../features/user/thunks';
import { WebScreenProps } from '../navigation/types';
import { AppDispatch } from '../store';

const scripts = `
     const postMessageIfAvailable = (selector, attribute) => {
        const element = document.querySelector(selector);
        const value = attribute ? element?.getAttribute(attribute) : element?.textContent;
        if (value) {
            window.ReactNativeWebView.postMessage(value);
            return true;
        }
        return false;
    };

    const observeAndSend = (selector, attribute) => {
        if (postMessageIfAvailable(selector, attribute)) return;

        const observer = new MutationObserver(() => {
            if (postMessageIfAvailable(selector, attribute)) {
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    observeAndSend('.id');
    observeAndSend('#qrcode', 'title');

    const autoClickSpecificButton = () => {
        const buttons = document.querySelectorAll('.pure-button');

        for (let button of buttons) {
            if (button.textContent.trim() === 'Активувати') {
                button.click();
                return true;
            }
        }
        return false;
    };

    const observeAndClickSpecificButton = () => {
        if (autoClickSpecificButton()) return;

        const observer = new MutationObserver(() => {

            if (autoClickSpecificButton()) {
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    observeAndClickSpecificButton();
    `;

const WebScreen = ({ route }: WebScreenProps) => {
    const dispatch: AppDispatch = useDispatch();
    const { url } = route.params;
    const [text, setText] = useState("Виконуємо вхід...");
    const { colors } = useTheme();
    const styles = makeStyles({ colors });

    const openLink = (url: string) => {
        Linking.openURL(url)
            .then((supported) => {
                if (!supported) {
                    console.log(`Не вдалося відкрити посилання: ${url}`);
                }
            })
            .catch((err) => console.error('Помилка відкриття посилання', err));
    };

    const isURL = (str: string) => {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)|localhost(\:\d{2,5})?(\/\S*)?$/;
        return urlRegex.test(str);
    }

    const onMessage = async (event: WebViewMessageEvent) => {
        const data = event.nativeEvent.data;

        if (isURL(data)) {
            openLink(data);
            return;
        }
        setText("Майже готово...");
        dispatch(setAuthToken({ authToken: data }));
        dispatch(getUserAsync());
    };

    return (
        <SafeAreaView style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{ uri: url }}
                style={styles.webView}
                javaScriptEnabled={true}
                injectedJavaScript={scripts}
                onMessage={onMessage}
            />
            <Loader text={text} />
        </SafeAreaView>
    );
};

const makeStyles = ({ colors }: { colors: any }) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    webView: {
        opacity: 0,
        flex: 0,
    },
});

export default WebScreen;
