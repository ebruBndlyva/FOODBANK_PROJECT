import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const MenuApi = createApi({
    reducerPath: "menuApi",
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
        getMenues: builder.query({
            query: () => "/menu"
        }),
        getMenuesByRestaurant: builder.query({
            query: (id) => `/menu/${id}`
        }),

    }),
});

export const { useGetMenuesQuery, useGetMenuesByRestaurantQuery } = MenuApi
