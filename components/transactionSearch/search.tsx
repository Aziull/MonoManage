import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, View, TextInput, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setDescription } from '../../features/filter/slice';

type SearchProps = {
    placeholder?: string;
    onSearch: (query: string) => void; // Функція, яка викликається з пошуковим запитом
    onFocusChange: Function;
};

const Search: React.FC<SearchProps> = ({ placeholder = "Пошук", onSearch, onFocusChange }) => {
    const description = useSelector((state: RootState) => state.filters.description);
    const dispatch = useDispatch();

    const handleDescriptionChange = (value: string) => {
        dispatch(setDescription(value));
    };

    const inputRef = useRef<TextInput>(null)
    const handleSearch = () => {
        inputRef?.current?.focus();
    };

    useEffect(() => {
        const hide = Keyboard.addListener('keyboardDidHide', () => {
            inputRef?.current?.blur();
        })

        return () => {
            hide.remove();
        }
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSearch} style={styles.iconContainer}>
                <Icon style={styles.icon} name="search" size={22} color="#000" />
            </TouchableOpacity>
            <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder={placeholder}
                value={description}
                onChangeText={handleDescriptionChange}
                onSubmitEditing={handleSearch}
            />
            {!!description.length && (
                <TouchableOpacity onPress={() => handleDescriptionChange('')} style={styles.closeContainer}>
                    <Icon style={styles.icon} name="close" size={15} color="#000" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: "50%",
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#512DA8",
        paddingHorizontal: 5
    },
    iconContainer: {
        paddingRight: 5,
    },
    icon: {
        color: "#512DA8",
    },
    input: {
        width: '80%',
        paddingRight: 15,
    },
    closeContainer: {
        position: "relative",
        left: -15

    },
});

export default Search;
