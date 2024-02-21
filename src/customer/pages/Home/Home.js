import { useQuery } from '@apollo/client'
import React, { Suspense, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuthFinal } from '../../app/contextapi/UserContext.js';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import graphQLQueries from '../../app/graphql/queries/index.js';
import { useGetAllProductsByUserHomeQuery } from '../../../features/store/slices/productsApiSlice.js';
import { useGetAllPrimaryCategoriesQuery } from '../../../features/store/slices/categoryApiSlice.js';

const Home = () =>
{

  const navigate = useNavigate()
  let homepageData = useGetAllProductsByUserHomeQuery({});
  const [productData, setProductData] = useState([]);
  const [scrollEffect, setScrollEffect] = useState(false);
  const { currentCart } = UserAuthFinal();

  const getAllPrimaryCategories = useGetAllPrimaryCategoriesQuery();

  // let homepageData = useQuery(graphQLQueries.GET_ALL_PRODUCTS, {
  //   onCompleted (data)
  //   {
  //     setProductData(data.getAllProducts.data);
  //   }
  // });

 

  useEffect(() =>
  {
    

    console.log(homepageData)
    window.onscroll = () =>
    {

      if (window.scrollY <= 200)
      {

        setScrollEffect(false);
      } else if (window.scrollY > 200)
      {
        setScrollEffect(true)
      }
    }


  }, [])

  const CategoryBox = ({ name, img, scrollEffect,_id }) =>
  {
    return (
      <div onClick={()=>navigate(`/category/${_id}`)} className='cursor-pointer relative'>
        <img hidden={ scrollEffect == true } src={ img } className='w-[70px] h-[65px] mt-5' />
        <p className={ `hover:text-gray-400 font-semibold text-center ${scrollEffect ? 'mt-3' : ''}` }>{ name }</p>

      </div>
    )
  }

  return (
    <Suspense fallback={ <p>Loading.....</p> }>
      <section id="category-bar" className={ `w-full justify-evenly flex items-center px-28 bg-white shadow-sm ${scrollEffect ? 'h-[50px] duration-300' : ' h-[140px] duration-300'} top-[60px] shadow fixed` }>
        {
          getAllPrimaryCategories?.data?.data?.map((item,i)=>{
            return <CategoryBox _id={item?._id} scrollEffect={ scrollEffect } name={item?.name} img={item?.image || "" }  />

          })
        }
        <CategoryBox scrollEffect={ scrollEffect } name="Offers" img={ "https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100" } />

      </section>

      <section>
        <div className='mt-20 p-5'>
          <p className='text-xl font-semibold '>Products</p>
          <div className='flex pt-10 flex-wrap gap-[50px]'>
            {

              homepageData?.data?.data?.map((data, i) =>
              {
                return <Link key={ i } className='text-black hover:text-black' to={ "/product/" + data?._id }>
                  <div className='w-[250px] h-[330px] border border-gray-100  hover:shadow-lg'>
                    <div className='flex border-b border-gray-100 justify-center h-[185px] w-full bg-white'>
                      {/* <img src={ data?.images ? data.images[0] : '' } className="w-[200px] h-[185px]" /> */}
                      <div style={{backgroundImage:`url(${data?.images[0]})`}} className=' bg-no-repeat bg-contain w-[200px] h-[190px]'/>
                    </div>
                    <div className='text-md gap-y-1 mt-3 flex flex-col mx-5'>
                      <span className='text-gray-600 font-semibold'>{ data?.name?.charAt(0).toUpperCase() + data?.name?.substring(1,55) } {data?.name?.length>55?"....":""}</span>
                      <span className='font-semibold text-[16px]'>₹{ data?.sellingprice }</span>
                      <span className='text-green-500 font-semibold'>Free Delivery</span>
                    </div>


                  </div>
                </Link>
              })
            }
          </div>
        </div>
      </section>
    </Suspense>
  )
}

export default Home