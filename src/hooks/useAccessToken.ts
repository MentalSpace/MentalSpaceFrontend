import { useQuery, useQueryClient } from 'react-query';

import { apiUrl } from '../constants';
import { CSRFTokenResponse, useCSRFToken } from './useCSRFToken';
import { LoginResponse } from './useLogin';

type AccessTokenResponse = {
  status: string;
  userId: number;
  accessToken: string;
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
};

export const useAccessToken = () => {
  const queryClient = useQueryClient();

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN':
        queryClient.getQueryData<CSRFTokenResponse>('csrfToken')!.csrfToken,
    },
  };

  const accessTokenRequest = async (): Promise<AccessTokenResponse> =>
    await (await fetch(apiUrl + '/auth/token', requestOptions)).json();

  return useQuery<AccessTokenResponse>(
    'accessTokenResponse',
    accessTokenRequest,
    {
      enabled:
        queryClient.getQueryData<CSRFTokenResponse>('csrfToken')?.status ===
          'success' &&
        queryClient.getQueryData<LoginResponse>('loginResponse')?.status ===
          'success',
      cacheTime: 30 * 60 * 1000,
      // initialData: () =>
      //   useQueryClient().getQueryData<LoginResponse>('loginResponse'),
    }
  );
};
