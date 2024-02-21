
import {useNavigate} from 'react-router'
import { FaUserCircle} from "react-icons/fa";
import { UserAuthFinal } from '../../app/contextapi/UserContext';

export const ProfileSideMenu = ({children}) =>
{

    const navigate = useNavigate();
    const {currentUser} = UserAuthFinal()
  

    return (
        <section className='flex font-sans justify-center bg-gray-100 p-5 min-h-screen'>
            <div className='w-4/5 flex bg-white  min-h-screen'>
                <div className='w-1/4  '>
                    <div className='h-20  px-2 gap-x-2 shadow flex items-center'>
                        <FaUserCircle size={55}/>
                        <span className=''>
                            <p className='text-[0.8rem] m-0'>Hello</p>
                            <p className='m-0 text-lg font-semibold'>{currentUser?.name}</p>
                        </span>
                    </div>
                    <ul className='pt-10  text-center text-lg min-h-screen shadow'>
                        <SideMenuListItem route={"/user"} name={"User Profile"}/>
                        
                        <SideMenuListItem route={ "/user/address" } name={ "Address" } />
                        <SideMenuListItem route={ "/user/savedcards" } name={ "Saved Cards" } />
                        <SideMenuListItem route={ "/user/vouchers" } name={ "Vouchers" } />

                        
                        <li onClick={ () => navigate('/user/orders') } className='mt-10 cursor-pointer rounded bg-gradient-to-l py-2 from-purple-400 to-purple-600 text-white w-1/2 mx-20'>View Orders</li>
                    </ul>
                </div>
                
                {children}
            </div>
        </section>
    )
}


const SideMenuListItem = ({route,name})=>{
    const navigate = useNavigate();
    return (
        <li onClick={ () => { navigate(route) } } className={ `py-3 border  hover:bg-blue-100 cursor-pointer border-blue-50 ${window.location.pathname == route ? 'text-blue-600 bg-blue-50' : ''}` }>{name}</li>
    )
}