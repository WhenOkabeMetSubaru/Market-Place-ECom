import { Dropdown, Select, Table, Tooltip, Modal, Form, Input,notification } from 'antd';
import React, { Fragment, useEffect, useReducer } from 'react'
import AdminLayout from '../../layouts/AdminLayout';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'
import { useGetAllProductsQuery } from '../../../features/store/slices/productsApiSlice'
import { useSelector } from 'react-redux';
import { AdminAuthFinal } from '../../contextapi/AdminContext';
import { useNavigate } from 'react-router'
import { ImageUploadComponent, imageUpload } from '../../../features/image/imageUpload';
import { useAddNewCategoryAdminMutation, useDeleteCategoryByIDMutation, useGetAllCategoriesQuery, useGetAllPrimaryCategoriesQuery } from '../../../features/store/slices/categoryApiSlice';


const CategoryAdmin = () =>
{

    const { currentUser } = AdminAuthFinal();
    const navigate = useNavigate();

    const [addCategoryForm] = Form.useForm();
    const [editCategoryForm] = Form.useForm();


    const categoryData = useGetAllCategoriesQuery();
    const primaryCategoryData = useGetAllPrimaryCategoriesQuery()

    const [addNewCategoryAdmin] = useAddNewCategoryAdminMutation();
    const [deleteCategory]  = useDeleteCategoryByIDMutation()



    //state
    let initialState = {
        current: 1,
        pageSize: 10,
        status: '',
        shop: '',
        seller: '',
        total: categoryData?.data?.data?.length,
        openAddModal: false,
        category_type: "primary"

    }
    const [categoryState, setCategoryState] = useReducer(categoryReducer, initialState);

    let { current, pageSize, total, shop, status, seller, openAddModal, category_type } = categoryState;

    useEffect(() =>
    {
        console.log("easy", primaryCategoryData)
    }, [shop, status])




    const handleEditClick = (product) =>
    {

    }

    const columns = [
        { title: 'S.No', dataIndex: 'key' },
        {title:"Image",render:(category)=>{
            return (
                <img src={category?.image || ""} className='w-10 h-10 rounded' alt="img"/>
            )
        }},
        { title: 'Name', dataIndex: 'name' },
        { title: 'Type', dataIndex: 'category_type' },
        { title: 'Created On', dataIndex: 'created' },
        {
            title: 'Alter',
            render: (category) =>
            {
                const handleEdit = () =>
                {
                    handleEditClick(category);
                }
                return (
                    <div className='flex gap-x-2'>
                        <Tooltip placement='' title="Edit Product">
                            <div><AiOutlineEdit /></div>
                        </Tooltip>
                        <Tooltip placement='' title="Delete Product">
                            <div><AiFillDelete onClick={()=>{
                                deleteCategory({categoryId:category._id}).then((res)=>{
                                    categoryData.refetch()
                                    notification.success({message:"Deleted Successfully",placement:"bottomRight"})
                                    
                                })
                            }} color="red" /></div>
                        </Tooltip>
                    </div>

                )
            }


        }
    ]

    const handlePagination = ({ current, pageSize }) =>
    {
        setCategoryState({ type: 'PAGE_SIZE_CHANGE', payload: { current, pageSize } });
    }

    const handleShopChange = e =>
    {

        setCategoryState({ type: 'SET_SHOP_ID', payload: e });


    }

    const handleCategoryAdd = async (values) =>
    {
        let img = "";
        if(values.image[0]){
            let { originFileObj } = values.image[0];
            let response = await imageUpload(originFileObj);
            img = response.url;
        }

        values.image = img || "";
      

        addNewCategoryAdmin(values).then((res) =>
        {
            addCategoryForm.resetFields();
            setCategoryState({ type: "CHANGE_ADD_MODAL_STATUS", payload: false })
            categoryData.refetch()
        })

    }

    return (
        <AdminLayout>
            <div className='mt-6 flex space-x-5 justify-end mx-10'>
                <Select onChange={ handleShopChange } className='w-[150px]' placeholder="Enter Shop ID">
                    <Select.Option value='123'></Select.Option>
                    <Select.Option value='45'></Select.Option>
                </Select>
                <button onClick={ () => { setCategoryState({ type: "CHANGE_ADD_MODAL_STATUS", payload: true }) } } className='w-24 h-8 bg-orange-600 text-white flex justify-center items-center rounded shadow'>
                    <p>Add New</p>
                </button>

            </div>
            <section className='w-11/12 mx-10 mt-6'>
                <Table columns={ columns }
                    className="border border-b-gray-100"
                    onChange={ handlePagination }
                    pagination={ { current, pageSize, total } }
                    loading={ categoryData.isLoading }
                    dataSource={
                        categoryData?.data?.data?.map((category, index) =>
                        {
                            return {
                                key: index + 1,
                                ...category
                            }
                        })
                    } />
            </section>

            <Modal footer={ false } title={ "Add a Category" } open={ openAddModal == true } onCancel={ () => { setCategoryState({ type: "CHANGE_ADD_MODAL_STATUS", payload: false }) } }>
                <Form autoComplete={ "off" } form={ addCategoryForm } onFinish={ handleCategoryAdd } layout='vertical' requiredMark={ false }>
                    <Form.Item name="name" label="Category Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="category_type" label="Category Type">
                        <Select onChange={ (value) => { setCategoryState({ type: "SET_CATEGORY_TYPE", payload: value }) } }>
                            <Select.Option key={ 0 } value="primary">Primary</Select.Option>
                            <Select.Option key={ 1 } value="secondary">Secondary</Select.Option>
                        </Select>
                    </Form.Item>
                    <ImageUploadComponent name={ "image" } max="1" />
                    {
                        category_type == "secondary" && <Form.Item name="parent_category" label="Parent Category">
                            <Select onChange={ (value) => { setCategoryState({ type: "SET_PARENT_CATEGORY", payload: value }) } }>
                                <Select.Option key={ 0 } value={ "" }>None</Select.Option>
                                {
                                    primaryCategoryData?.data?.data?.map((item) =>
                                    {
                                        return (<Select.Option key={ item._id } value={ item?._id }>{ item?.name }</Select.Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>
                    }
                    <button className='w-full mt-5 h-10 bg-orange-500 text-white flex justify-center items-center rounded shadow'>
                        <p>Add</p>
                    </button>
                </Form>
            </Modal>


        </AdminLayout>
    )
}

export default CategoryAdmin;

const categoryReducer = (state, action) =>
{
    switch (action.type)
    {
        case 'PAGE_SIZE_CHANGE':
            return {
                ...state,
                current: action.payload.current,
                pageSize: action.payload.pageSize
            }
        case 'CHANGE_ADD_MODAL_STATUS':
            return {
                ...state,
                openAddModal: action.payload
            }
        case 'SET_SHOP_ID':
            return {
                ...state,
                shop: action.payload
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.payload
            }
        case 'SET_SELLER_ID':
            return {
                ...state,
                seller: action.payload
            }
        case 'SET_CATEGORY_TYPE':
            return {
                ...state,
                category_type: action.payload
            }
        default:
            return state;
    }
}

