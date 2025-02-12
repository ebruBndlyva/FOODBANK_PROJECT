import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CategoryApi = createApi({
    reducerPath: "categoryApi",
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
        getCategories: builder.query({
            query: () => "/category"
        }),
        postcategories: builder.mutation({
            query: (newCategory) => ({
                url: "/category",
                method: "POST",
                body: newRestaurant
            })
        })

    }),
});

export const { useGetCuisinesQuery } = CuisineApi
