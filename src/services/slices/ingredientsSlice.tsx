import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

interface IIngredientsState {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IIngredientsState = {
  items: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/fetchIngredients', async (_, thunkAPI) => {
  try {
    const data = await getIngredientsApi();
    return data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.message || 'Ошибка загрузки ингредиентов'
    );
  }
});
  console.log('Fetching ingredients from:', `${URL}/ingredients`);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

export default ingredientsSlice.reducer;
