import { useEffect } from "react";
import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Routes } from "../routes";
import { color, typography } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { English } from "../../utils/en";
import { category_item } from "../../redux/slice/user";
import RNRestart from 'react-native-restart';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTabBar from "./custom-bottom-bar";
import ItemPage from "../../screens/items/Item-page";
import { TopTabbar } from "./top-tabbar";
import Settings from "../../screens/settings/settings";
import { Home } from "../../screens/home/home-screen";


const BottomTabs = createBottomTabNavigator();

export const BottomTabStack = () => {

  const dispatch = useDispatch()
  const dash = useSelector((state) => state?.user)

  //add even listenerfor  deeplink purpus of app restart if idle
  useEffect(() => {
    Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });
    handleDeepLink()
    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  const handleDeepLink = async (event) => {
    const isRefresh = await AsyncStorage.getItem('refresh')
    if (isRefresh == 'false') {
      await AsyncStorage.setItem('refresh', 'true')
    }
    if (event) {
      const parsedUrl = new URL(event?.url);
      const userid = parsedUrl.searchParams.get('credential');
      if (userid) {
        if (isRefresh == 'true') {
          RNRestart.restart();
        }
      }
    }
  };

  return (
    <BottomTabs.Navigator
      initialRouteName={Routes.HOME}
      screenOptions={{
        tabBarAllowFontScaling: false,
        headerShown: false
      }}
      tabBar={props => <CustomTabBar {...props} dash={dash} />}
    >
      {/* home */}
      <BottomTabs.Screen
        name={Routes.HOME}
        component={Home}
        options={{
          unmountOnBlur: false,
          tabBarInactiveTintColor: color.palette.brown,
          tabBarActiveTintColor: '#6D54CF',
          title: "",
          tabBarIcon: ({ focused }) => (

            <View style={styles.tabView}>
              <View style={styles.icon_div}>
                <Image
                  style={styles.icon_style}
                  source={require('../../assets/icons/home-icon.png')}
                  tintColor={
                    focused ? '#6D54CF' : 'rgba(0,0,0,0.3)'
                  }
                />
              </View>

              <Text
                style={[
                  styles.title,
                  {
                    color: focused
                      ? '#6D54CF'
                      : 'rgba(0,0,0,0.3)',
                  },
                ]}
              >
                {English.bottom_tab_screen.option_1}
              </Text>
            </View>

          ),
        }}
      />

      {/* category items */}
      <BottomTabs.Screen
        name={Routes.BESTSELLINGITEMS}
        component={ItemPage}
        options={{
          unmountOnBlur: true,
          tabBarInactiveTintColor: color.palette.brown,
          tabBarActiveTintColor: '#6D54CF',
          title: "",
          tabBarIcon: ({ focused }) => (

            <View style={styles.tabView}>
              <View style={styles.icon_div}>
                <Image
                  style={styles.icon_style}
                  source={require('../../assets/icons/items-icon.png')}
                  tintColor={
                    focused ? '#6D54CF' : 'rgba(0,0,0,0.3)'
                  }
                />
              </View>

              <Text
                style={[
                  styles.title,
                  {
                    color: focused
                      ? '#6D54CF'
                      : 'rgba(0,0,0,0.3)',
                  },
                ]}
              >
                {English.bottom_tab_screen.option_2}
              </Text>
            </View>

          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={() => {
                if (!dash?.category_item?.items_data?.length) {
                  dispatch(category_item(dash?.store_items?.all_items[0]))
                }

                props.onPress()
              }}
            >
            </Pressable>
          )
        }}
      />

      {/* cart */}
      <BottomTabs.Screen
        name={Routes.CART}
        component={TopTabbar}
        options={{
          unmountOnBlur: true,
          tabBarInactiveTintColor: color.palette.brown,
          tabBarActiveTintColor: '#6D54CF',
          title: "",
          tabBarIcon: ({ focused }) => (

            <View style={styles.tabView}>
              <View style={styles.icon_div}>
                <Image
                  style={styles.icon_style}
                  source={require('../../assets/icons/cart-icon.png')}
                  tintColor={
                    focused ? '#6D54CF' : 'rgba(0,0,0,0.3)'
                  }
                />
                {dash?.cart_items?.length ?
                  <Text style={[styles.cart_number_text_style, { backgroundColor: '#6D54CF' }]}>
                    {dash?.cart_items?.length}
                  </Text>
                  : null
                }
              </View>

              <Text
                style={[
                  styles.title,
                  {
                    color: focused
                      ? '#6D54CF'
                      : 'rgba(0,0,0,0.3)',
                  },
                ]}
              >
                {English.bottom_tab_screen.option_3}
              </Text>
            </View>

          ),
        }}
      />
      
      {/* profile */}
      <BottomTabs.Screen
        name={Routes.SETTINGS}
        component={Settings}
        options={{
          unmountOnBlur: true,
          tabBarInactiveTintColor: color.palette.brown,
          tabBarActiveTintColor: '#6D54CF',
          title: "",
          tabBarIcon: ({ focused }) => (

            <View style={styles.tabView}>
              <View style={styles.icon_div}>
                <Image
                  style={styles.icon_style}
                  source={require('../../assets/icons/settings-icon.png')}
                  tintColor={
                    focused ? '#6D54CF' : 'rgba(0,0,0,0.3)'
                  }
                />
              </View>

              <Text
                style={[
                  styles.title,
                  {
                    color: focused
                      ? '#6D54CF'
                      : 'rgba(0,0,0,0.3)',
                  },
                ]}
              >
                {English.bottom_tab_screen.option_4}
              </Text>
            </View>

          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: typography.primary,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
    marginTop: 2,
  },
  tabView: {
    marginTop: 13,
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },

  icon_div: {
    height: 25,
    width: 25,
  },

  icon_style: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },

  badgeContainer: {
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: '#ff0000',
    position: "absolute",
    left: 15,
    top: -10,
    height: 20,
    width: 20,
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: '#FFFFFF',
    fontFamily: typography.primary,
    fontSize: 10,
    textAlign: "center",
  },

  cart_number_text_style: {
    fontSize: 7.78,
    backgroundColor: '#E77D74',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 300,
    fontWeight: '600',
    position: 'absolute',
    left: 20,
    top: -5
  },

  plusOneTextStyle: {
    position: "absolute",
    top: -10,
    left: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: '#6D54CF'
  }
});