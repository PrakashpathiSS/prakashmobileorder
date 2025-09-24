import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormik } from "formik";
import { customer_details_service_schema } from "../utils/schema";

const useCustomerDetailsHook = (handleConfirmOrder) => {
  const initailvalues = {
    name: "",
    lastname: "",
    mail: "",
    phnNum: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
  };

  const service_formik = useFormik({
    initialValues: initailvalues,
    onSubmit: (values) => {handleConfirmOrder(values)},
    validationSchema: customer_details_service_schema(),
  });
  return {
    service_formik,
  };
};

export default useCustomerDetailsHook;

const styles = StyleSheet.create({});
