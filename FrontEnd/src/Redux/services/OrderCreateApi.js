import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const OrderApi = createApi({
    reducerPath: "couponApi",
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
        getOrders: builder.query({
            query: () => "/order"
        }),

        postOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/coupon",
                method: "POST",
                body: newOrder
            })
        }),


    }),
});

export const {useGetOrdersQuery,usePostOrderMutation} = OrderApi;
