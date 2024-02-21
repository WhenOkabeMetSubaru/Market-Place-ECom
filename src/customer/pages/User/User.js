// import React from 'react'
// import './user.css'

// const User = () => {
//   return (
//     <section className='outercontainer'>
//        <div className='top-row-items'>
//           <p className='tax-title'>Tax Invoice</p>
//           <div>
//           <span className='top-row-subitems'><p>Order No:</p><p className='top-row-right-element'>DFSDFDSF254</p></span>
//             <span className='top-row-subitems'><p>Order Date:</p><p>12-04-2022, 04:48 PM</p></span>
//           </div>
//         <div>
//           <span className='top-row-subitems'><p>Invoice No:</p><p>DFSDFDSF254</p></span>
//           <span className='top-row-subitems'><p>Invoice Date:</p><p>12-04-2022, 04:48 PM</p></span>
//         </div>
//         <div>
//           <span className='top-row-subitems'><p>GST IN:</p><p>DFSDFDSF254</p></span>
//           <span className='top-row-subitems'><p>PAN:</p><p>12-04-2022, 04:48 PM</p></span>
//         </div>
//        </div>
//        <div className='info-row-items'>
//         <div className='second-row-element'>
//           <h4>Sold By</h4>
//           <h5>Demo Name</h5>
//           <p>Shop No-5, Ambedkar College Market, Opp. HONDA
//             Showroom, Near Tejgarhi Crossing, Garh Road,, Meerut,
//             U.P, India., MEERUT - 250002
//           </p>
//         </div>
//         <div className='second-row-element'>
//           <h4>Sold By</h4>
//           <h5>Demo Name</h5>
//           <p>Shop No-5, Ambedkar College Market, Opp. HONDA
//             Showroom, Near Tejgarhi Crossing, Garh Road,, Meerut,
//             info-row-items
//             info-row-items info-row-itemsinfo-row-itemsinfo-row-items
//             U.P, India., MEERUT - 250002
//           </p>
//         </div>
//         <div className='second-row-element'>
//           <h4>Sold By</h4>
//           <h5>Demo Name</h5>
//           <p>Shop No-5, Ambedkar College Market, Opp. HONDA
//             Showroom, Near Tejgarhi Crossing, Garh Road,, Meerut,
//             U.P, India., MEERUT - 250002
//           </p>
//         </div>
//        </div>

//        <div className='main-row-items'>
//           <div className='main-row1'>
//               <div className='main-row1-item1'>
//                 <p>Product</p>
//               </div>
//               <div className='main-row1-item2'>
//                 <p>Description</p>
//               </div>
//               <div className='main-row1-item3'>
//                 <p>Quantity</p>
//               </div>
//               <div className='main-row1-item4'>
//                 <p>Gross Amount</p>
//               </div>
//               <div className='main-row1-item5'>
//                 <p>Discount</p>
//               </div>
//               <div className='main-row1-item6'>
//                 <p>Tax Value</p>
//               </div>
//               <div className='main-row1-item7'>
//                 <p>IGST</p>
//               </div>
//               <div className='main-row1-item8'>
//                   <p>Total</p>
//               </div>
            
//           </div>
//           <div className='main-row2'>
//             <div className='main-row1-item1'>
//               <p>HAVELLS Adore 1100 W Dry Iron Sea Green | Dry
//                 Iron Adore Sea Green 1100W | IMEI/SrNo: 
//               </p>
//             </div>
//             <div className='main-row1-item2'>
//               <p>HSN: 8516 | IGST: 18%</p>
//             </div>
//             <div className='main-row1-item3'>
//               <p>1</p>
//             </div>
//             <div className='main-row1-item4'>
//               <p>1230.0</p>
//             </div>
//             <div className='main-row1-item5'>
//               <p>0</p>
//             </div>
//             <div className='main-row1-item6'>
//               <p>1000</p>
//             </div>
//             <div className='main-row1-item7'>
//               <p>187</p>
//             </div>
//             <div className='main-row1-item8'>
//               <p>1230</p>
//             </div>

