import auth from "../../../customer/app/auth/auth";
import apiSlice from "../apiSlice";

const authUser = auth.isAuthenticated() || "";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllOrders: builder.query({
            query: ({_id}) => ({
                url: `auth/v1/${_id}/orders`,
                method: 'GET',
            })
        }),
        getAllOrdersByUser: builder.query({
            query: ({jwtToken}) => ({
                url: "api/v1/order/user",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authUser || jwtToken || ""}`
                }
            })
        }),
        addNewOrderByUser:builder.mutation({
            query:(orderDetails)=>({
                url:"api/v1/order/customer/add",
                method:"POST",
                headers: {
                    Authorization: `Bearer ${authUser || ""}`
                },
                body:JSON.stringify(orderDetails)
            })
        }),
        getOrderByIDUser:builder.query({
            query:({orderId})=>({
                url:`api/v1/order/${orderId}`,
                method:"GET",
                headers:{
                    Authorization: `Bearer ${authUser || ""}`
                }
            })
        })
        

    })
})



export const {useGetAllOrdersQuery, useAddNewOrderByUserMutation,
    useGetAllOrdersByUserQuery,
    useGetOrderByIDUserQuery
} = ordersApiSlice;
