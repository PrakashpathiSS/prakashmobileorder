import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Text } from '../ui-kit/text'
import { color, typography } from '../theme'
import { baseFont } from '../theme/font-size'

export const CategoryItem = (props) => {

  const {
    name,
    price,
    availability,
    active,
    onPress,
    dash,
  } = props

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container, { borderColor: `${dash?.base_themes?.inactive_text_color}40` },
        availability && { opacity: 0.5 },
      ]}>
      <Text
        style={[{
          color: dash?.base_themes?.active_text_color,
        }, styles.itemtext]}>
        {name}
        <Text style={[{ fontFamily: typography.droid_regular }, styles.itemtext]}>
          {price > 0 ? `+ $${price}` : ''}
        </Text>
      </Text>
      <View style={[styles.selectbase, active && {
        backgroundColor: dash?.base_themes?.button_color,
        borderWidth: 0
      }, { borderColor: `${dash?.base_themes?.inactive_text_color}40` }]}>
        {
          active && <Image source={require('../assets/icons/Check.png')} style={[styles.checkimage, { tintColor: dash?.base_themes?.background_color }]} />
        }
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: '#E8E8E8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemtext: {
    fontSize: baseFont.modsite_text,
    fontWeight: '500',
    fontFamily: typography.jakarta_medium,
    color: '#2E2E2E',
    includeFontPadding: false,
    lineHeight: baseFont.modsite_text * 1.3,
    paddingVertical: 0
  },
  selectbase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#000'
  },
  checkimage: {
    resizeMode: 'contain',
    height: 12,
    width: 12
  }
})