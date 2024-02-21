import React, { Fragment, Suspense, useEffect, useState } from 'react'
import cartHelp from '../../app/cart/cartHelp';
import { UserAuthFinal } from '../../app/contextapi/UserContext'
import { Modal, Form, Input } from 'antd';
import { useMutation } from '@apollo/client';
import graphQLQueries from '../../app/graphql/queries';
import { useNavigate } from 'react-router';
import { useUpdateCartMutation } from '../../../features/store/slices/usersApiSlice';

const Cart = () =>
{

    const { currentCart, currentUser, refreshCart, setCurrentBuyProduct,clearCart } = UserAuthFinal();
    const navigate = useNavigate();
    const [cartData, setCartData] = useState([]);
    const [checkoutForm] = Form.useForm();
    const [showCheckout, setShowCheckout] = useState(false);



    // let [addNewOrder] = useMutation(graphQLQueries.ADD_NEW_ORDER, {
    //     onCompleted (data)
    //     {
    //         cartHelp.emptyCart();
    //         setCartData([]);
    //         checkoutForm.resetFields();
    //         setShowCheckout(!showCheckout);
    //     }
    // });

    let [updateCart] = useUpdateCartMutation();

    const handleChange = (e, i) =>
    {
        let updatedCart = [...cartData];
        updatedCart[i].quantity = +e.target.value;
        setCartData(updatedCart);
        cartHelp.updateCart(i, +e.target.value);

    }

    const handleDelete = (index) =>
    {
        const updatedCart = cartHelp.removeCart(index);
        setCartData(updatedCart);
    }

    const handleCheckout = (values) =>
    {

        values.delivery_fee = 40;
        values.packaging_charge = 10;
        values.total = cartHelp.totalItemPrice();
        values.ordered_by = currentUser?._id;
        values.transaction_ID = Date.now().toString();

        let cartDataTemp = cartData?.map((data, i) =>
        {
            return {
                product: data.product._id,
                quantity: data.quantity,
                shop: data.shopID
            }
        })
        values.products = cartDataTemp;

        // addNewOrder({
        //     variables: {
        //         NewOrderInput: values
        //     }
        // })
    }

    const handleCartCheckout = () =>
    {
        // setCurrentBuyProduct([{
        //     product:product,
        //     quantity:1,
        //     shop:product?.shop?._id,
        //     price:product?.sellingprice,
        //     total_amount:product?.sellingprice
        // }])

        
        let itemArr = currentCart?.products?.map((data) =>
        {
            return {
                product: data.product,
                quantity: data.quantity,
                shop: data.product?.shop,
                price: data.product.sellingprice,
                total_amount: currentCart.total_amount
            }
        })
       
        setCurrentBuyProduct(itemArr);
        navigate('/checkout')
    }

    return (
        <Fragment>

            <Suspense fallback={ <p>Loading...</p> }>
                <section className='w-full min-h-screen flex justify-center'>
                    <div className='w-11/12 ml-10 flex space-x-3'>
                        <div className='w-3/5 p-5 shadow'>
                            <p className='text-lg font-semibold py-3'>Cart Details { "(" + (currentCart?.products?.length || 0) + ")" }</p>
                            {
                                currentCart?.products?.map((data, i) =>
                                {
                                    return <div key={ i } className='flex relative border-gray-50 py-5 gap-x-3 items-center hover:border-gray-200 border '>
                                        <div>
                                            {/* <img className='w-36 h-36' src={ data?.product?.images?.length > 0 ? data?.product?.images[0] : 'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100' } /> */}
                                            <div style={ { backgroundImage: `url(${data?.product?.images[0]})` } } className=' bg-no-repeat bg-contain w-[150px] h-[150px]' />
                                        </div>
                                        <div>
                                            <p className='text-[0.9rem]'>{ data.product?.name }</p>
                                            <span className='flex gap-[2px]'>
                                                <p className='font-semibold'>Seller:</p>
                                                <p >{ data.product?.shop?.name }</p>
                                            </span>
                                            <div className='flex gap-x-2 items-center '>
                                                <strike className="text-[13px]">₹{ data?.product?.mrp }</strike>
                                                <p className='text-lg font-semibold'>₹{ data?.product?.sellingprice }</p>
                                            </div>
                                            <div className='flex gap-x-3 mt-2 items-center'>
                                                <button className='py-1 font-semibold px-3  bg-gray-100 ' onClick={ () =>
                                                {
                                                    updateCart({

                                                        cartId: currentCart._id,
                                                        product: data.product._id,
                                                        quantity: data.quantity - 1

                                                    }).then((res)=> {
                                                        if(res.data.info=="Cart Deleted Successfully"){
                                                            clearCart()
                                                            refreshCart()
                                                        }else{
                                                            refreshCart()
                                                        }
                                                    })
                                                } }>-</button>
                                                <p className='text-lg '>{ data?.quantity }</p>
                                                <button className='py-1 font-semibold px-3  bg-gray-100 ' onClick={ () =>
                                                {
                                                    updateCart({

                                                        cartId: currentCart._id,
                                                        product: data.product._id,
                                                        quantity: data.quantity + 1

                                                    }).then((res)=>refreshCart())
                                                } }>+</button>

                                            </div>
                                            <div className='flex gap-x-6 pt-3 items-center'>
                                                <p className='text-[14px] font-semibold cursor-pointer '>SAVE FOR LATER</p>
                                                <p onClick={ () => { } } className='text-[14px] cursor-pointer font-semibold'>REMOVE</p>
                                            </div>
                                        </div>
                                        <div className='absolute right-14 font-semibold text-[15px] top-20'>Delivery in 3 days</div>
                                    </div>
                                })
                            }

                            <button hidden={!currentCart?.products?.length >0} onClick={ handleCartCheckout } className='px-10 py-2 bg-gradient-to-l from-purple-500 to-purple-600 text-white rounded my-10 font-semibold'>CheckOut</button>
                        </div>
                        <div className='w-1/3 fixed right-20 top-2'>
                            <p className='p-3 text-gray-400 font-semibold text-lg'>Price Details</p>
                            <hr className='my-2' />
                            <span className='flex items-center justify-between mx-3 my-1 text-lg font-semibold'>
                                <p>Price({ currentCart?.total_quantity }) items</p>
                                <p>₹{ currentCart.total_amount + currentCart.total_discount || 0 }</p>
                            </span>
                            <span className='flex items-center justify-between mx-3 my-1 text-lg font-semibold'>
                                <p>Discount</p>
                                <p className='text-green-500'>- ₹{ currentCart?.total_discount || 0 }</p>
                            </span>
                            <span className='flex items-center justify-between mx-3 my-1 text-lg font-semibold'>
                                <p>Delivery Charges</p>
                                <p className='text-green-500 text-[15px]'>FREE</p>
                            </span>
                            <hr className='my-2 ' />
                            <span className='flex items-center justify-between mx-3 my-1 text-[21px] font-semibold'>
                                <p>Total Amount</p>
                                <p className=''>₹{ currentCart?.total_amount || 0 }</p>
                            </span>
                            <hr className='my-2' />
                            <p className='px-3 text-green-500 text-[16px] font-semibold'>You will Save ₹{ currentCart?.total_discount || 0 } on this order</p>
                        </div>
                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default Cart