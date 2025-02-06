import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UserApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/auth/register",
                method: "POST",
                body: newUser,
            }),
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/login",
                method: "POST",
                body: userData,
            }),
        }),
        requestUserPasw: builder.mutation({
            query: (userEmail) => ({
                url: "/user/requestPasswordReset",
                method: "POST",
                body: userEmail,
            }),
        }),
        resetUserPasw: builder.mutation({
            query: ({ token, password, newPassword }) => ({
                url: "/user/resetPassword",
                method: "POST",
                body: { token, password, newPassword },
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useRequestUserPaswMutation, useResetUserPaswMutation, useVerificationUserQuery } = UserApi;
