import apiSlice from "../apiSlice";
import store from "..";
import authAdmin from "../../../admin/helpers/authAdmin";
import auth from "../../../customer/app/auth/auth";

const adminToken = authAdmin.isAuthenticated() || null;
const customerToken = auth.isAuthenticated() || null;

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllUsers: builder.query({
            query: ({_id}) => ({
                url: `auth/v1/${_id}/users`,
                method: 'GET',
                headers:{
                    Authorization:`Bearer ${adminToken?adminToken: store.getState().user.token}`
                }
            })
        }),
        updateUserDetails:builder.mutation({
            query:(userDetails)=>({
                url: "api/v1/user/update",
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${customerToken || ""}`
                },
                body: userDetails
            })
        }),
        loginUser:builder.mutation({
            query:({email,password})=>({
                url:'auth/v1/login',
                method:'POST',
                body:{
                    email,
                    password
                }
            })
        }),
        getAdminDetails:builder.query({
            query:()=>({
                url:'auth/v1/admindetails',
                method:'GET',
                headers: {
                    Authorization: `Bearer ${adminToken ? adminToken : store.getState().user.token}`
                }
                
            })
        }),
        loginCustomer:builder.mutation({
            query:({email,password})=>({
                url:'api/v1/signin',
                method:'POST',
                body:{email,password}
            })
        }),
        signupCustomer:builder.mutation({
            query:({name,email,password})=>({
                url:"api/v1/signup",
                method:"POST",
                body:{name,email,password}
            })
        }),
        updateCart:builder.mutation({
            query:(cartDetails)=>({
                url:`api/v1/user/cart/update`,
                method:"POST",
                headers: {
                    Authorization: `Bearer ${customerToken || ""}`
                },
                body:JSON.stringify(cartDetails)
            }),
            invalidatesTags:['Cart']
        }),
        getInvoiceOrder:builder.query({
            query:({orderId})=>({
                url:`api/user/order/invoice/${orderId}`,
                method:"GET",
                headers: {
                    Authorization: `Bearer ${customerToken || ""}`,
                    'Content-Type':"application/pdf",
                    'Accept':"application/pdf"
                }
            })
        }),
        getAllAddressByUser:builder.query({
            query:({})=>({
                url:"/api/v1/user/address/all",
                method:"GET",
                headers: {
                    Authorization: `Bearer ${customerToken || ""}`
                }
            })
        }),
        addNewAddressByUser:builder.mutation({
            query:(addressDetails)=>({
                url:`api/v1/user/address/add`,
                method:'POST',
                headers: {
                    Authorization: `Bearer ${customerToken || ""}`
                },
                body:JSON.stringify(addressDetails)
            })
        })
        ,
        updateAddressByUser:builder.mutation({
            query:({addressDetails,addressId})=>({
                url:`api/v1/user/address/${addressId}/update`,
                method:"PATCH",
                headers: {
                    Authorization: `Bearer ${customerToken || ""}`
                },
                body:JSON.stringify(addressDetails)
            })
        }),
        deleteAddressByUser:builder.mutation({
            query:(addressId)=>({
                url:`api/v1/user/address/${addressId}/delete`,
                method:"DELETE",
                headers: {
                    Authorization: `Bearer ${customerToken || ""}`
                }
            })
        })
        
    })
})


export const {
    useGetAllUsersQuery,
    useLoginUserMutation,
    useGetAdminDetailsQuery,
    useLoginCustomerMutation,
    useSignupCustomerMutation,
    useUpdateCartMutation,
    useLazyGetInvoiceOrderQuery,
    useUpdateUserDetailsMutation,
    useGetAllAddressByUserQuery,
    useAddNewAddressByUserMutation,
    useUpdateAddressByUserMutation,
    useDeleteAddressByUserMutation
} = usersApiSlice;


