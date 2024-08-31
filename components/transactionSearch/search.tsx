import React, { useCallback, useEffect, useRef } from 'react';
import { Keyboard, TextInput, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDescription } from '../../features/filter/slice';
import { RootState } from '../../store';
import Search from '../Search';

type SearchProps = {
    style?: ViewStyle
};

const TransactionSearch: React.FC<SearchProps> = ({ style }) => {
    const description = useSelector((state: RootState) => state.filters.description);
    const dispatch = useDispatch();
    const handleDescriptionChange = useCallback((value: string) => {
        dispatch(setDescription(value));
    }, [dispatch]);

    const inputRef = useRef<TextInput>(null)

    useEffect(() => {
        const hide = Keyboard.addListener('keyboardDidHide', () => {
            inputRef?.current?.blur();
        })

        return () => {
            hide.remove();
        }
    }, [])

    return (
        <Search
            style={style}
            value={description}
            handleValueChange={handleDescriptionChange}
            ref={inputRef}
        />
    );
};

export default TransactionSearch;
