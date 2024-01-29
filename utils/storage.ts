import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {

    try {
        const jsonValue = await AsyncStorage.getItem('ignored-transactions');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        // error reading value
    }
};

export const storeData = async (value: string) => {
    try {
        const values = await getData();

        if (values.includes(value)) return;
        values.push(value);

        const jsonValue = JSON.stringify(values);
        await AsyncStorage.setItem('ignored-transactions', jsonValue);
    } catch (e) {
        // saving error
    }
};

export const removeData = async (value: string) => {
    try {
        let values: string[] = await getData();

        if (!values.includes(value)) return;

        values = values.filter(el => el !== value);

        const jsonValue = JSON.stringify(values);
        await AsyncStorage.setItem('ignored-transactions', jsonValue);
    } catch (e) {
        // saving error
    }
}
