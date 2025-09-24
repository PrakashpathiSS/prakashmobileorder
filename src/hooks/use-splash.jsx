import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react'
import {Routes} from '../navigation/routes'


const UseSplash = () => {

    const navigation = useNavigation()
    const [spalshFile, setSplashFile] = useState('')
    const intervalId = useRef(null);

    useEffect(()=>{
        AsyncStorage.getItem('splash_image')
        .then((res)=>{
            console.log(res,'splash gif')
            if(!res){
                navigation.navigate(Routes.INSIDE_STACK)
            } else {
                setSplashFile(res)
                handleFetch()
            }
        })
        .catch((err)=>{
            console.log(err,'splash err')
        })
    },[])

    //handle fetch
    const handleFetch = async() =>{
        const splashTimer = await AsyncStorage.getItem('splash_timer')

        const fetchData = () => {
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name:  Routes?.INSIDE_STACK
                        // :
                        // Routes?.OUTSIDE_STACK
                    }
                ]
            })
        };
    
        // Set up timeout to call fetchData every 2 seconds
        intervalId.current = setTimeout(fetchData, splashTimer*1000);
    
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
        navigation.reset({
            index: 0,
            routes: [{ name: Routes.INSIDE_STACK }]
        });
    };

  return {
    spalshFile,
    handleSkip
  }
}

export default UseSplash