import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
    login, 
    // logout 
} from '../redux/userReducer';
import TokenServices from "../helpers/token";
import config from '../config';

let baseURL = config.url.API_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    tagTypes: ["AllPopcards", "PopcardDetails"],
    prepareHeaders: (headers, { getState }) => {
        const token = getState()?.user?.access?.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    },
});

let refreshInProgress = null;

const baseQueryWithReauth = async (args, api, extraOptions) => {
    if (!refreshInProgress) {
        let result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            if (result.meta.request.url.includes("auth/reset-password")) {
                return result;
            }

            refreshInProgress = (async () => {
                try {
                    const refreshResult = await baseQuery({
                        url: '/auth/refresh-tokens/',
                        method: "POST",
                        body: { refreshToken: TokenServices.getLocalRefreshToken()?.token },
                    }, api, extraOptions);

                    if (refreshResult?.data) {
                        const { access, refresh } = refreshResult.data.tokens;
                        TokenServices.updateLocalTokens(access, refresh);
                        api.dispatch(login(refreshResult?.data));
                    }
                } catch (error) {
                    // Handle refresh token error here
                } finally {
                    refreshInProgress = null;
                }
            })();

            await refreshInProgress;
            result = await baseQuery(args, api, extraOptions);
        }

        return result;
    } else {
        await refreshInProgress;
        return await baseQuery(args, api, extraOptions);
    }
};

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
    // Add this onQueryError handler
    // onQueryError: async ({ response, context: { retries } }, api) => {
    //     if (response?.status === 401 && retries === 0) {
    //         // Retry the query once if it failed due to an expired token
    //         return { data: await api.baseQuery(args, api, extraOptions) };
    //     }
    // },
});