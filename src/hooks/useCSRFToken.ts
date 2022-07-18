import { useQuery } from 'react-query';

import { apiUrl } from '../constants';

export type CSRFTokenResponse = {
  csrfToken: string;
  headerName: string;
  paramName: string;
  status: string;
};

const getCSRFToken = async (): Promise<CSRFTokenResponse> =>
  await (
    await fetch(apiUrl + '/auth/csrf', {
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();

export const useCSRFToken = () =>
  useQuery<CSRFTokenResponse>('csrfToken', getCSRFToken, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
