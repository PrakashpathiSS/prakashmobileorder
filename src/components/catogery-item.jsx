import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text } from '../ui-kit/text'
import { color, typography } from '../theme'
import { baseFont } from '../theme/font-size'

export const CatogeryItem = (props) => {

    const {
        name,
        active,
        onPress,
        disabled,
        dash
    } = props

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.container,
                { backgroundColor: active ? dash?.base_themes?.other_background : null },
                !active && { borderWidth: 1, borderColor: `${dash?.base_themes?.active_text_color}` },
                disabled && { opacity: 0.7 }
            ]}>
            <Text
                style={[{
                    color: active ? dash?.base_themes?.other_button_text_color : `${dash?.base_themes?.active_text_color}`,
                }, styles.itextArea]}>
                {name}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        borderRadius: 50,
        paddingHorizontal: 16,
        marginRight: 6
    },
    itextArea: {
        fontWeight: '400',
        fontFamily: typography.jakarta_regular,
        fontSize: baseFont.menu_text,
        lineHeight: baseFont.menu_text * 1.3,
        includeFontPadding: false,
        paddingVertical: 0
    }
})