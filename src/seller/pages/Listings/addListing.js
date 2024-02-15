import React from 'react'
import SellerLayout from '../../layouts/SellerLayout'
import { Form, Input } from 'antd'
import { SellerAuthFinal } from '../../app/providers/SellerContext';
import { useAddNewShopBySellerMutation } from '../../../features/store/slices/shopsApiSlice';
import { useAddNewListingBySellerMutation } from '../../../features/store/slices/productsApiSlice';
import {imageUploadMultiple,ImageUploadComponent} from '../../../features/image/imageUpload'
import { AiOutlineMinusCircle } from 'react-icons/ai';


const AddListing = () =>
{

    const [addProductForm] = Form.useForm();
    const { currentShop } = SellerAuthFinal()

    const [addProduct] = useAddNewListingBySellerMutation()

    const handleAddProduct = async (values) =>
    {



        let productImages = [];

        for (let i = 0; i < values.images.length; i++)
        {

            let { originFileObj } = values.images[i]
            productImages.push(originFileObj);
        }

        let imgData = await imageUploadMultiple(productImages);
        values.images = imgData.data;
        values.quantity = +values.quantity;
        addProduct({ productDetails: values, shopId: currentShop._id }).then((res) =>
        {
            console.log(res)
        })
    }

    const filter = (value) => +value;

    return (
        <SellerLayout>
            <section>
                <Form layout='vertical' requiredMark={ false } form={ addProductForm } onFinish={ handleAddProduct }>
                    <div className='flex justify-between items-center mx-5 mt-4'>
                        <p className='text-2xl font-semibold'>Add Product</p>
                        <button className='w-[130px] font-semibold cursor-pointer h-[38px] rounded-md shadow text-white bg-gradient-to-l from-orange-400 to-orange-600'>
                            Finish
                        </button>
                    </div>
                    <div className='mx-5 w-1/3'>
                        <Form.Item name="name" label="Product Name" >
                            <Input placeholder="Enter Product Name" />
                        </Form.Item>
                        <ImageUploadComponent name={ ["images"] } max="10" />
                        <Form.Item normalize={ filter } name="mrp" label="MRP">
                            <Input placeholder='Enter MRP' />
                        </Form.Item>
                        <Form.Item normalize={ filter } name="sellingprice" label="Selling Price">
                            <Input placeholder='Enter Selling Price' />
                        </Form.Item>
                        <Form.Item name="category" label="Category">
                            <Input placeholder='Enter Category' />
                        </Form.Item>
                        <Form.Item normalize={ filter } name="quantity" label="Quantity">
                            <Input placeholder='Enter Quantity' />
                        </Form.Item>
                        <Form.Item name="weight" label="Weight">
                            <Input placeholder='Enter Product Weight' />
                        </Form.Item>
                        <Form.Item name="Unit" label="Unit">
                            <Input placeholder='Enter Item Units' />
                        </Form.Item>
                        <Form.Item name="color" label="Product Color">
                            <Input placeholder='Enter Product Color' />
                        </Form.Item>
                        <Form.Item name="description" label="Product Description">
                            <Input.TextArea rows={ 3 } placeholder='Enter Details' />
                        </Form.Item>
                        {/* <Form.Item name="discount" label="Discount">
                            <Input placeholder='Enter Discount' value={addForm.getFieldValue('mrp') / addForm.getFieldValue('sellingprice')} />
                        </Form.Item> */}
                        <Form.Item name="countryoforigin" label="Country of Origin">
                            <Input placeholder='Enter Country' />
                        </Form.Item>
                        <Form.Item name="manufacture" label="Manufacture">
                            <Input.TextArea rows={ 3 } placeholder='Enter Manufacture Details' />
                        </Form.Item>
                        <Form.Item name="model" label="Product Model">
                            <Input placeholder='Enter Product Model' />
                        </Form.Item>

                        <Form.List
                            name="features"
                            initialValue={ [
                                "Feature 1",

                            ] }
                        >
                            { (fields, { add, remove }, { errors }) => (
                                <>
                                    { fields.map((field, index) => (
                                        <Form.Item
                                            initialValue={ 1 }
                                            label={ index === 0 ? 'Features' : '' }
                                            required={ false }
                                            key={ field.key }
                                            className="relative"
                                        >
                                            <Form.Item
                                                { ...field }
                                                validateTrigger={ ['onChange', 'onBlur'] }
                                                rules={ [
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input Features or  delete this field.",
                                                    },
                                                ] }
                                                noStyle
                                            >
                                                <Input
                                                    placeholder="Features"
                                                    style={ {
                                                        width: '60%',
                                                    } }
                                                />
                                            </Form.Item>
                                            { fields.length > 1 ? (
                                                <AiOutlineMinusCircle
                                                    size={ 25 }
                                                    className="absolute left-[70%] top-[10%] cursor-pointer"
                                                    onClick={ () => remove(field.name) }
                                                />
                                            ) : null }
                                        </Form.Item>
                                    )) }
                                    <Form.Item>
                                        <button onClick={ () => add() } className='px-5 py-2 text-white rounded shadow bg-gradient-to-l from-orange-400 to-orange-600'>
                                            Add More Features
                                        </button>

                                        <Form.ErrorList errors={ errors } />
                                    </Form.Item>
                                </>
                            ) }
                        </Form.List>
                        <Form.Item name="brand" label="Product Brand">
                            <Input placeholder='Enter Product Brand' />
                        </Form.Item>
                        <Form.Item name="yearofrelease" label="Product Year of Release">
                            <Input placeholder='Enter Product Year of Release' />
                        </Form.Item>
                        <Form.Item name="warranty" label="Product Warranty">
                            <Input placeholder='Enter Product Warranty' />
                        </Form.Item>


                    </div>
                </Form>
            </section>
        </SellerLayout>
    )
}

export default AddListing