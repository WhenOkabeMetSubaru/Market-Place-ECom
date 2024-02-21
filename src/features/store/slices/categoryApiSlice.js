import authAdmin from "../../../admin/helpers/authAdmin";
import auth from "../../../customer/app/auth/auth";
import apiSlice from "../apiSlice";

const authUser = auth.isAuthenticated() || "";
const adminToken = authAdmin.isAuthenticated() || ""

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewCategoryAdmin:builder.mutation({
            query:(categoryDetails)=>({
                url:"api/v1/category/add",
                method:"POST",
                headers: {
                    Authorization: `Bearer ${adminToken || ""}`
                },
                body:categoryDetails
            })
        }),
        updateCategoryByID:builder.mutation({
            query:({categoryDetails,categoryId})=>({
                url:`api/v1/category/${categoryId}/update`,
                method:"PATCH",
                headers: {
                    Authorization: `Bearer ${adminToken || ""}`
                },
                body:categoryDetails
            })
        }),
        deleteCategoryByID: builder.mutation({
            query: ({ categoryId }) => ({
                url: `api/v1/category/${categoryId}/delete`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${adminToken || ""}`
                }
            })
        }),
        getAllCategories:builder.query({
            query:()=>({
                url:"api/v1/category/alldata",
                method:"GET"
            })
        }),
        getAllPrimaryCategories:builder.query({
            query:()=>({
                url:"api/v1/category/data/primary",
                method:"GET"
            })
        }),
        getAllSecondaryCategories:builder.query({
            query:({})=>({
                url:"api/v1/category/secondary",
                method:"GET"
            })
        }),
        getPrimaryToSubCategories:builder.query({
            query:({categoryId})=>({
                url:`api/v1/category/${categoryId}/sub`,
                method:"GET"
            })
        })

       


    })
})



export const {
    useAddNewCategoryAdminMutation,
    useUpdateCategoryByIDMutation,
    useDeleteCategoryByIDMutation,
    useGetAllCategoriesQuery,
    useGetAllPrimaryCategoriesQuery,
    useGetAllSecondaryCategoriesQuery,
    useLazyGetAllSecondaryCategoriesQuery,
    useGetPrimaryToSubCategoriesQuery,
    useLazyGetPrimaryToSubCategoriesQuery
} = categoryApiSlice;
