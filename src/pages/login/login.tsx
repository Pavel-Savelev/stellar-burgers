import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { RootState } from 'src/services/store';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/slices/authSlice';

import { useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authState = useAppSelector((state: RootState) => state.auth);

  const location = useLocation();
  const navigate = useNavigate();

  const { from } = location.state || { from: { pathname: '/' } };
  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((user) => {
        console.log('Login success:', user);
        navigate(from.pathname, {
          replace: true
        });
      })
      .catch((err) => {
        <div>Неверно запонены данные либо пользователь не существует</div>;
        console.error('Login failed:', err);
      });
  };

  return (
    <LoginUI
      errorText={authState.error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
