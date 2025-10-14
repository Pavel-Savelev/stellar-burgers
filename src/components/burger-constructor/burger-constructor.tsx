import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder, clearOrder } from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/burgerConstructor';
import type { RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor
  );
  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.order.currentOrder
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((el) => el._id)
    ];

    dispatch(createOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((sum, item) => sum + item.price, 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
