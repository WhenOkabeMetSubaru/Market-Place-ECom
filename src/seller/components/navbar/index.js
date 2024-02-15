import { useQuery } from '@apollo/client'
import { Dropdown, Space } from 'antd'
import React, { Fragment, useState } from 'react'
import { AiOutlineAim, AiOutlineAlert } from 'react-icons/ai'
import graphQLQueries from '../../app/graphql'
import { SellerAuthFinal } from '../../app/providers/SellerContext'
import { useGetAllShopsBySellerQuery } from '../../../features/store/slices/shopsApiSlice'
import {useNavigate} from 'react-router'

const NavBar = () =>
{
  const { currentShop, changeShop } = SellerAuthFinal();

  const [open, setOpen] = useState(false);
  // const Shops = useQuery(graphQLQueries.GET_SHOPS_BY_OWNER);

  const navigate = useNavigate();

  const shops = useGetAllShopsBySellerQuery();


  return (
    <Fragment>
      <nav className='w-full flex text-black justify-end ml-[220px] h-[60px] pr-60 shadow-sm z-50 fixed top-0  left-0'>

        <AiOutlineAlert onClick={ () => setOpen(!open) } className="cursor-pointer" size={ 30 } />
        <div hidden={ open == false } className='fixed  border shadow top-20 overflow-x-hidden overflow-y-auto right-3 w-[220px] h-[50vh] bg-white z-20'>
          <div>
            {
              shops?.data?.data?.map((shop, i) =>
              {
                return (<p className={ `py-1 px-3 cursor-pointer hover:bg-gray-200 ${currentShop?._id == shop._id ? 'bg-gray-300' : ''}` } onClick={ () => changeShop(shop._id) }>{ shop.name }</p>)
              })
            }
          </div>
          <div onClick={()=>navigate("/seller/shop/add")} className='absolute right-0 cursor-pointer left-0 bottom-0 flex hover:bg-gray-200 font-semibold bg-gray-100 justify-center items-center h-12'>
              Add Shop
          </div>
        </div>


      </nav>
    </Fragment>
  )
}

export default NavBar