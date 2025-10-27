import { initialState, fetchFeeds } from './feedsSlice';
import reducer from './feedsSlice';

const feedsMockData = {
  orders: [],
  total: 1,
  totalToday: 1
};

describe('Тестирование feedsReducer', () => {
  describe('Асинхронная функция для получения ленты заказов: fetchFeeds', () => {
    test('Начало запроса: fetchFeeds.pending', () => {
      const state = reducer(initialState, fetchFeeds.pending('pending'));

      expect(state.loading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Результат запроса: fetchFeeds.fulfilled', () => {
      const state = reducer(
        initialState,
        fetchFeeds.fulfilled(feedsMockData, 'fulfilled')
      );

      expect(state.loading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.items).toEqual(feedsMockData.orders); // только orders
      expect(state.total).toBe(feedsMockData.total);
      expect(state.totalToday).toBe(feedsMockData.totalToday);
    });

    test('Ошибка запроса: fetchFeeds.rejected', () => {
      const error = 'fetchFeeds.rejected';

      const state = reducer(
        initialState,
        fetchFeeds.rejected(null, 'rejected', undefined, error) // payload — error
      );

      expect(state.loading).toBeFalsy();
      expect(state.error).toEqual(error);
    });
  });
});
