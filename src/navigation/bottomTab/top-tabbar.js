import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Platform, StyleSheet, View } from 'react-native';
import TipScreen from '../../screens/cart/tip';
import CheckoutDetails from '../../screens/cart/customer-details';
import CartDetails from '../../screens/cart/cart-details';
import PaymentDetails from '../../screens/cart/payment-details';
import { Routes } from '../routes';
import CustomeTabBar from './custome-top-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

export function TopTabbar() {
    const dash = useSelector((state) => state?.user)
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: dash?.base_themes?.layout_color }]} edges={['bottom']}>
            <Tab.Navigator screenOptions={{ swipeEnabled: false }} tabBar={(props) => <CustomeTabBar {...props} />} >
                <Tab.Screen name={Routes.CARTDETAILS} component={CartDetails} />
                <Tab.Screen name={Routes.CUSTOMERDETAILS} component={CheckoutDetails} />
                <Tab.Screen name={Routes.Tip} component={TipScreen} />
                <Tab.Screen name={Routes.PAYMENTDETAILS} component={PaymentDetails} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6'
    },
})