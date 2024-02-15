import apiSlice from "../apiSlice";
import store from "..";
import authAdmin from "../../../admin/helpers/authAdmin";
import authSeller from "../../../seller/helpers/auth";

const adminToken = authAdmin.isAuthenticated() || null;
const sellerToken = authSeller.isAuthenticated() || null;


export const shopsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllShops: builder.query({
            query: ({_id}) => ({
                url: `auth/v1/${_id}/shops`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${adminToken ? adminToken : store.getState().user.token}`
                }
            })
        }),
        getAllShopsBySeller:builder.query({
            query:()=>({
                url:"api/v1/seller/shops",
                method:"GET",
                headers: {
                    Authorization: `Bearer ${sellerToken ? sellerToken : ""}`
                }
            })
        }),
        addNewShopBySeller:builder.mutation({
            query:(details)=>({
                url:"api/v1/seller/shop/add",
                method:"POST",
                headers: {
                    Authorization: `Bearer ${sellerToken ? sellerToken : ""}`
                },
                body:JSON.stringify(details)

            })
        })
    })
})


export const {useGetAllShopsQuery,useGetAllShopsBySellerQuery,useAddNewShopBySellerMutation}= shopsApiSlice;



