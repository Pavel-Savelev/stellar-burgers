import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchMyOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const {
    items: orders,
    loading,
    error
  } = useSelector((state) => state.orders);

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
