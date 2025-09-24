import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { gitCommitHashupdate } from './use-git-info';

export const UseAbout = () => {

  const navigation = useNavigation()
  const dash = useSelector((state) => state?.user)

  const detailsObj = {
    'Business Name': dash?.merchant_details?.merchant_name,
    'Store Name': dash?.store_detail?.store_name,
    'Categories': dash?.all_categories?.length,
    'Items': dash?.all_items?.length,
    // 'Build Date': `${gitCommitHashupdate()?.Build_Date}, ${gitCommitHashupdate()?.Build_Time}`,
    'Build Version': `${gitCommitHashupdate()?.Build_Version}.${gitCommitHashupdate()?.git_Branch}-${gitCommitHashupdate().git_Hash}`
  }

  //back
  const handleBack = () => {
    navigation.goBack()
  }

  return {
    handleBack,
    detailsObj,
    dash
  }
}
