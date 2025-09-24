import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Text } from '../../ui-kit/text'
import { UseAbout } from '../../hooks/use-about'
import { English } from '../../utils/en'
import { color, typography } from '../../theme'
import { baseFont } from '../../theme/font-size'
import { Vertical } from '../../ui-kit/spacer'
import { Divider } from '../../ui-kit/divider'

export const About = () => {

    const {
        handleBack,
        detailsObj,
        dash
    } = UseAbout()

    return (
        <View style={styles.container}>
            {/* header */}
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
                        style={[styles.img_style, { tintColor: dash?.base_themes?.active_text_color }]}
                    />
                </Pressable>

                <Text style={[styles.cart_text_style, { color: dash?.base_themes?.active_text_color }]}>
                    {English.about.title}
                </Text>
            </Pressable>
            <Vertical size={24} />
            <Divider style={{ borderColor: `${dash?.base_themes?.inactive_text_color}40` }} />
            <Vertical size={24} />

            {/* details */}
            <View style={styles.details_div}>

                {/* app icon */}
                <View style={styles.imagecountainer}>
                    <View style={styles.app_icon_style}>
                        <Image
                            source={require('../../assets/logo-mobile_order.png')}
                            style={styles.img_style}
                            borderRadius={12}
                        />
                    </View>
                </View>

                {/* app name */}
                <Text style={[styles.app_name_style, { color: dash?.base_themes?.active_text_color }]}>{English.about.mobileOrder}</Text>
                <Vertical size={24} />
                {/* app details */}
                <View style={styles.details_style}>
                    {
                        Object.entries(detailsObj).map(([key, value], index) => {
                            if (!value && value !== 0) return null;
                            return (
                                <View key={index}>
                                    <View style={styles.detail_style}>
                                        <Text style={[styles.detail_text_key_style, { color: dash?.base_themes?.active_text_color }]}>{key}</Text>
                                        <Text style={[styles.detail_text_value_style, { color: dash?.base_themes?.inactive_text_color }]}>{value}</Text>
                                    </View>
                                    <Vertical size={12} />
                                    <Divider style={{ borderColor: `${dash?.base_themes?.inactive_text_color}40` }} />
                                    <Vertical size={12} />
                                </View>
                            )
                        }
                        )
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#FFFF',
        flex: 1
    },

    header_div: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        gap: 10
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

    category_text_style: {
        fontSize: 24,
        fontWeight: 'bold'
    },

    app_icon_style: {
        width: 100,
        height: 100
    },

    details_div: {
        flexDirection: 'column',
        gap: 10
    },

    app_name_style: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: typography.jakarta_semibold,
        color: '#101010',
        includeFontPadding: false,
        lineHeight: 14 * 1.3,
        paddingVertical: 0
    },

    details_style: {
        // flex: 1,
        overflow: 'hidden',
    },

    detail_style: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 30
    },

    detail_text_key_style: {
        width: '50%',
        textAlign: "left",
        color: '#7C7C7C',
        flex: 1,
        fontWeight: '500',
        fontFamily: typography.jakarta_medium,
        color: '#101010',
        includeFontPadding: false,
        fontSize: 14,
        lineHeight: 14 * 1.3,
        paddingVertical: 0
    },

    detail_text_value_style: {
        width: '50%',
        textAlign: "left",
        fontWeight: '500',
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: '500',
        fontFamily: typography.jakarta_regular,
        color: '#101010',
        fontSize: 14,
        includeFontPadding: false,
        lineHeight: 14 * 1.3,
        paddingVertical: 0
    },

    border_style: {
        borderWidth: 0.5,
        borderColor: '#D7DBDF',
        marginVertical: 12
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
    imagecountainer: {
        width: '100%',
        alignItems: 'center'
    }

})
