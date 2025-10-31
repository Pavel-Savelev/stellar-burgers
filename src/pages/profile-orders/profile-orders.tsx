import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchMyOrders } from '../../services/slices/orders/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: orders,
    loading,
    error
  } = useAppSelector((state) => state.orders);
  console.log(orders, 'sfv');
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка заказов...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
