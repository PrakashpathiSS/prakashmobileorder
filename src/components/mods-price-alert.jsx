import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Pressable,
    Image,
} from 'react-native';
import { color, typography } from '../theme';
import { English } from '../utils/en';
import { Button } from '../ui-kit/button';
import { baseFont } from '../theme/font-size';
import { Vertical } from '../ui-kit/spacer';

const ModsPriceAlert = ({ isVisible = false, onClose, onConfirm, itemName = "", price = "", dash }) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}>
            <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View
                            style={[
                                styles.modalContent,
                                { backgroundColor: dash?.base_themes?.background_color },

                            ]}>
                            <Pressable hitSlop={40} onPress={onClose} style={styles.closeiconCountainer}>
                                <Image source={require('../assets/icons/xmarkiocn.png')} style={[styles.closeicon, { tintColor: dash?.base_themes?.active_text_color }]} />
                            </Pressable>
                            <View style={styles.titleCounatiner}>
                                <Text style={[styles.modalTitle, { color: dash?.base_themes?.active_text_color }]}>
                                    {English.mods_price_alert.add}?
                                </Text>

                            </View>
                            <Vertical size={12} />
                            <Text style={[styles.modalsubTitle, { color: dash?.base_themes?.inactive_text_color }]}>
                                {`${itemName} ${English.mods_price_alert.extra} $${price}`}
                            </Text>
                            <Vertical size={32} />
                            {/* Do you wish to continue? */}
                            <View style={styles.buttonCountainer}>
                                <Button
                                    title={English.mods_price_alert.no_button}
                                    style={[styles.closebutton, {
                                        backgroundColor: dash?.base_themes?.background_color,
                                        borderColor: `${dash?.base_themes?.button_color}80`
                                    }]}
                                    onPress={onClose}
                                    textStyle={[styles.buttontext, { color: dash?.base_themes?.button_color }]}
                                />
                                <Button
                                    title={English.mods_price_alert.yes_button}
                                    style={[styles.btn, { backgroundColor: dash?.base_themes?.button_color }]}
                                    onPress={onConfirm}
                                    textStyle={[styles.buttontext, { color: dash?.base_themes?.button_text_color }]}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ModsPriceAlert;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.56)',
    },
    modalContent: {
        width: '90%',
        padding: 32,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        alignItems: 'center',
    },
    btnYes: {
        backgroundColor: '#E76F51',
        width: 110,
        height: 40,
        padding: 3,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    titlefont: {
        fontFamily: typography.bold,
        fontSize: 17,
        textAlign: 'center'
    },
    text: {
        fontFamily: typography.medium,
        fontSize: 16,
        color: '#FFFFFF',
        top: 2
    },
    buttonCountainer:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        gap: 20,
        padding: 10,
        top: 10,
    },
    buttonCountainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '100%'
    },
    closebutton: {
        width: '48%',
        height: 40,
        backgroundColor: '#000000',
        borderRadius: English.rounde_edge.button,
        borderWidth: 1,
        borderColor: '#D7DBDF'
    },
    btn: {
        width: '48%',
        height: 40,
        backgroundColor: '#000000',
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

    modalsubTitle: {
        fontSize: baseFont.modsl_sub_title,
        fontFamily: typography.jakarta_semibold,
        fontWeight: '600',
        lineHeight: baseFont.modsl_sub_title * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
        width: '100%',
        textAlign: 'left'
    },
    closeicon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    closeiconCountainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 10
    },
});
