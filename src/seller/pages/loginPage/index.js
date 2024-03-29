import React, { useEffect, useState } from 'react'
import { Form, Input } from 'antd'
import { useMutation } from '@apollo/client';


import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { UserAuthFinal } from '../../../customer/app/contextapi/UserContext';
// import { SIGN_IN_USER } from '../../../app/graphql/queries/mutations';
import authSeller from '../../helpers/auth';
import { Tabs } from '../../../customer/components/utils/tabs';
import { useLoginCustomerMutation, useSignupCustomerMutation } from '../../../features/store/slices/usersApiSlice';
// import graphQLQueries from '../../../app/graphql/queries';
// import { resolveReadonlyArrayThunk } from 'graphql';


const SellerLogin = () =>
{

    const { updateData } = UserAuthFinal();
    const [tab, setTab] = useState("login");

    const [loginForm] = Form.useForm();
    const [signupForm] = Form.useForm();
    const navigate = useNavigate();

    const [signUpUser, signUpData] = useSignupCustomerMutation();
    const [loginUser, loginData] = useLoginCustomerMutation()

    // const [signupuser,{error,data,loading}] =useMutation(graphQLQueries.SIGN_IN_USER,{
    //   onCompleted(data){
    //     auth.authenticate(data.signin.token,()=>{console.log(data.signin.token)});
    //     navigate('/user')
    //   }
    // });



    const handleLogin = values =>
    {
        loginUser(values).then((data) =>
        {
            console.log(data);
            authSeller.authenticate(data?.data.token, () => { console.log(data?.data.token); navigate("/seller") });
        })
    }

    const handleSignup = values =>
    {
        signUpUser(values).then((data) => console.log(data))
    }

    return (
        <>
            <Tabs name={ "login" } tab={ tab }>
                <section style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' } }>
                    <div style={ { width: '40%', padding: '20px', border: '1px solid gray' } }>
                        <Form layout='vertical' form={ loginForm } onFinish={ handleLogin }>
                            <Form.Item name="email" label="Email">
                                <Input />
                            </Form.Item>
                            <Form.Item name="password" label="Password">
                                <Input.Password />
                            </Form.Item>
                            <div style={ { display: 'flex', justifyContent: 'center' } }>
                                <button>Login</button>
                            </div>

                            <div>Don't have an account<p onClick={ () => setTab('signup') }>Sign up</p></div>
                        </Form>
                    </div>
                </section>
            </Tabs>
            <Tabs name="signup" tab={ tab }>
                <section style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' } }>
                    <div style={ { width: '40%', padding: '20px', border: '1px solid gray' } }>
                        <Form layout='vertical' form={ signupForm } onFinish={ handleSignup }>
                            <Form.Item name="name" label="Name">
                                <Input />
                            </Form.Item>
                            <Form.Item name="email" label="Email">
                                <Input />
                            </Form.Item>
                            <Form.Item name="password" label="Password">
                                <Input.Password />
                            </Form.Item>
                            <div style={ { display: 'flex', justifyContent: 'center' } }>
                                <button>SignUp</button>
                            </div>
                            <div>Already have an account  <p onClick={ () => setTab('login') }>Login</p></div>
                        </Form>
                    </div>
                </section>
            </Tabs>


        </>
    )
}

export default SellerLogin