import Toast from 'react-native-simple-toast';

export const show_toast = (msg) =>(
    Toast.show(`${msg}`,Toast.SHORT)
)