import React, { Fragment, Suspense, useEffect, useReducer } from 'react'
import { Form, Input } from 'antd'
import auth from '../../app/auth/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { UserAuthFinal } from '../../app/contextapi/UserContext';
import graphQLQueries from '../../app/graphql/queries';
import { ProfileSideMenu } from './component';

const Address = () =>
{

    const [updateForm] = Form.useForm();
    const { updateData, currentUser } = UserAuthFinal();
    // const [updateUser, { error, data, loading }] = useMutation(graphQLQueries.UPDATE_USER);
    const navigate = useNavigate();






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

    

    return (
        <Suspense fallback={ <p>Loading</p> }>


            <ProfileSideMenu>
              <section className='p-3 w-full'>
                    <p className='text-lg font-semibold'>Manage Addresses</p>

                    <div className='bg-white w-full h-12 px-2 gap-x-2 mt-10 border-blue-600 border rounded flex justify-start items-center'>
                        <p className='text-lg'>+</p>
                        <p>Add New Address</p>
                    </div>
              </section>
            </ProfileSideMenu>

        </Suspense>
    )
}

export default Address
