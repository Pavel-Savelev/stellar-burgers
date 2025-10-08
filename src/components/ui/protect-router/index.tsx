import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';

interface ProtectedRouteProps {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const isAuth = !!user;

  if (onlyUnAuth && isAuth) {
    return <Navigate to="/" replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
