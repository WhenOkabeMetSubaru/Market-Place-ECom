import React, { Fragment, Suspense, useEffect, useReducer, useState } from 'react'
import { Form, Input, notification } from 'antd'
import auth from '../../app/auth/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { UserAuthFinal } from '../../app/contextapi/UserContext';
import { ProfileSideMenu } from './component';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAddNewAddressByUserMutation, useDeleteAddressByUserMutation, useGetAllAddressByUserQuery, useGetAllAddressForUserQuery, useUpdateAddressByUserMutation } from '../../../features/store/slices/usersApiSlice';

const Address = () =>
{

    const [updateForm] = Form.useForm();
    const { updateData, currentUser } = UserAuthFinal();
    // const [updateUser, { error, data, loading }] = useMutation(graphQLQueries.UPDATE_USER);
    const navigate = useNavigate();

    const [addNewAddressForm] = Form.useForm();

    const [showAddBox, setShowAddBox] = useState(false);


    const [addNewAddress] = useAddNewAddressByUserMutation();

    const getAllAddress = useGetAllAddressForUserQuery({ jwtToken: auth.isAuthenticated() });









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



    }, [currentUser])


    const handleUpdate = values =>
    {
        values._id = currentUser._id
        // updateUser({
        //   variables: {
        //     UpdateUserInput: values
        //   }
        // })

        updateData();
    }


    const handleAddAddress = values =>
    {
        addNewAddress(values).then((res) =>
        {
            addNewAddressForm.resetFields();
            getAllAddress.refetch({ jwtToken: auth.isAuthenticated() })
            setShowAddBox(false);
        })
    }


    return (
        <Suspense fallback={ <p>Loading</p> }>


            <ProfileSideMenu>
                <section className='p-3 w-3/4 relative'>
                    <p className='text-lg font-semibold'>Manage Addresses</p>

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
                                return <AddressComponent getAllAddress={ getAllAddress } item={ item } />
                            })
                        }
                    </div>
                </section>
            </ProfileSideMenu>

        </Suspense>
    )
}

export default Address


export const AddressComponent = ({ item, getAllAddress }) =>
{

    const [open, setOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [editForm] = Form.useForm();

    const [updateAddress] = useUpdateAddressByUserMutation();
    const [deleteAddress] = useDeleteAddressByUserMutation()

    const handleEditAddress = (values) =>
    {
        updateAddress({ addressDetails: values, addressId: item?._id, jwtToken: auth?.isAuthenticated() }).then((res) =>
        {
            getAllAddress.refetch({ jwtToken: auth?.isAuthenticated() })
            editForm.resetFields();
            setShowForm(false);
            setOpen(false);



        })
    }

    return (
        <>
            {
                showForm == false ? <div key={ item._id } className='border h-32 p-3 relative'>
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
                            <p onClick={ () => deleteAddress(item?._id).then((res) =>
                            {

                                setOpen(false);
                                getAllAddress.refetch({ jwtToken: auth.isAuthenticated() })
                                notification.success({ message: "Address Deleted", placement: "bottomright" })
                            }) }>Delete</p>
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