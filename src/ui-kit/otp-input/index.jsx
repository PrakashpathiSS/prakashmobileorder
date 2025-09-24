import React, {
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    useCallback,
  } from 'react';
  import {
    View,
    TextInput,
    StyleSheet,
    Keyboard,
    TouchableOpacity,
  } from 'react-native';
  import {color, spacing, typography} from '../../theme';
  import {Text} from '../text';
  import {equals, flatten, mergeAll} from 'ramda';
  
  const styles = StyleSheet.create({
    inputStyle: (error, lift, isFocused, last, secured) => ({
      height: 50,
      width: 50,
      lineHeight: 40,
      // lineHeight: secured ? 40 : 22,
      // to make text verically center aligned on iOS
      // ...Platform.select({
      //   ios: {lineHeight: secured ? 40 : 22},
      //   android: {lineHeight: secured ? 40 : 22},
      // }),
      backgroundColor: color.palette.otpColor,
      borderColor: error
        ? '#ff0000'
        : isFocused
        ? '#E76F51'
        : '#E76F51',
      borderWidth: 0.5,
      borderRadius: 10,
      color: error ? '#ff0000' : '#000000',
      textAlign: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      paddingBottom: 0,//10-> i replaced this value
      fontFamily: typography.secondary,
  
      // ...(lift ? {fontSize: 35} : {fontSize: 14}),
      // ...(lift && last && {fontSize: 35}),
      // ...(lift
      //   ? {fontSize: 35, paddingBottom: 4}
      //   : {fontSize: 14, paddingBottom: 7}),
      // ...(lift && last && {fontSize: 35, paddingBottom: 4}),
    }),
  });
  
  const CONTAINER = {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  };
  
  const WRAPPER = {
    flexDirection: 'column',
  };
  
  const ERROR = {
    alignSelf: 'flex-start',
    marginHorizontal: spacing[5] + 2,
    fontSize: 10,
    fontFamily: typography.primary,
  };
  
  const LABEL = {
    marginBottom: 5,
    width: '100%',
  };
  
  const enhance = (style, styleOverride) =>
    mergeAll(flatten([style, styleOverride]));
  
  /**
   * @param: ref -> forward a ref to this component to call methods imperatively
   * @prop: callbackOnInput(ready, value) -> sends otp value every time the otp digits are changed
   * true if otp is ready and the otp value, false if not ready and null as otp value
   * @prop: error -> error to be displayed if incase otp verification fails
   * @prop: pinCount -> no of inputs
   * @prop: errorStyle:{} -> enhance default style
   * @prop: style:{} -> enhance container style
   * @prop: labelStyle:{} -> enhance label style
   * @prop: successStyle:{} -> enhance success text
   * @prop: label:string -> top label in case of fields like referal code
   * @prop: required -> to mark labels with *
   * @prop: focusOnStart:bool -> focus to 0th input on loading component
   * @prop: keyboardType:string -> override numeric keyboard in with argument type
   * @prop: secureTextEntry:bool -> override to false to show text on entry
   * @prop: successMsg:string -> display a sucess message in case of positive outcome
   * @prop: showErrorMesssage:bool -> override display of error message
   */
  export const OtpInput = React.forwardRef((props, ref) => {
    const {
      callbackOnInput,
      pinCount = 4,
      error,
      errorStyle: errorStyleOverride,
      style: styleOverride,
      labelStyle: labelStyleOverride,
      successStyle: successStyleOverride,
      inputStyle,
      label,
      required,
      focusOnStart = true,
      secureTextEntry = true,
      keyboardType: keyboardTypeOverride = 'numeric',
      successMsg,
      showErrorMessage = true,
    } = props;
  
    const default_otp = Array(pinCount).fill('_').join('');
  
    const inputRef = useRef([]);
    const isKeyboardOpen = useRef(true);
  
    const [otp, setOtp] = useState(default_otp);
    const [currentFocus, setCurrentFocus] = useState(0);
    let labelStyle = enhance(LABEL, labelStyleOverride);
  
    useImperativeHandle(ref, () => ({
      clearPin() {
        setOtp(default_otp);
        focusToStart();
      },
    }));
  
    useEffect(() => {
      if (equals(otp.length, pinCount) && !otp.includes('_')) {
        callbackOnInput(true, otp);
        Keyboard.dismiss();
      } else {
        callbackOnInput(false, null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otp, pinCount]);
  
    useEffect(() => {
      focusOnStart &&
        setTimeout(() => {
          focusToStart();
        }, 500);
    }, [focusOnStart]);
  
    const focusToStart = () => inputRef.current[0]?.focus();
  
    const replaceOtpString = (index, val) => {
      let newOtp = otp;
  
      const newVal =
        newOtp?.substring(0, index) +
        val +
        newOtp?.substring(index + 1, newOtp.length);
      setOtp(newVal);
    };
  
    const focusNext = (index, val) => {
      if (!val.match('^[A-Za-z0-9]*$')) {
        return;
      }
  
      const nIndex = index;
  
      if (index < inputRef.current.length && val) {
        inputRef.current[nIndex + 1]?.focus();
      }
      replaceOtpString(nIndex, val);
    };
  
    const focusPrevious = (key, index) => {
      if (equals(key, 'Backspace')) {
        if (otp[index] !== '_') {
          replaceOtpString(index, '_');
        } else {
          if (index > 0) {
            inputRef.current[index - 1]?.focus();
            replaceOtpString(index - 1, '_');
          }
        }
      }
    };
  
    const getText = val =>
      !equals(val, '_') ? (secureTextEntry ? '.' : val) : '';
  
    const keyboardDidShow = () => {
      isKeyboardOpen.current = true;
    };
  
    const keyboardDidHide = () => {
      isKeyboardOpen.current = false;
    };
  
    useEffect(() => {
      Keyboard.addListener('keyboardDidShow', keyboardDidShow);
      Keyboard.addListener('keyboardDidHide', keyboardDidHide);
  
      // cleanup function
      return () => {
        if (Keyboard.removeListener) {
          Keyboard?.removeListener('keyboardDidShow', keyboardDidShow);
          Keyboard?.removeListener('keyboardDidHide', keyboardDidHide);
        }
      };
    }, []);
  
    const showError = useCallback(
      () => showErrorMessage && error,
      [showErrorMessage, error],
    );
  
    useEffect(() => {
      resetOtp();
    }, []);
  
    const resetOtp = () => {
      setOtp(Array(4).fill('_').join(''));
    };
  
    return (
      <View style={WRAPPER}>
        {label && (
          <Text variant={'fieldLabel'} style={labelStyle}>
            {label}
            {required && label && <Text variant={'fieldError'}>*</Text>}
          </Text>
        )}
        <View style={[CONTAINER, styleOverride]}>
          {otp.split('').map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              activeOpacity={1}
              onPress={() => {
                let currIndex = otp.indexOf('_');
                let ind = equals(currIndex, -1) ? pinCount - 1 : currIndex;
                inputRef.current[ind]?.blur();
                inputRef.current[ind]?.focus();
              }}>
              <View pointerEvents={'none'}>
                <TextInput
                  style={StyleSheet.flatten([styles.inputStyle(
                    error,
                    !equals(otp[index], '_') && secureTextEntry,
                    equals(index, currentFocus),
                    equals(index, pinCount - 1) && secureTextEntry,
                    secureTextEntry,
                  ),inputStyle])}
                  value={getText(otp[index])}
                  onKeyPress={e => focusPrevious(e.nativeEvent.key, index)}
                  onChangeText={text => {
                    text !== '' && focusNext(index, text);
                  }}
                  ref={_ref => {
                    inputRef.current[index] = _ref;
                  }}
                  maxLength={1}
                  secureTextEntry={false}
                  keyboardType={keyboardTypeOverride}
                  onFocus={() => setCurrentFocus(index)}
                  selectionColor={'#C4C4C4'}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {showError() && (
          <Text variant={'fieldError'} style={[ERROR, errorStyleOverride]}>
            {error}
          </Text>
        )}
        {!!successMsg && (
          <Text variant={'success'} style={[ERROR, successStyleOverride]}>
            {successMsg}
          </Text>
        )}
      </View>
    );
  });