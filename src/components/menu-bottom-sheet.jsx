import { Pressable, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { English } from '../utils/en';
import { useDispatch } from 'react-redux';
import { selected_category, setHidetabbar } from '../redux/slice/user';
import { Text } from '../ui-kit/text'
import { color, typography } from '../theme';
import { Vertical } from '../ui-kit/spacer';
import { baseFont } from '../theme/font-size';

const MenuBottomSheet = ({
    sheetIndex,
    renderBackdrop,
    handleMenuList,
    menuavailablity,
    dash,
    setOpenMenusheet
}) => {
    const dispatch = useDispatch()
    const listData = dash?.all_categories?.filter(
        (item) => dash?.all_menus[dash?.selected_menu]?.categories?.includes(item?._id)
    )
    return (
        <BottomSheet
            index={sheetIndex}
            onChange={(i) => setOpenMenusheet(i)}
            snapPoints={['55%']}
            backgroundStyle={{ borderRadius: 24, backgroundColor: dash?.base_themes?.background_color }}
            backdropComponent={renderBackdrop}
            handleComponent={() => { }}
            enablePanDownToClose={false}
            enableHandlePanningGesture={false}
            enableContentPanningGesture={false}
        >
            <View style={styles.bottomSheet}>
                {/* header */}
                <View style={styles.bottomSheetHeader}>
                    <Text style={[styles.titleFont, { color: dash?.base_themes?.active_text_color }]}>
                        {English.home.bottomSheettitle}
                    </Text>

                    <Pressable onPress={() => {
                        // bottomSheetRef?.current?.close()
                        setOpenMenusheet(-1)
                        dispatch(setHidetabbar(false))
                    }}>
                        <Image
                            source={require("../assets/icons/xmarkiocn.png")}
                            style={[styles.titlexicon, { tintColor: dash?.base_themes?.active_text_color }]}
                        />
                    </Pressable>
                </View>
                <Vertical size={32} />

                {/* all menus */}
                <View style={styles.menu_list_view}>
                    <BottomSheetFlatList
                        showsHorizontalScrollIndicator={false}
                        data={dash?.all_menus}
                        renderItem={handleMenuList}
                        horizontal
                        key="!"
                        keyExtractor={(item, index) => {
                            return '!' + index;
                        }}
                        contentContainerStyle={{ paddingHorizontal: 24 }}
                    />
                </View>

                {/* Divider line */}
                <Vertical size={24} />
                <View style={[styles.dividerLine, { borderColor: `${dash?.base_themes?.inactive_text_color}40` }]} />
                <Vertical size={24} />

                {/* all categories */}
                <View style={styles.category_list}>
                    <BottomSheetFlatList
                        data={listData}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.listCountainer} key={index}>
                                    <TouchableOpacity
                                        style={[styles.catogeryCountainer, (!menuavailablity || !item?.category_status) ? { opacity: 0.5 } : null]}
                                        onPress={() => {
                                            dispatch(selected_category(index))
                                            // bottomSheetRef?.current?.close()
                                            setOpenMenusheet(-1)
                                            dispatch(setHidetabbar(false))
                                        }}
                                        disabled={!menuavailablity || !item?.category_status}
                                    >
                                        <Text style={[styles.baselist, { color: dash?.base_themes?.active_text_color }]}>{item?.category_name}</Text>
                                        <View style={[styles.radioCountainer, index !== dash?.selected_category ? { borderColor: `${dash?.base_themes?.button_color}80` } : { borderColor: dash?.base_themes?.button_color }]}>
                                            {
                                                index === dash?.selected_category &&
                                                <View style={[styles.radioArea, { backgroundColor: dash?.base_themes?.button_color }]} />
                                            }
                                        </View>
                                    </TouchableOpacity>
                                    <Vertical size={16} />
                                    <View style={[styles.dividerLine, { borderColor: `${dash?.base_themes?.inactive_text_color}40` }]} />
                                    <Vertical size={16} />
                                </View>
                            )
                        }}
                        key="#"
                        keyExtractor={(_, index) => {
                            return '#' + index;
                        }}
                        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                        ListFooterComponent={<View style={{ height: 100 }} />}
                    />
                </View>
            </View>
        </BottomSheet>
    )
}

export default MenuBottomSheet

const styles = StyleSheet.create({

    dividerLine: {
        borderBottomWidth: 0.5,
        borderColor: '#E8E8E8',
        paddingVertical: 1
    },

    bottomSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    bottomSheet: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 24
    },

    menu_list_view: {

    },
    category_list: {
        flexDirection: 'row',
        flex: 1
    },
    titleFont: {
        fontSize: baseFont.sheet_title,
        fontWeight: '500',
        fontFamily: typography.jakarta_medium,
        color: '#2E2E2E',
        includeFontPadding: false,
        lineHeight: baseFont.sheet_title * 1.3,
        paddingVertical: 0
    },
    titlexicon: {
        width: 24,
        height: 24
    },
    catogeryCountainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    radioCountainer: {
        width: 24,
        height: 24,
        borderColor: '#6D54CF',
        borderRadius: 20,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioArea: {
        width: 10,
        height: 10,
        backgroundColor: '#6D54CF',
        borderRadius: 20
    },
    listCountainer: {
        paddingHorizontal: 24
    },
    baselist: {
        fontWeight: '400',
        fontFamily: typography.jakarta_regular,
        fontSize: baseFont.catogery_text,
        lineHeight: baseFont.catogery_text * 1.3,
        includeFontPadding: false,
        paddingVertical: 0,
        color: '#737373'
    }
})