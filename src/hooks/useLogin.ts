import { useMutation } from 'react-query';

import { apiUrl } from '../constants';
import { useCSRFToken } from './useCSRFToken';

export type LoginResponse = {
  status: string;
  errors?: LoginErrors;
  userId?: number;
  accessToken?: string;
  accessTokenExpiry?: number;
  refreshToken?: string;
  refreshTokenExpiry?: number;
};

type LoginErrors = {
  email?: string;
  password?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const csrfToken = useCSRFToken();

  const loginMutation = useMutation((credentials: LoginCredentials) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken.data!.csrfToken,
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    };

    const loginRequest = async (): Promise<LoginResponse> =>
      await (await fetch(apiUrl + '/user/login', requestOptions)).json();

    return loginRequest();
  });

  return loginMutation;
};
