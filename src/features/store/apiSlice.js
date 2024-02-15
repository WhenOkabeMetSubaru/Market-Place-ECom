import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import auth from '../../customer/app/auth/auth';

let token = auth.isAuthenticated();

const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ["User", "User_Updated", "Cart", "Order", "Shop", "Product", "Products", "Orders"],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000', prepareHeaders (headers, { getState })
        {
            // headers.set('Authorization', `Bearer ${token ? token : getState().user.token}`);
            headers.set('Content-Type', 'application/json')

            return headers;
        }
    }),

    endpoints: builder => ({})


})

export default apiSlice;