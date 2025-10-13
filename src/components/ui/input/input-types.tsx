import { ChangeEvent } from 'react';

export interface MyInputProps {
  type: 'text' | 'email' | 'password';
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorText?: string;
  size?: 'default';
  icon?: string;
}
