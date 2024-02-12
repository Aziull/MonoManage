import React, { useState } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Linking, Text } from 'react-native';
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '../store';
import { setAuthToken } from '../features/authToken/slice';
import { getUserAsync } from '../features/user/thunks';
import { WebScreenProps } from '../navigation/types';


const WebScreen = ({ route }: WebScreenProps) => {
    const dispatch: AppDispatch = useDispatch();

    const { url } = route.params;
    const [text, setText] = useState("Виконуємо вхід...")

    const scripts = `
    const sendMessage = () => {
        const element = document.querySelector(".id")?.innerHTML;
        if(element.length){
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
                isScanned = true;
                window.ReactNativeWebView.postMessage(JSON.stringify(qrCodeDiv.title));
                return;
            }
            sendMessage();
        }
    }, 500);
`;

    const openLink = (url: string) => {
        Linking.openURL(url)
            .then((supported) => {
                if (!supported) {
                    console.log(`Не вдалося відкрити посилання: ${url}`);
                }
            })
            .catch((err) => console.error('Помилка відкриття посилання', err));
    };


    function isURL(str: string) {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)|localhost(\:\d{2,5})?(\/\S*)?$/;
        return urlRegex.test(str);
    }
    const onMessage = async (event: WebViewMessageEvent) => {
        const data = event.nativeEvent.data.slice(1, -1);
        if (isURL(data)) {
            openLink(data);
            return
        }
        setText("Майже готово...")
        dispatch(setAuthToken({ authToken: data }));
        dispatch(getUserAsync());
    }
    return (
        <>
            <WebView
                source={{ uri: url }}
                style={{ opacity: 0, flex: 0 }}
                javaScriptEnabled={true}
                injectedJavaScript={scripts}
                onMessage={onMessage}
                options={{
                    headerShown: false,
                }}

            />
            <Text style={{ flex: 1 }}>
                {text}
            </Text>
        </>
    );
};

export default WebScreen;