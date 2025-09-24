import React from 'react'
import { Text } from '../ui-kit/text'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { color, typography } from '../theme'
import { Button } from '../ui-kit/button'
import UseCommonHook from '../hooks/use-common-hook'

const FoodCardList = (props) => {

    const {
        name,
        amount,
        image,
        handleAddBtn,
        item
    } = props

    const {
        handleNavigateFoodItemDetails
    } = UseCommonHook()

  return (
    <Pressable onPress={()=>handleNavigateFoodItemDetails(item)}>
        <View style={styles.food_card_div}>
            {/* image */}
            <View style={styles.image_div}>
                <Image
                style={styles.img_style}
                source={{uri: image}}
                />
            </View>

            <View style={styles.food_details_div}>
                {/* name */}
                <Text 
                style={[styles.name_text_style,{color: '#000000'}]}
                numberOfLines={1}
                >
                    {name}
                </Text>

                {/* amount */}
                <Text style={[styles.amount_text_style,{color: '#FF5344'}]}>
                    ${parseFloat(amount).toFixed(2)}
                </Text>
            </View>

            {/* button */}
            <View style={styles.button_amount_div}>
                <Button
                title='Add'
                image={false}
                style={[styles.button_style,{backgroundColor: '#6D54CF'}]}
                textStyle={styles.button_text_style}
                onPress={handleAddBtn}
                />
            </View>
        </View>
    </Pressable>
  )
}

export default FoodCardList

const styles = StyleSheet.create({

    food_card_div: {
        marginRight: 10,
        borderColor: color.palette.borderColor,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 150,
        flexDirection: 'column',
        gap: 16
    },

    img_style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 12.13,
    },

    image_div: {
        width: '100%',
        height: 111,
    },

    food_details_div: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 3
        // flexWrap: 'wrap',
    },

    name_text_style: {
        fontWeight: 'semibold',
        fontSize: 14,
        flexShrink: 1,
        fontFamily: typography.semibold
    },

    amount_text_style: {
        fontSize: 14,
        color: '#6D54CF',
        fontWeight: 'bold'
    },

    button_style: {
        backgroundColor: '#6D54CF',
        // paddingVertical: 8,
        // borderRadius: 8
        height:35
    },

    button_text_style: {
        fontSize: 13,
        fontWeight: 'bold'
    }
})