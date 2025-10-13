import { FC } from 'react';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Logout failed:', err.message);
      } else {
        console.error('Logout failed:', err);
      }
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
