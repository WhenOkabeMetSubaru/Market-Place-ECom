import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useGetOrderByIDUserQuery } from '../../../../features/store/slices/ordersApiSlice';
import { Steps, Popover } from 'antd'
import { useLazyGetInvoiceOrderQuery } from '../../../../features/store/slices/usersApiSlice';

const SingleOrder = () =>
{

    const params = useParams();

    const orderDetails = useGetOrderByIDUserQuery({ orderId: params?.orderId });

    const [pdfDetails] = useLazyGetInvoiceOrderQuery();

    const order = orderDetails?.data?.data || {};

    const customDot = (dot, { status, index }) => (


        <span className='bg-red-200'>
            { dot }
        </span>
    )
        
           
      



    return (
        <section>
            <section className='flex flex-col gap-y-10 items-center justify-center mx-5 my-10'>


                <div className='w-[90%] shadow flex justify-between p-5 min-h-[16rem] bg-gray-50 '>
                    <div className='w-2/3'>
                        <p className='text-lg font-semibold'>Delivery Address</p>
                        <p className='text-lg font-semibold'>{ order?.customer_name }</p>
                        <p className='mt-2'>
                            { order?.delivery_address?.address }

                        </p>
                        <p> { order?.delivery_address?.city } - { order?.delivery_address?.pincode }   { order?.delivery_address?.state }</p>
                        <span className='mt-2 flex gap-x-3'>
                            <p className='font-semibold'>Phone Number:</p>
                            <p>{ order?.delivery_address?.mobile }</p>
                        </span>
                    </div>
                    <div className='w-1/3 border-l border-white'>
                        <p className='text-lg font-semibold'>More Actions</p>
                        <span className='flex justify-between items-center'>
                            <p className='font-semibold'>Download Invoice</p>
                            {/* <a target='_blank' rel='noopener noreferrer' href={ "http://localhost:4000/api/user/order/invoice/" + params?.orderId }><button onClick={ () => { } } className='flex justify-center items-center bg-purple-600 text-white rounded w-28 h-9'>Download</button></a> */}
                            <button onClick={async()=> {
                                // pdfDetails({ orderId: params?.orderId }).then(() => { })
                                    window.open("http://localhost:4000/api/user/order/invoice/" + params?.orderId)
                            }} className='flex justify-center items-center bg-purple-600 text-white rounded w-28 h-9'>Download</button>
                        </span>
                    </div>

                </div>


                <div className='w-[90%] shadow flex  px-5 py-20 min-h-[16rem] bg-gray-50 '>
                    <div className='w-1/4 flex flex-col items-center'>
                        <div  className='flex gap-x-4 items-center'>
                            <img className='w-14 h-14' src={order?.products?.product?.images[0]}/>
                            <div className=''>
                                <p className='text-lg font-semibold'>{order?.products?.product?.name}</p>
                                <p className='mt-2 p-0 text-gray-400'>Color : {order?.products?.product?.color || 'grey'}</p>
                                <p className='m-0 text-gray-400'>Seller {order?.products?.product?.shop?.name}</p>
                                <p className='font-semibold mt-2 text-lg'>Rs.{order?.products?.product?.sellingprice}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-3/5'>
                        <Steps
                            current={ 1 }
                            progressDot={ customDot }
                            items={ [
                                {
                                    title: 'Order Confirmed',

                                },
                                {
                                    title: 'Shipped',

                                },
                                {
                                    title: 'Out For Delivery',

                                },
                                {
                                    title: 'Delivered',

                                },
                            ] }
                        />
                    </div>
                </div>
            </section>


        </section>
    )
}

export default SingleOrder