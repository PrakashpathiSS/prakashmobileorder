import { StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard, Platform, InputAccessoryView, Button, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { color, typography } from '../theme';
import { formatCurrency } from "../utils/helpers";
import { useSelector } from 'react-redux';
import { Vertical } from '../ui-kit/spacer';

const Tip = ({
  calculateSubtotal = () => { },
  setTipsSelected,
  setChangeTip,
  setSelectedPercentage,
  setChangeCustomTip,
  removeBorder,
  changeCustomTip,
  tipsSelected,
  tipInputselect,
  setTipInputselect,
  dash
}) => {
  const [selection, setSelection] = useState({ start: 5, end: 5 });
  const { paymentMethod } = useSelector((state) => state?.user);
  const handleMovecursorEnd = () => {
    setSelection({ start: 5, end: 5 });
  };

  const calculateTipValues = (val) => {
    const subtotal = calculateSubtotal()
    const tipAmount = (subtotal * val).toFixed(2);
    const calculatedTip = tipAmount / 100;
    return calculatedTip;
  };

  const tip = [
    {
      totalPercentage: 20,
      value: calculateTipValues(20).toFixed(2),
    },
    {
      totalPercentage: 15,
      value: calculateTipValues(15).toFixed(2),
    },
    {
      totalPercentage: 10,
      value: calculateTipValues(10).toFixed(2),
    },
    {
      totalPercentage: 5,
      value: calculateTipValues(5).toFixed(2),
    },
  ];
  const inputAccessoryViewID = 'uniqueIDTip';
  const inputRef = useRef(null)

  return (
    <View style={[styles.itemcountainer, { backgroundColor: dash?.base_themes?.background_color }]} pointerEvents={paymentMethod == "Pay later" ? "none" : undefined}>
      <View style={styles.titlecouniainer}>
        <Text style={[styles.titletext, { color: dash?.base_themes?.inactive_text_color }]} allowFontScaling={false}>Select Tip</Text>
        <Image source={require('../assets/icons/check_icon.png')} style={[styles.ticimage, { tintColor: dash?.base_themes?.button_color }]} />
      </View>
      <Vertical size={16} />
      <View style={styles.countainer}>
        {(
          <>
            {tip?.map((val, index) => {
              return (
                <React.Fragment key={index}>
                  {index === tip.length - 1 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setTipInputselect(true)
                        setChangeTip("");
                        setTipsSelected(3);
                        setSelectedPercentage(0);
                        // inputRef?.current?.focus()
                      }}
                      style={[styles.inputcountainer, {
                        borderColor: tipInputselect
                          ? `${dash?.base_themes?.button_color}80`
                          : `${dash?.base_themes?.inactive_text_color}40`,
                        backgroundColor: tipInputselect
                          ? `${dash?.base_themes?.button_color}20`
                          : null,
                      }]}>
                      <View style={styles.inputflex}>
                        <Text style={[styles.dollertext, {
                          color: tipInputselect
                            ? dash?.base_themes?.button_color
                            : dash?.base_themes?.active_text_color
                        }]}>
                          $
                        </Text>
                        <TextInput
                          ref={inputRef}
                          inputAccessoryViewID={inputAccessoryViewID}
                          disabled={removeBorder}
                          keyboardType="numeric"
                          value={changeCustomTip}
                          placeholder='0.00'
                          defaultValue='0.00'
                          placeholderTextColor={tipInputselect
                            ? `${dash?.base_themes?.button_color}80`
                            : dash?.base_themes?.inactive_text_color}
                          style={[styles.inputtext, {
                            color: tipInputselect
                              ? dash?.base_themes?.button_color
                              : dash?.base_themes?.active_text_color
                          }]}
                          onFocus={() => {
                            setTipInputselect(true)
                            setChangeTip("");
                            setTipsSelected(3);
                            setSelectedPercentage(0);
                          }}
                          onChangeText={(val) => {
                            setChangeTip("");
                            handleMovecursorEnd();
                            const formattedAmount =
                              formatCurrency(val);
                            setChangeCustomTip(formattedAmount);
                          }}
                          maxLength={5}
                          onPointerUp={() => {
                            setChangeTip("");
                            setTimeout(() => {
                              handleMovecursorEnd();
                            }, 2);
                          }}
                          selection={selection}
                          onSelectionChange={() => {
                            handleMovecursorEnd(),
                              setChangeTip("");
                          }}

                        />
                        {Platform.OS === 'ios' ? (

                          <InputAccessoryView
                            nativeID={inputAccessoryViewID}
                            backgroundColor={color.palette.borderColor}>
                            <View
                              style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                              <Button
                                onPress={() => Keyboard.dismiss()}
                                title="Done"
                                style={{
                                  justifyContent: 'flex-end',
                                  alignContent: 'flex-end',
                                  alignItems: 'center',
                                  alignSelf: 'flex-end',
                                }}
                              />
                            </View>
                          </InputAccessoryView>

                        ) : null}
                      </View>

                      <View style={[[styles.radiocountainer, tipsSelected == index && {
                        backgroundColor: dash?.base_themes?.button_color,
                      }, { borderColor: `${dash?.base_themes?.inactive_text_color}40` }]]}>
                        <Image source={require('../assets/icons/check_icon.png')} style={styles.checkimage} />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={index}
                      style={[styles.buttonarea, {
                        borderColor: tipsSelected == index
                          ? `${dash?.base_themes?.button_color}80`
                          : `${dash?.base_themes?.inactive_text_color}40`,
                        backgroundColor: tipsSelected == index
                          ? `${dash?.base_themes?.button_color}20`
                          : null,
                        borderWidth: 1,
                        opacity: tipsSelected == index ? 1 : 0.7,
                      }]}
                      onPress={() => {
                        Keyboard.dismiss()
                        setTipInputselect(false)
                        setTipsSelected(index);
                        setChangeTip(val?.value);
                        setSelectedPercentage(
                          val?.totalPercentage
                        );
                        const formattedAmount =
                          formatCurrency("0");
                        setChangeCustomTip(formattedAmount);
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={[styles.tipbuttontext, {
                            color: tipsSelected == index
                              ? dash?.base_themes?.button_color
                              : dash?.base_themes?.active_text_color
                          }]}
                        >{`${val?.totalPercentage}%`} -
                          <Text style={styles.tipbuttontext}>
                            ${val?.value}
                          </Text>
                        </Text>

                      </View>
                      <View style={[[styles.radiocountainer, tipsSelected == index && {
                        backgroundColor: dash?.base_themes?.button_color,
                      }, { borderColor: `${dash?.base_themes?.inactive_text_color}40`}]]}>
                        <Image source={require('../assets/icons/check_icon.png')} style={styles.checkimage} />
                      </View>
                    </TouchableOpacity>
                  )}
                </React.Fragment>
              );
            })}
          </>
        )}
      </View>
    </View>

  )
}

