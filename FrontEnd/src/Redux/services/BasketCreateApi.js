import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BasketApi = createApi({
    reducerPath: "basketApi",
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
        getBaskets: builder.query({
            query: () => "/basket"
        }),
    
        postBasket: builder.mutation({
            query: (newBasket) => ({
                url: "/basket", 
                method: "POST",
                body: newBasket
            })
        }),
        deleteBasket:builder.mutation({
            query:(id)=>({
                url:`/basket/${id}`
            })
        }),
        updateBasketItem: builder.mutation({
            query: ({ menuId, count }) => ({
                url: `/basket/update`,
                method: 'PUT',
                body: { menuId, count }, 
            }),
        }),
        

    }),
});

export const {usePostBasketMutation,useGetBasketsQuery,useUpdateBasketItemMutation,useRemoveItemFromBasketMutation } = BasketApi;
