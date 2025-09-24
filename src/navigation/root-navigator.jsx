import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Platform, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { Routes } from "./routes";
import { InsideStack } from "./index";
import StripeHome from "../hooks/stripe/use-stripe";

const Stack = createStackNavigator();

export const RootNavigator = React.forwardRef((props, ref) => {
  const { store_detail } = useSelector((state) => state.user);

  const Wrapper =
    store_detail?.payment_gateway && store_detail.payment_gateway !== "Aurora"
      ? StripeHome
      : React.Fragment;

  return (
    <Wrapper>
      <StatusBar barStyle={Platform.OS == 'ios' ? "dark-content" : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Routes.INSIDE_STACK} component={InsideStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </Wrapper>
  );
});