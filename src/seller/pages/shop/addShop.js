import React from 'react'
import SellerLayout from '../../layouts/SellerLayout'
import { Form, Input } from 'antd'
import { useAddNewShopBySellerMutation } from '../../../features/store/slices/shopsApiSlice';

const AddShop = () => {

    const [addShopForm] = Form.useForm();

    const [addShop] = useAddNewShopBySellerMutation();

    const handleAddShop = (values)=>{
        addShop(values).then((res)=>{
            console.log(res)
        })
    }

  return (
    <SellerLayout>
       <section>
            <p className='p-3 text-lg font-semibold'>Submit Details</p>
            <div className='m-3'>
                <Form className='w-1/2' layout="vertical" form={addShopForm} requiredMark={false} onFinish={handleAddShop}>
                    <Form.Item label="Shop Name" name="name">
                        <Input/>
                    </Form.Item>
                      <Form.Item label="Contact Number" name="mobile">
                          <Input />
                      </Form.Item>
                      <Form.Item label="Location" name="location">
                          <Input />
                      </Form.Item>
                      <Form.Item label="Address" name="address">
                          <Input.TextArea rows={4} />
                      </Form.Item>
                      <Form.Item label="Description" name="description">
                          <Input.TextArea rows={4} />
                      </Form.Item>
                      <div className='mt-5 flex justify-end items-center'>
                        <button className='bg-orange-600 text-white rounded w-28 h-10'>
                            Create
                        </button>
                      </div>

                </Form>
            </div>
       </section>
    </SellerLayout>
  )
}

export default AddShop