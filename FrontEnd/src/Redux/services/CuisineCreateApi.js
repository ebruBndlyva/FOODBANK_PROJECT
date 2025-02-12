import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CuisineApi = createApi({
    reducerPath: "cuisineApi",
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
        getCuisines: builder.query({
            query: () => "/cuisine"
        }),
        postCuisine: builder.mutation({
            query: (newRestaurant) => ({
                url: "/cuisine",
                method: "POST",
                body: newRestaurant
            })
        })

    }),
});

export const { useGetCuisinesQuery } = CuisineApi
