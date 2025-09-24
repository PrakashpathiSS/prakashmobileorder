import React from 'react'
import { Text } from '../ui-kit/text'
import { StyleSheet, View } from 'react-native'
import { color } from '../theme'

const TipList = (props) => {

    const {
        tip,
        percentage
    } = props

  return (
    <View style={styles.container}>
        <Text style={styles.text_style}>{percentage}%</Text>
        <Text style={styles.text_style}>{tip}</Text>
    </View>
  )
}

export default TipList

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#EEEEEE',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4
    },

    text_style: {
        fontSize: 16,
        fontWeight: 600
    }
})