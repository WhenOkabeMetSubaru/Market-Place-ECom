import React from 'react'
import {useNavigate, useParams} from 'react-router'
import { useGetPrimaryToSubCategoriesQuery } from '../../../features/store/slices/categoryApiSlice';

const CategoryCustomer = () => {

    const params = useParams();

    const navigate = useNavigate();
    const getAllSubCategories = useGetPrimaryToSubCategoriesQuery({categoryId:params?.categoryId})

  return (
    <section className='p-3'>
        <p className='text-lg font-semibold'>Category Details</p>
        <div className='mt-5 gap-x-5 gap-y-3 flex flex-wrap '>
           {
            getAllSubCategories?.data?.data?.map((item)=>{
                return (
                    <div onClick={()=>navigate(`../product/all/${item?._id}`,{replace:true})} key={item?._id} className='w-56 cursor-pointer h-64 shadow bg-white rounded'>
                        <div className='h-40 flex justify-center items-center'>
                            <img className='w-40 h-40' />
                        </div>
                        <p className='pt-5 px-2'>{item?.name}</p>
                    </div>
                )
            })
           }
        </div>
    </section>
  )
}

export default CategoryCustomer