import { Modal, Pressable, StyleSheet, TextInput, View, Image } from 'react-native'
import { Button } from '../ui-kit/button'
import { Text } from '../ui-kit/text'
import { English } from '../utils/en'
import { color, typography } from '../theme'
import { baseFont } from '../theme/font-size'
import { Vertical } from '../ui-kit/spacer'

const NotesModal = ({
    openModal,
    setOpenModal,
    handleNoteDone,
    note,
    setNote,
    dash,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={openModal}
        >
            <Pressable onPress={() => setOpenModal(false)} style={styles?.modalBg}>
                <View onStartShouldSetResponder={() => true} style={[styles.modal, { backgroundColor: dash?.base_themes?.background_color }]}>
                    <View style={styles.titleCounatiner}>
                        <Text style={[styles.modalTitle, { color: dash?.base_themes?.active_text_color }]}>
                            {English.home.note_title} {dash?.selected_item?.name}
                        </Text>
                        <Pressable hitSlop={40} onPress={() => {
                            setNote('')
                            setOpenModal(false)
                        }}>
                            <Image source={require('../assets/icons/xmarkiocn.png')} style={[styles.closeicon, { tintColor: dash?.base_themes?.active_text_color }]} />
                        </Pressable>
                    </View>
                    <Vertical size={4} />
                    <Text style={[styles.modalsubTitle, { color: dash?.base_themes?.inactive_text_color }]}>
                        {English.home.notes_sub_title}
                    </Text>
                    <Vertical size={20} />
                    <View>
                        <TextInput
                            onChangeText={(value) => setNote(value)}
                            value={note}
                            multiline
                            style={[styles?.noteInput, {
                                borderColor: dash?.base_themes?.inactive_text_color,
                                color: dash?.base_themes?.active_text_color
                            }]}
                            placeholder={English.home.notes_plasholder}
                            placeholderTextColor={dash?.base_themes?.inactive_text_color}
                            textAlignVertical='top'
                        />
                    </View>

                    {/* buttons */}
                    <Vertical size={32} />
                    <View style={styles.buttonCountainer}>
                        <Button
                            title={English.home.note_Cancel}
                            style={[styles.closebutton, {
                                backgroundColor: dash?.base_themes?.background_color,
                                borderColor: `${dash?.base_themes?.button_color}80`
                            }]}
                            onPress={() => {
                                setNote('')
                                setOpenModal(false)
                            }}
                            textStyle={[styles.buttontext, { color: dash?.base_themes?.button_color }]}
                        />
                        <Button
                            title={English.home.note_done}
                            style={[styles.btn, { backgroundColor: dash?.base_themes?.button_color }]}
                            onPress={handleNoteDone}
                            textStyle={[styles.buttontext, { color: dash?.base_themes?.button_text_color }]}
                        />
                    </View>
                </View>
            </Pressable>
        </Modal>
    )
}

export default NotesModal

const styles = StyleSheet.create({

    modalBg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.56)',

    },

    modal: {
        backgroundColor: '#FFFFFF',
        width: '90%',
        height: 'auto',
        padding: 24,
        borderRadius: 12
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
    },

    noteInput: {
        borderWidth: 1,
        borderColor: '#D5D7DA',
        height: 154,
        borderRadius: 10,
        padding: 14
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
})