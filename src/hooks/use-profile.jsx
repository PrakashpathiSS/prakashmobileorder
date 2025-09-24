import React from 'react'
import ProfileOptions from '../components/profile-options'
import { useNavigation } from '@react-navigation/native'
import { Routes } from '../navigation'
import { useSelector } from 'react-redux'
import { English } from '../utils/en'

const UseProfile = () => {

    const dash = useSelector(state=>state?.user)
    const navigation = useNavigation()

    const profileOptions = [
        {
            icon: require('../assets/icons/select-business-icon.png'),
            name: English.profile.options.option_10,
            width: 24,
            height:24,
            onPress: () => {
                navigation.navigate(Routes.SELECTBUSINESS)
            }
        },
        // {
        //     icon: require('../assets/icons/privacy-policy-icon.png'),
        //     name: English.profile.options.option_5,
        //     width: 24,
        //     height: 24,
        //     onPress: () => {}
        // },
        // {
        //     icon: require('../assets/icons/terms-and-condition-icon.png'),
        //     name: English.profile.options.option_6,
        //     width: 24,
        //     height: 24,
        //     onPress: () => {}
        // },
        {
            icon: require('../assets/icons/about-icon.png'),
            name: English.profile.options.option_11,
            width: 24,
            height: 24,
            onPress: () => {
                navigation.navigate(Routes.ABOUT)
            }
        },
    ]

    //profile options
    const handleProfileOptions = ({item,index}) =>{
        return (
            <ProfileOptions
            icon={item?.icon}
            name={item?.name}
            width={item?.width}
            height={item?.height}
            onPress={item?.onPress}
            index={index}
            profileOptions={profileOptions}
            dash={dash}
            />
        ) 
    }

  return {
    profileOptions,
    handleProfileOptions,
    dash
  }
}

export default UseProfile