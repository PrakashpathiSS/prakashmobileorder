import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Text } from '../../ui-kit/text'
import { baseFont } from '../../theme/font-size'
import { typography } from '../../theme'

const MenuGradient = ({ handleOnPress, dash ,disable}) => {
    return (
        <View style={styles.menubookCountainer}>
            <LinearGradient
                colors={[dash?.base_themes?.background_color, dash?.base_themes?.button_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, height: 1 }}
            />

            <TouchableOpacity disabled={disable} onPress={handleOnPress} style={styles.menubookarea}>
                <Image source={require('../../assets/icons/menu_book.png')} style={[styles.menubook,{tintColor:dash?.base_themes?.button_color}]} />
                <Text style={[styles.menubooktext, { color: dash?.base_themes?.button_color }]} >
                    {/* {dash?.all_menus[dash?.selected_menu]?.name} */}
                    Menu
                </Text>
            </TouchableOpacity>

            <LinearGradient
                colors={[ dash?.base_themes?.button_color, dash?.base_themes?.background_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, height: 1 }}
            />
        </View>
    )
}

export default MenuGradient

const styles = StyleSheet.create({
    menubook: {
        height: 20,
        width: 20,
        resizeMode: 'contain',

    },
    menubooktext: {
        fontSize: baseFont.menu_book_text,
        fontFamily: typography.jakarta_medium,
        color: '#6D54CF',
        includeFontPadding: false,
        lineHeight: baseFont.menu_book_text * 1.3,
        paddingVertical: 0,
        fontWeight: '500',
        bottom: 3
    },
    menubookCountainer: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    menubookarea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 8
    },
})