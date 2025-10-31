// store/slices/authSlice.test.ts
import reducer, {
  loginUser,
  registerUser,
  fetchUser,
  updateUser,
  logoutUser,
  checkUserAuth,
  setAuthChecked
} from './authSlice';
import { TUser } from '@utils-types';

describe('authSlice', () => {
  const userMock: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  const initialState = {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null
  };

  test('должен вернуть initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('setAuthChecked — выставляет флаг авторизации', () => {
    const state = reducer(initialState, setAuthChecked(true));
    expect(state.isAuthChecked).toBe(true);
  });

  // LOGIN
  test('loginUser.pending — запрос начинается', () => {
    const state = reducer(initialState, { type: loginUser.pending.type });
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('loginUser.fulfilled — вход успешен', () => {
    const state = reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: userMock
    });
    expect(state).toEqual({
      ...initialState,
      user: userMock,
      isAuthChecked: true,
      loading: false
    });
  });

  test('loginUser.rejected — ошибка входа', () => {
    const state = reducer(initialState, {
      type: loginUser.rejected.type,
      payload: 'Ошибка входа'
    });
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка входа'
    });
  });

  // REGISTER
  test('registerUser.fulfilled — регистрация успешна', () => {
    const state = reducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: userMock
    });
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  // FETCH USER
  test('fetchUser.fulfilled — получение пользователя успешно', () => {
    const state = reducer(initialState, {
      type: fetchUser.fulfilled.type,
      payload: userMock
    });
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  // UPDATE USER
  test('updateUser.fulfilled — обновление пользователя', () => {
    const prev = { ...initialState, user: userMock };
    const updatedUser = { ...userMock, name: 'Updated' };
    const state = reducer(prev, {
      type: updateUser.fulfilled.type,
      payload: updatedUser
    });
    expect(state.user).toEqual(updatedUser);
  });

  // LOGOUT
  test('logoutUser.pending — начинается выход', () => {
    const state = reducer(initialState, {
      type: logoutUser.pending.type
    });
    expect(state.loading).toBe(true);
  });

  test('logoutUser.fulfilled — выход успешен', () => {
    const loggedIn = { ...initialState, user: userMock };
    const state = reducer(loggedIn, {
      type: logoutUser.fulfilled.type
    });
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.loading).toBe(false);
  });

  test('logoutUser.rejected — ошибка выхода', () => {
    const state = reducer(initialState, {
      type: logoutUser.rejected.type,
      payload: 'Ошибка выхода'
    });
    expect(state.error).toBe('Ошибка выхода');
    expect(state.loading).toBe(false);
  });

  // CHECK USER AUTH
  test('checkUserAuth.fulfilled — пользователь авторизован', () => {
    const state = reducer(initialState, {
      type: checkUserAuth.fulfilled.type,
      payload: userMock
    });
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  test('checkUserAuth.rejected — токен недействителен', () => {
    const state = reducer(initialState, {
      type: checkUserAuth.rejected.type
    });
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
});
