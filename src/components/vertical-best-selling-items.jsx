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

        <Pressable
            disabled={item?.status && item?.availability ? false : true}
            onPress={() => handleNavigateFoodItemDetails(item)}>
            <View style={styles.food_card_div}>
                {/* image */}
                <View style={styles.image_div}>
                    {
                        (item?.status && item?.availability) ?
                            <Image
                                style={styles.img_style}
                                source={{ uri: image }}
                            />
                            :
                            <>
                                <View style={styles.overlay} />
                                <Image
                                    style={styles.img_style}
                                    source={{ uri: image }}
                                />
                            </>

                    }
                </View>

                <View style={styles.details_div}>

                    <View style={styles.food_details_div}>
                        {/* name */}
                        <Text style={[styles.name_text_style, { color: '#000000' }]}>
                            {name}
                        </Text>

                        {/* amount */}
                        <Text style={[styles.amount_text_style, { color: '#FF5344' }]}>
                            ${amount}
                        </Text>
                    </View>

                    {/* button */}
                    <View style={styles.button_div}>
                        <Button
                            title='Add'
                            image={false}
                            disabled={item?.status && item?.availability ? false : true}
                            style={[styles.button_style, { backgroundColor: '#6D54CF' }]}
                            textStyle={styles.button_text_style}
                            onPress={handleAddBtn}
                        />
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default FoodCardList

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

    image_div: {
        width: 94,
        height: 75,
        marginBottom: 1
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
        fontFamily: typography.semibold
    },

    amount_text_style: {
        fontSize: 14,
        color: '#6D54CF',
        fontWeight: 'bold'
    },

    button_style: {
        backgroundColor: '#6D54CF',
        // paddingVertical: 6,
        // paddingHorizontal: 15,
        height: 30,
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        zIndex: 1,
        borderRadius: 8
    },
})