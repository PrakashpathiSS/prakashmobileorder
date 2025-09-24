import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { get_stripe_key } from "../../example/api";
import { useSelector } from "react-redux";
const StripeHome = ({ children }) => {
  const [publishableKey, setPublishableKey] = useState("");
  const { merchant_details, store_detail } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPublishableKey = async () => {
      if (
        merchant_details?.merchant_name &&
        store_detail?.store_name &&
        store_detail?.payment_gateway === "Stripe"
      ) {
        try {
          const payload = {
            merchant: merchant_details?.merchant_name,
            store: store_detail?.store_name,
          };
          const { success, data } = await get_stripe_key(payload);

          if (success) {
            return setPublishableKey(data?.stripe_id?.public_secret);
          }
        } catch (error) {
          console.log("Stripe key error", error.response.data.message);
        }
      }
    };

    fetchPublishableKey();
  }, [merchant_details, store_detail]);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.com.positivity.Order" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      {children}
    </StripeProvider>
  );
};

export default StripeHome;

const styles = StyleSheet.create({});
