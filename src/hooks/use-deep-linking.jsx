import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { business, business_name, store_detail } from '../redux/slice/user';
import { get_deferred_data, update_deferred_data } from '../example/api';
export const useDeepLinking = () => {

  const dispatch = useDispatch()
  const { appcredentials } = useSelector(state => state?.user)
  const dash = useSelector(state => state?.user)
  const [grantUserTracking, setGrantUserTracking] = useState(false)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    getDeferredData()
  }, [])

  const getIp = async () => {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data?.ip
  }

  const getDeferredData = async () => {
    try {
      const ip = await getIp()
      const payload = {
        ip_address: `${ip}`,
      };
     
      const res = await get_deferred_data(payload)
    
      if (res) {
        await AsyncStorage.setItem('refresh', 'false')
        const buisness = res?.data?.merchant_name
        const isupdate = res?.data?.isupdate
        if (buisness !== "" && isupdate) {
          //clear prv selected store data for new update
          dispatch(store_detail(null))
          
          updateData(buisness, ip)
        } else {
          setGrantUserTracking(true)
        }

      }

    } catch (error) {
      setGrantUserTracking(true)
      console.log(error?.response || error.message, "-->");
    }
  };

  const updateData = async (val, ip) => {
    const credential = {
      merchant_name: val
    }

    dispatch(business_name(credential?.merchant_name))

    const updatedBusiness = [...dash?.business, credential?.merchant_name];


    const isAlreadyThere = dash?.business?.includes(credential?.merchant_name?.trim());

    if (isAlreadyThere) {
      dispatch(business([...dash.business]));
    } else {
      dispatch(business(updatedBusiness));
    }

    await AsyncStorage.setItem('authCred', `${credential?.merchant_name}`)

    //update if app opend
    if (ip !== "") {
      await reupdateDeferredData(ip)
    }
    setGrantUserTracking(true)
  }

  const reupdateDeferredData = async (ip) => {
    try {

      const res = await update_deferred_data({
        "ip_address": `${ip}`,
        "isupdate": false
      })
      if (res) {
        console.log(res?.data, "-d->");

      }
    } catch (error) {

      console.log(error?.response),'------------------------->?';
    }
  }

  return {
    appcredentials,
    grantUserTracking,
    loader,
    setLoader
  }
};