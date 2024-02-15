import React, { Fragment, Suspense, useEffect, useReducer } from 'react'
import { Form, Input } from 'antd'
import auth from '../../app/auth/auth';
import { useNavigate } from 'react-router';

import { UserAuthFinal } from '../../app/contextapi/UserContext';
import { ProfileSideMenu } from './component';

const Vouchers = () =>
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

    const Tabs = ({ name, current, children }) =>
    {
        return (

            <div className={ `${name === current ? 'w-4/5 min-h-screen border' : 'hidden'} ` } children={ children } />

        )
    }

    return (
        <Suspense fallback={ <p>Loading</p> }>


            <ProfileSideMenu>
                <p>Coupons</p>
            </ProfileSideMenu>

        </Suspense>
    )
}

export default Vouchers
