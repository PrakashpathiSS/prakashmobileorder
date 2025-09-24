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
        item,
        index,
    } = props

    const {
        handleNavigateFoodItemDetails
    } = UseCommonHook()

    return (
        <Pressable
            disabled={item?.status && item?.availability ? false : true}
            onPress={() => handleNavigateFoodItemDetails(item)}
            style={{
                flex: 0.5,
                marginRight: index % 2 == 0 ? 10 : 0
            }}
        >
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
                <View style={styles.button_amount_div}>
                    <Button
                        title='Add'
                        image={false}
                        disabled={item?.status && item?.availability ? false : true}
                        style={[styles.button_style, { backgroundColor: '#6D54CF', }]}
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

    container: {
        flex: 0.5
    },

    food_card_div: {
        borderColor: color.palette.borderColor,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        gap: 16,
        width: '100%' //153.68
    },

    img_style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 8,
    },

    image_div: {
        width: '100%',
        height: 111,

    },

    food_details_div: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
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
        height: 35,
    },

    button_text_style: {
        fontSize: 13,
        fontWeight: 'bold'
    },

    animated_text: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#6D54CF',
        borderRadius: 20,
        padding: 5,
        opacity: 0.8,
        zIndex: 99999999
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