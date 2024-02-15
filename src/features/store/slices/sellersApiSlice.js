import apiSlice from "../apiSlice";


export const sellersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllSellers: builder.query({
            query: ({_id}) => ({
                url: `auth/v1/${_id}/sellers`,
                method: 'GET',
            })
        })
    })
})


export const {useGetAllSellersQuery} = sellersApiSlice;





