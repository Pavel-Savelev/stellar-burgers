import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../services/store';
import { RootState } from '../../../services/store';
import { Preloader } from '../preloader';
interface ProtectedRouteProps {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const location = useLocation();
  const { user, isAuthChecked } = useAppSelector(
    (state: RootState) => state.auth
  );

  const isAuth = !!user;

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuth) {
    return <Navigate to='/' replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
