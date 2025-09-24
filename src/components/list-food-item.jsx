import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Text } from '../ui-kit/text'
import { color, typography } from '../theme'
import { baseFont } from '../theme/font-size'

export const ListFoodItem = (props) => {

  const {
    name,
    price,
    onPress,
    img,
    availability,
    item,
    dash
  } = props

  const isArrayImages = Array.isArray(img)
  const isDefaultImages = isArrayImages
    ? img[0]?.url == "" || img == undefined
    : img == "" || img == undefined;
  return (
    <>
      {!item?.isDummy ?
        <Pressable
          style={[
            styles.container,
            availability && {
              opacity: 0.7,
            }
          ]}
          onPress={onPress}
        >
          
          <View style={styles.shadowWrapper}>
            <View style={[styles.imageContainer]}>
              <View style={styles.imageInner}>
                <Image
                  style={styles.image}
                  source={{ uri: isArrayImages ? img[0]?.url : item?.image }}
                  alt="food item"
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>


          <View style={styles.rightSideDiv}>
            <View style={styles.detailsContainer}>
              <Text
                style={[styles.name, { color: dash?.base_themes?.active_text_color }]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {name}
              </Text>
              <Text style={[styles.price, { color: dash?.base_themes?.active_text_color }]}>
                ${price}
              </Text>
            </View>
            <View>
              <Text
                numberOfLines={2}
                style={[styles.description, { color: dash?.base_themes?.inactive_text_color }]}>
                {item?.description}
              </Text>
            </View>
          </View>

        </Pressable>
        :
        <View style={styles.container}></View>
      }
    </>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#B7B6B6',
    paddingBottom: 10,
    padding: 2
  },

  imageContainer: {
    width: 94,
    height: 75,
    borderRadius: 8,
    overflow: 'hidden',
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  rightSideDiv: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'column',
    gap: 8
  },

  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    maxWidth: 180,
    overflow: 'hidden',
    fontSize: baseFont.item_name_text,
    fontWeight: '400',
    textAlign: 'left',
    color: '#1D1D21',
    fontFamily: typography.jakarta_medium,
    includeFontPadding: false,
    lineHeight: baseFont.item_name_text * 1.3
  },

  price: {
    fontSize: baseFont.item_price_text,
    fontWeight: '600',
    flexShrink: 0,
    textAlign: 'right',
    fontFamily: typography.jakarta_regular,
    includeFontPadding: false,
    lineHeight: baseFont.item_price_text * 1.3,
    color: '#1D1D21',
  },
  description: {
    fontSize: baseFont.item_description,
    fontWeight: '600',
    flexShrink: 0,
    fontFamily: typography.jakarta_regular,
    includeFontPadding: false,
    lineHeight: baseFont.item_description * 1.3,
    color: '#878787'
  },
  availabilitystylle: {
    borderColor: '#ff0000',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },

  imageInner: {
    flex: 1,
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  shadowWrapper: {
    width: 94,
    height: 75,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
})
