import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { English } from "../utils/en";
import { TextField } from "../ui-kit/text-field";
import { color, typography } from "../theme";
import { Vertical } from "../ui-kit/spacer";
import { Button } from "../ui-kit/button";
import { formatPhoneNumber } from "../utils/helpers";

const CustomerDetailsModal = ({
  isVisible,
  loader,
  dash,
  formik,
  onCancel,
}) => {
  const evenspace = <Vertical size={25} />;
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <TouchableWithoutFeedback>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalOverlay}
        >
          <View
            pointerEvents={loader ? "none" : undefined}
            style={[
              styles.modalContainer,
              { backgroundColor: dash?.base_themes?.background_color },
            ]}
          >
            <View style={styles.titleCountainer}>
              <Text
                style={[
                  styles.titleText,
                  { color: dash?.base_themes?.active_text_color },
                ]}
              >
                Customer Details
              </Text>
              <Pressable
                hitSlop={40}
                onPress={() => {
                  formik?.resetForm();
                  onCancel && onCancel();
                }}
              >
                <Image
                  source={require("../assets/icons/xmarkiocn.png")}
                  style={[
                    styles.closeicon,
                    { tintColor: dash?.base_themes?.active_text_color },
                  ]}
                />
              </Pressable>
            </View>
            <Vertical size={25} />
            <View style={styles.nameArea}>
              <TextField
                // label={English.checkout.customer_detail.name.label}
                placeholder={English.checkout.customer_detail.name.placeholder}
                placeholderTextColor={dash?.base_themes?.inactive_text_color}
                labelStyle={styles.label_style}
                inputStyle={[
                  styles.textfield_style,
                  {
                    color: dash?.base_themes?.active_text_color,
                    borderColor: `${dash?.base_themes?.inactive_text_color}40`,
                  },
                ]}
                containerStyle={styles.textfilednamecountainer}
                onChangeText={(value) => {
                  formik?.setFieldValue("name", value);
                }}
                value={formik?.values.name}
                errorStyle={styles.textfield_error_style}
                errorMessage={
                  formik?.touched.name && formik?.errors.name
                    ? formik?.errors.name
                    : null
                }
              />
              <TextField
                // label={English.checkout.customer_detail.lastname.label}
                placeholder={
                  English.checkout.customer_detail.lastname.placeholder
                }
                placeholderTextColor={dash?.base_themes?.inactive_text_color}
                labelStyle={styles.label_style}
                inputStyle={[
                  styles.textfield_style,
                  {
                    color: dash?.base_themes?.active_text_color,
                    borderColor: `${dash?.base_themes?.inactive_text_color}40`,
                  },
                ]}
                containerStyle={styles.textfilednamecountainer}
                onChangeText={(value) => {
                  formik?.setFieldValue("lastname", value);
                }}
                value={formik?.values.lastname}
                errorStyle={styles.textfield_error_style}
                errorMessage={
                  formik?.touched.lastname && formik?.errors.lastname
                    ? formik?.errors.lastname
                    : null
                }
              />
            </View>
            {evenspace}
            <TextField
              // label={English.checkout.customer_detail.phn_num.label}
              placeholder={English.checkout.customer_detail.phn_num.label}
              placeholderTextColor={dash?.base_themes?.inactive_text_color}
              labelStyle={styles.label_style}
              inputStyle={[
                styles.textfield_style,
                {
                  color: dash?.base_themes?.active_text_color,
                  borderColor: `${dash?.base_themes?.inactive_text_color}40`,
                  paddingLeft: 30,
                },
              ]}
              containerStyle={styles.textfield_container_style}
              onChangeText={async (val) => {
                const number = await formatPhoneNumber(val);
                formik?.setFieldValue("phnNum", number);
              }}
              keyboardType="numeric"
              maxLength={12}
              value={formik?.values.phnNum}
              errorStyle={styles.textfield_error_style}
              errorMessage={
                formik?.touched.phnNum && formik?.errors.phnNum
                  ? formik?.errors.phnNum
                  : null
              }
              lftSymbol={true}
              lftSymbol_Style={[
                styles.lftSymbol_Style,
                { color: dash?.base_themes?.active_text_color },
              ]}
            />
            {evenspace}
            <TextField
              // label={English.checkout.customer_detail.mail.label}
              placeholder={English.checkout.customer_detail.mail.placeholder}
              placeholderTextColor={dash?.base_themes?.inactive_text_color}
              labelStyle={styles.label_style}
              inputStyle={[
                styles.textfield_style,
                {
                  color: dash?.base_themes?.active_text_color,
                  borderColor: `${dash?.base_themes?.inactive_text_color}40`,
                },
              ]}
              containerStyle={styles.textfield_container_style}
              onChangeText={(value) => {
                formik?.setFieldValue("mail", value);
              }}
              value={formik?.values.mail}
              errorStyle={styles.textfield_error_style}
              errorMessage={
                formik?.touched.mail && formik?.errors.mail
                  ? formik?.errors.mail
                  : null
              }
            />

            {evenspace}
            <TextField
              //  label={English.checkout.customer_detail.street.label}
              placeholder={English.checkout.customer_detail.street.placeholder}
              placeholderTextColor={dash?.base_themes?.inactive_text_color}
              labelStyle={styles.label_style}
              inputStyle={[
                styles.textfield_style,
                {
                  color: dash?.base_themes?.active_text_color,
                  borderColor: `${dash?.base_themes?.inactive_text_color}40`,
                },
              ]}
              containerStyle={styles.textfield_container_style}
              onChangeText={(value) => {
                formik?.setFieldValue("street", value);
              }}
              value={formik?.values.street}
              errorStyle={styles.textfield_error_style}
              errorMessage={
                formik?.touched.street && formik?.errors.street
                  ? formik?.errors.street
                  : null
              }
            />
            {evenspace}

            <View style={styles.rowinput}>
              <TextField
                // label={English.checkout.customer_detail.city.label}
                placeholder={English.checkout.customer_detail.city.placeholder}
                placeholderTextColor={dash?.base_themes?.inactive_text_color}
                labelStyle={styles.label_style}
                inputStyle={[
                  styles.textfield_style,
                  {
                    color: dash?.base_themes?.active_text_color,
                    borderColor: `${dash?.base_themes?.inactive_text_color}40`,
                  },
                ]}
                containerStyle={[
                  styles.textfield_container_style,
                  { width: "31%" },
                ]}
                onChangeText={(value) => {
                  formik?.setFieldValue("city", value);
                }}
                value={formik?.values.city}
                errorStyle={styles.textfield_error_style}
                errorMessage={
                  formik?.touched.city && formik?.errors.city
                    ? formik?.errors.city
                    : null
                }
              />
              <TextField
                // label={English.checkout.customer_detail.state.label}
                placeholder={English.checkout.customer_detail.state.placeholder}
                placeholderTextColor={dash?.base_themes?.inactive_text_color}
                labelStyle={styles.label_style}
                inputStyle={[
                  styles.textfield_style,
                  {
                    color: dash?.base_themes?.active_text_color,
                    borderColor: `${dash?.base_themes?.inactive_text_color}40`,
                  },
                ]}
                containerStyle={[
                  styles.textfield_container_style,
                  { width: "31%" },
                ]}
                onChangeText={(value) => {
                  formik?.setFieldValue("state", value);
                }}
                value={formik?.values.state}
                errorStyle={styles.textfield_error_style}
                errorMessage={
                  formik?.touched.state && formik?.errors.state
                    ? formik?.errors.state
                    : null
                }
              />
              <TextField
                // label={English.checkout.customer_detail.zipCode.label}
                placeholder={
                  English.checkout.customer_detail.zipCode.placeholder
                }
                placeholderTextColor={dash?.base_themes?.inactive_text_color}
                labelStyle={styles.label_style}
                inputStyle={[
                  styles.textfield_style,
                  {
                    color: dash?.base_themes?.active_text_color,
                    borderColor: `${dash?.base_themes?.inactive_text_color}40`,
                  },
                ]}
                containerStyle={[
                  styles.textfield_container_style,
                  { width: "31%" },
                ]}
                onChangeText={(value) => {
                  formik?.setFieldValue("zip_code", value);
                }}
                value={formik?.values.zip_code}
                errorStyle={styles.textfield_error_style}
                errorMessage={
                  formik?.touched.zip_code && formik?.errors.zip_code
                    ? formik?.errors.zip_code
                    : null
                }
                maxLength={5}
              />
            </View>

            <Vertical size={32} />
            <View style={styles.buttoncuntainer}>
              <Button
                loading={false}
                disabled={loader}
                title={"Cancel"}
                opacityColor={"#FFFFFF"}
                opacity={true}
                style={[
                  styles.btn,
                  {
                    backgroundColor: dash?.base_themes?.background_color,
                    borderColor: `${dash?.base_themes?.button_color}80`,
                    borderWidth: 1,
                  },
                ]}
                onPress={() => {
                  formik?.resetForm();
                  onCancel && onCancel();
                }}
                textStyle={[
                  styles.buttontext,
                  { color: dash?.base_themes?.button_color },
                ]}
              />

              <Button
                loading={loader}
                loaderColor={dash?.base_themes?.button_text_color}
                disabled={loader}
                title={"Place Order"}
                opacityColor={dash?.base_themes?.button_color}
                opacity={true}
                style={[
                  styles.btn,
                  { backgroundColor: dash?.base_themes?.button_color },
                ]}
                onPress={() => {
                  formik.handleSubmit();
                }}
                textStyle={[
                  styles.buttontext,
                  { color: dash?.base_themes?.button_text_color },
                ]}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomerDetailsModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "96%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderRadius: 12,
    padding: 18,
  },
  nameArea: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  label_style: {
    borderColor: "#D7DBDF",
    fontSize: 14,
    fontFamily: typography.jakarta_regular,
    paddingTop: 0,
    // borderWidth: 1,
    bottom: 4,
    includeFontPadding: false,
    lineHeight: 14 * 1.3,
    paddingVertical: 0,
  },
  textfield_style: {
    borderColor: "#D7DBDF",
    fontSize: 14,
    fontFamily: typography.jakarta_regular,
    paddingTop: 0,
    borderWidth: 1,
    includeFontPadding: false,
    lineHeight: 14 * 1.3,
    paddingVertical: 0,
  },
  lftSymbol_Style: {
    fontSize: 14,
    fontFamily: typography.jakarta_regular,
    paddingTop: 0,
    includeFontPadding: false,
    lineHeight: 14 * 1.3,
    paddingVertical: 0,
    marginTop: 0,
    top: 11,
    left:10,
    justifyContent: "center",
    alignItems: "center",
  },

  textfield_container_style: {
    height: 40,
    width: "100%",
  },
  textfield_error_style: {
    fontSize: 10,
    fontFamily: typography.jakarta_regular,
    includeFontPadding: false,
    lineHeight: 10 * 1.3,
    paddingVertical: 0,
  },
  textfilednamecountainer: {
    width: "48%",
    height: 40,
  },
  titleCountainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  titleText: {
    fontSize: 18,
    fontFamily: typography.jakarta_semibold,
    color: color.palette.black,
    fontWeight: "600",
  },
  closeicon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  buttoncuntainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
  },
  buttontext: {
    fontSize: 16,
    fontFamily: typography.jakarta_semibold,
    color: color.palette.black,
    lineHeight: 16 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontWeight: "600",
  },
  btn: {
    width: "48%",
    height: 40,
    backgroundColor: color.palette.black,
  },
  rowinput: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
