import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (form) => {
                return {
                    url: '/auth/login/',
                    method: 'POST',
                    body: form
                }
            }
        }),

        signupUser: builder.mutation({
            query: (form) => {
                return {
                    url: '/auth/register/',
                    method: 'POST',
                    body: form
                }
            },
        }),

        forgotPassword: builder.mutation({
            query: (form) => {
                return {
                    url: '/auth/forgot-password/',
                    method: 'POST',
                    body: form
                }
            },
        }),

        resetPassword: builder.mutation({
            query: (password, token) => {
                return {
                    url: `/auth/reset-password?token=${token}`,
                    method: 'POST',
                    body: { password }
                }
            },
        }),

        ssoToken: builder.mutation({
            query: (token) => {
                return {
                    url: '/auth/getTokens',
                    method: 'POST',
                    body: token
                }
            },
        }),

        userLogOut: builder.mutation({
            query: (refreshToken) => {
                return {
                    url: '/auth/logout/',
                    method: 'POST',
                    body: { refreshToken }
                }
            },
        }),
    }),
})

export const {
    useLoginUserMutation,
    useSignupUserMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useSsoTokenMutation,
    useUserLogOutMutation
} = authApiSlice;