export default Tip

const styles = StyleSheet.create({
  itemcountainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12
  },
  countainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  buttonarea: {
    height: 45,
    width: '49%',
    marginBottom: 10,
    justifyContent: "center",
    textAlign: 'center',
    alignItems: "center",
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  inputcountainer: {
    width: '49%',
    borderRadius: 8,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#DBDBD7',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  tipbuttontext: {
    fontSize: 14,
    fontFamily: typography.jakarta_medium,
    includeFontPadding: false,
    lineHeight: 14 * 1.3,
    paddingVertical: 0
  },
  dollertext: {
    fontSize: 14,
    fontFamily: typography.jakarta_medium,
    includeFontPadding: false,
    lineHeight: 14 * 1.3,
    paddingVertical: 0,
    marginRight: 5
  },
  inputtext: {
    fontSize: 14,
    width: "55%",
    height: 30,
    borderColor: '#C3C3C3',
    borderBottomWidth: 1,
    outlineColor: "rgb(231, 111, 81)",
    textAlign: 'right',
    includeFontPadding: false,
    lineHeight: 14 * 1.3,
    paddingVertical: 0
  },
  radiocountainer: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D5D7DA',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkimage: {
    width: 12,
    height: 12,
    resizeMode: 'contain'
  },
  ticimage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#009951',
    aspectRatio: 1 / 1
  },
  titlecouniainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titletext: {
    fontSize: 16,
    fontFamily: typography.jakarta_semibold,
    fontWeight: '500',
    lineHeight: 16 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
    color: '#AEAEB2'
  },
  inputflex:{ flexDirection: 'row', alignItems: 'center' }
})