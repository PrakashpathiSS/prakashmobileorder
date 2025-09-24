import { Platform, StyleSheet, View } from 'react-native'
import React from 'react'
import { Button } from '../../ui-kit/button'
import { English } from '../../utils/en'
import { color, typography } from '../../theme'
import UseCheckout from '../../hooks/use-checkout'
import CheckoutPageFooter from '../../components/checkout-page-footer'
import Tip from '../../components'
import { setIsexpandSummary } from '../../redux/slice/user'
import { Routes } from '../../navigation'

const TipScreen = () => {
  const { navigation } = UseCheckout()
  const {
    changeCustomTip,
    setChangeCustomTip,
    setChangeTip,
    setTipsSelected,
    setSelectedPercentage,
    calculateSubtotal,
    tipsSelected,
    calculateTax,
    calculateTotal,
    dash,
    tipInputselect,
    setTipInputselect,
    bottomSheetRef,
    dispatch,
  } = UseCheckout('tip')
 
  return (
    <View style={styles.conntainer}>
      <View style={styles.header}>
        <Tip
          calculateSubtotal={calculateSubtotal}
          setTipsSelected={setTipsSelected}
          setChangeTip={setChangeTip}
          setSelectedPercentage={setSelectedPercentage}
          setChangeCustomTip={setChangeCustomTip}
          changeCustomTip={changeCustomTip}
          tipsSelected={tipsSelected}
          tipInputselect={tipInputselect}
          setTipInputselect={setTipInputselect}
          dash={dash}
        />
      </View>


      <CheckoutPageFooter
        btntitle={English.checkout.btn_next}
        calculateSubtotal={calculateSubtotal}
        calculateTax={calculateTax}
        calculateTotal={calculateTotal}
        calculateTip={dash?.tipAmount}
        onPress={() => {
          navigation.navigate(Routes.PAYMENTDETAILS)
          bottomSheetRef.current?.collapse();
          dispatch(setIsexpandSummary(false))
        }}
        bottomSheetRef={bottomSheetRef}
      />
    </View>
  )
}

export default TipScreen

const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
  },
  header: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  foter: {
    flex: 0.5,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button_style: {
    backgroundColor: '#6D54CF',
    paddingVertical: 14,
    borderRadius: 15
  },

  button_text_style: {
    fontSize: 20,
    fontFamily: typography.semibold
  },

  button_div: {
    marginHorizontal: 4,
    marginBottom: 10
  },
})