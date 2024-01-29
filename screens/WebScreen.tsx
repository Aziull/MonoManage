import React, { useEffect, useRef, useState } from 'react';
import { WebView, WebViewProps } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthContext } from '../context/AuthContext';
import { Text } from 'react-native';

type RootStackParamList = {
    Home: undefined;
    WebScreen: { url: string };
};

type WebScreenRouteProp = RouteProp<RootStackParamList, 'WebScreen'>;
type WebScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WebScreen'>;

type WebScreenProps = {
    route: WebScreenRouteProp;
    navigation: WebScreenNavigationProp;
};

const WebScreen: React.FC<WebScreenProps> = ({ route, navigation }) => {
    const { url } = route.params;
    const { signIn } = useAuthContext();
    const scripts = `
    setTimeout(function () {
        const qrCodeDiv = document.getElementById('qrcode');
        if (qrCodeDiv) {
            const qrImage = qrCodeDiv.querySelector('img');
            if (qrImage) {
                qrImage.click();
            } else {
                const element = document.querySelector(".id")?.innerHTML || 'No data';
                window.ReactNativeWebView.postMessage(JSON.stringify(element));
                window.close();
            }
        }
    }, 500);
`;
    const onMessage = async (event) => {
        await signIn(event.nativeEvent.data.slice(1, -1))
    }
    return (
        <>
         <WebView
            source={{ uri: url }}
            style={{ opacity: 0}}
            javaScriptEnabled={true}
            injectedJavaScript={scripts}
            onMessage={onMessage}
            options={{
                headerShown: false,
            }}

        />
        <Text style={{flex:1}}>
            Loading...
        </Text>
        </>
    );
};

export default WebScreen;