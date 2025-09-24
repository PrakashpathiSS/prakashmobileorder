import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { add_business_schema } from '../utils/schema'
import { useDispatch, useSelector } from 'react-redux'
import { all_categories, all_items, all_menus, all_mods, banner_images, business, business_name, cart_items, category_item, merchant_details, selected_category, selected_menu, setBaseTheme, setMerchantToken, store_detail, store_items, stores } from '../redux/slice/user'
import BusinessOptions from '../components/business-options'
import { Routes } from '../navigation'
import { get_all_items, get_dashmerch_details, get_stores } from '../example/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { color } from '../theme'
import { show_toast } from '../utils/toast/toast'
import { authHeaders } from '../utils/headers'

const UseSelectBusiness = () => {

    const formik = useFormik({
        initialValues: {
            name: ''
        },

        onSubmit: (values) => handleAddBusiness(values),

        validationSchema: add_business_schema(),
    })

    const dash = useSelector((state) => state?.user)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [showModal, setShowModal] = useState(false)
    const [index, setIndex] = useState(null)
    const [everyCategoryItems, setEveryCategoryItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [opendeleteModal, setopendeleteModal] = useState(false)
    const [deleteName, setDeleteName] = useState('')
    //get colors
    // useEffect(() => {
    //     AsyncStorage.getItem('theme_colors')
    //         .then((res) => {
    //             const theme_colors = JSON.parse(res)
    //             color.palette['orangeBtn'] = theme_colors.btn_color
    //             color.palette['mainTextColor'] = theme_colors.body_text_main_color
    //             color.palette['subTextColor'] = theme_colors.body_text_sub_color
    //         })
    //         .catch((err) => {
    //             console.log('async storage color err')
    //         })
    // }, [count])

    //get stores
    const handleGetStores = (name) => {
        setLoading(true)
        let payload = {
            merchant_name: name
        }
        get_stores(payload)
            .then((res) => {
                console.log(res,"-->res");
                
                if (res?.data?.length == 0) {
                    storeerror("No Store found")
                    return
                }
                dispatch(stores(res?.data))
                dispatch(setMerchantToken(res?.data[0]?.token ?? ''))
                dispatch(store_detail(res?.data[0]))
                dispatch(merchant_details(res?.merchant))
                dispatch(cart_items([]))
                handleGetAllItems(name, res?.data[0])
                handleGetMerchantDashDetails(res?.data[0])
            })
            .catch((err) => {
                console.log(err?.response?.data?.message, 'get store err')
                storeerror(err?.response?.data?.message)
            })
    }

    const storeerror = (message) => {
        setLoading(false)
        dispatch(stores(null))
        dispatch(store_detail(null))
        dispatch(merchant_details(null))
        dispatch(category_item(null))
        dispatch(banner_images([]))
        show_toast(message)
    }
    //get merchant dashboard details
    const handleGetMerchantDashDetails = (data) => {
        let payload = {
            store_id: data?._id
        }

        get_dashmerch_details(payload, authHeaders(data?.token))
            .then((res) => {
                if (res?.data?.theme_colors) {
                    dispatch(setBaseTheme({
                        ...dash?.base_themes,
                        ...res?.data?.theme_colors
                    }))
                }
                // AsyncStorage.setItem('theme_colors', JSON.stringify(res?.data?.theme_colors))
                dispatch(banner_images(res?.data?.banner_images ?? []))
                setCount(count + 1)
            })
            .catch((err) => {
                console.log(err?.response?.data, "------------------->");
                dispatch(banner_images([]))
            })
    }

    //get all items
    const handleGetAllItems = (name, data) => {
        let payload = {
            merchant: name,
            store: data?.store_name
        }
        // console.log(payload, 'get all item payload')

        get_all_items(payload, authHeaders(data?.token))
            .then((res) => {
                // console.log(res,'get all items res')
                dispatch(all_menus(res?.data?.all_menus))
                dispatch(all_categories(res?.data?.all_categories))
                dispatch(all_items(res?.data?.all_items))
                dispatch(all_mods(res?.data?.all_mods))

                if (res?.data?.banner?.length) {
                    const baner = res?.data?.banner[0]?.retail_banner?.flatMap((e) => e?.url) || []
                    // AsyncStorage.setItem('banner_images',JSON.stringify(baner))
                    dispatch(banner_images(baner))
                }

                dispatch(selected_menu(0))
                dispatch(selected_category(0))
                setTimeout(() => {
                    setLoading(false)
                    navigation.navigate(Routes.HOME)
                }, 1000);

            })
            .catch((err) => {
                console.log(err, 'get all items err')
                dispatch(all_menus([]))
                dispatch(all_categories([]))
                dispatch(all_items([]))
                dispatch(all_mods([]))
                setLoading(false)
                show_toast(err?.response?.data?.message)
            })
    }

    //back
    const handleBack = () => {
        navigation.goBack()
    }

    //edit business
    const handleEdit = (name, i) => {
        setIndex(i)
        formik.setFieldValue('name', name)
        setShowModal(true)
    }

    //delete business
    const handleDelete = (name) => {
        setDeleteName(name)
        setopendeleteModal(true)
    }

    //select business
    const handleSelectBusiness = (name) => {
        dispatch(business_name(name))
        handleGetStores(name)
    }

    //profile options
    const handleProfileOptions = ({ item, index }) => {
        return (
            <BusinessOptions
                name={item}
                index={index}
                icon={require('../assets/icons/pencelicon.png')}
                icon2={require('../assets/icons/deleteIcon.png')}
                handleIcon={handleEdit}
                handleIcon2={handleDelete}
                onPress={handleSelectBusiness}
            />
        )
    }

    //add business name
    const handleAddBusiness = (values) => {
        if (dash?.business?.includes(values?.name?.trim().replace(/_+/g, ' '))) {
            setIndex(null)
            formik.setFieldValue('name', '')
            setShowModal(false)
            show_toast(`${values?.name} is already in the list.`)
            return
        }
        if (index === null) {
            const updatedBusiness = [...dash?.business, values?.name?.trimEnd()];
            dispatch(business(updatedBusiness));
        } else {
            const updatedBusiness = [...dash?.business];
            updatedBusiness.splice(index, 1, values?.name?.trimEnd())
            dispatch(business(updatedBusiness))
        }
        handleSelectBusiness(values?.name)
        setIndex(null)
        formik.setFieldValue('name', '')
        formik.resetForm()
        setShowModal(false)
    }

    const handleClose = () => {
        setopendeleteModal(false)
    }
    const handleConfirm = () => {
        dispatch(business(dash?.business?.filter((item) => item !== deleteName)))
        setopendeleteModal(false)
    }

    const handleOpenBusinessmodal = () => {
        formik.resetForm()
        setShowModal(true)
    }
    return {
        handleBack,
        handleProfileOptions,
        showModal,
        formik,
        setShowModal,
        dash,
        loading,
        opendeleteModal,
        handleClose,
        handleConfirm,
        handleOpenBusinessmodal

    }
}

export default UseSelectBusiness