import {
    View,
    Pressable,
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import { English } from '../../utils/en';
import { color, typography } from '../../theme';
import { useSelector } from 'react-redux';
import { Vertical } from '../../ui-kit/spacer';
import { Routes } from '../routes';

function CustomeTabBar({ state, descriptors, navigation }) {
    const { disableBackNavigation, cart_items, base_themes,store_detail } = useSelector((state) => state?.user);
  
    const handleBack = () => {
        // if (state?.index > 0) {
        //     navigation.navigate(state?.routes[state?.index - 1].name);
        // } else {
        //     navigation.goBack();
        // }
        navigation.navigate(Routes.BottomTabStack);
    }

    return (
        <View style={styles.container}>
            <View style={styles.topCountainer}>
                <Pressable
                    disabled={disableBackNavigation && state?.routes[3]?.name == "Card Details"}
                    style={styles.back_button_div}
                    onPress={handleBack}
                >
                    <View
                        style={styles.back_arrow_icon_style}
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    >
                        <Image
                            source={require('../../assets/icons/backbutton.png')}
                            style={[styles.img_style, { tintColor: base_themes?.active_text_color  }]}
                        />
                    </View>

                    <Text style={[styles.cart_text_style, { color: base_themes?.active_text_color  }]} allowFontScaling={false}>
                        {English.checkout.title}
                    </Text>
                </Pressable>
                <View>
                    <Text style={[styles.cartcount_text, { color: base_themes?.active_text_color  }]} allowFontScaling={false}>
                        {cart_items?.length} Items
                    </Text>
                </View>
            </View>
            {
                store_detail?.store_type !=="Service"&&<Vertical size={24} />
            }
            <View style={[styles.statusCercleCountainer,store_detail?.store_type =="Service"&&{display:'none'}]}>
                {
                    state?.routes?.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const routeName = ['Cart', 'Details', 'Tip', 'Payment']
                        const isFocused = state.index === index;
                        const lastindex = index == state?.routes?.length - 1


                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name, route.params);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        return (

                            <Pressable
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarButtonTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                disabled={cart_items?.length==0}
                                key={route.key}
                                style={styles.statusCercleCountainer}>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={[styles.statusCercle, isFocused && { borderWidth: 0, backgroundColor: base_themes?.other_background },{borderColor:`${base_themes?.inactive_text_color}40`}]}>
                                        <Text style={[styles.statustext, { color: isFocused ? base_themes?.other_button_text_color  : `${base_themes?.inactive_text_color}80` }]}>{index + 1}</Text>
                                    </View>
                                    <Vertical size={10} />
                                    <Text style={[styles.statusbasetext, { color: isFocused ? base_themes?.active_text_color : base_themes?.inactive_text_color }]}>{routeName[index]}</Text>
                                </View>
                                {
                                    !lastindex &&
                                    <View style={styles.statusarrow}>
                                        <View style={[styles.statusroundarea, { backgroundColor: `${base_themes?.inactive_text_color}50`}]} />
                                        <Image source={require('../../assets/icons/cartarrow.png')} style={[styles.statusIcon, { tintColor: `${base_themes?.inactive_text_color}50`}]} />
                                        <View style={[styles.statusroundarea, { backgroundColor: `${base_themes?.inactive_text_color}50`}]} />
                                    </View>
                                }
                            </Pressable>


                        )
                    })
                }
            </View>
            <Vertical size={24} />
        </View>
    );
}

export default CustomeTabBar;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        position: 'relative',
    },
    tabButton: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    label: {
        fontSize: 24,
        fontFamily: typography.semibold
    },
    indicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#6D54CF',

    },
    back_button_div: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    cart_text_style: {
        fontSize: 20,
        fontWeight: '400',
        fontFamily: typography.jakarta_semibold,
        fontSize: 20,
        lineHeight: 20 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
    },
    cartcount_text: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: typography.jakarta_medium,
        fontSize: 16,
        lineHeight: 16 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
    },
    img_style: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

    back_arrow_icon_style: {
        width: 15,
        height: 15
    },
    topCountainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 24
    },
    statusCercleCountainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
    statusCercle: {
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9D9D9'
    },
    statustext: {
        fontWeight: '500',
        fontFamily: typography.jakarta_medium,
        fontSize: 16,
        lineHeight: 16 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
    },
    statusbasetext: {
        fontWeight: '400',
        fontFamily: typography.jakarta_regular,
        fontSize: 12,
        lineHeight: 12 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
    },
    statusCountainer: { alignItems: 'center', gap: 10 },
    statusIcon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        bottom: 7
    },
    statusroundarea: { height: 4, width: 4, backgroundColor: '#D9D9D9', borderRadius: 5 },
    statusarrow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: 5, marginBottom: 10 }
});
