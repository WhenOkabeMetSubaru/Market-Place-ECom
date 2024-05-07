import { useQuery } from '@apollo/client';
import { Table, Tooltip } from 'antd';
import React, { useEffect, useReducer } from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import graphQLQueries from '../../app/graphql';
import { SellerAuthFinal } from '../../app/providers/SellerContext'
import SellerLayout from '../../layouts/SellerLayout'
import { useGetAllProductsByShopQuery } from '../../../features/store/slices/productsApiSlice';
import {useNavigate} from 'react-router'

const SellerListings = () => {

  const { currentShop } = SellerAuthFinal();
  const navigate  = useNavigate();

  let initialListingsState = {
    current: 1,
    pageSize: 10,
    total: 100
  }

  const [listingState,setListingState] = useReducer(listingReducer,initialListingsState);

  let {current,pageSize,total} = listingState;

  // let listingsData = useQuery(graphQLQueries.GET_ALL_PRODUCTS_BY_SHOP, {
  //   variables: {
  //     _id: currentShop?._id
  //   }
  // })
  useEffect(()=>{console.log(currentShop)})

  let listingsData = useGetAllProductsByShopQuery({
    shopId:currentShop?._id
  })

  const columns = [
    { title: 'S.No', dataIndex: 'key' },
    { title: 'Product Name', dataIndex: 'name' },
    { title: 'MRP', dataIndex: 'mrp' },
    { title: 'Selling Price', dataIndex: 'sellingprice' },
    { title: 'Created On', dataIndex: 'created' },
    {
        title: 'Alter',
        render: (product) => {
            const handleEdit = () => {
                // handleEditClick(product);
            }
            return (
                <Tooltip placement='right' title="Edit Product">
                    <div><AiOutlineEdit /></div>
                </Tooltip>
            )
        }


    }
]

  const handlePagination = ({ current, pageSize }) => {
    setListingState({ type: 'SET_PAGINATION', payload: { current, pageSize } });
  }

  return (
    <SellerLayout>
      <section className='mx-10 mt-6'>
      <div className='my-5 mx-2 flex justify-end'>
        <button onClick={()=>navigate('/seller/listings/add')} className='w-36 rounded bg-orange-600 text-white shadow hover:bg-orange-700 flex justify-center items-center h-8'>
          Add Listing
        </button>
      </div>
        <Table columns={columns}
          className="border border-b-gray-100"
          onChange={handlePagination}
          pagination={{ current, pageSize, total }}
          loading={listingsData.isLoading}
          dataSource={
            listingsData?.data?.data?.map((product, index) => {
              return {
                key: index + 1,
                ...product
              }
            })
          } />
      </section>

    </SellerLayout>
  )
}

export default SellerListings


const listingReducer = (state,action)=>{
  switch(action.type){

    case 'SET_PAGINATION':
      return {
        ...state,
        current:action.payload.current,
        pageSize:action.payload.current
      }
    default:
      return state;
  }
}