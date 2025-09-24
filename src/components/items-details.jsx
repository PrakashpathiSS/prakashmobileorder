import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { Vertical } from '../ui-kit/spacer'
import { typography } from '../theme'
const ItemsDetails = ({
    cartItems,
    handleCartItems,
    dash
}) => {
    return (
        <View style={[styles.countainer, { backgroundColor: dash?.base_themes?.background_color }]}>
            <View style={styles.titlecouniainer}>
                <Text style={[styles.titletext, { color: dash?.base_themes?.inactive_text_color }]} allowFontScaling={false}>Items</Text>
                <Image source={require('../assets/icons/check_icon.png')} style={[styles.ticimage, { tintColor: dash?.base_themes?.button_color }]} />
            </View>
            <Vertical size={16} />
            <FlatList
                data={cartItems}
                renderItem={handleCartItems}
                key={']'}
                keyExtractor={(_, index) => {
                    return ']' + index;
                }}
                persistentScrollbar={true}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ height: 100 }} />}
            />
        </View>
    )
}

export default ItemsDetails

const styles = StyleSheet.create({
    countainer: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        height: '85%'
    },
    ticimage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: '#009951',
        aspectRatio: 1 / 1
    },
    titlecouniainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16
    },
    titletext: {
        fontSize: 16,
        fontFamily: typography.jakarta_semibold,
        fontWeight: '500',
        lineHeight: 16 * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
        color: '#AEAEB2'
    },

})