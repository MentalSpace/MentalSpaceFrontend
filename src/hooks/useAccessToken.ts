import { useQuery } from 'react-query';

import { apiUrl } from '../constants';
import { useCSRFToken } from './useCSRFToken';

export type AccessTokenResponse = {
  status: string;
  userId: number;
  accessToken: string;
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
};

export const useAccessToken = () => {
  const csrfToken = useCSRFToken();

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken.data!.csrfToken,
    },
  };

  const accessTokenRequest = async (): Promise<AccessTokenResponse> =>
    await (await fetch(apiUrl + '/auth/token', requestOptions)).json();

  return useQuery<AccessTokenResponse>(
    'accessTokenResponse',
    accessTokenRequest,
    {
      enabled: csrfToken.data?.status === 'success',
      staleTime: 30 * 60 * 1000,
      refetchInterval: 30 * 60 * 1000,
      refetchIntervalInBackground: true,
    }
  );
};
