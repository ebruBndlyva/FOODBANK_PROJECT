import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const DiscountApi = createApi({
    reducerPath: "discountApi",
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
        getDiscountFoods: builder.query({
            query: () => "/category"
        }),
        postDiscountFood: builder.mutation({
            query: (newDiscountFood) => ({
                url: "/category",
                method: "POST",
                body: newDiscountFood
            })
        })

    }),
});

export const {useGetDiscountFoodsQuery,usePostDiscountFoodMutation } = DiscountApi
