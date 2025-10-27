import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

interface IOrdersState {
  items: TOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: IOrdersState = {
  items: [],
  loading: false,
  error: null
};

export const fetchMyOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchMyOrders', async (_, thunkAPI) => {
  try {
    const data = await getOrdersApi();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
  return thunkAPI.rejectWithValue('Ошибка загрузки заказов');
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

export default ordersSlice.reducer;
