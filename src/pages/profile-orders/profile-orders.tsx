import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchMyOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: orders,
    loading,
    error
  } = useAppSelector((state) => state.orders);

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
