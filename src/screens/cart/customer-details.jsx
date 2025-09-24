import { StyleSheet, View } from 'react-native'
import { English } from '../../utils/en'
import UseCheckout from '../../hooks/use-checkout'
import CheckoutPageFooter from '../../components/checkout-page-footer'
import CustomerDetails from '../../components/customer-details'

const CheckoutDetails = () => {
    const {
        formatPhoneNumber,
        nameRef,
        lastnameRef,
        mailRef,
        phnNumRef,
        formik,
        calculateSubtotal,
        calculateTax,
        calculateTotal,
        dash,
        bottomSheetRef,
    } = UseCheckout('customerDetails')

    return (
        <View style={styles.container}>
            <View style={styles.itemcontainer}>
                <CustomerDetails
                    formik={formik}
                    mailRef={mailRef}
                    nameRef={nameRef}
                    lastnameRef={lastnameRef}
                    phnNumRef={phnNumRef}
                    dash={dash}
                />
            </View>
            <CheckoutPageFooter
                btntitle={English.checkout.btn_next}
                calculateSubtotal={calculateSubtotal}
                calculateTax={calculateTax}
                calculateTotal={calculateTotal}
                calculateTip={dash?.tipAmount}
                bottomSheetRef={bottomSheetRef}
                onPress={() => {
                    formik.handleSubmit()

                }}
            />
        </View>
    )
}

export default CheckoutDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    itemcontainer: {
        paddingHorizontal: 16,
        flex: 1,
    },

})