import { View, TouchableOpacity, Text, Platform, Image, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Routes } from '../routes';
import { English } from '../../utils/en';
import { typography } from '../../theme';
import { Vertical } from '../../ui-kit/spacer';
import { baseFont } from '../../theme/font-size';
import { setIsexpandSummary, setPaymentDetails, setPaymentMethod } from '../../redux/slice/user';
import { useDispatch } from 'react-redux';

const CustomTabBar = ({ state, navigation, dash }) => {
  const dispatch = useDispatch()
  const handleCheckout = () => {
    dispatch(setPaymentMethod(English.payment_type.pay_type[0]))
    dispatch(setIsexpandSummary(false))
    dispatch(setPaymentDetails(null))
    navigation.navigate(Routes.TopTabStack)
   
  }


  return (
    <View style={[styles.cuntainer, { display: dash?.hidetabbar ? 'none' : 'flex' }]}>
      <BlurView
        style={styles.blureArea}
        blurType={Platform.OS == "ios" ? "ultraThinMaterialLight" : "light"}
        blurAmount={80}
      />

      <View style={styles.itemiconArea} >
        {state?.routes.map((route, index) => {
          const label = [
            English.bottom_tab_screen.option_1,
            English.bottom_tab_screen.option_2,
            English.bottom_tab_screen.option_3,
            English.bottom_tab_screen.option_4
          ]

          const icons = [
            require('../../assets/icons/home-icon.png'),
            require('../../assets/icons/items-icon.png'),
            require('../../assets/icons/cart-icon.png'),
            require('../../assets/icons/settings-icon.png')
          ]



          const isFocused = state.index === index;

          const onPress = () => {
            if (route.name == 'cart') {
              handleCheckout()
              return
            }
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.iconarea}
            >
              {/* Replace with icon */}
              <View style={styles.imageCountainer}>
                <Image
                  style={styles.logoarea}
                  source={icons[index]}
                  tintColor={
                    isFocused ? dash?.base_themes?.button_color : dash?.base_themes?.active_text_color
                  }
                />
                {
                  label[index] == English.bottom_tab_screen.option_3 &&
                  <Text style={[styles.cart_number_text_style, { color: dash?.base_themes?.active_text_color }]}>
                    {dash?.cart_items?.length}
                  </Text>
                }

              </View>

              <Vertical size={4} />
              <Text style={[styles.textarea, { color: isFocused ? dash?.base_themes?.button_color : dash?.base_themes?.active_text_color }]}>{label[index]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  iconarea: { flex: 1, alignItems: 'center' },
  cuntainer: {
    position: 'absolute',
    bottom: 0,
    height: Platform.OS == "ios" ? 90 : 75,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: '100%',
    overflow: 'hidden',
    // backgroundColor: 'transparent',
    // backgroundColor: Platform.OS === 'android' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    elevation: 5
  },
  blureArea: {
    flex: 1,
    backgroundColor: "transparent"
  },
  itemiconArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    position: 'absolute',
    width: '100%',
    paddingTop: 16,
    paddingBottom: Platform.OS == "ios" ? 40 : 24,
    paddingHorizontal: 32,
  },
  logoarea: {
    height: 24,
    width: 24,
    resizeMode: 'contain'
  },
  textarea: {
    fontFamily: typography.jakarta_medium,
    fontWeight: '500',
    fontSize: baseFont.bottom_tab_text,
    includeFontPadding: false,
    lineHeight: baseFont.bottom_tab_text * 1.3,
    paddingVertical: 0
  },
  imageCountainer: {
    flexDirection: 'row'
  },
  cart_number_text_style: {
    fontFamily: typography.jakarta_medium,
    fontWeight: '500',
    fontSize: baseFont.bottom_tab_text,
    includeFontPadding: false,
    lineHeight: baseFont.bottom_tab_text * 1.3,
    paddingVertical: 0,
    position: 'absolute',
    left: 22,
    top:-2

  }
})