import React, { useState } from 'react'
import SellerLayout from '../../layouts/SellerLayout'
import { Form, Input, Select,Space } from 'antd'
import { SellerAuthFinal } from '../../app/providers/SellerContext';
import { useAddNewShopBySellerMutation } from '../../../features/store/slices/shopsApiSlice';
import { useAddNewListingBySellerMutation } from '../../../features/store/slices/productsApiSlice';
import { imageUploadMultiple, ImageUploadComponent } from '../../../features/image/imageUpload'
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import { useGetAllPrimaryCategoriesQuery, useLazyGetAllSecondaryCategoriesQuery, useLazyGetPrimaryToSubCategoriesQuery } from '../../../features/store/slices/categoryApiSlice';


const AddListing = () =>
{

    const [addProductForm] = Form.useForm();
    const { currentShop } = SellerAuthFinal()

    const [addProduct] = useAddNewListingBySellerMutation();

    const getAllPrimaryCategories = useGetAllPrimaryCategoriesQuery();
    const [getAllSecondaryCategories, secondaryCategoryData] = useLazyGetPrimaryToSubCategoriesQuery()


    const [pCategory, setPCategory] = useState('');
    const [sCategory, setSCategory] = useState("")

    const handleAddProduct = async (values) =>
    {


        let productImages = [];

        for (let i = 0; i < values.images.length; i++)
        {

            let { originFileObj } = values.images[i]
            productImages.push(originFileObj);
        }

        let imgData = await imageUploadMultiple(productImages);
        values.images = imgData;
        values.quantity = +values.quantity;

        console.log(currentShop)
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
                    <div className='mx-5 w-5/12'>
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
                        <Form.Item name="primary_category" label="Primary Category">
                            <Select value={ pCategory } onChange={ (value) =>
                            {
                                setPCategory(value);
                                getAllSecondaryCategories({ categoryId: value })
                            } }>
                                {
                                    getAllPrimaryCategories?.data?.data?.map((item, i) =>
                                    {
                                        return <Select.Option key={ i } value={ item?._id }>{ item?.name }</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        {
                            pCategory && <Form.Item name="secondary_category" label="Sub Category">
                                <Select value={ sCategory } onChange={ (value) =>
                                {
                                    setSCategory(value);

                                } }>
                                    {
                                        secondaryCategoryData?.data?.data?.map((item, i) =>
                                        {
                                            return <Select.Option key={ item._id } value={ item?._id }>{ item?.name }</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        }
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



                        <Form.List  name="specifications">
                            { (fields, { add, remove }) => (
                                <>
                                    { fields.map(({ key, name, ...restField }) => (
                                        <Space key={ key } style={ { display: "flex", marginBottom: 8 } } align={ "center" }>
                                            <Form.Item className='w-[180px]' label="Title" { ...restField } name={ [name, "name"] } >
                                                <Input placeholder="Title" />
                                            </Form.Item>
                                            <Form.Item className='w-[350px]' label="Details" { ...restField } name={ [name, "info"] } >
                                                <Input.TextArea rows={ 4 } placeholder="Details" />
                                            </Form.Item>
                                           

                                            {/* <Form.Item className='w-[100px]' label="Amount" {...restField} name={[name, "total"]} >
                                                                <Input onChange={(e) => handleAmountChange(e, key)} value={amountCalculate.main_amount[key]} placeholder="Amount" />
                                                            </Form.Item> */}
                                            <AiOutlineMinusCircle size={ 20 } color="red" onClick={ () => { remove(name); } } className={ `mt-3 cursor-pointer ${key == 0 ? 'hidden' : ''}` } />
                                        </Space>
                                    )) }
                                    <Form.Item>
                                        <button className='py-1 px-3 bg-purple-500 text-white rounded' type="dashed" onClick={ () => add() } icon={ <AiOutlinePlus /> }>
                                            Add field
                                        </button>
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