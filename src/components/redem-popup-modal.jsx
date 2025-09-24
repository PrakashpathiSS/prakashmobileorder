import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import { color, typography } from '../theme'
import { English } from '../utils/en';
import { palette } from '../theme/palette';
import { Button } from '../ui-kit/button';
const RedemPopupModal = ({
    isVisible = false,
    loader,
    onClose,
    onSubmit,
}) => {

    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <TouchableWithoutFeedback>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.modalOverlay}
                >
                    <View
                        pointerEvents={loader ? "none" : undefined}
                        style={[
                            styles.modalContainer,
                            { backgroundColor: '#FFFFFF' },
                        ]}>

                        <Text style={styles.textName}>{English.modals.redem_popup_modal.title1}</Text>

                        <View style={styles.buttonRow}>
                            <Button
                                image={false}
                                title={English.modals.redem_popup_modal.button1}
                                style={[
                                    styles.btn1,
                                    { backgroundColor: '#B7B6B6' },
                                ]}
                                onPress={onClose}
                            />
                            <Button
                                image={false}
                                loading={loader}
                                title={English.modals.redem_popup_modal.button2}
                                style={[
                                    styles.btn,
                                    { backgroundColor: '#6D54CF' },
                                ]}
                                onPress={onSubmit}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default RedemPopupModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '95%',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderRadius: 7,
        paddingTop: 5,
    },
    textName: {
        fontFamily: typography.medium,
        fontSize: 20,
        color: palette.black,
        width: '100%',
        textAlign: 'center',
        marginTop: 10
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        paddingBottom: 20,
        width: '100%',
        gap: 30,
    },
    btn: {
        width: 140,
        height: 45,
    },
    btn1: {
        width: 120,
        height: 45,
    },

});
