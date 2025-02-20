import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CouponApi = createApi({
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
        getCoupons: builder.query({
            query: () => "/coupon"
        }),

        postCoupon: builder.mutation({
            query: (newCoupon) => ({
                url: "/coupon",
                method: "POST",
                body: newCoupon
            })
        }),

        applyCoupon: builder.mutation({
            query: ({ code, orderAmount }) => ({
                url: "/coupon/apply",
                method: "POST",
                body: { code, orderAmount }
            })
        }),


    }),
});

export const { useApplyCouponMutation,useGetCouponsQuery,usePostCouponMutation } = CouponApi;
