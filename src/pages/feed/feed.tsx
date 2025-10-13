import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedsSlice';
import type { RootState, AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state: RootState) => state.feeds
  );

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <FeedUI orders={items} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
