import { useEffect } from 'react'
import { BackHandler, Image, Platform, ScrollView, StyleSheet, View, } from 'react-native'
import { Text } from '../../ui-kit/text'
import { typography } from '../../theme'
import { English } from '../../utils/en'
import UseOrderSuccess from '../../hooks/use-order-success'
import { Button } from '../../ui-kit/button'
import moment from 'moment'
import MapComponent from '../../components/map-component'
import { formatPhoneNumber } from '../../utils/helpers'
import { Vertical } from '../../ui-kit/spacer'
import { baseFont } from '../../theme/font-size'

const OrderSuccess = () => {
    const {
        dash,
        handleBacktoHome,
        mapRef,
        handleMapReady
    } = UseOrderSuccess()

    useEffect(() => {
        // Disable hardware back button
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                // Returning true disables the back button behavior
                handleBacktoHome()
                return true;
            }
        );

        // Clean up the event listener when the component unmounts
        return () => backHandler.remove();
    }, []);

    const rawDate = dash?.order_success_res?.order_date;
    const rawTime = dash?.order_success_res?.order_time;
    const combinedDateTime = `${rawDate} ${rawTime}`;
   const formattedDate = moment(combinedDateTime, 'YYYY-MM-DD hh:mm A').format('ddd, DD MMMM, h:mm A');
    return (
        <View style={[styles.countainer, { backgroundColor: dash?.base_themes?.layout_color }]}>
            <ScrollView style={styles.successarea} showsVerticalScrollIndicator={false}>
                <View style={[styles.orderstatusCard, { backgroundColor: dash?.base_themes?.background_color }]}>
                    <View style={[styles.tick_icon_div, { backgroundColor: dash?.base_themes?.button_color }]}>
                        <View style={styles.tick_icon_style}>
                            <Image
                                source={require('../../assets/icons/check_icon.png')}
                                style={[styles.img_style, { tintColor: dash?.base_themes?.button_text_color }]}
                            />
                        </View>
                    </View>
                    <Vertical size={24} />
                    <View>
                        <Text style={[styles.thank_text_style, { color: dash?.base_themes?.active_text_color }]}>
                            {English.order_success.title}
                        </Text>
                        <Vertical size={16} />
                        {dash?.order_success_res?.order_id ?
                            <View style={styles.itemcountainerarea}>
                                <Text style={[styles.label_text, { color: dash?.base_themes?.inactive_text_color }]}>
                                    {English.order_success?.order_id}:{' '}
                                </Text>
                                <Text style={[styles.value_text, { color: dash?.base_themes?.active_text_color }]}>
                                    #{dash?.order_success_res?.order_id}
                                </Text>
                            </View>
                            : null}
                        <Vertical size={16} />
                        <View style={styles.itemcountainerarea}>
                            <Text style={[styles.timetext, { color: dash?.base_themes?.active_text_color }]}>
                                {formattedDate && formattedDate}
                            </Text>
                        </View>
                    </View>
                </View>
                <Vertical size={24} />
                <View style={[styles.orderaddressCard, { backgroundColor: dash?.base_themes?.background_color }]}>
                    <View style={styles.titleCountainer}>
                        <Image
                            source={require('../../assets/icons/location.png')}
                            style={[styles.locationimage, { tintColor: dash?.base_themes?.inactive_text_color }]}
                        />
                        <Text style={[styles.titletext, { color: dash?.base_themes?.inactive_text_color }]} allowFontScaling={false}>Store Location</Text>
                    </View>
                    <Vertical size={16} />
                    <MapComponent
                        storeData={dash?.store_detail}
                        mapRef={mapRef}
                        handleMapReady={handleMapReady}
                        style={{ height: 200 }}
                    />
                    <Vertical size={16} />

                    <Text style={[styles.addressText, { color: dash?.base_themes?.active_text_color }]}>
                        {`${dash?.business_name}, ${dash?.store_detail?.store_name}`}
                    </Text>
                       <Text style={[styles.addressText, { color: dash?.base_themes?.active_text_color }]}>
                        {`${dash?.store_detail?.store_street}`}
                    </Text>
                    <Text style={[styles.addressText, { color: dash?.base_themes?.active_text_color }]}>
                        {`${dash?.store_detail?.store_city}, ${dash?.store_detail?.store_state}, ${dash?.store_detail?.store_zip_code}`}
                    </Text>

                    <View>
                        {dash?.store_detail?.store_phone && (
                            <Text style={[styles.addressText, { color: dash?.base_themes?.active_text_color }]}>
                                +1 {formatPhoneNumber(dash?.store_detail.store_phone)}
                            </Text>
                        )}
                    </View>
                </View>
            </ScrollView>


            <Button
                title={English.order_success.btn_title}
                style={[styles.btn, { backgroundColor: dash?.base_themes?.button_color }]}
                textStyle={[styles.buttontext, { color: dash?.base_themes?.button_text_color }]}
                onPress={handleBacktoHome}
            />
            <Vertical size={Platform.OS == 'ios' ? 20 : 5} />
        </View>



    )
}

