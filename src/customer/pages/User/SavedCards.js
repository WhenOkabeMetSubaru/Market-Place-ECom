import React, { Fragment, Suspense, useEffect, useReducer } from 'react'
import { Form, Input } from 'antd'
import auth from '../../app/auth/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { UserAuthFinal } from '../../app/contextapi/UserContext';
import graphQLQueries from '../../app/graphql/queries';
import { ProfileSideMenu } from './component';

const SavedCards = () =>
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
               <p>Saved Cards</p>
            </ProfileSideMenu>

        </Suspense>
    )
}

export default SavedCards
