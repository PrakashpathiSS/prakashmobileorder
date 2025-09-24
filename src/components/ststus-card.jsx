import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback } from 'react-native'
import { color, typography } from '../theme'
import { English } from '../utils/en'
import { Button } from '../ui-kit/button'
import { baseFont } from '../theme/font-size'
import { Vertical } from '../ui-kit/spacer'

const StstusCard = ({
  isVisible,
  successResponse,
  values,
  onClose,
  dash
}) => {

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={[styles.pageCountainer,{backgroundColor:dash?.base_themes?.background_color}]}>

              <View style={styles.subcountainer}>

                {
                  successResponse &&
                  (
                    <>
                      {
                        (successResponse?.statusCode == 400 && successResponse?.data?.status !== "Failed" &&
                          successResponse?.data?.status !== "Declined") &&
                        <>

                          <Text style={[styles.statusFont,{color:dash?.base_themes?.active_text_color}]}>
                            {`${successResponse?.message?.expirationMonth ?? successResponse?.message}`}
                            <Vertical size={10} />
                            {successResponse?.data?.validation_error && (
                              <Text style={[styles.statusFont,{color:dash?.base_themes?.active_text_color}]}>
                                .{' '}
                                {successResponse?.data?.validation_error}{''}. {English.status_card.try_againText_text}
                              </Text>
                            )}
                          </Text>
                        </>
                      }

                      {successResponse?.data?.status === "Declined" && (
                        <>
                          <Text
                            style={[styles.statusFont, {
                              color:
                                successResponse?.data?.status === "Failed" ||
                                  successResponse?.data?.status === "Declined"
                                  ? '#ff0000'
                                  : '#2A9D8F'
                            }]}
                          >
                            {successResponse?.status ??
                              successResponse?.data?.status}.
                            <Vertical size={10} />
                            <Text style={[styles.statusFont,{color:dash?.base_themes?.active_text_color}]}>
                              {' '}{successResponse?.message}.
                            </Text>
                            <Vertical size={10} />
                            <Text style={[styles.statusFont,{color:dash?.base_themes?.active_text_color}]}
                            >
                              {''} {successResponse?.data?.hostresponsecode}, {successResponse?.data?.hostresponsemessage}, {successResponse?.data?.processorresponsecode}
                            </Text>
                          </Text>
                          <Vertical size={10} />
                          <Text style={[styles.statusFont,{color:dash?.base_themes?.active_text_color}]}>
                            {English.status_card.try_different_card_text}
                          </Text>
                        </>
                      )}

                      {successResponse?.status === "Captured" && (
                      <>

                        <Text
                          style={[styles.statusFont, {
                            color:
                              successResponse?.data?.status === "Failed" ||
                                successResponse?.data?.status === "Declined"
                                ? '#ff0000'
                                : '#2A9D8F',
                          }]}
                        >
                          {successResponse?.status ??
                            successResponse?.data?.status}
                        </Text>
                        <Vertical size={10} />
                        <Text style={[styles.statusFont,{color:dash?.base_themes?.active_text_color}]}>
                          {English.status_card.Thank_you_for_order_text}{values?.name && values?.name ? `, ${values?.name}` : '.'}
                        </Text>
                        <Vertical size={10} />
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: typography.semibold,
                            textAlign: "center",
                            paddingTop: 10,
                          }}
                        >
                          {English.status_card.Your_order_text} {successResponse?.order_id}.
                        </Text>
                        <Vertical size={10} />
                        <Text style={[styles.statusFont,{color:dash?.base_themes?.active_text_color}]}>
                          {English.status_card.please_your_order_text}
                        </Text>
                        <Vertical size={10} />
                        <Text style={[styles.statusFont,{color:dash?.base_themes?.active_text_color}]}>
                          {English.status_card.payment_capture_text} {successResponse?.payment_transaction?.authcode}
                        </Text>
                      </>
                      )}

                      {successResponse?.status == "Pay_later" &&
                        <>
                          <Text style={[styles.statusFont,{color:dash?.base_themes?.active_text_color}]}>
                            {English.status_card.Thank_you_for_order_text}{values?.name && values?.name ? `, ${values?.name}` : '.'}
                          </Text>
                          <Vertical size={10} />
                          <Text style={[styles.statusFont,{color:dash?.base_themes?.active_text_color}]}>
                            {English.status_card.Your_order_text} {successResponse?.order_id}.
                          </Text>
                          <Vertical size={10} />
                          <Text style={[styles.statusFont,{color:dash?.base_themes?.active_text_color}]}>
                            {English.status_card.please_your_order_text}
                          </Text>
                        </>
                      }
                       {successResponse?.statusCode === 500 &&
                        <View style={styles.statuscountainer}>
                          <Text style={[styles.statusFont,{color:dash?.base_themes?.active_text_color,textAlign:'left'}]}>
                            message: {successResponse?.data?.message ||""}
                          </Text>
                          <Vertical size={10} />
                          <Text style={[styles.statusFont,{color:dash?.base_themes?.active_text_color,textAlign:'left'}]}>
                            Status: {successResponse?.statusCode||""}
                          </Text>
                        </View>
                      }
                    </>
                  )}
              </View>
              <Vertical size={25} />
              <Button
                title={"Close"}
                textStyle={[styles.buttontext,{color:dash?.base_themes?.button_text_color}]}
                style={[styles.btn, { backgroundColor: dash?.base_themes?.button_color }]}
                onPress={onClose}
              />

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default StstusCard

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pageCountainer: {
    backgroundColor: "#FFF",
    height: "auto",
    width: "95%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: 'space-around',
    padding: 16
  },
  statusFont: {
    fontSize: 16,
    fontFamily: typography.jakarta_semibold,
    fontWeight: '600',
    lineHeight: 16 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
    textAlign: 'center'
  },
  btn: {
    width: '100%',
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
  statuscountainer:{width:'100%',alignItems:'flex-start'},
  subcountainer:{width:'100%'}
})