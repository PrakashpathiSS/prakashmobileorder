import { Image, StyleSheet, Text, View } from "react-native";
import { typography } from "../theme";
import { TextField } from "../ui-kit/text-field";
import { English } from "../utils/en";
import { formatPhoneNumber } from "../utils/helpers";
import { Vertical } from "../ui-kit/spacer";

const CustomerDetails = ({
  nameRef,
  lastnameRef,
  mailRef,
  phnNumRef,
  formik,
  dash,
}) => {
  return (
    <View
      style={[
        styles.countainer,
        { backgroundColor: dash?.base_themes?.background_color },
      ]}
    >
      <View style={styles.titlecouniainer}>
        <Text
          style={[
            styles.titletext,
            { color: dash?.base_themes?.inactive_text_color },
          ]}
          allowFontScaling={false}
        >
          {English.checkout.customer_detail.title}
        </Text>
        <Image
          source={require("../assets/icons/check_icon.png")}
          style={[
            styles.ticimage,
            { tintColor: dash?.base_themes?.button_color },
          ]}
        />
      </View>
      <Vertical size={16} />
      {/* name */}
      <View style={styles.nameArea}>
        <TextField
          forwardedRef={nameRef}
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
          forwardedRef={lastnameRef}
          placeholder={English.checkout.customer_detail.lastname.placeholder}
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
      <Vertical size={25} />

      {/* Phn num */}
      <TextField
        forwardedRef={phnNumRef}
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

      <Vertical size={25} />
      {/* mail */}
      <TextField
        forwardedRef={mailRef}
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

      <Vertical size={25} />
    </View>
  );
};

export default CustomerDetails;

const styles = StyleSheet.create({
  countainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
  },
  titletext: {
    fontSize: 16,
    fontFamily: typography.jakarta_semibold,
    fontWeight: "500",
    lineHeight: 16 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
    color: "#AEAEB2",
  },

  label_style: {
    borderColor: "#D7DBDF",
    fontSize: 14,
    fontFamily: typography.jakarta_regular,
    paddingTop: 0,
    borderWidth: 1,
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

  textfield_container_style: {
    height: 40,
  },
  textfield_error_style: {
    fontSize: 12,
    fontFamily: typography.jakarta_regular,
    includeFontPadding: false,
    lineHeight: 12 * 1.3,
    paddingVertical: 0,
  },
  textfield_div: {},
  nameArea: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  textfilednamecountainer: {
    width: "48%",
    height: 40,
  },
  ticimage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#009951",
    aspectRatio: 1 / 1,
  },
  titlecouniainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    left: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
