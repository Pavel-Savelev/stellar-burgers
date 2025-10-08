import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/slices/authSlice';
import { useNavigate } from 'react-router-dom';
export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()

  const err = useSelector((state: RootState) => state.auth.error)


  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: userName, email:email, password:password }))
  }

  return (
    <RegisterUI
      errorText={err || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
