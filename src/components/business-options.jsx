import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Text } from '../ui-kit/text'
import { color, typography } from '../theme'
import { useSelector } from 'react-redux'
import { baseFont } from '../theme/font-size'

const BusinessOptions = (props) => {

    const dash = useSelector((state) => state?.user)

    const {
        icon,
        icon2,
        name,
        onPress,
        handleIcon,
        handleIcon2,
        index,
    } = props

    return (
        <Pressable
            style={[
                styles.container,
                {
                    borderColor: dash?.business_name === name ? `${dash?.base_themes?.inactive_text_color}90` : `${dash?.base_themes?.inactive_text_color}40`
                }
            ]}
            onPress={() => onPress(name)}
        >
            <View style={styles.name_div}>
                <Text
                    style={[
                        styles.name_style,
                        { color: dash?.business_name === name ? dash?.base_themes?.active_text_color : dash?.base_themes?.inactive_text_color }
                    ]}
                >
                    {name?.replace(/_/g, ' ')}
                </Text>
            </View>

            <View style={[styles.icon_div, { display: dash?.business_name === name ? 'none' : 'flex' }]}>
                {/* icon */}
                <Pressable
                    style={styles.arrow_icon_div}
                    onPress={() => handleIcon(name, index)}
                >
                    <Image
                        style={[styles.img_style,{tintColor: `${dash?.base_themes?.inactive_text_color}70`}]}
                        source={icon}
                    />
                </Pressable>

                {/* icon 2 */}
                <Pressable
                    style={styles.arrow_icon_div}
                    onPress={() => handleIcon2(name)}
                >
                    <Image
                        style={[styles.img_style,{tintColor: `${dash?.base_themes?.inactive_text_color}70`}]}
                        source={icon2}
                    />
                </Pressable>
            </View>
        </Pressable>
    )
}

export default BusinessOptions

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between',
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderWidth: 1
    },

    img_style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },

    icon_div: {
        flexDirection: 'row',
        gap: 15
    },

    arrow_icon_div: {
        width: 20,
        height: 20
    },

    name_div: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13
    },

    name_style: {
        fontSize: baseFont.select_business_values,
        fontWeight: '400',
        fontFamily: typography.jakarta_regular,
        color: '#101010',
        includeFontPadding: false,
        lineHeight: baseFont.select_business_values * 1.3,
        paddingVertical: 0
    }
})