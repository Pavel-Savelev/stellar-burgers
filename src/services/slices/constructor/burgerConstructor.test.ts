import {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  initialState
} from './burgerConstructor';

import reducer from './burgerConstructor';

const bunMockData = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const ingredient1MockData = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '1234567890',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};

const ingredient2MockData = {
  _id: '643d69a5c3f7b9001cfa093f',
  id: '0987654321',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};

describe('Testing constructor', () => {
  describe('Buns', () => {
    test('set bun', () => {
      const state = reducer(initialState, setBun(bunMockData));
      expect(state.bun).toEqual(bunMockData);
      expect(state.ingredients).toHaveLength(0);
    });
  });

  describe('Ingredients', () => {
    test('add ingredient', () => {
      const state = reducer(initialState, addIngredient(ingredient1MockData));
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(ingredient1MockData);
      expect(state.bun).toBeNull();
    });

    test('remove ingredient', () => {
      const _initialState = {
        bun: null,
        ingredients: [ingredient1MockData, ingredient2MockData]
      };

      const state = reducer(
        _initialState,
        removeIngredient(ingredient1MockData._id)
      );

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(ingredient2MockData);
      expect(state.bun).toBeNull();
    });

    describe('move ingredient', () => {
      test('move down', () => {
        const _initialState = {
          bun: null,
          ingredients: [ingredient1MockData, ingredient2MockData]
        };

        const state = reducer(
          _initialState,
          moveIngredient({ fromIndex: 0, toIndex: 1 })
        );

        expect(state.ingredients[0]).toEqual(ingredient2MockData);
        expect(state.ingredients[1]).toEqual(ingredient1MockData);
        expect(state.bun).toBeNull();
      });

      test('move up', () => {
        const _initialState = {
          bun: null,
          ingredients: [ingredient1MockData, ingredient2MockData]
        };

        const state = reducer(
          _initialState,
          moveIngredient({ fromIndex: 1, toIndex: 0 })
        );

        expect(state.ingredients[0]).toEqual(ingredient2MockData);
        expect(state.ingredients[1]).toEqual(ingredient1MockData);
        expect(state.bun).toBeNull();
      });
    });
  });

  test('clear constructor', () => {
    const _initialState = {
      bun: bunMockData,
      ingredients: [ingredient1MockData, ingredient2MockData]
    };

    const state = reducer(_initialState, clearConstructor());

    expect(state.ingredients).toHaveLength(0);
    expect(state.bun).toBeNull();
  });
});
