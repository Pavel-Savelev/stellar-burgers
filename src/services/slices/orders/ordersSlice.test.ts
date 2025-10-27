import reducer, { fetchMyOrders } from './ordersSlice';
import { TOrder } from '@utils-types';

describe('ordersSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  const mockOrders: TOrder[] = [
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941'
      ],
      _id: '6622337897ede0001d0666b5',
      status: 'done',
      name: 'Test Burger',
      createdAt: '2024-04-19T09:03:52.748Z',
      updatedAt: '2024-04-19T09:03:58.057Z',
      number: 38321
    }
  ];

  test('должен вернуть initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('pending — загрузка заказов начинается', () => {
    const action = { type: fetchMyOrders.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      items: [],
      loading: true,
      error: null
    });
  });

  test('fulfilled — заказы успешно загружены', () => {
    const action = { type: fetchMyOrders.fulfilled.type, payload: mockOrders };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      items: mockOrders,
      loading: false,
      error: null
    });
  });

  test('rejected — ошибка при загрузке заказов', () => {
    const action = {
      type: fetchMyOrders.rejected.type,
      payload: 'Ошибка загрузки заказов'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      items: [],
      loading: false,
      error: 'Ошибка загрузки заказов'
    });
  });
});
