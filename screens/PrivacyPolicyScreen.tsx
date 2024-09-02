import React from 'react';
import { Linking, ScrollView, StyleSheet, Text } from 'react-native';

const PrivacyPolicyScreen = () => {
    const handlePress = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.log(`Не вдалося відкрити URL: ${url}`);
        }
    };
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.header}>Політика конфіденційності</Text>

            <Text style={styles.subHeader}>Вступ</Text>
            <Text style={styles.text}>
                Ця Політика конфіденційності описує, як ваші особисті дані збираються, використовуються та зберігаються при використанні нашого мобільного додатка.
            </Text>

            <Text style={styles.subHeader}>Збір даних</Text>
            <Text style={styles.text}>
                <Text style={styles.boldText}>1. Токен доступу до Monobank API:</Text> Для використання функцій додатка вам необхідно ввести токен доступу, який ви отримуєте з сайту особистого кабінету Monobank. Цей токен дозволяє додатку отримувати інформацію про ваші рахунки та виписки за рахунками через API Monobank.
            </Text>
            <Text style={styles.text}>
                <Text style={styles.boldText}>2. Рахунки та виписки:</Text> Додаток отримує інформацію про ваші рахунки та виписки за рахунками, використовуючи ваш токен доступу до Monobank API.
            </Text>

            <Text style={styles.subHeader}>Використання даних</Text>
            <Text style={styles.text}>
                Токен доступу використовується виключно для отримання даних з Monobank API. Токен зберігається локально на вашому пристрої і не передається третім сторонам.
            </Text>
            <Text style={styles.text}>
                Інформація про рахунки та виписки також зберігається лише на вашому пристрої і використовується виключно для відображення цих даних у додатку.
            </Text>

            <Text style={styles.subHeader}>Збереження даних</Text>
            <Text style={styles.text}>
                Всі ваші дані, включаючи токен доступу, інформацію про рахунки та виписки, зберігаються тільки на вашому пристрої. Ми не збираємо та не зберігаємо ці дані на наших серверах.
            </Text>

            <Text style={styles.subHeader}>Безпека даних</Text>
            <Text style={styles.text}>
            Рекомендуємо захищати ваш телефон паролем або іншими засобами автентифікації, такими як Face ID чи відбиток пальця. Це забезпечить додатковий рівень безпеки для ваших персональних даних і допоможе уникнути несанкціонованого доступу до вашого пристрою. Залишати телефон без захисту не рекомендується, оскільки це може підвищити ризик втрати чи несанкціонованого доступу до ваших особистих даних. Також наголошуємо, що токен доступу до вашого банківського рахунку є конфіденційною інформацією і не повинен бути повідомлений третім особам.
            </Text>

            <Text style={styles.subHeader}>Деактивація токена</Text>
            <Text style={styles.text}>
                Ви можете деактивувати свій токен доступу в будь-який момент, перейшовши за посиланням <Text style={styles.link} onPress={() => handlePress('https://api.monobank.ua')}>
                    {' https://api.monobank.ua'}
                </Text>. Після деактивації токена додаток втратить можливість отримувати доступ до ваших рахунків і виписок через Monobank API.
            </Text>

            <Text style={styles.subHeader}>Cookies</Text>
            <Text style={styles.text}>
                Додаток не використовує файли cookie, оскільки він не взаємодіє з веб-технологіями.
            </Text>

            <Text style={styles.subHeader}>Зміни в Політиці конфіденційності</Text>
            <Text style={styles.text}>
                Ми можемо періодично оновлювати цю Політику конфіденційності. Усі зміни будуть опубліковані на цій сторінці. Ми рекомендуємо вам періодично перевіряти цю сторінку для ознайомлення з будь-якими змінами.
            </Text>

            <Text style={styles.subHeader}>Контактна інформація</Text>
            <Text style={styles.text}>
                Якщо у вас є питання щодо цієї Політики конфіденційності, ви можете зв’язатися з нами за адресою <Text style={styles.link} onPress={() => handlePress('mailto:yadendenmushi@gmail.com')}>
        {' yadendenmushi@gmail.com'}
    </Text>.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F2FF',
        paddingHorizontal: 16,
    },
    contentContainer: {
        paddingBottom: 24,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#49169C',
        marginBottom: 16,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6A1EE3',
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        color: '#2C0B6A',
        marginBottom: 16,
        lineHeight: 22,
    },
    boldText: {
        fontWeight: 'bold',
    },
    link: {
        color: '#7E47FF',
        textDecorationLine: 'underline',
    },
});

export default PrivacyPolicyScreen;
