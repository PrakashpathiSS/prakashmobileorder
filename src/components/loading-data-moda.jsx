import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';
import { typography } from '../theme';
import { Vertical } from '../ui-kit/spacer';

const LoaderDataModal = ({ isVisible, dash }) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
        >
            <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View
                            style={[
                                styles.modalContent,
                                { backgroundColor: dash?.base_themes?.background_color },
                            ]}>

                            <Text style={[styles.titlefont, { color: dash?.base_themes?.active_text_color }]}>
                                Loading store data…
                            </Text>
                            <Vertical size={16} />
                            <ActivityIndicator color={dash?.base_themes?.button_color} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default LoaderDataModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '70%',
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        alignItems: 'center',
    },

    titlefont: {
        fontSize: 17,
        fontFamily: typography.jakarta_semibold,
        fontWeight: '600',
        lineHeight: 17 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
    },
    text: {
        fontFamily: typography.medium,
        fontSize: 16,
        color: '#FFFFFF',
        top: 2
    },


});
