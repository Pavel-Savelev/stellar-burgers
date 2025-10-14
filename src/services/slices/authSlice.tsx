import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { TUser } from '../../utils/types';

export type AuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);
      return res.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data);
      return res.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Register failed');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'User fetch failed');
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(user);
      return res.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'User update failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked(state, action) {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // REGISTER
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      // FETCH USER
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      // UPDATE USER
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;
      });
  }
});

export const { setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
