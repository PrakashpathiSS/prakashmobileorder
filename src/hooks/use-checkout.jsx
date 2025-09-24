import { useFormik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_order, redemPos, stripe_payment_status } from "../example/api";
import {
  cart_items,
  order_success_res,
  setDisableBackNavigation,
  setIsexpandSummary,
  setOrderResponce,
  setPaymentDetails,
  setTipAmount,
} from "../redux/slice/user";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Routes } from "../navigation/routes";
import {
  confirm_order_schema,
  confirm_order_stripe_schema,
} from "../utils/schema";
import moment from "moment";
import { NetworkInfo } from "react-native-network-info";
import { show_toast } from "../utils/toast/toast";
import { authHeaders } from "../utils/headers";
import { useStripe, usePlatformPay } from "@stripe/stripe-react-native";
import { color } from "../theme";
import useCustomerDetailsHook from "./use-customer-details-hook";

const UseCheckout = (type, onPaymentSuccess) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dash = useSelector((state) => state?.user);
  const { store_detail, paymentMethod, orderResponce, disableBackNavigation } =
    useSelector((state) => state?.user);
  const { initPaymentSheet, presentPaymentSheet, retrievePaymentIntent } =
    useStripe();

  const { isPlatformPaySupported, confirmPlatformPayPayment } =
    usePlatformPay();

  // setTipAmount
  const [loading, setLoading] = useState(false);
  const [changeCustomTip, setChangeCustomTip] = useState();
  const [changeTip, setChangeTip] = useState();
  const [tipsSelected, setTipsSelected] = useState(3);
  const [selectedPercentage, setSelectedPercentage] = useState(0);
  const [successResponse, setSuccessResponse] = useState(null);
  const [successModalMobile, setSuccessModalMobile] = useState(false);
  const [stripeLoding, setStripeLoding] = useState(false);
  const [tipInputselect, setTipInputselect] = useState(true);
  const [serviceCustomerDetails, setServiceCustomerDetails] = useState(false);

  const [openRedemPopupModal, setOpenRedemPopupModal] = useState(false);
  const [redemPopupLoder, setredemPopupLoder] = useState(false);
  const bottomSheetRef = useRef(null);

  // Refs for the text fields
  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const mailRef = useRef(null);
  const phnNumRef = useRef(null);
  const cardNumRef = useRef(null);
  const expiryDateRef = useRef(null);
  const securityCodeRef = useRef(null);

  // useEffect(() => {
  //   if (
  //     store_detail.payment_gateway &&
  //     store_detail.payment_gateway === "Stripe"
  //   ) {
  //     initializePaymentSheet();
  //   }
  // }, []);

  useFocusEffect(
    useCallback(() => {
      if (paymentMethod == "Pay later") {
        dispatch(setTipAmount(0.0));
        setChangeCustomTip();
        setChangeTip();
        setTipsSelected();
        setTipInputselect(false);
      }
    }, [paymentMethod])
  );

  useEffect(() => {
    dispatch(
      setTipAmount(
        changeTip ? changeTip : changeCustomTip ? changeCustomTip : 0.0
      )
    );
  }, [changeTip, changeCustomTip]);

  useEffect(() => {
    if (stripeLoding == true || loading == true) {
      dispatch(setDisableBackNavigation(true));
    } else {
      dispatch(setDisableBackNavigation(false));
    }
  }, [loading, stripeLoding]);

  const initializePaymentSheet = async ({
    paymentIntent,
    ephemeralKey,
    customer,
  }) => {
    try {
      if (!paymentIntent || !ephemeralKey || !customer) {
        console.error("Missing payment details");
        return;
      }

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent, // This must be for USD
        allowsDelayedPaymentMethods: false,
        merchantCountryCode: "US", // <-- Set to "US" for USD
        applePay: {
          merchantCountryCode: "US",
          merchantDisplayName: "Example, Inc.",
        },
        googlePay: {
          merchantCountryCode: "US",
          merchantDisplayName: "Example, Inc.",
          testEnv: true, // true for testing
        },
        style: "automatic",
      });

      if (error) {
        console.error("Payment sheet error:", error.message);
        return;
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
    }
  };

  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        console.log("Payment error:", error?.message,error);
        const payload = {
          data: error ||"",
          statusCode: 500,
        };
        setSuccessResponse(payload);
        setSuccessModalMobile(true);
        setStripeLoding(false);
        return false;
      }

      return true;
    } catch (error) {
      console.log("Payment error:", error);
      return false;
    }
  };

  const getPaymentDetails = async ({ clientSecret }) => {
    try {
      if (!clientSecret) {
        console.log("No payment intent client secret available");
        return;
      }

      const { paymentIntent, error } = await retrievePaymentIntent(
        clientSecret
      );

      if (error) {
        console.log("Error retrieving payment intent:", error);
        return;
      } else {
        console.log("Raw payment intent:", paymentIntent);

        return paymentIntent;
      }
    } catch (error) {
      console.log("Error retrieving payment details:", error);
      return null;
    }
  };

  const validation = () => {
    if (
      store_detail?.payment_gateway === "Aurora" ||
      store_detail?.payment_gateway === undefined
    ) {
      return {
        name: "",
        lastname: "",
        mail: "",
        phnNum: "",
        cardNum: "",
        expiryDate: "",
        securityCode: "",
      };
    } else {
      return {
        name: "",
        lastname: "",
        mail: "",
        phnNum: "",
      };
    }
  };

  const formik = useFormik({
    initialValues: validation(),
    onSubmit: (values) => handleConfirmOrder(values),
    validationSchema:
      store_detail?.payment_gateway === "Aurora" ||
      store_detail?.payment_gateway === undefined
        ? confirm_order_schema(type, paymentMethod)
        : confirm_order_stripe_schema(),
  });

  useEffect(() => {
    calculateTotal();
  }, [dash?.tipAmount]);

  //calculate sub total
  const calculateSubtotal = () => {
    // Handle case where dash or cart_items is missing
    if (!dash?.cart_items) return "0.00";

    const subtotal = dash.cart_items.reduce((sum, item) => {
      // Handle missing item.price
      const itemPrice = Number(item?.price) || 0;

      // Calculate extras total
      const extrasTotal =
        item?.extras?.reduce((total, curr) => {
          return Number(total) + Number(curr?.price || 0);
        }, 0) || 0;

      return sum + itemPrice + extrasTotal;
    }, 0);

    // Return as fixed decimal string
    return subtotal.toFixed(2);
  };
  // console.log(JSON.stringify(dash,"--->"));

  //calculate tax
  const calculateTax = (subtotal = 0) => {
    return (subtotal * ((dash?.store_detail?.tax || 0) / 100)).toFixed(2);
  };

  //calculate total
  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal()).toFixed(2);
    const tax = parseFloat(calculateTax(subtotal)).toFixed(2);
    const tip = 0.0;
    // console.log(subtotal,tax,dash?.tipAmount,"------>+",dash?.tipAmount);
    return parseFloat(
      parseFloat(subtotal) + parseFloat(tax) + parseFloat(dash?.tipAmount)
    ).toFixed(2);
  };

  //back
  const handleBack = () => {
    navigation.goBack();
  };

  const paymentCartChanges = (cart) => {
    var itemarr = [];
    //notes data
    const regularData = (item, isServiceMode) => {
      const extras = item?.extras?.map((e) => {
        return {
          ...e,
          quantity: item?.count || 0,
          isService: !!isServiceMode,
        };
      });
      //extra items
      itemarr?.push({
        ...item,
        quantity: item?.count || 0,
        extras,
        isService: !!isServiceMode,
      });
    };

    cart?.forEach((item) => {
      const processFn = regularData;
      if (dash?.store_detail?.store_type == "Service") {
        processFn(item, true);
        return;
      }
      const count = item?.count && item?.count > 1 ? item?.count : 1;
      for (let i = 0; i < count; i++) {
        processFn(item);
      }
    });

    return {
      itemarr: itemarr,
    };
  };

  //confirm order button
  const handleConfirmOrder = async (values) => {
    if (dash?.store_detail?.store_type !== "Service") {
      if (type == "customerDetails") {
        dispatch(
          setPaymentDetails({
            name: `${values?.name || ""} ${values?.lastname || ""}`?.trim(),
            mail: values?.mail,
            phnNum: values?.phnNum?.replace(/-/g, ""),
          })
        );
        navigation.navigate(Routes.Tip);
        bottomSheetRef.current?.collapse();
        dispatch(setIsexpandSummary(false));
        return;
      }
    }

    const { itemarr } = paymentCartChanges(dash?.cart_items);
    console.log(JSON.stringify(itemarr), "-->");

    let payload = {
      balance_amount: "00.00",
      coupon_code: "",
      manager_discount: "0.00",
      order_date: moment().format("YYYY-MM-DD"),
      order_time: moment().format("hh:mm A"),
      order_seconds: moment().format("ss"),
      store_name: dash?.store_detail?.store_name,
      merchant_name: dash?.business_name,
      store_id: dash?.store_detail?._id,
      merchant_id: dash?.store_detail?.merchant_id,
      discount: "0.00",
      order_data: itemarr?.map((item) => ({
        item_id: item?.item_id,
        name: item?.name,
        price:
          (item?.quantity == 1 || item?.isService)
            ? Number(
                Number(item?.price) +
                  item?.extras?.reduce(
                    (total, curr) => total + Number(curr?.price),
                    0
                  )
              ).toFixed(2)
            : Number(
                Number(item?.item_default_price) +
                  item?.extras?.reduce(
                    (total, curr) => total + Number(curr?.mods_default_price),
                    0
                  )
              ).toFixed(2),
        notes: item?.notes?.length ? [item?.notes] : [],
        no_data: "",
        quantity: item?.quantity,
        sub_item: [],
        extra_items:
          item?.extras?.map((item) => ({
            price:
              (item?.quantity == 1 || item?.isService)
                ? item?.price
                : item?.mods_default_price,
            mods_id: item?.mod_category_id,
            no: false,
            id: item?._id,
            name: item?.name,
            included: "No",
            extra: true,
            quantity: item?.quantity || 1,
          })) || [],

        extra_data: item?.isService
          ? item?.extras
              ?.map(
                (item, index) =>
                  `${item?.name} ${
                    item?.price > 0
                      ? `+$${item?.price}`
                      : ""
                  }`
              )
              .join("\n")
          : item?.extras
              ?.map(
                (item, index) =>
                  `${item?.name} ${
                    item?.mods_default_price > 0
                      ? `+$${item?.mods_default_price}`
                      : ""
                  }`
              )
              .join("\n"),
      })),
      pay_type:
        dash?.store_detail?.store_type == "Service"
          ? "Email"
          : paymentMethod === "Pay now"
          ? "Card"
          : "Pay-Later",
      sub_total: parseFloat(calculateSubtotal()).toFixed(2),
      tax: calculateTax(calculateSubtotal()),
      total_price: calculateTotal(),
      tip: Number(dash?.tipAmount).toFixed(2) || "0.00",
      ip_address: await NetworkInfo.getIPAddress(),
      tip_percentage:
        Number(
          Math.round((Number(dash?.tipAmount) / calculateSubtotal()) * 100)
        ).toFixed(2) || 0.0,
      customer_name:
        dash?.paymentDetails?.name ||
        `${values?.name || ""} ${values?.lastname || ""}`?.trim(),
      phone: dash?.paymentDetails?.phnNum || values?.phnNum?.replace(/-/g, ""),
      customer_email: dash?.paymentDetails?.mail || values?.mail,
      street: values?.street || "",
      state: values?.state || "",
      city: values?.city || "",
      zip_code: values?.zip_code || "",
    };

    if (dash?.store_detail?.store_type !== "Service") {
      if (
        (store_detail?.payment_gateway === "Aurora" ||
          store_detail?.payment_gateway === undefined) &&
        paymentMethod === "Pay now"
      ) {
        (payload.billingAddress = {
          city: null, //optional
          countryId: 1,
          line1: "8320",
          line2: null, //optional
          postalCode: "85284",
          stateId: 1,
        }),
          (payload.payment_gateway = "Aurora"),
          (payload["accountNumber"] = String(formik.values.cardNum)); //'4012000098765439',
        payload["expirationMonth"] = Number(
          formik.values.expiryDate.substring(0, 2)
        ); //12,
        payload["expirationYear"] = Number(
          formik.values.expiryDate.substring(3)
        ); //24,
        payload["securityCode"] = String(formik.values.securityCode); //'999'
      }
    }

    if (
      store_detail?.payment_gateway &&
      store_detail?.payment_gateway === "Stripe"
    ) {
      payload.payment_gateway = "Stripe";
    }

    console.log(JSON.stringify(payload));

    if (
      store_detail?.payment_gateway === "Aurora" ||
      store_detail?.payment_gateway === undefined
    ) {
      setLoading(true);
      create_order(payload, authHeaders(dash?.merchant_token))
        .then((res) => {
          dispatch(
            order_success_res({
              name: dash?.paymentDetails?.name,
              mobile_number: dash?.paymentDetails?.phnNum,
              email: dash?.paymentDetails?.mail,
              payment_method: paymentMethod,
              order_id: res?.data?.order_id,
              order_date: res?.data?.order_date
                ? res?.data?.order_date
                : moment(res?.data?.paymentTransaction?.datetime).format(
                    "YYYY-MM-DD"
                  ),
              order_time: res?.data?.order_time
                ? res?.data?.order_time
                : moment(res?.data?.paymentTransaction?.datetime).format(
                    "HH:mm:ss"
                  ),
              cart_items: dash?.cart_items,
              subtotal: calculateSubtotal(),
              tax: calculateTax(calculateSubtotal()),
              tip: Number(dash?.tipAmount) || 0,
              total: calculateTotal(),
              street: values?.street || "",
              state: values?.state || "",
              city: values?.city || "",
              zip_code: values?.zip_code || "",
            })
          );
          dispatch(cart_items([]));
          dispatch(setTipAmount(0.0));
          dispatch(setPaymentDetails(null));
          setLoading(false);
          navigation.navigate(Routes.ORDERSUCCESS);
          bottomSheetRef.current?.collapse();
          dispatch(setIsexpandSummary(false));
          setServiceCustomerDetails(false);
        })
        .catch((err) => {
          const payload = {
            message: err?.response?.data?.message,
            data: err?.response?.data?.data ?? err?.response?.data,
            statusCode: err?.status,
          };
          console.log(payload, "----->");

          setSuccessResponse(payload);
          setSuccessModalMobile(true);
          // console.log(err?.response?.data?.message, 'create order err', err)
          // show_toast(err?.response?.data?.message?.expirationMonth? err?.response?.data?.message?.expirationMonth :  err?.response?.data?.message)
          setLoading(false);
        });
    } else {
      try {
        setStripeLoding(true);
        const { success, data, token } = await create_order(
          payload,
          authHeaders(dash?.merchant_token)
        );
        console.log("--------->", data);

        if (success) {
          if (dash?.store_detail?.store_type == "Service") {
            setServiceCustomerDetails(false);
            setStripeLoding(false);
            dispatch(
              order_success_res({
                name: dash?.paymentDetails?.name,
                mobile_number: dash?.paymentDetails?.mail,
                email: dash?.paymentDetails?.phnNum,
                payment_method: paymentMethod,
                order_id: data?.order_id,
                order_date: data?.order_date
                  ? data?.order_date
                  : moment(data?.paymentTransaction?.datetime).format(
                      "YYYY-MM-DD"
                    ),
                order_time: data?.order_time
                  ? data?.order_time
                  : moment(data?.paymentTransaction?.datetime).format(
                      "HH:mm:ss"
                    ),
                cart_items: dash?.cart_items,
                subtotal: calculateSubtotal(),
                tax: calculateTax(calculateSubtotal()),
                tip: Number(dash?.tipAmount) || 0,
                total: calculateTotal(),
                street: values?.street || "",
                state: values?.state || "",
                city: values?.city || "",
                zip_code: values?.zip_code || "",
              })
            );
            dispatch(cart_items([]));
            dispatch(setTipAmount(0.0));
            dispatch(setPaymentDetails(null));
            navigation.navigate(Routes.ORDERSUCCESS);
            bottomSheetRef.current?.collapse();
            dispatch(setIsexpandSummary(false));
            setServiceCustomerDetails(false);
            return;
          }
          console.log("sdffdgf");

          if (paymentMethod == "Pay later") {
            dispatch(
              order_success_res({
                name: dash?.paymentDetails?.name,
                mobile_number: dash?.paymentDetails?.phnNum,
                email: dash?.paymentDetails?.mail,
                payment_method: paymentMethod,
                order_id: data?.order_id,
                order_date: data?.order_date
                  ? data?.order_date
                  : moment(data?.paymentTransaction?.datetime).format(
                      "YYYY-MM-DD"
                    ),
                order_time: data?.order_time
                  ? data?.order_time
                  : moment(data?.paymentTransaction?.datetime).format(
                      "HH:mm:ss"
                    ),
                cart_items: dash?.cart_items,
                subtotal: calculateSubtotal(),
                tax: calculateTax(calculateSubtotal()),
                tip: Number(dash?.tipAmount) || 0,
                total: calculateTotal(),
                street: values?.street || "",
                state: values?.state || "",
                city: values?.city || "",
                zip_code: values?.zip_code || "",
              })
            );
            dispatch(cart_items([]));
            dispatch(setTipAmount(0.0));
            dispatch(setPaymentDetails(null));
            setLoading(false);
            navigation.navigate(Routes.ORDERSUCCESS);
            bottomSheetRef.current?.collapse();
            dispatch(setIsexpandSummary(false));
            return;
          }
          dispatch(setOrderResponce(data));
          await initializePaymentSheet({
            customer: data?.customer,
            ephemeralKey: data?.ephemeralKey,
            paymentIntent: data?.paymentIntent,
          });

          const open = await openPaymentSheet();
          if (open) {
            const response = await getPaymentDetails({
              clientSecret: data?.paymentIntent,
            });

            try {
              const { success: PaymentStatusSuccess, data: PaymentData } =
                await stripe_payment_status(
                  {
                    order_id: data?.order_id,
                    payment_id: response?.id,
                  },
                  authHeaders(token)
                );

              if (PaymentStatusSuccess) {
                setStripeLoding(false);
                dispatch(
                  order_success_res({
                    name: dash?.paymentDetails?.name,
                    mobile_number: dash?.paymentDetails?.mail,
                    email: dash?.paymentDetails?.phnNum,
                    payment_method: paymentMethod,
                    order_id: PaymentData?.order_id,
                    order_date: PaymentData?.order_date,
                    order_time: PaymentData?.order_time,
                    cart_items: dash?.cart_items,
                    subtotal: calculateSubtotal(),
                    tax: calculateTax(calculateSubtotal()),
                    tip: Number(dash?.tipAmount) || 0,
                    total: calculateTotal(),
                    redem_amount: PaymentData?.redem_amount || 0.0,
                  })
                );
                dispatch(cart_items([]));
                dispatch(setTipAmount(0.0));
                dispatch(setPaymentDetails(null));
                if (PaymentData?.redemPopup) {
                  setOpenRedemPopupModal(true);
                  return;
                }
                navigation.navigate(Routes.ORDERSUCCESS);
                bottomSheetRef.current?.collapse();
                dispatch(setIsexpandSummary(false));
              }
            } catch (error) {
              setStripeLoding(false);
              console.log(
                "Stripe payment status error:",
                error.response?.data?.message
              );
            }
          }
        }
      } catch (err) {
        console.log(err, "---->");

        const payload = {
          message: err?.response?.data?.message,
          data: err?.response?.data?.data ?? err?.response?.data,
          statusCode: err?.status,
        };
        console.log(payload, "payload---->");
        setSuccessResponse(payload);
        setSuccessModalMobile(true);
        setStripeLoding(false);
        console.log(
          "Error in handleConfirmOrder:",
          err.response?.data?.db_error
        );
      }
    }
  };

  const { service_formik } = useCustomerDetailsHook(handleConfirmOrder);

  // Scroll to the first error
  const scrollToError = () => {
    if (formik.errors.name) nameRef.current.focus();
    else if (formik.errors.mail) mailRef.current.focus();
    else if (formik.errors.phnNum) phnNumRef.current.focus();
    else if (paymentMethod === "Pay now") {
      if (formik.errors.cardNum) cardNumRef.current.focus();
      else if (formik.errors.expiryDate) expiryDateRef.current.focus();
      else if (formik.errors.securityCode) securityCodeRef.current.focus();
    }
  };

  const formatPhoneNumber = (input) => {
    const cleaned = ("" + input)?.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    return match
      ? [match[1], match[2], match[3]].filter(Boolean).join("-")
      : input;
  };

  const handeclosemodal = () => {
    setSuccessResponse(null);
    setSuccessModalMobile(false);
  };

  const handleRedemPopupSubmit = () => {
    setredemPopupLoder(true);
    handleUpdateRedemStatus();
  };

  const handleRedemPopupClose = () => {
    setOpenRedemPopupModal(false);
    setredemPopupLoder(false);
    dispatch(setOrderResponce(null));
    navigation.navigate(Routes.ORDERSUCCESS);
    bottomSheetRef.current?.collapse();
    dispatch(setIsexpandSummary(false));
  };

  const handleUpdateRedemStatus = async () => {
    try {
      const res = await redemPos(
        { order_id: orderResponce?.order_id },
        authHeaders(dash?.merchant_token)
      );
      if (res) {
        setOpenRedemPopupModal(false);
        setredemPopupLoder(false);
        dispatch(setOrderResponce(null));
        navigation.navigate(Routes.ORDERSUCCESS);
        bottomSheetRef.current?.collapse();
        dispatch(setIsexpandSummary(false));
      }
    } catch (error) {
      setredemPopupLoder(false);
      console.log(
        error?.response?.data?.message?.order_id || error?.message,
        "--e?"
      );
    }
  };

  const handleCloseServiceModal = () => {
    setServiceCustomerDetails(false);
  };
  const handleOpenServiceModal = () => {
    setServiceCustomerDetails(true);
  };

  return {
    service_formik,
    formik,
    changeCustomTip,
    setChangeCustomTip,
    setChangeTip,
    setTipsSelected,
    setSelectedPercentage,
    calculateSubtotal,
    tipsSelected,
    changeTip,
    paymentMethod,
    calculateTax,
    calculateTotal,
    loading,
    handleBack,
    dash,
    scrollToError,
    formatPhoneNumber,
    nameRef,
    lastnameRef,
    mailRef,
    phnNumRef,
    cardNumRef,
    expiryDateRef,
    securityCodeRef,
    navigation,
    successResponse,
    successModalMobile,
    handeclosemodal,
    store_type: store_detail?.payment_gateway,
    handleConfirmOrder,
    stripeLoding,
    tipInputselect,
    setTipInputselect,
    redemPopupLoder,
    openRedemPopupModal,
    disableBackNavigation,
    handleRedemPopupClose,
    handleRedemPopupSubmit,
    bottomSheetRef,
    dispatch,
    serviceCustomerDetails,
    handleCloseServiceModal,
    handleOpenServiceModal,
  };
};

export default UseCheckout;
