import { createAsyncThunk } from "@reduxjs/toolkit";
import { User as UserEntity } from "../../db/entities";
import { userRepository } from "../../db";


export const getUserAsync = createAsyncThunk(
    'auth/getUserAsync',
    async (_, { rejectWithValue }) => {

        const user: UserEntity | null = await userRepository.getById('admin');
        if(!user) return rejectWithValue('Такого користувача не існує!!!');
        return { user }
    }
)