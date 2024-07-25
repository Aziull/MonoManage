import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type SearchProps = {
    placeholder?: string;
    handleSearch?: () => void,
    value: string,
    handleValueChange: (value: string) => void,
    style?: ViewStyle
};

const Search = React.forwardRef(({ style, handleSearch, value, handleValueChange, placeholder = "Пошук" }: SearchProps, ref:  React.ForwardedRef<TextInput>) => {
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={handleSearch} style={styles.iconContainer}>
                <Icon style={styles.icon} name="search" size={22} color="#000" />
            </TouchableOpacity>
            <TextInput
                ref={ref}
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={handleValueChange}
                onSubmitEditing={handleSearch}
            />
            {!!value.length && (
                <TouchableOpacity onPress={() => handleValueChange('')} style={styles.closeContainer}>
                    <Icon style={styles.icon} name="close" size={15} color="#000" />
                </TouchableOpacity>
            )}
        </View>
    );
}) 

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
