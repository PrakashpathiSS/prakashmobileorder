import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from '../ui-kit/text'
import { color } from '../theme'

const FoodItemList = (props) => {

  const {
    name,
    category
  } = props
  return (
    <View style={styles.text_div}>
      <Text style={[styles.text_style, { color: '#6D54CF', borderColor: '#6D54CF' }, (category?.status && category?.availability) ? null : { textDecorationLine: 'line-through' }]}>{name}</Text>
    </View>
  )
}

export default FoodItemList

const styles = StyleSheet.create({

  text_div: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text_style: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 20,
    color: '#6D54CF',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    borderColor: '#6D54CF'
  }
})