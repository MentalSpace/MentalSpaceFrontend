import { useMutation, useQueryClient } from 'react-query';

import { apiUrl } from '../constants';
import { CSRFTokenResponse } from './useCSRFToken';

export type LoginResponse = {
  status: string;
  userId: number;
  accessToken: string;
  accessTokenExpiry: number;
  refreshToken: string;
  refreshTokenExpiry: number;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation((credentials: LoginCredentials) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':
          queryClient.getQueryData<CSRFTokenResponse>('csrfToken')!.csrfToken,
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
