import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system'
import { update_splash_status } from '../example/api';

/**
 * Loads a string from storage.
 */
export async function loadString(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Saves a string to storage.
 */
export async function saveString(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it through JSON.parse.
 */
export async function load(key) {
  try {
    const almostThere = await AsyncStorage.getItem(key);
    return JSON.parse(almostThere);
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 */
export async function save(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to remove.
 */
export async function remove(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}

/**
 * Clear async store.
 */
export async function clear() {
  try {
    await AsyncStorage.clear();
  } catch {}
}

//splash change detection
const handleSplashChangeDetection = (data) =>{
  let payload = {
    id: data?.merchant_id
  }
  update_splash_status(payload)
  .then((res)=>{
    console.log(res, 'splash update res')
  })
  .catch((err)=>{
    console.log(err?.response?.message ??err?.response?.data?.message,'splash update err')
  })
}

export const downloadSplashFile = async (splashUri,data) => {
  // console.log(splashUri,'***** splash uri *****')
  try {
    const fileUri = splashUri.includes('.mp4')?
      `${FileSystem.cacheDirectory}splash.mp4`:`${FileSystem.cacheDirectory}splash.gif`

      console.log(fileUri,'file uri')

    // const fileInfo = await FileSystem.getInfoAsync(fileUri);

    // if (!fileInfo.exists) {
      console.log('Downloading splash file...');
     return await FileSystem.downloadAsync(splashUri, fileUri).then((e)=>{
        // handleSplashChangeDetection(data)
        return true
      });
     
    // } else {
    //   console.log('Splash file already exists.');
    //   AsyncStorage.setItem('splash_image',fileUri)
    // }
  } catch (error) {
    console.error('Error downloading splash file:', error);
    return false
  }
};

