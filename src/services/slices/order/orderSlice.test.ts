import reducer, {
  createOrder,
  clearOrder
} from './orderSlice';
import { TOrder } from '@utils-types';

describe('orderSlice', () => {
  const initialState = {
    currentOrder: null,
    orderRequest: false,
    error: null
  };

  const mockOrder: TOrder = {
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ],
    _id: '6622337897ede0001d0666b5',
    status: 'done',
    name: 'EXAMPLE_NAME',
    createdAt: '2024-04-19T09:03:52.748Z',
    updatedAt: '2024-04-19T09:03:58.057Z',
    number: 38321
  };

  test('должен вернуть initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('pending — запрос начинается', () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      currentOrder: null,
      orderRequest: true,
      error: null
    });
  });

  test('fulfilled — заказ успешно создан', () => {
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      currentOrder: mockOrder,
      orderRequest: false,
      error: null
    });
  });

  test('rejected — ошибка при создании заказа', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: 'Ошибка при создании заказа'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      currentOrder: null,
      orderRequest: false,
      error: 'Ошибка при создании заказа'
    });
  });

  test('clearOrder — очищает заказ', () => {
    const withOrder = { ...initialState, currentOrder: mockOrder };
    const state = reducer(withOrder, clearOrder());
    expect(state).toEqual(initialState);
  });
});
