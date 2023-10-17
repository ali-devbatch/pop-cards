import { apiSlice } from "../apiSlice";
import queryString from 'query-string';

export const popcardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPopcards: builder.query({
            query: (args) => {
                // const { page, limit, sortBy, filter, search } = args;
                return {
                    // url: `/popcards${page ? `?page=${page}` : ''}${sortBy ? `${page ? "&" : "?"}sortBy=${sortBy}` : ''}${filter ? `${page || sortBy ? "&" : "?"}filter=${filter}` : ''}${search ? `&search=${search}` : ''}`,
                    url: `/popcards?${queryString.stringify(args)}`
                }
            },
            providesTags: ['AllPopcards']
        }),

        getFilterPopcards: builder.query({
            query: () => `/popcards/filters`,
        }),

        getPopcardsStats: builder.query({
            query: ({ startDate, endDate }) => `/popcards/stats${startDate ? `?start_date=${startDate}` : ''}${endDate ? `${startDate ? "&" : "?"}end_date=${endDate}` : ''}`,
        }),
    }),
});

export const {
    useGetPopcardsQuery,
    useGetFilterPopcardsQuery,
    useGetPopcardsStatsQuery
} = popcardApiSlice;