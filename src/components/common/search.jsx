import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Image,
  InputAccessoryView,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { color, typography } from '../../theme';
import { English } from '../../utils/en';
import { useDispatch } from 'react-redux';
import { baseFont } from '../../theme/font-size';


export const SearchComponent = ({ dash,text, editable,setText, placeholder, borderStyle, showClear = false, onPressClear, textAlignVertical = 'center' }) => {
  const dispatch = useDispatch()
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (inputRef.current) {
          inputRef.current.blur(); // Remove focus from the input when the keyboard is minimized
        }
      },
    );

    // Cleanup the event listener when the component unmounts
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  const inputAccessoryViewID = 'search';

  return (
    <View style={[styles.searchContainer, borderStyle]}>

      <View style={styles.innerRow}>
        <Image
          source={require('../../assets/icons/magnify-glass-icon.png')}
          style={[styles.insideIcon,{tintColor: `${dash?.base_themes?.inactive_text_color}60`}]}
        />
        <TextInput
          ref={inputRef}
          value={text}
          autoFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          style={[styles.input, { color: dash?.base_themes?.active_text_color  }]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={val => {
            setText(val);
          }}
          placeholder={placeholder}
          placeholderTextColor={dash?.base_themes?.inactive_text_color}
          returnKeyType="go"
          returnKeyLabel="Search"
          textAlignVertical={textAlignVertical}
          inputAccessoryViewID={inputAccessoryViewID}
editable={editable}
        />

        {Platform.OS === 'ios' && (
          <>
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
          </>
        )}
      </View>
      {(text?.length > 0 || showClear) ? (
        <TouchableOpacity
          hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
          style={styles.crossIcon}
          onPress={() => {
            setText('');
            onPressClear && onPressClear()
          }}>
          <Image
            source={require('../../assets/icons/searchCancel.png')}
            style={[styles.cancel,{tintColor: `${dash?.base_themes?.inactive_text_color}60`}]}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 11,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: English.rounde_edge.layout,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: color.palette.borderColor,
    marginBottom: 10,
    alignItems: 'center'
  },

  input: {
    fontFamily: typography.jakarta_regular,
    fontSize: baseFont.search_text,
    width: '80%',
    height: 40,
    color: '#000000',
    padding: 0,
    margin: 0,
    lineHeight: baseFont.search_text * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
    fontWeight:'400'
  },
  insideIcon: { height: 18, width: 18, alignSelf: 'center', marginRight: 17 },
  crossIcon: {
    justifyContent: 'center',
  },
  searchCancel: {
    width: '20%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cancel: {
    height: 18,
    width: 18,
    alignSelf: 'center',
    left: 5
  },
  rowView: {
    flexDirection: 'row',
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 15,
    alignSelf: 'center',
  },
  images: {
    height: 33,
    width: 50,
    marginRight: 10,
  },

});
