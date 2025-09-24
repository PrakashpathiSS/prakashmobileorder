import { useEffect,  useState } from 'react'
import HorizontalBestSellingItems from '../components/horizontal-best-selling-items'
import VerticalBestSellingItems from '../components/vertical-best-selling-items'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { cart_items, grid_view, selected_category,selected_menu, selected_mod, single_item } from '../redux/slice/user'


const UseBestSellingItems = () => {
  const dash = useSelector(state=>state?.user)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [showSearch, setShowSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [categoryItems, setCategoryItems] = useState([])
  const [showDownPage, setShowDownPage] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(()=>{
    setCategoryItems(dash?.category_item?.items_data)
  },[dash?.category_item])

  useEffect(()=>{
    setCategoryItems(
      dash?.all_items?.filter((item) => item?.category_id === dash?.all_categories?.filter((item) => dash?.all_menus[dash?.selected_menu]?.categories?.includes(item?._id))[dash?.selected_category]?._id)?.filter(
        (item)=> item?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
      )
    )
  },[searchValue,dash])

  //handle show search
  const handleShowSearch = () =>{
    setSearchValue('')
    setCategoryItems(
      dash?.all_items?.filter(
        (item) => item?.category_id === dash?.all_categories?.filter(
            (item) => dash?.all_menus[dash?.selected_menu]?.categories?.includes(item?._id)
        )[dash?.selected_category]?._id
      )
    )
    setShowSearch(!showSearch)
  }

  //handle horizontal grid
  const handleHorizontalGrid = () =>{
    dispatch(grid_view(!dash?.grid_view))
  }

  //add button
  const handleAddBtn = (item,i) =>{
    dispatch(cart_items([...dash?.cart_items,item]))
  }

  //vertical best selling items
  const handleVerticalBestSellingItems = ({item,index}) =>{
      return (
        <VerticalBestSellingItems
        item={item}
        name={item?.name}
        amount={item?.price}
        image={item?.image}
        handleAddBtn={()=>{handleAddBtn(item,index)}}
        />
      )
  }

  //handle horizontal best selling items
  const handleHorizontalBestSellingItems = ({item,index}) =>{
      return (
        <HorizontalBestSellingItems
        index={index}
        item={item}
        name={item?.name}
        amount={item?.price}
        image={item?.image}
        handleAddBtn={()=>{handleAddBtn(item,index)}}
        />
      )
  }

  //handle back
  const handleBack = () =>{
      navigation.goBack()
  }

  //select category
  const handleSelectCategory = (index) =>{
    dispatch(selected_category(index))
  }

  //select menu
  const handleSelectMenu = (index) =>{
    dispatch(selected_menu(index))
    dispatch(selected_category(0))
  }

  return {
    showSearch,
    handleShowSearch,
    handleHorizontalBestSellingItems,
    handleHorizontalGrid,
    handleVerticalBestSellingItems,
    dash,
    setSearchValue,
    categoryItems,
    setShowDownPage,
    showDownPage,
    handleSelectCategory,
    showMenu,
    setShowMenu,
    handleSelectMenu,
    searchValue
  }
}

export default UseBestSellingItems