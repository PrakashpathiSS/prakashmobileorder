import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { English } from '../../utils/en';
import { useDispatch } from 'react-redux';
import { setPaymentMethod } from '../../redux/slice/user';
import { typography } from '../../theme';

const PaymentType = ({
    paymentMethod,
    removeBorder,
    enablePaylater = false,
    layoutdisable,
    dash
}) => {
    const dispatch = useDispatch()
    return (

        <View pointerEvents={layoutdisable ? 'none' : undefined} style={[styles.selectTypeArea, enablePaylater == false && { width: '49.5%' }]} >
            {English.payment_type.pay_type?.filter((value) => {
                return enablePaylater ? true : value == English.payment_type.pay_type[0];
            })?.map((value, index) => {
                return (
                    <TouchableOpacity
                        disabled={removeBorder}
                        key={index}
                        style={styles.pressablecounianter}
                        onPress={() => { dispatch(setPaymentMethod(value)) }}
                    >
                        <View style={[styles.radobuttonalign, { borderColor: `${dash?.base_themes?.inactive_text_color}40` }]}>
                            <View style={[styles.radioButtonCountainer, { borderColor: paymentMethod == value ? dash?.base_themes?.button_color : `${dash?.base_themes?.inactive_text_color}40` }]}>
                                {paymentMethod == value && (
                                    <View
                                        style={[styles.checkArea, {
                                            backgroundColor: dash?.base_themes?.button_color,
                                            borderColor: `${dash?.base_themes?.inactive_text_color}40`,
                                        }]}
                                    />
                                )}
                            </View>
                            <Text style={[styles.themeText, { color: dash?.base_themes?.active_text_color }]}>{value}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>

    )
}

export default PaymentType

const styles = StyleSheet.create({
    radioButtonCountainer: {
        width: 19.88,
        height: 19.88,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: '#6F3FD7',
    },
    radobuttonalign: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: 'flex-start',
        borderWidth: 1,
        paddingHorizontal: 12,
        gap: 10,
        borderRadius: 5,
        borderColor: '#D9D9DC'
    },
    checkArea: {
        width: 14,
        height: 14,
        backgroundColor: '#6D54CF',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#6D54CF',
    },
    themeText: {
        fontSize: 14,
        fontFamily: typography.jakarta_regular,
        includeFontPadding: false,
        lineHeight: 14 * 1.3,
        paddingVertical: 0,
        color: '#000'
    },
    selectTypeArea: {
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        height: 45,
        gap: 10
    },
    pressablecounianter: {
        flex: 1
    }
})