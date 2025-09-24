/* eslint-disable react-native/no-inline-styles */
import { flatten, mergeAll } from 'ramda';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Modal,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { color, spacing, typography } from '../../theme';
import { Divider } from '../divider';
import { Loader } from '../loader';
import { Text } from '../text';

const INPUT = {
  backgroundColor: '#FFFFFF',
  paddingHorizontal: spacing[3],
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  //   height: 42,
};

const LABEL = {
  // marginBottom: 12,
  fontSize: 13,
  color: color.palette.labelColor,
  //   lineHeight: 16.94,
  //   fontWeight: '600',
  fontFamily: typography.primary
};

const DISABLE = {
  backgroundColor: color.palette.borderLine1,
};

const VARIATIONS = {
  bordered: {
    // borderWidth: StyleSheet.hairlineWidth,
    borderWidth: 1,
    borderColor: color.palette.borderLine,
    borderRadius: 4,
  },
  underline: {
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.hairLineColor,
  },
  danger: {
    // borderWidth: StyleSheet.hairlineWidth,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 4,
  },
  disabled: {
    // borderWidth: 1
    //borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.hairLineColor,
    borderRadius: 10,
    backgroundColor: color.palette.borderLine1,
  },
};

const ERROR = {
  borderColor: '#ff0000',
};

const ICON_CONTAINER = {
  height: '100%',
  aspectRatio: 0.5,
  justifyContent: 'center',
  position: 'absolute',
  right: 5,
  marginRight: 5,
  marginLeft: 4,
};

const ICON = {
  width: 15,
  height: 15,
  // marginLeft: 20,
};

const PLACEHOLDER = {
  fontSize: 14,
  //   lineHeight: 17,
  letterSpacing: -0.14,
  fontFamily: typography.primary,
  color: color.palette.textGrey,
  //   top: -3, //i commented this value
  // backgroundColor: 'red',
  padding: 5,
};

const TEXTSTYLE = {
  lineHeight: 17,
  letterSpacing: -0.14,
  fontFamily: typography.primary,
  color: '#000000',
  fontSize: 14,
  padding: 5,
};

const ERROR_CONTAINER = {
  //   marginTop: 0.5,
  fontSize: 12,
  fontFamily: typography.primary,
};

const borderError = {
  //   position: 'absolute',
  //   bottom: Platform?.OS === 'ios' ? -24 : -20,
  bottom: -4,
};

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]));
};

