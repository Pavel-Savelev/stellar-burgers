import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feeds/feedsSlice';
import type { RootState } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();

  const { items, loading, error } = useAppSelector(
    (state: RootState) => state.feeds
  );

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleFetch = () => dispatch(fetchFeeds());

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return <FeedUI orders={items} handleGetFeeds={handleFetch} />;
};
