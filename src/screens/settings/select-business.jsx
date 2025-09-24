import { _View, FlatList, Image, Platform, Pressable, StyleSheet, View } from 'react-native'
import { color } from '../../theme/color'
import { Text } from '../../ui-kit/text'
import UseSelectBusiness from '../../hooks/use-select-business'
import { English } from '../../utils/en'
import { Button } from '../../ui-kit/button'
import DeletebuisnessModal from '../../components/delete-buisness-confirmation'
import { typography } from '../../theme'
import LoaderDataModal from '../../components/loading-data-moda'
import { baseFont } from '../../theme/font-size'
import { Vertical } from '../../ui-kit/spacer'
import { Divider } from '../../ui-kit/divider'
import AddbusinessModal from '../../components/addbusiness-modal'

const SelectBusiness = () => {

  const {
    handleBack,
    handleProfileOptions,
    showModal,
    formik,
    setShowModal,
    dash,
    loading,
    opendeleteModal,
    handleClose,
    handleConfirm,
    handleOpenBusinessmodal
  } = UseSelectBusiness()

  return (
    <View style={styles.contnetCountainer}>

      <FlatList
        style={styles.parent_div}
        ListHeaderComponent={
          <View style={styles.container}>

            {/* backbutton */}
            <Pressable
              style={styles.back_button_div}
              onPress={handleBack}
            >
              <Pressable
                onPress={handleBack}
                style={styles.back_arrow_icon_style}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <Image
                  source={require('../../assets/icons/backbutton.png')}
                  style={[styles.img_style,{tintColor:dash?.base_themes?.active_text_color}]}
                />
              </Pressable>

              <Text style={[styles.cart_text_style,{color:dash?.base_themes?.active_text_color}]}>
                {English.select_business.title}
              </Text>
            </Pressable>
            <Vertical size={24} />
            <Divider style={{ borderColor: `${dash?.base_themes?.inactive_text_color}40` }} />
            <Vertical size={24} />
            <Text style={[styles.cart_sub_text_style,{color:dash?.base_themes?.active_text_color}]}> {English.select_business.label} </Text>
            <Vertical size={24} />
            {/* business options */}
            <FlatList
              data={dash?.business}
              renderItem={handleProfileOptions}
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}
              key="!"
              keyExtractor={(item, index) => {
                return '!' + index;
              }}
            />
          </View>
        }
      />

      <View style={[styles.fixed_bottom_style, Platform.OS == 'ios' && { paddingBottom: '15%' }]}>
        {/* add new business */}
        <View style={styles.button_div}>
          <Button
            title={English.select_business.btn_title}
            style={[styles.addnewbusinessbtn, { backgroundColor: dash?.base_themes?.button_color }]}
            imageDivStyle={styles.image_div_style}
            textStyle={[styles.buttontext, { color:dash?.base_themes?.button_text_color }]}
            onPress={() => {
              handleOpenBusinessmodal()
            }}
          />
        </View>
      </View>


      <AddbusinessModal
        formik={formik}
        isvisibe={showModal}
        onPress={() => {
          setShowModal(false)
        }}
        dash={dash}
      />

      <DeletebuisnessModal
        isVisible={opendeleteModal}
        onClose={handleClose}
        onConfirm={handleConfirm}
        dash={dash}
      />

      <LoaderDataModal
        isVisible={loading}
        dash={dash}
      />
    </View>
  )
}

export default SelectBusiness

const styles = StyleSheet.create({
  contnetCountainer: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  parent_div: {
    height: '100%',

  },

  container: {
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  back_button_div: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  img_style: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },

  back_arrow_icon_style: {
    width: 8,
    height: 16
  },

  cart_text_style: {
    fontSize: baseFont.profile_title,
    fontWeight: '600',
    fontFamily: typography.jakarta_semibold,
    color: '#101010',
    includeFontPadding: false,
    lineHeight: baseFont.profile_title * 1.3,
    paddingVertical: 0
  },

  cart_sub_text_style: {
    fontSize: baseFont.profile_label_sub_title,
    fontWeight: '600',
    fontFamily: typography.jakarta_semibold,
    color: '#11181C',
    includeFontPadding: false,
    lineHeight: baseFont.profile_label_sub_title * 1.3,
    paddingVertical: 0
  },

  fixed_bottom_style: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    backgroundColor: '#FFFFFF',
  },

  button_div: {
    marginHorizontal: 4,
    marginBottom: 0
  },

  image_div_style: {
    width: '100%',
    justifyContent: 'space-between',
  },

  btn: {
    width: '100%',
    height: 49,
    backgroundColor: '#634EC1',
    borderRadius: English.rounde_edge.button
  },
  addnewbusinessbtn: {
    width: '100%',
    height: 49,
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
})