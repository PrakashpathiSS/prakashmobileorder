import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Text } from '../ui-kit/text'
import { color, typography } from '../theme'
import { baseFont } from '../theme/font-size'

const ProfileOptions = (props) => {

    const {
        icon,
        name,
        width,
        height,
        onPress,
        index,
        profileOptions,
        dash
    } = props


    return (
        <Pressable
            style={[styles.container, index === profileOptions?.length - 1 && { borderBottomWidth: 0 },
            {
                backgroundColor: dash?.base_themes?.background_color,
                borderBottomColor: `${dash?.base_themes?.inactive_text_color}30`
            }]}
            onPress={onPress}
        >
            <View style={styles.name_div}>
                {icon &&
                    <View
                        style={[styles.imagebg, { backgroundColor: dash?.base_themes?.button_color }]}
                    >
                        <View style={[styles.icon_div, { width: 18, height: 18 }]}>
                            <Image style={[styles.img_style, { tintColor: dash?.base_themes?.button_text_color }]} source={icon} />
                        </View>
                    </View>
                }

                <Text style={[styles.name_style, { color: dash?.base_themes?.active_text_color }]}>{name}</Text>
            </View>

            <View style={styles.arrow_icon_div}>
                <Image style={[styles.img_style, { tintColor: `${dash?.base_themes?.inactive_text_color}80` }]} source={require('../assets/icons/right-arrow-icon.png')} />
            </View>
        </Pressable>
    )
}

export default ProfileOptions

const styles = StyleSheet.create({
    imagebg: {
        backgroundColor: '#6D54CF',
        borderRadius: 5,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },

    img_style: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    icon_div: {
        width: 18,
        height: 17.45
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
        fontSize: baseFont.profile_label_title,
        fontWeight: '600',
        fontFamily: typography.jakarta_regular,
        color: '#14101B',
        includeFontPadding: false,
        lineHeight: baseFont.profile_label_title * 1.3,
        paddingVertical: 0
    }
})