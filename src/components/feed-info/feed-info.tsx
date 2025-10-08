import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  // const feeds = useSelector(
  //   (state:RootState) => state.feeds
  // )
  /** TODO: взять переменные из стора */
const { items: orders, total, totalToday } = useSelector(
    (state: RootState) => state.feeds
  );

  const readyOrders = getOrders(orders, 'done');
  
  const pendingOrders = getOrders(orders, 'pending');
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );   
};
