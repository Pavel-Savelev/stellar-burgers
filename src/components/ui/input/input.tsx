import { FC } from 'react';
import { Input } from '@zlden/react-developer-burger-ui-components';
import type { MyInputProps } from './input-types';

export const MyInput: FC<MyInputProps> = (props) => (
  <Input {...(props as any)} />
);
