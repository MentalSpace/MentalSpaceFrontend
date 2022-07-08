import { useQuery, useQueryClient } from "react-query";
import { apiUrl } from "../constants";
import { CSRFTokenResponse, useCSRFTokenQuery } from "./useCSRFTokenQuery";

export type LoginResponse = {
    status: string,
    userId: number,
    accessToken: string,
    accessTokenExpiry: number,
    refreshToken: string,
    refreshTokenExpiry: number,
};

export const useLoginQuery = (email: string, password: string) => {
    const queryClient = useQueryClient();

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': queryClient.getQueryData<CSRFTokenResponse>('csrfToken')!.csrfToken
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    };
    
    const loginRequest = async (): Promise<LoginResponse> =>
        await (await fetch(apiUrl + '/user/login', requestOptions)).json();

    return useQuery<LoginResponse>('loginResponse', loginRequest, {enabled: useCSRFTokenQuery().data?.status === "success"});
}