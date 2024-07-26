//features/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';
import { getUserAsync } from './thunks';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: null | unknown;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createUser: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state: AuthState) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAsync.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.user = {
          id: user.id,
          name: user.name,
        }
        state.loading = false;
      })
      .addCase(getUserAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
  }
});

export const { createUser, logout } = authSlice.actions;

export default authSlice.reducer;