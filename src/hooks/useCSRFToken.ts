import { useQuery } from 'react-query';

import { apiUrl } from '../constants';

export type CSRFTokenResponse = {
  status: string;
  csrfToken: string;
};

const getCSRFToken = async (): Promise<CSRFTokenResponse> =>
  await (await fetch(apiUrl + '/auth/csrf')).json();

export const useCSRFToken = () =>
  useQuery<CSRFTokenResponse>('csrfToken', getCSRFToken, {
    cacheTime: Infinity,
  });
