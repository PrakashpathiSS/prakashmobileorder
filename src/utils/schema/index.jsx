import { is, otherwise } from "ramda";
import { object, string } from "yup";

export const signin_schema = () =>
  object().shape({
    phoneNumber: string()
      .min(10, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

export const otp_schema = () =>
  object().shape({
    otp: string().required("Otp is required"),
  });

export const edit_profile_schema = () =>
  object().shape({
    name: string().required("Name is required"),
    mail: string()
      .trim()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter a valid email address"
      ) // custom pattern
      .required("Email is required"),
    phnNum: string().required("Phone number is required"),
  });

export const confirm_order_schema = (type, paymentMethod) =>
  object().shape(
    type == "customerDetails"
      ? {
          name: string()
            .trim()
            .required("First name is required")
            .matches(/^[a-zA-Z\s'-.]+$/, "Enter a valid name"),
          lastname: string()
            .trim()
            .required("Last name is required")
            .matches(/^[a-zA-Z\s'-.]+$/, "Enter a valid name"),
          mail: string()
            .trim()
            .matches(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              "Enter a valid email address"
            ) // custom pattern
            .required("Email is required"),
          phnNum: string()
            .trim()
            .required("Phone number is required")
            .matches(/^\d{3}-\d{3}-\d{4}$/, "Must be only 10 digits")
            .min(12, "Phone number must be in 10 digits")
            .max(12, "Phone number must be in 10 digits"),
        }
      : {
          cardNum:
            paymentMethod === "Pay now"
              ? string()
                  .trim()
                  .min(16, "Enter valid card number")
                  .required("Card number is required")
              : string().notRequired(),
          expiryDate:
            paymentMethod === "Pay now"
              ? string()
                  .trim()
                  .min(5, "Enter valid expiry date")
                  .required("Expiry date is required")
              : string().notRequired(),
          securityCode:
            paymentMethod === "Pay now"
              ? string()
                  .trim()
                  .min(3, "Enter valid security code")
                  .required("Security code is required")
              : string().notRequired(),
        }
  );

export const confirm_order_stripe_schema = () =>
  object().shape({
    name: string()
      .trim()
      .required("First name is required")
      .matches(/^[a-zA-Z\s'-.]+$/, "Enter a valid name"),
    lastname: string()
      .trim()
      .required("Last name is required")
      .matches(/^[a-zA-Z\s'-.]+$/, "Enter a valid name"),
    mail: string()
      .trim()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter a valid email address"
      ) // custom pattern
      .required("Email is required"),
    phnNum: string()
      .trim()
      .required("Phone number is required")
      .matches(/^\d{3}-\d{3}-\d{4}$/, "Must be only 10 digits")
      .min(12, "Phone number must be in 10 digits")
      .max(12, "Phone number must be in 10 digits"),
  });

export const customer_details_service_schema = () =>
  object().shape({
    name: string()
      .trim()
      .required("First name is required")
      .matches(/^[a-zA-Z\s'-.]+$/, "Enter a valid name"),
    lastname: string()
      .trim()
      .required("Last name is required")
      .matches(/^[a-zA-Z\s'-.]+$/, "Enter a valid name"),
    mail: string()
      .trim()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter a valid email address"
      ) // custom pattern
      .required("Email is required"),
    phnNum: string()
      .trim()
      .required("Phone number is required")
      .matches(/^\d{3}-\d{3}-\d{4}$/, "Must be only 10 digits")
      .min(12, "Phone number must be in 10 digits")
      .max(12, "Phone number must be in 10 digits"),
      
    street: string()
      .trim()
      .required("Street is required")
      .matches(/^[a-zA-Z0-9\s.,'/-]+$/, "Enter a valid street"),

    city: string()
      .trim()
      .required("City is required")
      .matches(/^[a-zA-Z\s'-]+$/, "Enter a valid city"),

    state: string()
      .trim()
      .required("State is required")
      .matches(/^[a-zA-Z\s'-]+$/, "Enter a valid state"),
      
    zip_code: string().trim().required("Zip code is required")
    .matches(/^\d{5}$/, "must be 5 digits"),
  });

export const add_business_schema = () =>
  object().shape({
    name: string()
      .required("Name is required")
      .test(
        "no-leading-space",
        "No leading space allowed",
        (value) => value?.[0] !== " "
      ),
  });
