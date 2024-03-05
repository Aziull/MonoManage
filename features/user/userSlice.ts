//features/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import { User } from './types';
import { getUserAsync } from './thunks';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
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
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.user = {
        id: user.id,
        name: user.name,
      }
    });
    builder.addMatcher(
      userApi.endpoints.getBankAccounts.matchRejected,
      (state, { payload }) => {
        state.error = payload?.status.toString();
      }
    );
  }
});

export const { createUser, logout } = authSlice.actions;

export default authSlice.reducer;