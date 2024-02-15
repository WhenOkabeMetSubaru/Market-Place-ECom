import React, { useEffect } from 'react'
import { Form, Input } from 'antd'

import auth from '../../../app/auth/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSignupCustomerMutation } from '../../../../features/store/slices/usersApiSlice';
import { Tabs } from '../../../components/utils/tabs';


const SignUp = () =>
{

  const [loginForm] = Form.useForm();
  // const [signupuser,{error,data,loading}] =useMutation(graphQLQueries.SIGN_UP_USER);
  let [signupUser, signUpData] = useSignupCustomerMutation();
  const navigate = useNavigate();

  useEffect(() =>
  {
    // if(auth.isAuthenticated()!==false){
    //   navigate('/user')
    // }
  }, [])


  const handleLogin = values =>
  {
    console.log(values)
    // signupuser({
    //   variables:{
    //     NewUserInput:values
    //   }
    // })

  }

  return (
    <section style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' } }>
      <Tabs>
        <div style={ { width: '40%', padding: '20px', border: '1px solid gray' } }>
          <Form layout='vertical' form={ loginForm } onFinish={ handleLogin }>
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
            <p>Already have an account<Link to='/login'>Login</Link></p>
          </Form>
        </div>
      </Tabs>
    </section>
  )
}

export default SignUp

