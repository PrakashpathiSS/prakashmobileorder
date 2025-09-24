import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { typography } from '../theme'
import PaymentType from "./checkout-layouts/payment-type";
import { Vertical } from '../ui-kit/spacer';
import { TextField } from '../ui-kit/text-field';
import { English } from '../utils/en';
const PaymentDetailsComponent = ({
    disableBackNavigation,
    dash,
    paymentMethod,
    store_type,
    formik,
    cardNumRef,
    expiryDateRef,
    securityCodeRef
}) => {

    return (
        <View style={[styles.countainer, { backgroundColor: dash?.base_themes?.background_color }]}>
            <View style={styles.titlecouniainer}>
                <Text style={[styles.titletext, { color: dash?.base_themes?.inactive_text_color }]} allowFontScaling={false}>Payment Methods</Text>
                <Image source={require('../assets/icons/check_icon.png')} style={[styles.ticimage, { tintColor: dash?.base_themes?.button_color }]} />
            </View>
            <Vertical size={16} />
            <PaymentType
                layoutdisable={disableBackNavigation}
                enablePaylater={dash?.store_detail?.pay_later_mobile}
                paymentMethod={paymentMethod}
                dash={dash}
            />
            <Vertical size={24} />
            <View>
                {(store_type === "Aurora" || store_type === undefined) && (
                    <>

                        {paymentMethod === "Pay now" ? (
                            <View>

                                <View style={styles.textfield_div}>
                                    <TextField
                                        forwardedRef={cardNumRef}
                                        placeholder={English.checkout.payment_detail.card_num.placeholder}
                                        inputStyle={[styles.textfield_style, {
                                            color: dash?.base_themes?.active_text_color,
                                            borderColor: `${dash?.base_themes?.inactive_text_color}40`
                                        }]}
                                        placeholderTextColor={dash?.base_themes?.inactive_text_color}
                                        containerStyle={styles.textfield_container_style}
                                        onChangeText={(value) => {
                                            formik.setFieldValue("cardNum", value);
                                        }}
                                        keyboardType="numeric"
                                        maxLength={16}
                                        value={formik.values.cardNum}
                                        errorStyle={styles.textfield_error_style}
                                        errorMessage={
                                            formik.touched.cardNum && formik.errors.cardNum
                                                ? formik.errors.cardNum
                                                : null
                                        }
                                    />
                                </View>
                                <Vertical size={32} />
                                <View style={styles.codecountainer}>
                                    <TextField
                                        forwardedRef={expiryDateRef}
                                        placeholder={English.checkout.payment_detail.expiry_date.placeholder}
                                        placeholderTextColor={dash?.base_themes?.inactive_text_color}
                                        inputStyle={[styles.textfield_style, {
                                            color: dash?.base_themes?.active_text_color,
                                            borderColor: `${dash?.base_themes?.inactive_text_color}40`
                                        }]}
                                        containerStyle={styles.codecouniatiner}
                                        onChangeText={(val) => {
                                            const expDate = val
                                                ?.replace(/[^0-9]/g, "")
                                                ?.replace(/(.{2})(?=.)/, "$1/");
                                            formik.setFieldValue("expiryDate", expDate);
                                        }}
                                        keyboardType="numeric"
                                        maxLength={5}
                                        value={formik.values.expiryDate}
                                        errorStyle={styles.textfield_error_style}
                                        errorMessage={
                                            formik.touched.expiryDate && formik.errors.expiryDate
                                                ? formik.errors.expiryDate
                                                : null
                                        }
                                    />
                                    <TextField
                                        forwardedRef={securityCodeRef}
                                        placeholder={English.checkout.payment_detail.security_code.placeholder}
                                        placeholderTextColor={dash?.base_themes?.inactive_text_color}
                                        inputStyle={[styles.textfield_style, {
                                            color: dash?.base_themes?.active_text_color,
                                            borderColor: `${dash?.base_themes?.inactive_text_color}40`,
                                        }]}
                                        containerStyle={styles.codecouniatiner}
                                        onChangeText={(value) => {
                                            formik.setFieldValue("securityCode", value);
                                        }}
                                        keyboardType="numeric"
                                        maxLength={3}
                                        value={formik.values.securityCode}
                                        errorStyle={styles.textfield_error_style}
                                        errorMessage={
                                            formik.touched.securityCode &&
                                                formik.errors.securityCode
                                                ? formik.errors.securityCode
                                                : null
                                        }
                                    />
                                </View>
                                <Vertical size={25} />
                            </View>
                        ) : (
                            // pay later
                            <View>
                                <Text style={[styles.pay_text_style,{ color:dash?.base_themes?.active_text_color}]}>
                                    {English.checkout.pay_later_text}
                                </Text>
                            </View>
                        )}
                    </>
                )}
            </View>
        </View>
    )
}

export default PaymentDetailsComponent

const styles = StyleSheet.create({
    countainer: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12
    },
    ticimage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: '#009951',
        aspectRatio: 1 / 1
    },
    titlecouniainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titletext: {
        fontSize: 16,
        fontFamily: typography.jakarta_semibold,
        fontWeight: '500',
        lineHeight: 16 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
        color: '#AEAEB2'
    },

    label_style: {
        borderColor: '#D7DBDF',
        fontSize: 14,
        fontFamily: typography.jakarta_regular,
        paddingTop: 0,
        borderWidth: 1,
        includeFontPadding: false,
        lineHeight: 14 * 1.3,
        paddingVertical: 0
    },
    textfield_style: {
        borderColor: '#D7DBDF',
        fontSize: 14,
        fontFamily: typography.jakarta_regular,
        paddingTop: 0,
        borderWidth: 1,
        includeFontPadding: false,
        lineHeight: 14 * 1.3,
        paddingVertical: 0
    },
    textfilednamecountainer: {
        width: '48%',
        height: 40
    },
    textfield_error_style: {
        fontSize: 10,
        fontFamily: typography.jakarta_regular,
        includeFontPadding: false,
        lineHeight: 10 * 1.3,
        paddingVertical: 0

    },
    textfield_container_style: {
        height: 40,
    },
    codecouniatiner: {
        height: 40,
        width: '48.7%'
    },
    codecountainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    pay_text_style: {
        fontSize: 14,
        fontFamily: typography.jakarta_regular,
        includeFontPadding: false,
        lineHeight: 14 * 1.3,
        paddingVertical: 0,
        fontWeight: '400'
    },
})