import { useMutation } from '@apollo/client';
import { Form, Input,notification } from 'antd'
import React, { Suspense, useEffect, useState } from 'react'
import { UserAuthFinal } from '../../app/contextapi/UserContext';
import graphQLQueries from '../../app/graphql/queries';
import { useAddNewOrderByUserMutation } from '../../../features/store/slices/ordersApiSlice';
import { useNavigate} from 'react-router'
import { useAddNewAddressByUserMutation, useDeleteAddressByUserMutation, useGetAllAddressForUserQuery, useUpdateAddressByUserMutation } from '../../../features/store/slices/usersApiSlice';
import auth from '../../app/auth/auth';
import { BsThreeDotsVertical } from 'react-icons/bs';

const CheckOut = () =>
{

    const [orderForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    // const [updateUser, { error, data, loading }] = useMutation(graphQLQueries.UPDATE_USER);

    const [addNewAddressForm] = Form.useForm();

    const [showAddBox, setShowAddBox] = useState(false);
    const [selectAddress,setSelectAddress] = useState({});


    const [addNewAddress] = useAddNewAddressByUserMutation();

    const getAllAddress = useGetAllAddressForUserQuery({ jwtToken: auth.isAuthenticated() });


    const { currentBuyProduct, setCurrentBuyProduct, currentUser } = UserAuthFinal();

    // let [addNewOrder] = useMutation(graphQLQueries.ADD_NEW_ORDER, {
    //     onCompleted (data)
    //     {

    //     }
    // });

    let [addNewOrder] = useAddNewOrderByUserMutation();
    const navigate = useNavigate()
  

    useEffect(() =>
    {
        if(!currentBuyProduct){
            navigate("/")
        }
    }, [])

    useEffect(() =>
    {

        if (auth.isAuthenticated() == false)
        {
            navigate('/login')
        }

        updateForm.setFieldsValue({
            name: currentUser?.name,
            email: currentUser?.email
        })

        

        if(getAllAddress?.data?.data){
          
            setSelectAddress(getAllAddress?.data?.data[0])
        }

    }, [currentUser,getAllAddress.isLoading])


    // const handleUpdate = values =>
    // {
    //     values._id = currentUser._id
    //     // updateUser({
    //     //   variables: {
    //     //     UpdateUserInput: values
    //     //   }
    //     // })

    //     updateData();
    // }


    const handleAddAddress = values =>
    {
        addNewAddress(values).then((res) =>
        {
            addNewAddressForm.resetFields();
            getAllAddress.refetch({ jwtToken: auth.isAuthenticated() })
            setShowAddBox(false);
        })
    }

    const handleOrderFinish = () =>
    {
        if(!selectAddress){
            notification.warning({message:"Address Missing"})
        }
        let values = {};
        values.delivery_fee = 40;
        values.packaging_charge = 10;
        values.total = +currentBuyProduct[0].total_amount;
        values.ordered_by = currentUser?._id;
        values.transaction_ID = Date.now().toString();
        values.delivery_address = selectAddress?._id;
        values.customer_name = selectAddress.name;
        values.customer_email = currentUser.email;

        values.products = currentBuyProduct?.map((item, i) =>
        {  
            return {
                product: item.product._id,
                quantity: +item.quantity,
                shop: item.shop
            }
        })
        

        addNewOrder(values).then((res)=>{
            if(res?.data?.status==false){
                notification.success({message:"Order Placed Successfully",placement:'bottomRight'})
                navigate("/")
            }
        })
    
        // addNewOrder({
        //     variables: {
        //         NewOrderInput: values
        //     }
        // })
    }



    return (
        <Suspense fallback={ <p>Loading........</p> }>
            <section className='w-full bg-gray-50 min-h-screen flex justify-center'>
                <div className='w-11/12 flex space-x-10 min-h-screen' >
                    <div className='w-3/4 bg-white p-10 '>
                        {/* <Form layout={ "vertical" } className="w-3/4" requiredMark={ "false" } form={ orderForm } onFinish={ handleOrderFinish }>
                            <p className='py-4 text-xl font-semibold'>Delivery Details</p>
                            <Form.Item className='w-1/2' name="customer_name" label="Name">
                                <Input style={ { padding: '6px' } } />
                            </Form.Item>
                            <div className='flex gap-[10px] w-full'>
                                <Form.Item className='w-full' name="customer_email" label="Email">
                                    <Input style={ { padding: '6px' } } />
                                </Form.Item>
                                <Form.Item className='w-full' name="phone" label="Phone">
                                    <Input style={ { padding: '6px' } } />
                                </Form.Item>
                            </div>

                            <Form.Item name={ ['delivery_address', 'street'] } label="Address">
                                <Input.TextArea rows={ 6 } style={ { padding: '6px' } } />
                            </Form.Item>
                            <div className='flex gap-[10px]'>
                                <Form.Item className='w-full' name={ ['delivery_address', 'city'] } label="City">
                                    <Input style={ { padding: '6px' } } />
                                </Form.Item>
                                <Form.Item className='w-full' name={ ['delivery_address', 'state'] } label="State">
                                    <Input style={ { padding: '6px' } } />
                                </Form.Item>
                            </div>

                            <Form.Item name={ ['delivery_address', 'zipcode'] } label="Zipcode">
                                <Input style={ { padding: '6px' } } />
                            </Form.Item>
                            <Form.Item name={ ['delivery_address', 'country'] } label="Country">
                                <Input style={ { padding: '6px' } } />
                            </Form.Item>
                            <button className='border shadow bg-orange-500 text-white py-3 px-5'>Confirm</button>
                        </Form> */}
                        <div onClick={ () => setShowAddBox(!showAddBox) } className='bg-white cursor-pointer  h-12 px-2 gap-x-2 mt-10 border-blue-600 border rounded flex justify-start items-center'>
                            <p className='text-lg'>+</p>
                            <p>Add New Address</p>
                        </div>
                        <div hidden={ showAddBox == false } className='bg-[rgba(228,246,253,0.4)] my-5 p-3 rounded'>
                            <Form form={ addNewAddressForm } className='' onFinish={ handleAddAddress } layout='vertical' requiredMark={ false }>
                                <div className='flex gap-x-2 '>
                                    <Form.Item className='w-1/3' name="name" >
                                        <Input placeholder='Name' />
                                    </Form.Item>
                                    <Form.Item className='w-1/3' name="mobile" >
                                        <Input placeholder='10 Digit Mobile Number' prefix="+91" />
                                    </Form.Item>
                                </div>
                                <div className='flex gap-x-2'>
                                    <Form.Item className='w-1/3' name="pincode" >
                                        <Input placeholder='Pincode' />
                                    </Form.Item>
                                    <Form.Item className='w-1/3' name="locality" >
                                        <Input placeholder='Locality' />
                                    </Form.Item>
                                </div>
                                <Form.Item className='w-2/3' name="address">
                                    <Input.TextArea placeholder='Address' rows={ 3 } />
                                </Form.Item>
                                <div className='flex gap-x-2 '>
                                    <Form.Item className='w-1/3' name="city" >
                                        <Input placeholder='City/District/Town' />
                                    </Form.Item>
                                    <Form.Item className='w-1/3' name="state" >
                                        <Input placeholder='State' />
                                    </Form.Item>
                                </div>
                                <div className='flex gap-x-2'>
                                    <Form.Item className='w-1/3' name="landmark" >
                                        <Input placeholder='Landmark' />
                                    </Form.Item>
                                    <Form.Item className='w-1/3' name="alternate_phone_number" >
                                        <Input placeholder='Alternate Phone(Optional)' prefix="+91" />
                                    </Form.Item>
                                </div>
                                <button className='w-40 h-9 bg-orange-600 text-white flex justify-center items-center rounded'>
                                    <p>Save</p>
                                </button>
                            </Form>
                        </div>

                        <div className='my-5 flex flex-col gap-y-2'>
                            {
                                getAllAddress?.data?.data?.map((item) =>
                                {
                                    return <AddressComponent selectAddress={selectAddress} setSelectAddress={setSelectAddress} getAllAddress={ getAllAddress } item={ item } />
                                })
                            }
                        </div>
                        <div className='mt-10 flex justify-end'>
                            <button onClick={handleOrderFinish} className='w-60 h-10 hover:bg-orange-700 bg-orange-600 text-white flex justify-center items-center rounded shadow'>
                                Proceed
                            </button>
                        </div>
                    </div>
                    <div className='w-[300px] bg-gray-50'>
                        <p className='py-2 px-4 text-lg text-gray-400 font-semibold'>Price Details</p>
                        <hr className='my-2' />
                        <div className=' mx-4 text-lg flex justify-between'>
                            <p>Price</p>
                            <p>₹{ currentBuyProduct[0]?.total_amount }</p>
                        </div>
                        <div className=' mx-4 text-lg flex justify-between'>
                            <p>Delivery Charges</p>
                            <p className='text-green-500'>Free</p>
                        </div>
                        <div className=' mx-4 text-lg flex justify-between'>
                            <p>Packaging Charge</p>
                            <p className='text-green-500'>Free</p>
                        </div>
                        <hr className='my-2' />
                        <div className=' mx-4 text-[20px] flex justify-between'>
                            <p>Total Payable</p>
                            <p className=''>₹{ currentBuyProduct[0]?.total_amount }</p>
                        </div>
                        <hr className='mt-10 mb-2 ' />
                        {
                            currentBuyProduct?.map((item, i) =>
                            {
                                return (
                                    <div key={ i } className='my-5'>
                                        <div className='flex justify-center'>
                                            {/* <img src={ item?.product.images[0] || "" } className="w-40 h-40 " /> */}
                                            <div style={ { backgroundImage: `url(${item?.product?.images[0]})` } } className=' bg-no-repeat bg-contain w-[150px] h-[150px]' />
                                        </div>
                                        <div className='mx-5 font-semibold text-center'>
                                            <p>{ item?.product.name }</p>
                                            <p>₹{ item?.product.sellingprice }</p>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </section>
        </Suspense>
    )
}

export default CheckOut


 const AddressComponent = ({selectAddress,setSelectAddress, item, getAllAddress }) =>
{

    const [open, setOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [editForm] = Form.useForm();

    const [updateAddress] = useUpdateAddressByUserMutation();
    const [deleteAddress] = useDeleteAddressByUserMutation();

    const handleEditAddress = (values) =>
    {
        updateAddress({ addressDetails: values, addressId: item?._id, jwtToken: auth?.isAuthenticated() }).then((res) =>
        {
            editForm.resetFields();
            setShowForm(false);
            setOpen(false);

            getAllAddress.refetch({ jwtToken: auth.isAuthenticated() })

        })
    }

    return (
        <>
        {console.log(selectAddress)}
            {
                
                showForm == false ? <div onClick={()=>setSelectAddress(item)}  key={ item._id } className={`cursor-pointer rounded h-32 p-3 relative ${selectAddress?._id==item?._id?'border-[1.5px] border-orange-600':'border'}`}>
                    <p className='w-16 h-5 text-[0.8rem] flex justify-center items-center rounded-sm text-gray-500 border bg-gray-100'>
                        { item?.address_type }
                    </p>
                    <p className='pt-1 text-[0.95rem] font-semibold'>{ item?.name }  &nbsp;&nbsp;  { item?.mobile }</p>
                    <p className='pt-2 w-2/3'>h no 5-4-1040 plot no.58/phase 3 Sharadha nagar vanasthalipuram rangareddy hyderabad, Sharadha nagar, Hyderabad, Telangana - 500070</p>

                    <div className='absolute cursor-pointer right-2 top-3'>
                        <BsThreeDotsVertical onClick={ () => setOpen(!open) } size={ 25 } className='' />
                        <div hidden={ open == false } className='bg-white border flex flex-col justify-evenly items-center w-40 h-20 right-2 absolute '>
                            <p onClick={ () =>
                            {
                                editForm.setFieldsValue(item);
                                setShowForm(!showForm);
                                setOpen(false)
                            } }>Edit</p>
                            <p onClick={()=>deleteAddress(item?._id).then((res)=>{
                                setOpen(false);
                                getAllAddress.refetch({ jwtToken: auth.isAuthenticated() });
                                notification.success({message:"Address Deleted",placement:"bottomright"})
                            })}>Delete</p>
                        </div>
                    </div>


                </div>

                    : <div className='border p-3 relative'><Form form={ editForm } className='' onFinish={ handleEditAddress } layout='vertical' requiredMark={ false }>
                        <div className='flex gap-x-2 '>
                            <Form.Item className='w-1/3' name="name" >
                                <Input placeholder='Name' />
                            </Form.Item>
                            <Form.Item className='w-1/3' name="mobile" >
                                <Input placeholder='10 Digit Mobile Number' prefix="+91" />
                            </Form.Item>
                        </div>
                        <div className='flex gap-x-2'>
                            <Form.Item className='w-1/3' name="pincode" >
                                <Input placeholder='Pincode' />
                            </Form.Item>
                            <Form.Item className='w-1/3' name="locality" >
                                <Input placeholder='Locality' />
                            </Form.Item>
                        </div>
                        <Form.Item className='w-2/3' name="address">
                            <Input.TextArea placeholder='Address' rows={ 3 } />
                        </Form.Item>
                        <div className='flex gap-x-2 '>
                            <Form.Item className='w-1/3' name="city" >
                                <Input placeholder='City/District/Town' />
                            </Form.Item>
                            <Form.Item className='w-1/3' name="state" >
                                <Input placeholder='State' />
                            </Form.Item>
                        </div>
                        <div className='flex gap-x-2'>
                            <Form.Item className='w-1/3' name="landmark" >
                                <Input placeholder='Landmark' />
                            </Form.Item>
                            <Form.Item className='w-1/3' name="alternate_phone_number" >
                                <Input placeholder='Alternate Phone(Optional)' prefix="+91" />
                            </Form.Item>
                        </div>
                        <div className='flex gap-x-3'>
                            <button className='w-40 h-9 bg-orange-600 text-white flex justify-center items-center rounded'>
                                <p>Save</p>
                            </button>
                            <button type="button" onClick={ () =>
                            {

                                editForm.resetFields();
                                setShowForm(false);
                            } } className='w-40 h-9 bg-white  border-orange-500 border flex justify-center items-center rounded'>
                                <p>Cancel</p>
                            </button>
                        </div>

                    </Form></div>
            }
        </>
    )
}