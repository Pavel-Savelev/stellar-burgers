import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  createOrder,
  clearOrder
} from '../../services/slices/order/orderSlice';
import { TConstructorIngredient } from '@utils-types';
import { clearConstructor } from '../../services/slices/constructor/burgerConstructor';
import { fetchFeeds } from '../../services/slices/feeds/feedsSlice';
import type { RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useAppSelector(
    (state: RootState) =>
      state.burgerConstructor as {
        bun: TConstructorIngredient | null;
        ingredients: TConstructorIngredient[];
      }
  );

  const orderRequest = useAppSelector(
    (state: RootState) => state.order.orderRequest
  );
  const orderModalData = useAppSelector(
    (state: RootState) => state.order.currentOrder
  );
  const user = useAppSelector((state: RootState) => state.auth.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!user) {
      return navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((el) => el._id)
    ];

    dispatch(createOrder(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
        dispatch(fetchFeeds());
      })
      .catch(console.error);
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, item: TConstructorIngredient) => sum + item.price,
        0
      ),
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
