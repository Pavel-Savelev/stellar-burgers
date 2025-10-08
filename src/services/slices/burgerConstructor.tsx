import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TConstructorState = {
    bun: TIngredient | null;
    ingredients: TIngredient[];
};

const initialState: TConstructorState = {
    bun: null,
    ingredients: []
};

const constructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        
        setBun: (state, action: PayloadAction<TIngredient>) => {
            state.bun = action.payload;
        },
        addIngredient: (state, action: PayloadAction<TIngredient>) => {
            state.ingredients.push(action.payload);
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.ingredients = state.ingredients.filter(
                (item) => item._id !== action.payload
            );
        },
        clearConstructor: (state) => {
            state.bun = null;
            state.ingredients = [];
        },
        moveIngredient: (
            state,
            action: PayloadAction<{ fromIndex: number; toIndex: number }>
        ) => {
            const { fromIndex, toIndex } = action.payload;
            if (
                toIndex < 0 ||
                toIndex >= state.ingredients.length ||
                fromIndex === toIndex
            ) {
                return;
            }

            const updated = [...state.ingredients];
            const [movedItem] = updated.splice(fromIndex, 1);
            updated.splice(toIndex, 0, movedItem);
            state.ingredients = updated;
        }
    }
});

export const {
    setBun,
    addIngredient,
    removeIngredient,
    clearConstructor,
    moveIngredient
} = constructorSlice.actions;

export default constructorSlice.reducer;