export default OrderSuccess

const styles = StyleSheet.create({


    img_style: {
        width: "100%",
        height: '100%',
        objectFit: 'cover',
    },

    tick_icon_style: {
        width: 50,
        height: 50,
        top: 2
    },

    tick_icon_div: {
        backgroundColor: '#6D54CF',
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },

    thank_text_style: {
        fontSize: 24,
        fontFamily: typography.jakarta_semibold,
        fontWeight: '500',
        lineHeight: 24 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
        color: '#101010'
    },
    timetext: {
        fontSize: 16,
        fontFamily: typography.jakarta_medium,
        fontWeight: '500',
        lineHeight: 24 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
        color: '#101010'
    },
    label_text: {
        fontSize: 16,
        fontFamily: typography.jakarta_semibold,
        fontWeight: '400',
        lineHeight: 16 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
        color: '#606060'
    },
    value_text: {
        fontSize: 16,
        fontFamily: typography.jakarta_semibold,
        fontWeight: '400',
        lineHeight: 16 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
        color: '#121212'
    },

    button_style: {
        backgroundColor: '#6D54CF',
        // paddingVertical: 10,
        height: Platform.OS == 'android' ? 55 : 60,
        borderRadius: 15
    },

    button_text_style: {
        fontSize: 20,
        fontFamily: typography.semibold,
    },
    addressText: {
        fontSize: 14,
        color: '#000000',
        fontFamily: typography.jakarta_regular,
        textAlign: 'center',
        lineHeight: 14 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
    },
    itemcountainerarea: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    countainer: { flex: 1, padding: 16, backgroundColor: '#F6F6F6' },
    successarea: { flex: 1 },
    btn: {
        width: '100%',
        height: 50,
        backgroundColor: '#000000',
        borderRadius: English.rounde_edge.button
    },
    downloadbutton: {
        width: '100%',
        height: 50,
        backgroundColor: '#000000',
        borderRadius: English.rounde_edge.button,
        borderWidth: 1,
        borderColor: '#3D1690'
    },
    buttontext: {
        fontSize: baseFont.button_text,
        fontFamily: typography.jakarta_semibold,
        fontWeight: '600',
        lineHeight: baseFont.button_text * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
    },
    orderstatusCard: {
        height: 'auto',
        width: '100%',
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderaddressCard: {
        height: 'auto',
        width: '100%',
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 12,
    },
    titletext: {
        fontSize: 16,
        fontFamily: typography.jakarta_semibold,
        fontWeight: '500',
        lineHeight: 16 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
        color: '#AEAEB2',
        textAlign: 'left',
        width: '100%'
    },
    locationimage: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        tintColor: '#AEAEB2'
    },
    titleCountainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
})