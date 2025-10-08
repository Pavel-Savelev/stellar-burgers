// store/slices/passwordSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forgotPasswordApi, resetPasswordApi } from '@api';

type PasswordState = {
    loading: boolean;
    error: string | null;
    resetRequested: boolean;
    resetSuccess: boolean;
};

const initialState: PasswordState = {
    loading: false,
    error: null,
    resetRequested: false,
    resetSuccess: false
};

export const forgotPassword = createAsyncThunk(
    'password/forgot',
    async (email: { email: string }, { rejectWithValue }) => {
        try {
            return await forgotPasswordApi(email);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'password/reset',
    async (data: { password: string; token: string }, { rejectWithValue }) => {
        try {
            return await resetPasswordApi(data);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        clearPasswordState(state) {
            state.resetRequested = false;
            state.resetSuccess = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false;
                state.resetRequested = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
                state.resetSuccess = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { clearPasswordState } = passwordSlice.actions;
export default passwordSlice.reducer;
