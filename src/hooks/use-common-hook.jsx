import { useDispatch, useSelector } from "react-redux"
import { single_item } from "../redux/slice/user"
import { get_single_item } from "../example/api"
import { Routes } from "../navigation"
import { useNavigation } from "@react-navigation/native"
import { English } from "../utils/en"

const UseCommonHook = () => {

    const dash = useSelector((state)=>state?.user)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    //get single item
    const handleGetSingleItem = (item) =>{
      let payload = {
        merchant: dash?.business_name,
        store: dash?.store_detail?.store_name,
        item_id: item?.item_id
      }

      get_single_item(payload,dash?.headers)
      .then((res)=>{
        dispatch(single_item(res?.data))
        navigation.navigate(Routes.SINGLEFOODITEM)
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    //navigate to single food item details page
    const handleNavigateFoodItemDetails = async(item) =>{
      handleGetSingleItem(item)
    }

  return {
    handleNavigateFoodItemDetails
  }
}

export default UseCommonHook