import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, TouchableWithoutFeedback, ViewComponent, ViewStyle } from 'react-native';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from './button/Button';
import { debounce } from "lodash";
type SearchProps = {
    placeholder?: string;
    handleSearch?: () => void,
    value: string,
    handleValueChange: (value: string) => void,
    style?: ViewStyle
};

const Search = React.forwardRef(({ style, handleSearch, value, handleValueChange, placeholder = "Пошук" }: SearchProps, ref: React.ForwardedRef<TextInput>) => {

    return (
        <Pressable onPress={handleSearch} style={[styles.container, style]}>
            <Icon name="search" size={24} color="#000" />
            <TextInput
                numberOfLines={1}
                ref={ref}
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={handleValueChange}
                onSubmitEditing={handleSearch}
            />
            {!!value.length && (
                <TouchableOpacity onPress={() => handleValueChange('')} style={styles.closeContainer}>
                    <Icon name="close" size={20} color="#000" />
                </TouchableOpacity>
            )}
        </Pressable>
    );
})

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 8,
        borderRadius: 10,
        borderWidth: 0,
        paddingHorizontal: 4
    },

    input: {
        paddingVertical: 4,
        paddingRight: 10,
        marginLeft: 4,
        fontSize: 16,
        flex: 1,
    },
    closeContainer: {
        position: "relative",
        left: -4,
        borderRadius: 100,
        backgroundColor: "#ddd",
        padding: 1,

    },
});

export default Search;
