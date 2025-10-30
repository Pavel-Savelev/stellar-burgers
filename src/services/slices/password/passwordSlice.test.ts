// store/slices/passwordSlice.test.ts
import reducer, {
  forgotPassword,
  resetPassword,
  clearPasswordState
} from './passwordSlice';

describe('passwordSlice', () => {
  const initialState = {
    loading: false,
    error: null,
    resetRequested: false,
    resetSuccess: false
  };

  test('должен вернуть initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  // forgotPassword
  test('forgotPassword.pending — начинается запрос', () => {
    const action = { type: forgotPassword.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('forgotPassword.fulfilled — запрос успешно выполнен', () => {
    const action = { type: forgotPassword.fulfilled.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      resetRequested: true
    });
  });

  test('forgotPassword.rejected — произошла ошибка', () => {
    const action = {
      type: forgotPassword.rejected.type,
      payload: 'Ошибка запроса'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка запроса'
    });
  });

  // resetPassword
  test('resetPassword.pending — начинается сброс пароля', () => {
    const action = { type: resetPassword.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('resetPassword.fulfilled — пароль успешно сброшен', () => {
    const action = { type: resetPassword.fulfilled.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      resetSuccess: true
    });
  });

  test('resetPassword.rejected — ошибка при сбросе пароля', () => {
    const action = {
      type: resetPassword.rejected.type,
      payload: 'Ошибка сброса'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка сброса'
    });
  });

  // clearPasswordState
  test('clearPasswordState — очищает состояние', () => {
    const modifiedState = {
      loading: false,
      error: 'Ошибка',
      resetRequested: true,
      resetSuccess: true
    };
    const state = reducer(modifiedState, clearPasswordState());
    expect(state).toEqual(initialState);
  });
});
