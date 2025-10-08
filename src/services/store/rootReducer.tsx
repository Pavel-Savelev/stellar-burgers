import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import feedsReducer from '../slices/feedsSlice';
import ordersReducer from '../slices/ordersSlice';
import constructorReducer from '../slices/burgerConstructor'
import createOrder from '../slices/orderSlice'
import authReducer from '../slices/authSlice'
import passwordReducer from '../slices/passwordSlice'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  orders: ordersReducer,
  burgerConstructor: constructorReducer,
  order:createOrder,
  auth: authReducer,
  password: passwordReducer
  
});
