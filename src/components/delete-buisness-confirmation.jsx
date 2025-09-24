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

const DeletebuisnessModal = ({ isVisible = false, onClose, onConfirm, dash }) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}>
            <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.modalContent, { backgroundColor: dash?.base_themes?.background_color }]}>

                            <Pressable hitSlop={40} onPress={onClose} style={styles.closeiconCountainer}>
                                <Image source={require('../assets/icons/xmarkiocn.png')} style={[styles.closeicon, { tintColor: dash?.base_themes?.active_text_color }]} />
                            </Pressable>
                            <Text style={[styles.titlefont, { color: dash?.base_themes?.active_text_color }]}>
                                {English.delete_business_alert.text}
                            </Text>
                            <Vertical size={32} />
                            <View style={styles.buttonCountainer}>
                                <Button
                                    title={English.delete_business_alert.no_button}
                                    style={[styles.closebutton, {
                                        backgroundColor: dash?.base_themes?.background_color,
                                        borderColor: dash?.base_themes?.button_color
                                    }]}
                                    onPress={onClose}
                                    textStyle={[styles.buttontext, { color: dash?.base_themes?.button_color }]}
                                />
                                <Button
                                    title={English.delete_business_alert.yes_button}
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

export default DeletebuisnessModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        alignItems: 'center',
    },
    titlefont: {
        fontSize: baseFont.modal_title,
        fontWeight: '600',
        fontFamily: typography.jakarta_semibold,
        color: '#101010',
        includeFontPadding: false,
        lineHeight: baseFont.modal_title * 1.3,
        paddingVertical: 0,
        width: '100%'
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

});
