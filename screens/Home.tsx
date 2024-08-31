import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Circle, Path, Rect, Svg } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllAccounts } from '../features/accounts/slice';
import { getAccounts } from '../features/accounts/thunks';
import { getAllTransactionsByAccounts } from '../features/transaction/thunks';
import { useKeyboardVisible } from '../hook/useKeyboardVisible';
import useSyncTransactions from '../hook/useSyncTransactions';
import { BottomTabParamList, HomeProps } from '../navigation/types';
import { AppDispatch, RootState } from '../store';
import Transactions from './Transactions';


const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();
const SVG_ORIGINAL_WIDTH = 1125;
const SVG_ORIGINAL_HEIGHT = 212;
const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const navigateExpence = () => navigation.navigate('NewTransaction', { type: 'expense' });
    const navigateIncome = () => navigation.navigate('NewTransaction', { type: 'income' });
    const keyboardVisible = useKeyboardVisible()
    return !keyboardVisible && (
        <View style={styles.container}>
            <Svg
                width="100%"
                height={'100%'}
                style={[styles.svg, { pointerEvents: 'none', }]}
                viewBox={`0 0 ${SVG_ORIGINAL_WIDTH} ${SVG_ORIGINAL_HEIGHT}`}
            >
                <Path
                    d="m782,96.17c0,.44,0,.88,0,1.32-.26,64.46-52.99,117.21-117.45,117.51-28.03.13-53.84-9.57-74.16-25.85-16.28-13.03-39.35-13.06-55.76-.21-20.27,15.87-45.84,25.27-73.57,25.05-64.03-.51-116.39-52.74-117.05-116.77,0-.44,0-.87,0-1.31.02-24.8-20.06-44.92-44.87-44.92H44.87c-24.78,0-44.87,20.09-44.87,44.87v167.13h1125V95.87c0-24.78-20.09-44.87-44.87-44.87h-253.29c-24.9,0-45.01,20.28-44.84,45.17Z"
                    fill='#7e47ff'
                />
            </Svg>
            {/* <ButtonsContainer /> */}
            <Svg
                key={'we1243'}
                width="100%"
                height={'100%'}
                style={[styles.svg, { zIndex: 2, pointerEvents: 'box-none' }]}
                viewBox={`0 0 ${SVG_ORIGINAL_WIDTH} ${SVG_ORIGINAL_HEIGHT}`}
            >
                <Circle onPress={navigateIncome} cx="664" cy="97" r="96" fill="#358438" />
                <Rect onPress={navigateIncome} stroke='white' strokeMiterlimit={10} fill='none' strokeWidth={8} x="621.83" y="58.08" width="85" height="84.5" rx="16" ry="16" />
                <Rect onPress={navigateIncome} fill={"white"} x="660.34" y="74.28" width="8" height="42.33" rx="4" ry="4" />
                <Path onPress={navigateIncome} fill={"white"} d="m642.59,95.28h0c1.18-1.1,3.03-1.03,4.13.15l15.47,16.65c1.16,1.24,3.12,1.24,4.28,0l15.48-16.65c1.1-1.18,2.95-1.25,4.13-.15h0c1.18,1.1,1.25,2.95.15,4.13l-19.76,21.24c-1.16,1.24-3.12,1.24-4.28,0l-19.75-21.24c-1.1-1.18-1.03-3.03.15-4.13Z" />
            </Svg>
            <Svg
                width="100%"
                height={'100%'}
                style={[styles.svg, { zIndex: 2, pointerEvents: 'box-none' }]}
                viewBox={`0 0 ${SVG_ORIGINAL_WIDTH} ${SVG_ORIGINAL_HEIGHT}`}
            >
                <Circle onPress={navigateExpence} cx="462" cy="96" r="96" fill={"#7830f7"} />
                <Rect onPress={navigateExpence} strokeWidth={8} stroke={'white'} fill={'none'} x="419.5" y="57.5" width="85" height="84.5" rx="16" ry="16" />
                <Rect onPress={navigateExpence} stroke='white' strokeWidth={0.25} strokeMiterlimit={10} fill={"white"} x="458" y="78.67" width="8" height="42.33" rx="4" ry="4" />
                <Path onPress={navigateExpence} stroke='white' strokeWidth={0.25} strokeMiterlimit={10} fill={"white"} d="m483.75,100.01h0c-1.18,1.1-3.03,1.03-4.13-.15l-15.47-16.65c-1.16-1.24-3.12-1.24-4.28,0l-15.48,16.65c-1.1,1.18-2.95,1.25-4.13.15h0c-1.18-1.1-1.25-2.95-.15-4.13l19.76-21.24c1.16-1.24,3.12-1.24,4.28,0l19.75,21.24c1.1,1.18,1.03,3.03-.15,4.13Z" />
            </Svg>


            <View style={styles.tabContainer}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel
                            ? options.tabBarLabel
                            : options.title
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };
                    const color = isFocused ? options.tabBarActiveTintColor || 'black' : options.tabBarInactiveTintColor || "gray";
                    return (
                        <Pressable
                            key={route.key}
                            onPress={onPress}
                            style={styles.tabItem}
                        >
                            {options.tabBarIcon && options.tabBarIcon({ color, size: 24, focused: isFocused })}
                            <Text style={{ color }}>
                                {`${label}`}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View >

    );
};

const screenOptions = (iconName: string, label: string): BottomTabNavigationOptions => ({
    tabBarIcon: ({ color, size }: { color: string, size: number }) => (
        <Icon name={iconName} size={size} color={color} />
    ),

    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarLabel: label,
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: '#a385ff',

});

const Home = ({ }: HomeProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const accounts = useSelector(selectAllAccounts);

    useSyncTransactions();

    useEffect(() => {
        dispatch(getAccounts());
    }, [user])

    useEffect(() => {
        const accountIds = accounts.map(acc => acc.id);
        dispatch(getAllTransactionsByAccounts(accountIds))
    }, [accounts])

    return (

        <Navigator
            tabBar={props => <CustomTabBar {...props} />}
            initialRouteName="Transactions">
            <Screen

                name="Transactions"
                component={Transactions}
                initialParams={{ deleted: false }}
                options={{ ...screenOptions('list', 'Активні') }}
            />
            <Screen
                name="DeletedTransactions"
                component={Transactions}
                initialParams={{ deleted: true }}
                options={screenOptions('delete', 'Видалені')}
            />
        </Navigator>

    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0, right: 0,
        height: 100,
        alignItems: 'center',
    },
    svg: {
        position: 'absolute',
        bottom: 0,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        paddingHorizontal: 36,
        zIndex: 1,
    },
    tabItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;
