import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Pressable,
} from 'react-native';
import { color, typography } from '../theme';
import { English } from '../utils/en';
import { Button } from '../ui-kit/button';
import { baseFont } from '../theme/font-size';
import { Vertical } from '../ui-kit/spacer';

const ConfermationModal = ({ isVisible, onClose, onConfirm, dash }) => {
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
                            <Pressable hitSlop={40} onPress={onConfirm} style={styles.closeiconCountainer}>
                                <Image source={require('../assets/icons/xmarkiocn.png')} style={[styles.closeicon, { tintColor:dash?.base_themes?.active_text_color }]} />
                            </Pressable>
                            <View style={styles.titleCounatiner}>
                                <Text style={[styles.titlefont, { color: dash?.base_themes?.active_text_color }]}>
                                    {English.confermation_modal.text}
                                </Text>

                            </View>
                            <Vertical size={32} />
                            <View style={styles.buttonCountainer}>
                                <Button
                                    title={English.confermation_modal.no_button}
                                    style={[styles.closebutton, {
                                        backgroundColor: dash?.base_themes?.background_color,
                                        borderColor: `${dash?.base_themes?.button_color}80`
                                    }]}
                                    onPress={onClose}
                                    textStyle={[styles.buttontext, { color: dash?.base_themes?.button_color }]}
                                />
                                <Button
                                    title={English.confermation_modal.yes_button}
                                    style={[styles.btn, { backgroundColor: dash?.base_themes?.button_color }]}
                                    onPress={onConfirm}
                                    textStyle={[styles.buttontext, { color: dash?.base_themes?.button_text_color}]}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ConfermationModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.56)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        alignItems: 'center',
        padding: 24
    },
    titlefont: {
        fontFamily: typography.jakarta_medium,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
        lineHeight: 16 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
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
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    titleCounatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }

});
