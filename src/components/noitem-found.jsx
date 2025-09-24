import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { color, typography } from '../theme'

const NoitemFound = ({dash}) => {
    return (
        <View style={styles.container}>
            {/* no cart  */}
            <View style={styles.no_item_icon_div}>
                <View style={styles.no_item_icon_style}>
                    <Image
                        source={require('../assets/icons/no-item-icon.png')}
                        style={styles.img_style}
                    />
                </View>
                <Text style={[styles.noitem_text_style,{color:dash?.base_themes?.active_text_color}]}>No items found</Text>
            </View>
        </View>
    )
}

export default NoitemFound

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: 'transparent',
        justifyContent:'center',
        alignItems:'center'
    },
    no_item_icon_style: {
        width: 124,
        height: 210
    },

    noitem_text_style: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.5)',
        fontFamily:typography.jakarta_medium,
        includeFontPadding:false,
        lineHeight:16*1.3
    },

    no_item_icon_div: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 43
    },

    img_style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
})