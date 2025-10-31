import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredients/ingredientsSlice';
import feedsReducer from '../slices/feeds/feedsSlice';
import ordersReducer from '../slices/orders/ordersSlice';
import constructorReducer from '../slices/constructor/burgerConstructor';
import createOrder from '../slices/order/orderSlice';
import authReducer from '../slices/user/authSlice';
import passwordReducer from '../slices/password/passwordSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  orders: ordersReducer,
  burgerConstructor: constructorReducer,
  order: createOrder,
  auth: authReducer,
  password: passwordReducer
});
