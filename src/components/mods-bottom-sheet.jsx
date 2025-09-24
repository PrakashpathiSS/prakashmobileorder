import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo } from 'react'
import { FlatList, Image, Platform, Pressable, StyleSheet, View } from 'react-native'
import { Text } from '../ui-kit/text'
import { CategoryItem } from './category-item'
import { English } from '../utils/en'
import { Button } from '../ui-kit/button'
import { color, typography } from '../theme'
import { Vertical } from '../ui-kit/spacer'
import { baseFont } from '../theme/font-size'
import { selected_extras } from '../redux/slice/user'
import { useDispatch } from 'react-redux'

export const ModsBottomSheet = ({
  menuavailablity,
  dash,
  extrasArr,
  note,
  handleClose,
  handleModList,
  handleClickNotes,
  handleModDone,
  handleSelectExtra,
  sheetIndex,
  setOpenModssheet
}) => {
  const dispatch = useDispatch()
  const renderBackdrop = useCallback(
    (props) => {
      if (dash?.hidetabbar) {
        return (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.6}
            pressBehavior='none'
            onPress={handleClose}
          />
        );
      } else {
        return null
      }

    },
    [handleClose, dash]
  );


  const selectedCategory = dash?.all_categories?.find((item => item?._id === dash?.selected_item?.category_id))
  const mods_item = selectedCategory?.mods
    ?.map(modId => dash?.all_mods?.find(mod => mod?._id === modId))

 useEffect(() => {
  if (menuavailablity && mods_item?.length) {
    const updatedExtras = [];

    mods_item.forEach((mod) => {
      const includedExtras = mod?.extras?.filter((data) => data?.included === "Yes");

      if (includedExtras?.length) {
        updatedExtras.push({
          ...mod,
          extras: includedExtras.map((data) => ({
            ...data,
            mods_default_price: data?.price,
            mod_category_id: data?._id
          })),
          selected_length: includedExtras.filter((e) => e?.price === "0.00")?.length || 0,
        });
      }
    });

    if (updatedExtras.length) {
      dispatch(
        selected_extras(
          updatedExtras.map((e) => ({
            ...e,
            mods_default_price: e?.price,
          }))
        )
      );
    }
  }
}, []);


  return (
    <BottomSheet
      index={sheetIndex}
      onChange={(i) => setOpenModssheet(i)}
      snapPoints={['90%']}
      backgroundStyle={{ borderRadius: 24, backgroundColor: dash?.base_themes?.background_color }}
      backdropComponent={renderBackdrop}
      handleComponent={() => { }}
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
    >
      <BottomSheetScrollView 
      contentContainerStyle={{paddingBottom:30}}
      style={styles.bottomSheet}
      >
        <View style={styles.suncountainer}>
          <View style={styles.toparea}>
            {/* header */}
            <View style={styles.bottomSheetHeader}>
              <View style={styles.backbutonCountainer}>
                <Pressable
                  onPress={handleClose}
                >
                  <Image
                    source={require("../assets/icons/backbutton.png")}
                    style={[styles.backicon, { tintColor: dash?.base_themes?.active_text_color }]}
                  />
                </Pressable>
                <Text style={[styles.titleCountaiiner, { color: dash?.base_themes?.active_text_color }]}>
                  {dash?.all_categories?.filter(
                    (item) => dash?.all_menus[dash?.selected_menu]?.categories?.includes(item?._id)
                  )[dash?.selected_category]?.category_name} {English.home.bottomSheet2Title}
                </Text>
              </View>

              <Pressable
                onPress={handleClose}
              >
                <Image
                  source={require("../assets/icons/xmarkiocn.png")}
                  style={[styles.titlexicon, { tintColor: dash?.base_themes?.active_text_color }]}
                />
              </Pressable>
            </View>
            <Vertical size={32} />

            {/* all mods */}
            <View>
              <FlatList
                data={mods_item || []}
                renderItem={handleModList}
                horizontal
                key="!"
                keyExtractor={(item, index) => {
                  return '!' + index;
                }}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <Vertical size={24} />
            <FlatList
              data={dash?.selected_mod?.extras}
              renderItem={({ item, index }) => {
                return (
                  <CategoryItem
                    key={index}
                    item={item}
                    name={item?.name}
                    price={item?.price}
                    availability={!menuavailablity}
                    active={dash?.selected_extras?.some(cat =>
                      cat?.extras?.some(extra => extra._id === item._id)
                    )}
                    onPress={() => {
                      //only add if menuavailablity true
                      if (menuavailablity) {
                        handleSelectExtra({ ...item, mod_category_id: dash?.selected_mod?._id })
                      }
                    }}
                    dash={dash}

                  />
                )
              }}
              style={{ height: 250 }}
              keyExtractor={(item, index) => {
                return '!' + index;
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}
              ListFooterComponent={<View style={{ height: 50 }} />}
            />


            <View style={styles.dividerLine} />
            <Vertical size={12} />
            {/* item name */}
            <View style={styles.itemDetails}>
              <Text style={[styles.itemText, { color: dash?.base_themes?.active_text_color }]}>
                {dash?.selected_item?.name}
              </Text>
              <Text style={[styles.itemprice, { color: dash?.base_themes?.active_text_color }]}>
                ${Number(Number(dash?.selected_item?.price) + extrasArr?.reduce((total, item) => total + Number(item?.price), 0)).toFixed(2)}
              </Text>
            </View>
            <Vertical size={12} />


            {/* extras */}

            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <View>
                  {
                    extrasArr
                      ?.map((_, index) => index)
                      ?.filter(index => index % 2 === 0)
                      ?.map(index => {
                        const left = extrasArr[index];
                        const right = extrasArr[index + 1];

                        return (
                          <View
                            key={left?._id + (right?._id || '')}
                            style={styles.listArea}
                          >
                            {/* Left item */}
                            <View style={{ flex: 1 }}>
                              <Text style={[styles.extraText, { color: dash?.base_themes?.inactive_text_color }]}>
                                {left?.name}{" "}
                                <Text style={[styles.extraText, { color: dash?.base_themes?.inactive_text_color }]}>
                                  {left?.price === '0.00' ? '' : ` - $${left?.price}`}
                                </Text>
                              </Text>
                            </View>

                            {/* Right item */}
                            <View style={{ flex: 1 }}>
                              {right && (
                                <Text style={[styles.extraText, { textAlign: 'right', color: dash?.base_themes?.inactive_text_color }]}>
                                  {right?.name}{" "}
                                  <Text style={[styles.extraText, { color: dash?.base_themes?.inactive_text_color }]}>
                                    {right?.price === '0.00' ? '' : ` - $${right?.price}`}
                                  </Text>
                                </Text>
                              )}
                            </View>
                          </View>
                        );
                      })
                  }
                  {
                    note &&
                    <Text style={[styles.notesText, { color: dash?.base_themes?.inactive_text_color }]}>{`Notes - ${note}`}</Text>
                  }
                </View>

              }
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
              style={{ height: 130 }}
            />

            <View style={styles.dividerLine} />
            <Vertical size={20} />
            {/* buttons */}
          </View>
        </View>
        <View>
          <View style={styles.modsBtns}>

            {
              dash.store_detail?.store_type !== "Retail" ?
                <Button
                  disabled={!menuavailablity}
                  title={English.home.notes}
                  textStyle={[styles.buttontext, { color: dash?.base_themes?.button_color }]}
                  style={[styles.notesButton, { backgroundColor: dash?.base_themes?.background_color }]}
                  onPress={handleClickNotes}
                  image={require('../assets/icons/NotePencil.png')}
                  imagestyle={[styles.notesimage, { tintColor: dash?.base_themes?.button_color }]}
                  textCountainerStyle={styles.textCountainerStyle}
                />
                : null
            }


            <Button
              disabled={!menuavailablity}
              title={English.home.done}
              textStyle={[styles.buttontext, { color: dash?.base_themes?.button_text_color }]}
              style={[styles.doneButton, { backgroundColor: dash?.base_themes?.button_color }, dash.store_detail?.store_type === "Retail" && { width: '100%' }]}
              onPress={handleModDone}
            />

          </View>
          <Vertical size={Platform.OS == 'ios' ? 40 : 5} />
        </View>
      </BottomSheetScrollView>

    </BottomSheet>
  )
}

