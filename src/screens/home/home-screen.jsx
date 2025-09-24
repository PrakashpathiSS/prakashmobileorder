import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useMemo, useRef } from "react";
import { Text } from "../../ui-kit/text";
import UseHome from "../../hooks/use-home";
import { English } from "../../utils/en";
import { Vertical } from "../../ui-kit/spacer";
import { baseFont } from "../../theme/font-size";
import { ModsBottomSheet } from "../../components/mods-bottom-sheet";
import CarousalItem from "../../components/carousal-item";
import NoitemFound from "../../components/noitem-found";
import ModsPriceAlert from "../../components/mods-price-alert";
import ConfermationModal from "../../components/confermation-modal";
import NotesModal from "../../components/notes-modal";
import CustomDropdown from "../../components/common/dropdown";

export const Home = () => {
  const {
    activeIndex,
    setActiveIndex,
    dash,
    handleSelectStore,
    // carouselImg,
    refresh,
    handleMenuList,
    handleFoodItem,
    handleSellerItem,
    handleModList,
    handleSelectExtra,
    renderBackdrop,
    note,
    setNote,
    openModal,
    setOpenModal,
    handleNoteDone,
    handleClickNotes,
    handleModDone,
    handleClose,
    menuavailablity,
    handleLeaveConfermationModal,
    handleStayConfermationModal,
    stayleave,
    priceAlertData,
    handleClosePriceModal,
    handleConfirmPriceModal,
    extrasArr,
    handleFoodItemArr,
    handleFoodItemArr2,
    redoData,
    currentModscat,
    searchItem,
    setSearchItem,
    itemList,
    dropdownArrow,
    setdropdownArrow,
    getGreeting,
    handleCatogeryItem,
    dispatch,
    openMenusheet,
    openModssheet,
    setOpenMenusheet,
    setOpenModssheet,
    openSearchArea,
    handleSearchbutton,
    handleSellerList,
    selectSellerIndex,
  } = UseHome();

  const carousalArea = useMemo(() => {
    return (
      <>
        {dash?.bannerimages?.length == 0 ? null : (
          <>
            <CarousalItem
              activeIndex={activeIndex}
              dash={dash}
              refresh={refresh}
              setActiveIndex={setActiveIndex}
            />
            <Vertical size={20} />
          </>
        )}
      </>
    );
  }, [activeIndex, dash]);

  const itemsMemo = useMemo(() => {
    let renderData = handleFoodItemArr(itemList);
    if (renderData?.length) {
      return (
        <FlatList
          data={renderData}
          numColumns={2}
          renderItem={handleFoodItem}
          keyExtractor={(item, index) => {
            return "!" + index;
          }}
          style={styles.itemlistArea}
          persistentScrollbar={true}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.itemlistCountainer}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      );
    } else {
      return <NoitemFound dash={dash} />;
    }
  }, [dash, menuavailablity, itemList, searchItem, selectSellerIndex]);

  const itemsSellers = useMemo(() => {
    let renderData = handleFoodItemArr(
      selectSellerIndex == 0
        ? dash?.sellers_list?.values?.new_collection
        : dash?.sellers_list?.values?.best_seller
    );
    if (renderData?.length) {
      return (
        <FlatList
          data={renderData}
          numColumns={2}
          renderItem={handleSellerItem}
          keyExtractor={(item, index) => {
            return "!" + index;
          }}
          style={styles.itemlistArea}
          persistentScrollbar={true}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.itemlistCountainer}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      );
    } else {
      return <NoitemFound dash={dash} />;
    }
  }, [dash, menuavailablity, itemList, searchItem, selectSellerIndex]);

  const dropdownRef = useRef(null);

  return (
    <View
      style={[
        styles.countainer,
        { backgroundColor: dash?.base_themes?.background_color },
      ]}
    >
      <FlatList
        style={styles.scrollCountainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/*Greeting & Dropdown location*/}
            <Vertical size={20} />
            <View style={styles.locationcountainer}>
              <Pressable
                onPress={() => {
                  dropdownRef.current?.open();
                }}
              >
                <Text
                  style={[
                    styles.greeting_status,

                    {
                      color: dash?.base_themes?.active_text_color,
                      fontSize: 30,
                      lineHeight: 30 * 1.3,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {getGreeting()}
                </Text>
              </Pressable>
              <CustomDropdown
                dropref={dropdownRef}
                data={dash?.stores?.map((e, i) => {
                  return {
                    label: e?.store_name,
                    value: e?.store_name,
                    data: { ...e },
                  };
                })}
                value={dash?.store_detail?.store_name}
                placeholder=""
                customPlaceholderStyle={{ display: "none" }}
                customSelectedTextStyle={{ display: "none" }}
                disable={dash?.stores?.length > 1 ? false : true}
                maxHeight={220}
                onFocus={() => {
                  setdropdownArrow(true);
                }}
                onBlur={() => {
                  setdropdownArrow(false);
                }}
                dropdownArrow={dropdownArrow}
                onChange={(e) => {
                  handleSelectStore(e?.data);
                }}
                dash={dash}
                customIconStyle={{ display: "none" }}
                customDropdownStyle={styles.customDropdownStyle}
                customDropdownContainer={styles.customDropdownContainer}
              />
            </View>
            <Pressable
              onPress={() => {
                dropdownRef.current?.open();
              }}
            >
              <Text
                style={[
                  styles.greeting_status,
                  { color: dash?.base_themes?.active_text_color, textAlign:'right'},
          
                ]}
                numberOfLines={1}
              >
                {dash?.store_detail?.store_name}
              </Text>
            </Pressable>
            <Vertical size={20} />

            {/* Carousal List*/}
            {carousalArea}

            {/* Order items list */}

            {dash?.store_detail?.store_type == "Retail" && (
              <>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={dash?.sellers_list?.label}
                  renderItem={handleSellerList}
                  horizontal
                  key="!"
                  keyExtractor={(item, index) => {
                    return "!" + index;
                  }}
                />
                <Vertical size={20} />
              </>
            )}
            {dash?.store_detail?.store_type == "Retail" ? (
              <>{itemsSellers}</>
            ) : (
              <>{itemsMemo}</>
            )}

            {/* <Text style={styles.category}>
              {dash?.all_menus[dash?.selected_menu]?.name},
            </Text>
            <Text style={styles.category}>
              {
                dash?.all_categories?.filter((item) =>
                  dash?.all_menus[dash?.selected_menu]?.categories?.includes(
                    item?._id
                  )
                )[dash?.selected_category]?.category_name
              }
            </Text> */}
          </View>
        }
      />

      {openModssheet == 0 ? (
        <ModsBottomSheet
          sheetIndex={openModssheet}
          setOpenModssheet={setOpenModssheet}
          currentModscat={currentModscat}
          dash={dash}
          extrasArr={extrasArr}
          handleClose={handleClose}
          handleFoodItemArr2={handleFoodItemArr2}
          handleModList={handleModList}
          menuavailablity={menuavailablity}
          note={note}
          redoData={redoData}
          handleClickNotes={handleClickNotes}
          handleModDone={handleModDone}
          handleSelectExtra={handleSelectExtra}
        />
      ) : null}

      <NotesModal
        dash={dash}
        handleNoteDone={handleNoteDone}
        note={note}
        openModal={openModal}
        setNote={setNote}
        setOpenModal={setOpenModal}
      />

      <ModsPriceAlert
        dash={dash}
        isVisible={priceAlertData?.open}
        itemName={priceAlertData?.name}
        price={priceAlertData?.price}
        onClose={handleClosePriceModal}
        onConfirm={handleConfirmPriceModal}
      />

      <ConfermationModal
        dash={dash}
        onClose={handleLeaveConfermationModal}
        onConfirm={handleStayConfermationModal}
        isVisible={stayleave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  countainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F6F6F6",
  },
  scrollCountainer: {
    flex: 1,
  },
  locationcountainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  greeting_status: {
    fontSize: baseFont.greeting_text,
    fontWeight: "600",
    includeFontPadding: false,
    lineHeight: baseFont.greeting_text * 1.3,
    verticalAlign: "middle",
    paddingVertical: 0,
    
  },

  seachcomponentstyle: {
    marginBottom: 0,
    height: 42,
    borderWidth: 0.8,
    borderRadius: English.rounde_edge.search,
    width: "100%",
  },
  itemlistArea: { flex: 1 },
  itemlistCountainer: { gap: 12, marginBottom: 12 },
  customDropdownStyle: {
    height: "auto",
    width: 200,
    paddingHorizontal: 0,
    marginVertical: 0,
    borderWidth: 0,
    padding: 0,
    position: "absolute",
    right: 0,
  },
  searchimage: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  searchcountainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchplace: {
    // padding:12,
    height: 30,
    width: 30,
    alignItems: "flex-end",
  },
  customDropdownContainer: {
    width: 200,
    top: 10,
  },
});
