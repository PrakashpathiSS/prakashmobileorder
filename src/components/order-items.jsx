import React from 'react'
import { Text } from '../ui-kit/text'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { color, typography } from '../theme'

const OrderItemsList = (props) => {

    const {
        name,
        amount
    } = props

  return (
    <View style={styles.food_card_div}>

        <View style={styles.details_div}>

            <View style={styles.food_details_div}>
                {/* name */}
                <Text style={[styles.name_text_style,{color: '#000000'}]}>
                    {name}
                </Text>

                {/* amount */}
                <Text style={[styles.amount_text_style,{color: '#FF5344'}]}>
                    ${amount}
                </Text>
            </View>
        </View>
    </View>
  )
}

export default OrderItemsList

const styles = StyleSheet.create({

    food_card_div: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        marginRight: 10,
        borderColor: color.palette.borderColor,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10
    },

    img_style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 8,
    },

    details_div: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
    },

    food_details_div: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        justifyContent: 'space-between'
    },

    name_text_style: {
        fontWeight: 'semibold',
        flexShrink: 1,
        fontSize: 14,
        // marginBottom: 8,
        fontFamily: typography.semibold,
    },

    amount_text_style: {
        fontSize: 14,
        fontWeight: 'bold'
    },

    button_style: {
        backgroundColor: '#6D54CF',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 8,
        width: 89.69
    },

    button_text_style: {
        fontSize: 13,
        fontWeight: 'bold'
    },

    button_div: {
        alignItems: 'flex-end'
    },

    delete_icon_style: {
        width: 25,
        height: 25
    },

    delete_icon_div: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})