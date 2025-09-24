import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Routes } from '../navigation/routes'
import OrderItemsList from '../components/order-items'

const UseOrderSuccess = () => {

  const dash = useSelector((state) => state?.user)
  const navigation = useNavigation()
  const mapRef = useRef(null);
  const timoutRef = useRef(null)
  const [isMapReady, setIsMapReady] = useState(false);
  useEffect(() => {
    timoutRef.current = setTimeout(() => {
      if (dash?.store_details?.location?.latitude && dash?.store_details?.location?.longitude) {
        const region = {
          latitude: Number(dash?.store_details.location.latitude) || 0,
          longitude: Number(dash?.store_details.location.longitude) || 0,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.0001,
        };
        if (mapRef?.current?.animateToRegion) {
          mapRef.current.animateToRegion(region, 1000);
        }
      }
      clearTimeout(timoutRef.current)
    }, 100);

  }, [isMapReady, dash]);
  //handle cart items ui
  const handleCartItems = ({ item }, i) => {
    return (
      <View key={i}>
        <OrderItemsList
          name={item?.name}
          amount={item?.price}
        />
      </View>
    )
  }

  const handleBacktoHome = () => {
    navigation.navigate(Routes.HOME)
  }

  const handleMapReady = () => {
    setIsMapReady(true);
  };


  return {
    handleCartItems,
    dash,
    handleBacktoHome,
    handleMapReady,
    mapRef
  }
}

export default UseOrderSuccess