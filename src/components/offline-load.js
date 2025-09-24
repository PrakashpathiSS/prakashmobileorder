import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { Image, Platform, Pressable, ToastAndroid, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { all_categories, all_items, all_menus, all_mods, banner_images, cart_items, category_item, merchant_details, selected_category, selected_extras, selected_menu, selected_mod, setBaseTheme, setMercahntToken, setMerchantToken, store_detail, store_items, stores, } from "../redux/slice/user";
import { get_all_items, get_dashmerch_details, get_stores, get_token_order } from "../example/api";
import { color, typography } from "../theme";
import { downloadSplashFile } from "../utils/storage";
import * as ScreenOrientation from 'expo-screen-orientation';
import * as FileSystem from 'expo-file-system'
import { useDeepLinking } from "../hooks/use-deep-linking";
import { show_toast } from "../utils/toast/toast";
import { authHeaders } from "../utils/headers";
import { Vertical } from "../ui-kit/spacer";
import { VideoView } from "expo-video";

export const OfflineLoad = ({ setLoading }) => {
  const dash = useSelector(state => state?.user)
  const dispatch = useDispatch();
  const { business_name, headers } = useSelector(state => state?.user)
  const [count, setCount] = useState(0)
  const intervalId = useRef(null);
  const fileUri = `${FileSystem.cacheDirectory}splash.mp4`
  const [defaultSplash, setdefaultSplash] = useState(false)

  const {
    appcredentials,
    grantUserTracking,
    loader,
    setLoader
  } = useDeepLinking();
  const timer = useRef(null);

  useEffect(() => {
    if (grantUserTracking) {
      setLoader(true)
      if (appcredentials?.merchant_name) {
        handleToken();
        if (timer.current) {
          clearTimeout(timer.current);
        }
      } else {
        if (timer.current) {
          clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
          handleToken();
          // setfirst("Store data retrieval failed. Please check the link.");
        }, 5000);
      }

      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }

  }, [appcredentials, grantUserTracking]);

  useEffect(() => {
    // Lock the orientation to portrait
    if (Platform.OS === 'ios') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  //handle fetch
  const handleFetch = async () => {
    const splashTimer = await AsyncStorage.getItem('splash_timer')

    const fetchData = () => {
      setLoading(false)
    };

    // Set up timeout to call fetchData every 2 seconds
    intervalId.current = setTimeout(fetchData, splashTimer * 1000);

    // Call fetchData immediately on component mount
    // fetchData();

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(intervalId.current);
  }

  //skip button
  const handleSkip = () => {
    if (intervalId.current) {
      clearTimeout(intervalId.current); // Clear the timeout
    }
    // Navigate immediately
    setLoading(false)
  };



  //get stores
  const handleGetStores = async (headers) => {
    let payload = {
      merchant_name: business_name ?? appcredentials?.merchant_name
    }

    await get_stores(payload)
      .then(async (res) => {

        //check if store aldrady selected
        const storeData = res?.data?.find((e) => e?._id === dash?.store_detail?._id);
        const resData = storeData ? storeData : res?.data[0]
        dispatch(stores(res?.data))
        dispatch(setMerchantToken(storeData ? dash?.store_detail?.token : resData?.token))
        dispatch(merchant_details(res?.merchant))
        dispatch(store_detail(resData))

        //api calls
        handleGetMerchantDashDetails(resData)
        handleGetAllItems(resData)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err, 'get store err')
        dispatch(stores(null))
        dispatch(store_detail(null))
        dispatch(merchant_details(null))
        dispatch(store_items(null))
        dispatch(category_item(null))
        // AsyncStorage.setItem('banner_images', JSON.stringify([]))
        dispatch(banner_images([]))
        show_toast(res?.response?.data?.message)
      })
  }

  //get merchant dashboard details
  const handleGetMerchantDashDetails = (data) => {
    let payload = {
      store_id: data?._id
    }

    get_dashmerch_details(payload, authHeaders(data?.token))
      .then(async (res) => {


        await FileSystem.deleteAsync(fileUri, { idempotent: true });
        // console.log(res,'dashmerch details')

        if (res?.data?.theme_colors) {
          dispatch(setBaseTheme({
            ...dash?.base_themes,
            ...res?.data?.theme_colors
          }))
        }
        // await AsyncStorage.setItem('theme_colors', JSON.stringify(res?.data?.theme_colors))

        if (res?.data?.banner_images?.length) {
          // await AsyncStorage.setItem('banner_images', JSON.stringify(res?.data?.banner_images))
          dispatch(banner_images(res?.data?.banner_images))
        }

        await AsyncStorage.setItem('splash_timer', JSON.stringify(res?.data?.splash_timer || 0))

        const fileInfo = await FileSystem.getInfoAsync(fileUri)
        setLoader(false)
        if (res?.data?.splash_image) {
          downloadSplashFile(`${res?.data?.splash_image}?${new Date()}`, data).then((e) => {
            if (e) {
              handleFetch()
              setdefaultSplash(true)
            }
          })

        }
        else if (fileInfo.exists && res?.data?.splash_image === null) {
          setdefaultSplash(false)
          handleFetch()
          await FileSystem.deleteAsync(fileUri, { idempotent: true });
        } else {
          setdefaultSplash(false)
          handleFetch()
        }
        if (res?.data?.theme_colors) {
          dispatch(setBaseTheme({
            ...dash?.base_themes,
            ...res?.data?.theme_colors
          }))
        }
        if (res?.data?.theme_colors) {
          // color.palette['orangeBtn'] = res?.data?.theme_colors?.btn_color
          // color.palette['mainTextColor'] = res?.data?.theme_colors?.body_text_main_color
          // color.palette['subTextColor'] = res?.data?.theme_colors?.body_text_sub_color

        }
        setCount(count + 1)


      })
      .catch((err) => {
        setLoader(false)
        setLoading(false)
        console.log(err, 'dashmerch err')
      })
  }

  //get all items
  const handleGetAllItems = (data) => {
    let payload = {
      merchant: business_name ?? appcredentials?.merchant_name,
      store: data?.store_name
    }

    get_all_items(payload, authHeaders(data?.token))
      .then((res) => {
        // console.log(res?.data, 'get all items')
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
        dispatch(selected_extras([]))
        dispatch(cart_items([]))
        dispatch(selected_mod(null))
      })
      .catch((err) => {
        console.log(err?.response, 'get all items err')
        dispatch(all_menus([]))
        dispatch(all_categories([]))
        dispatch(all_items([]))
        dispatch(all_mods([]))
        dispatch(selected_extras([]))
        dispatch(cart_items([]))
        dispatch(selected_mod(null))
        setLoading(false)
      })
  }

  //get token
  const handleToken = async () => {
    try {
      const res = await get_token_order()
      if (res?.success) {
        const headerData = {
          Accept: "application/json",
          'Content-Type': 'application/json',
          authorization: "Bearer " + `${res?.token}`
        }

        dispatch(setMercahntToken(headerData))
        handleGetStores(headerData)
      }
    } catch (error) {
      console.log(JSON.stringify(error), "-- error token get");

    }
  }

  return (
    <View style={styles.countainer}>
      {defaultSplash ?
        <View style={styles.subcountainer}>
          <Pressable
            style={styles.skiparea}
            onPress={handleSkip}
          >
            <Text style={styles.skiptext}>Skip</Text>
            <Image
              source={require('../assets/icons/right-arrow-icon.png')}
              style={styles.arrow}
              tintColor={'#FFFFFF'}
            />
          </Pressable>
          {
            fileUri ?
              <VideoView
                style={styles.videoarea}
                source={{ uri: fileUri }}
                nativeControls={false}
                resizeMode="cover"
                isLooping
                shouldPlay
                isMuted
                onError={(error) => console.error("Video Error:", error)}
              />
              : null
          }

        </View>

        :
        <View style={styles.orderlogocountainer}>
          {/* <Image source={require('../assets/logo-mobile_order.png')}
            resizeMode="contain"
            style={styles.imagearea} /> */}
          <Vertical size={5} />
          <Text style={styles.logotext}>{business_name || appcredentials?.merchant_name || '+Order'}</Text>
          <Vertical size={5} />
          {
            loader &&
            <ActivityIndicator color={'#6D54CF'} size={"small"} />
          }

        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  countainer: { flex: 1, position: 'relative' },
  subcountainer: {
    flex: 1
  },
  skiparea: {
    position: 'absolute',
    right: 30,
    bottom: Platform.OS == 'ios' ? '5%' : 20,
    zIndex: 1,
    backgroundColor: 'rgba(128,128,128,0.8)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4
  },
  skiptext: {
    fontSize: 12,
    fontFamily: typography.jakarta_medium,
    fontWeight: '500',
    lineHeight: 12 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
    color: '#FFFFFF'
  },
  videoarea: {
    width: '100%',
    height: '100%'
  },
  logotext: {
    fontSize: 30,
    fontFamily: typography.jakarta_medium,
    fontWeight: '500',
    lineHeight: 30 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
    color: '#000',
    textAlign: 'center'
  },
  imagearea: { height: 190, width: 190, borderRadius: 8, },
  orderlogocountainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  arrow: { width: 10, height: 10, resizeMode: 'contain' }
})