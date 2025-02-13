import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const RestaurantApi = createApi({
    reducerPath: "restaurantApi",
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
        getRestaurants: builder.query({
            query: () => "/restaurant"
        }),
        getRestaurantsById: builder.query({
            query: (id) => `/restaurant/${id}`
        }),
        postRestaurant: builder.mutation({
            query: (newRestaurant) => ({
                url: "/restaurant", 
                method: "POST",
                body: newRestaurant
            })
        })

    }),
});

export const { useGetRestaurantsQuery,usePostRestaurantMutation,useGetRestaurantsByIdQuery } = RestaurantApi;
