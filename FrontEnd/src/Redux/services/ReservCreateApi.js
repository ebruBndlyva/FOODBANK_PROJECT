import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ReservApi = createApi({
    reducerPath: "reservApi",
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
        getReservations: builder.query({
            query: () => "/reservation"
        }),
        createReservation: builder.mutation({
            query: (newReservation) => ({
                url: "/reservation",
                method: "POST",
                body: newReservation,
            })
        })


    }),
});

export const { useCreateReservationMutation } = ReservApi