const styles = StyleSheet.create({

  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 24,
    paddingTop: 24
  },

  dividerLine: {
    height: 0.8,
    backgroundColor: '#E8E8E8',
    marginVertical: 2,
  },


  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemText: {
    fontSize: baseFont.modsItem_text,
    fontWeight: '500',
    fontFamily: typography.jakarta_semibold,
    color: '#000',
    includeFontPadding: false,
    lineHeight: baseFont.modsItem_text * 1.3,
    paddingVertical: 0
  },
  itemprice: {
    fontSize: baseFont.modsPrice_text,
    fontWeight: '700',
    fontFamily: typography.droid_bold,
    color: '#434343',
    includeFontPadding: false,
    lineHeight: baseFont.modsPrice_text * 1.3,
    paddingVertical: 0
  },

  modsBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 24
  },

  backicon: {
    width: 18,
    height: 18,
    resizeMode: 'contain'
  },
  titlexicon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  bottomSheet: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  backbutonCountainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleCountaiiner: {
    fontSize: baseFont.sheet_title,
    fontWeight: '500',
    fontFamily: typography.jakarta_medium,
    color: '#2E2E2E',
    includeFontPadding: false,
    lineHeight: baseFont.sheet_title * 1.3,
    paddingVertical: 0
  },
  extraText: {
    fontSize: baseFont.modsExtra_text,
    fontWeight: '500',
    fontFamily: typography.jakarta_regular,
    includeFontPadding: false,
    lineHeight: baseFont.modsExtra_text * 1.3,
    paddingVertical: 0,
    color: '#7D868C'

  },

  notesText: {
    fontSize: baseFont.modsNotes_text,
    fontWeight: '500',
    fontFamily: typography.jakarta_regular,
    color: '#7D868C',
    includeFontPadding: false,
    lineHeight: baseFont.modsNotes_text * 1.3,
    paddingVertical: 0
  },
  extracountainer: {
    height: 100
  },
  listArea: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  notesButton: {
    height: 40,

  },
  doneButton: {
    height: 48,
    width: '60%',
    borderRadius: 12
  },
  buttontext: {
    fontSize: baseFont.sheet_title,
    fontFamily: typography.jakarta_semibold,
    fontWeight: '600',
    color: '#000000',
    includeFontPadding: false,
    lineHeight: baseFont.sheet_title * 1.3,
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  notesimage: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    tintColor: '#000'
  },
  textCountainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  toparea: { flex: 1 },
  bottomarea: { flex: 0.8, justifyContent: 'center', alignItems: 'center', width: '100%' },
  suncountainer: { flex: 1, paddingHorizontal: 24, width: '100%' }
})