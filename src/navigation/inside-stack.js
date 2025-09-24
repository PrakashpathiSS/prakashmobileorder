import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabStack } from './bottomTab/bottom-tabbar';
import { Routes } from './routes';
import OrderSuccess from '../screens/cart/order-success';
import SelectBusiness from '../screens/settings/select-business';
import { About } from '../screens/settings/about';
import { TopTabbar } from './bottomTab/top-tabbar';
import { Platform } from 'react-native';
import Checkout from '../screens/cart/payment-details';

const Stack = createStackNavigator();

export const InsideStack = () => {
  return (
    <Stack.Navigator>
      {/* Home and Settings route to BottomTabStack */}
      <Stack.Screen
        name={Routes.BottomTabStack}
        component={BottomTabStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={Routes.TopTabStack}
        component={TopTabbar}
        options={{ headerShown: false, gestureEnabled: Platform.OS == "ios" ? false : true }}
      />

      {/* checkout */}
      <Stack.Screen
        name={Routes.CHECKOUT}
        component={Checkout}
        options={{ headerShown: false }}
      />

      {/* order success */}
      <Stack.Screen
        name={Routes.ORDERSUCCESS}
        component={OrderSuccess}
        options={{ headerShown: false, gestureEnabled: false }}
      />

      {/* select business */}
      <Stack.Screen
        name={Routes.SELECTBUSINESS}
        component={SelectBusiness}
        options={{ headerShown: false }}
      />

      {/* about */}
      <Stack.Screen
        name={Routes.ABOUT}
        component={About}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
