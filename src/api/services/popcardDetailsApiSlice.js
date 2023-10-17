import { apiSlice } from "../apiSlice";

export const popcardDetailsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPopcardDetails: builder.query({
            query: (id = "") => `/popcards/${id}`,
        }),

        getPopcardDetailsStats: builder.query({
            query: ({ id, startDate, endDate }) => {
                return {
                    url: `/popcards/${id}/stats${startDate ? `?start_date=${startDate}` : ''}${endDate ? `${startDate ? "&" : "?"}end_date=${endDate}` : ''}`,
                }
            },
            providesTags: ['PopcardDetails']
        }),

        editPopcards: builder.mutation({
            query: (args) => {
                const { id, profileData } = args
                return {
                    url: `/popcards/${id}`,
                    method: 'PUT',
                    body: profileData
                }
            },
            invalidatesTags: ['AllPopcards', 'PopcardDetails']
        }),

        uploadProfilePicture: builder.mutation({
            query: (args) => {
                return {
                    url: `/popcards/uploadImage`,
                    method: 'POST',
                    body: args,
                }
            },
            invalidatesTags: ['AllPopcards', 'PopcardDetails']
        }),
    }),
});


export const {
    useGetPopcardDetailsQuery,
    useGetPopcardDetailsStatsQuery,
    useEditPopcardsMutation,
    useUploadProfilePictureMutation
} = popcardDetailsApiSlice;