//           </div>
//           <div className='main-row3'>
//             <div className='main-row1-item1'>
             
//             </div>
//             <div className='main-row1-item2'>
//               <p>Shipping and Handling Charges</p>
//             </div>
//             <div className='main-row1-item3'>
//               <p>1</p>
//             </div>
//             <div className='main-row1-item4'>
//               <p>0.00</p>
//             </div>
//             <div className='main-row1-item5'>
//               <p>0</p>
//             </div>
//             <div className='main-row1-item6'>
//               <p>0.00</p>
//             </div>
//             <div className='main-row1-item7'>
//               <p>0.00</p>
//             </div>
//             <div className='main-row1-item8'>
//               <p>0.00</p>
//             </div>

//           </div>
//           <div className='main-row4'>
//             <p className='main-row4-quantity'>TOTAL QTY : 1</p>
//             <div>
//               <p className='main-row4-quantity'>TOTAL PRICE:1230.00</p>
//               <p>All Values are in INR</p>
//             </div>
//           </div>
//        </div>
//     </section>
//   )
// }

// export default User



import React, { Fragment, Suspense, useEffect, useReducer } from 'react'
import { Form, Input } from 'antd'
import auth from '../../app/auth/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { UserAuthFinal } from '../../app/contextapi/UserContext';
import graphQLQueries from '../../app/graphql/queries';
import { ProfileSideMenu } from './component';
import { useUpdateUserDetailsMutation } from '../../../features/store/slices/usersApiSlice';

const User = () =>
{

  const [updateForm] = Form.useForm();
  const { updateData, currentUser } = UserAuthFinal();
  // const [updateUser, { error, data, loading }] = useMutation(graphQLQueries.UPDATE_USER);
  const navigate = useNavigate();


  let initialUserPageState = {
    tab: "0"
  }



  const [userPageState, setUserPageState] = useReducer(UserPageReducer, initialUserPageState);
  const { tab } = userPageState;


  useEffect(() =>
  {
    if (auth.isAuthenticated() == false)
    {
      navigate('/login')
    }

    updateForm.setFieldsValue({
      name: currentUser?.name,
      email: currentUser?.email,
      mobile:currentUser?.mobile
    })



  }, [currentUser, tab])


  const [updateUser] = useUpdateUserDetailsMutation();


  const handleUpdate = values =>
  {
    values._id = currentUser._id
    // updateUser({
    //   variables: {
    //     UpdateUserInput: values
    //   }
    // })

    updateUser(values);

    updateData();
  }

  const Tabs = ({ name, current, children }) =>
  {
    return (

      <div className={ `${name === current ? 'w-4/5 min-h-screen border' : 'hidden'} ` } children={ children } />

    )
  }

  return (
    <Suspense fallback={ <p>Loading</p> }>


      <ProfileSideMenu>
        <div className='w-3/4 '>
          <p className='text-lg font-semibold p-5'>Profile Information</p>
          <div className='mx-4 py-6'>
            
            <Form className='w-1/2 ' layout='vertical' form={ updateForm } onFinish={ handleUpdate }>
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
              <Form.Item className='mt-5' name="mobile" label="Mobile">
                <Input />
              </Form.Item>
              <div className=''>
                <button className='py-2 px-5 bg-orange-500 text-white font-semibold hover:bg-orange-600 rounded shadow'>Update</button>
              </div>

            </Form>
          </div>


        </div>
      </ProfileSideMenu>

    </Suspense>
  )
}

export default User


{/* <div style={{width:'40%',padding:'20px',border:'1px solid gray'}}>
          <Form layout='vertical' form={updateForm} onFinish={handleUpdate}>
              <Form.Item name="name" label="Name">
                <Input/>
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input/>
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input.Password/>
              </Form.Item>
              <div style={{display:'flex',justifyContent:'center'}}>
                <button>Update</button>
              </div>
             
          </Form>
        </div> */}



const UserPageReducer = (state, action) =>
{
  switch (action.type)
  {
    case 'SET_TAB':
      return {
        ...state,
        tab: action.payload
      }
    default:
      return state;
  }
}