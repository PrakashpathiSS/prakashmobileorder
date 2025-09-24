import { Image, Modal, Pressable, StyleSheet, View } from 'react-native'
import { Button } from '../ui-kit/button'
import { TextField } from '../ui-kit/text-field'
import { color, typography } from '../theme'
import { English } from '../utils/en'
import { baseFont } from '../theme/font-size'
import { Vertical } from '../ui-kit/spacer'
import { Text } from '../ui-kit/text'
const AddbusinessModal = ({
    isvisibe,
    formik,
    onPress,
    dash
}) => {
    return (
        <Modal
            visible={isvisibe}
            style={{ flex: 1 }}
            animationType='fade'
            transparent={true}
        >
            <Pressable
                style={styles.modal_div}
            >
                <View style={[styles.modal_container,{backgroundColor:dash?.base_themes?.background_color}]}>
                    <View style={styles.titleCounatiner}>
                        <Text style={[styles.modalTitle, { color:dash?.base_themes?.active_text_color }]}>
                            {English.select_business.label}
                        </Text>
                        <Pressable hitSlop={40} onPress={onPress}>
                            <Image source={require('../assets/icons/xmarkiocn.png')} style={[styles.closeicon, { tintColor: dash?.base_themes?.active_text_color}]} />
                        </Pressable>
                    </View>
                    <Vertical size={12} />
                    <TextField
                        placeholder={English.select_business.placeholder}
                        inputStyle={[styles.textfield_style,{
                            color:dash?.base_themes?.active_text_color,
                            borderColor:`${dash?.base_themes?.inactive_text_color}40`
                        }]}
                        containerStyle={styles.textfield_container_style}
                        onChangeText={(value) => {
                            formik.setFieldValue('name', value)
                        }}
                        placeholderColor={dash?.base_themes?.inactive_text_color}
                        value={formik.values.name}
                        errorStyle={styles.textfield_error_style}
                        errorMessage={(formik.touched.name && formik.errors.name) ? formik.errors.name : null}
                    />

                    <Vertical size={30} />

                    <Button
                        title={English.select_business.save}
                        style={[styles.btn, { backgroundColor: dash?.base_themes?.button_color }]}
                        textStyle={[styles.buttontext,{color:dash?.base_themes?.button_text_color}]}
                        onPress={() => formik.handleSubmit()}
                    />
                </View>
            </Pressable>
        </Modal>
    )
}

export default AddbusinessModal

const styles = StyleSheet.create({
    modal_div: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    modal_container: {
        width: '95%',
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 12
    },

    textfield_style: {
        borderColor: '#D7DBDF',
        fontSize: baseFont.add_business_field,
        fontFamily: typography.jakarta_regular,
        paddingTop: 0,
        borderWidth: 1,
        includeFontPadding: false,
        lineHeight: baseFont.add_business_field * 1.3,
        paddingVertical: 0
    },

    textfield_container_style: {
        height: 40
    },

    textfield_error_style: {
        fontSize: baseFont.add_business_field_error,
        fontFamily: typography.jakarta_regular,
        includeFontPadding: false,
        lineHeight: baseFont.add_business_field_error * 1.3,
        paddingVertical: 0
    },

    btn: {
        width: '100%',
        height: 40,
        backgroundColor: '#634EC1',
        borderRadius: English.rounde_edge.button
    },
    buttontext: {
        fontSize: baseFont.button_text,
        fontFamily: typography.jakarta_semibold,
        fontWeight: '600',
        lineHeight: baseFont.button_text * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
    },
    titleCounatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    modalTitle: {
        fontSize: baseFont.modal_title,
        fontFamily: typography.jakarta_semibold,
        fontWeight: '600',
        lineHeight: baseFont.modal_title * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
    },
    closeiconCountainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 5
    },
    closeicon: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
    },

})