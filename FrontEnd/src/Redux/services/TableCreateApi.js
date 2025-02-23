import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TableApi = createApi({
    reducerPath: "tableApi",
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
        getTables: builder.query({
            query: () => "/table"
        }),
       

    }),
});

export const {useGetTablesQuery } = TableApi
