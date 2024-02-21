import authAdmin from "../../../admin/helpers/authAdmin";
import authSeller from "../../../seller/helpers/auth";
import apiSlice from "../apiSlice";

const adminToken = authAdmin.isAuthenticated() || null;
const sellerToken = authSeller.isAuthenticated() || null;



export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllProducts: builder.query({
            query: ({ _id }) => ({
                url: `api/v1/${_id}/products`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${adminToken || ""}`
                }
            })
        }),
        getAllProductsByUserHome: builder.query({
            query: ({ }) => ({
                url: "api/v1/products/home",
                method: "GET"
            })
        }),
        getProductByIDUser: builder.query({
            query: ({ productId }) => ({
                url: `api/v1/products/${productId}`,
                method: "GET"
            })
        }),
        getAllProductsByShop: builder.query({
            query: ({ shopId }) => ({
                url: `api/v1/shop/${shopId}/products`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${sellerToken ? sellerToken : ""}`
                }
            })
        }),
        addNewListingBySeller: builder.mutation({
            query: ({ productDetails, shopId }) => ({
                url: `api/v1/shop/${shopId}/products/add`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${sellerToken ? sellerToken : ""}`
                },
                body: JSON.stringify(productDetails)
            })
        })
    })
})



export const { useGetAllProductsQuery,
    useGetAllProductsByUserHomeQuery,
    useGetProductByIDUserQuery,
    useGetAllProductsByShopQuery,
    useAddNewListingBySellerMutation } = productApiSlice;