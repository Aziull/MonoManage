import React, { useEffect, useState } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Linking, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setAuthToken } from '../features/authToken/slice';
import { fetchAndSaveBankAccounts, getUserAsync } from '../features/user/thunks';
import { WebScreenProps } from '../navigation/types';
import { BankList } from '../features/api/config';
import { useTheme } from '@react-navigation/native';

const WebScreen = ({ route }: WebScreenProps) => {
    const dispatch: AppDispatch = useDispatch();
    const { authToken } = useSelector((state: RootState) => state.authToken);
    const { url } = route.params;
    const [text, setText] = useState("Виконуємо вхід...");

    const { colors } = useTheme();
    const styles = makeStyles({ colors });

    // JavaScript, що буде виконано в WebView
    const scripts = `
        const sendMessage = () => {
            const element = document.querySelector(".id")?.innerHTML;
            if (element.length) {
                window.ReactNativeWebView.postMessage(JSON.stringify(element));
            }
        };

        // Функція для обробки змін в DOM
        const handleMutation = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    sendMessage();
                }
            }
        };

        // Створення MutationObserver
        const observer = new MutationObserver(handleMutation);

        // Налаштування MutationObserver для відстеження змін в дочірніх елементах body
        observer.observe(document.body, { childList: true, subtree: true });

        setTimeout(function () {
            const qrCodeDiv = document.getElementById('qrcode');
            if (qrCodeDiv) {
                const element = document.querySelector(".id")?.innerHTML;
                if (!element.length) {
                    window.ReactNativeWebView.postMessage(JSON.stringify(qrCodeDiv.title));
                    return;
                }
                sendMessage();
            }
        }, 500);
    `;

    // Відкриття посилання в браузері
    const openLink = (url: string) => {
        Linking.openURL(url)
            .then((supported) => {
                if (!supported) {
                    console.log(`Не вдалося відкрити посилання: ${url}`);
                }
            })
            .catch((err) => console.error('Помилка відкриття посилання', err));
    };

    // Перевірка, чи є рядок URL
    function isURL(str: string) {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)|localhost(\:\d{2,5})?(\/\S*)?$/;
        return urlRegex.test(str);
    }

    // Обробка повідомлень з WebView
    const onMessage = async (event: WebViewMessageEvent) => {
        const data = event.nativeEvent.data.slice(1, -1);
        if (isURL(data)) {
            openLink(data);
            return;
        }
        setText("Майже готово...");
        dispatch(setAuthToken({ authToken: data }));
        dispatch(getUserAsync());
    };

    // Ефект для отримання банківських акаунтів після отримання токена
    useEffect(() => {
        if (authToken) {
            dispatch(fetchAndSaveBankAccounts({ bankName: BankList.monobank, requestPath: 'clientInfo' }));
        }
    }, [authToken, dispatch]);

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: url }}
                style={styles.webView}
                javaScriptEnabled={true}
                injectedJavaScript={scripts}
                onMessage={onMessage}
            />
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    );
};

const makeStyles = ({ colors }: { colors: any }) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    webView: {
        opacity: 0,
        flex: 0,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 20,
        color: colors.primary,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default WebScreen;