export function Select(props) {
  const {
    placeholder,
    value,
    options,
    textStyle: textOverride,
    inputStyle: inputStyleOverride,
    iconStyle: iconStyleOverride,
    placeholderStyle: placeholderStyleOverride,
    loading,
    onIconPress = () => { },
    onPress = () => { },
    icon,
    required,
    variant = 'bordered',
    label = '',
    disable = false,
    labelStyle: labelStyleOverride,
    style: styleOverride,
    source,
    errorMessage,
    errorStyle: errorStyleOver,
    noRecordTitle = 'No Record Found',
    option_name = null
  } = props;

  let errorStyleOverride = errorMessage ? ERROR : {};

  let inputStyle = enhance({ ...INPUT, ...VARIATIONS[variant] });

  inputStyle = enhance(inputStyle, inputStyleOverride);

  inputStyle = disable ? enhance(inputStyle, DISABLE) : inputStyle;
  inputStyle = enhance(inputStyle, errorStyleOverride);

  let textStyle = enhance(TEXTSTYLE, textOverride);
  //   inputStyle = enhance(inputStyle, errorStyleOverride);

  let iconStyle = enhance(ICON, iconStyleOverride);

  let placeholderStyle = enhance(PLACEHOLDER, placeholderStyleOverride);

  let labelStyle = enhance(LABEL, labelStyleOverride);
  const [showDownPage, setShowDownPage] = useState(false);

  const handleSelect = () => {
    setShowDownPage(showDownPage => !showDownPage);
  };

  let errorStyle =
    variant === 'bordered'
      ? enhance(ERROR_CONTAINER, borderError, errorStyleOver)
      : enhance(ERROR_CONTAINER, errorStyleOver);

  return (
    <View style={{ flex: 1 }}>
      {label ? (
        <Text variant={'fieldLabel'} style={labelStyle}>
          {label}
          {required && label && (
            <Text variant={'fieldError'} style={{ color: '#ff0000' }}>
              *
            </Text>
          )}
        </Text>
      ) : null}
      <Pressable
        style={[
          inputStyle,
          styles.container
        ]}
        onPress={() => {
          if (!disable) {
            handleSelect();
          }
        }}>
        <Text
          numberOfLines={1}
          style={
            value === null || value === '' || value === '/' || value === undefined
              ? placeholderStyle
              : textStyle
          }>
          {value === null || value === '' || value === '/' || value === undefined
            ? placeholder
            : value}
        </Text>

        <View style={iconStyle}>
          <Image
            source={require('../../assets/icons/downarrow.png')}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            resizeMode={'contain'}
          />
        </View>
      </Pressable>
      {!!errorMessage && (
        <Text variant="fieldError" style={errorStyle}>
          {errorMessage.includes('server') ||
            errorMessage.includes('undefined')
            ? null
            : errorMessage}
        </Text>
      )}
      <Modal
        transparent={true}
        visible={showDownPage}
        animationType="fade"
        onRequestClose={() => setShowDownPage(false)}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={() => setShowDownPage(false)}
        >
          <Pressable
            onPress={() => {
              setShowDownPage(false);
            }}
            style={{
              position: 'absolute',
              flex: 1,
              zIndex: 99999,
              top: Platform.OS == "ios" ? 140 : 100,
              left: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                borderWidth: 1,
                borderColor:'#7D7D7D'
              }}
            >
              {!loading ? (
                <>
                  {options?.length ? (
                    <View
                      style={
                        source === 'marketTradeFilter'
                          ? [styles.dropDownView, styleOverride]
                          : [
                            styles.dropDownView,
                            styleOverride,
                            {
                              marginVertical: 0,
                            },
                          ]
                      }>
                      <ScrollView>
                        {options?.map((item, index) => {
                          return (
                            <View key={index}>
                              <Pressable
                                style={value === item?.store_name ? {
                                  borderWidth: 1,
                                  borderColor: '#6D54CF',
                                  borderRadius: 8
                                } : {
                                  backgroundColor: '#FFFFFF'
                                }
                                }
                                onPress={() => {
                                  onPress(item, index);
                                  setShowDownPage(false);
                                }}
                                key={'^' + index?.toString()}>
                                <Text
                                  style={
                                    [styles.overideStyle,
                                    {
                                      color: value === item?.store_name ?
                                        '#6D54CF' : 'rgba(0,0,0,0.5)'
                                    }
                                    ]
                                  }
                                >
                                  {/* {option_name
                                  ? item[option_name]
                                  : item?.district_name ?? item} */}
                                  {item?.district_name ??
                                    item?.order_status_name ??
                                    item?.store_name ??
                                    item}
                                </Text>
                                {value === item?.store_name ?
                                  null : <Divider />
                                }
                              </Pressable>
                              {/* <Divider /> */}
                            </View>
                          );
                        })}
                      </ScrollView>
                    </View>
                  ) : (
                    <View style={styles.dropDownView}>
                      <Text style={styles.noRecord}>{noRecordTitle}</Text>
                    </View>
                  )}
                </>
              ) : (
                <View style={[styles.dropDownView, { height: 150 }]}>
                  <Loader style={{ paddingBottom: 0 }} />
                </View>
              )}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // height: 89,
  },
  dropDownView: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    maxHeight: Dimensions.get('screen').height - 300,
    paddingVertical: 10,
    paddingHorizontal: 10,

    // shadowColor: '#000',
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    borderRadius: 6,
    // elevation: 5,
  },
  paddingPosition: {
    position: 'absolute',
    top: 75,
    zIndex: 2,
  },

  overideStyle: {
    marginHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16
    // paddingHorizontal: 14
    // backgroundColor: '#000000',
  },

  noRecord: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#ff0000',
    fontSize: 16,
    fontFamily: typography.secondary,
  },

  down_arrow_icon_style: {
    width: 23.33,
    height: 16.67
  },

  img_style: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },

  select_text_style: {
    fontSize: 16,
    color: '#7D7D7D'
  },

  select_div: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderRadius: 8
  }
});