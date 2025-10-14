import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

interface IOrderState {
  currentOrder: TOrder | null;
  orderRequest: boolean;
  error: string | null;
}

const initialState: IOrderState = {
  currentOrder: null,
  orderRequest: false,
  error: null
};

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/createOrder', async (ingredients, thunkAPI) => {
  try {
    const data = await orderBurgerApi(ingredients);
    return data.order;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.message || 'Ошибка при создании заказа'
    );
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
