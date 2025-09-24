import { useMemo } from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { color, typography } from "../../theme";
import UseBestSellingItems from "../../hooks/use-best-selling-items";
import { English } from "../../utils/en";
import UseHome from "../../hooks/use-home";
import ConfermationModal from "../../components/confermation-modal";
import ModsPriceAlert from "../../components/mods-price-alert";
import NoitemFound from "../../components/noitem-found";
import { ModsBottomSheet } from "../../components/mods-bottom-sheet";
import CustomDropdown from "../../components/common/dropdown";
import { SearchComponent } from "../../components/common/search";
import NotesModal from "../../components/notes-modal";
import { Vertical } from "../../ui-kit/spacer";
import { baseFont } from "../../theme/font-size";

const ItemPage = () => {
  const {
    handleShowSearch,
    showSearch,
    handleHorizontalGrid,
    dash,
    categoryItems,
    setSearchValue,
    setShowDownPage,
    showDownPage,
    handleSelectCategory,
    setShowMenu,
    showMenu,
    handleSelectMenu,
    searchValue,
  } = UseBestSellingItems();

  const {
    handleFoodItem,
    bottomSheetRef2,
    handleModList,
    handleSelectExtra,
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
    handleListFoodItem,
    redoData,
    currentModscat,
    handleFoodItemArr2,
    openModssheet,
    setOpenModssheet,
    handleCatogeryItem,
    handleMenuList,
    handleSearchbutton,
    openSearchArea,
    showMenuItem,
    showCatogeryItem,
  } = UseHome();

  return (
    <View
      style={[
        styles.countainer,
        { backgroundColor: dash?.base_themes?.background_color },
      ]}
    >
      <Vertical size={20} />
      {/* Menu List*/}
      {dash?.all_menus?.length == 0 ? null : (
        <View style={styles.searchcountainer}>
          <View style={{ flex: 1 }}>
            {!showMenuItem() ? null : (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={dash?.all_menus}
                renderItem={handleMenuList}
                horizontal
                key="!"
                keyExtractor={(item, index) => {
                  return "!" + index;
                }}
                contentContainerStyle={{ height: 42 }}
              />
            )}
          </View>
          <View style={{height:'80%',borderLeftWidth:1,borderColor:dash?.base_themes?.inactive_text_color,marginHorizontal:10}}/>
          <View style={styles.icons_div}>
            {/* search icon */}
            <Pressable
              hitSlop={15}
              onPress={handleShowSearch}
              style={[styles.search_icon_div]}
              disabled={categoryItems?.length == 0}
            >
              <Image
                style={[
                  styles.img_style1,
                  { tintColor: `${dash?.base_themes?.inactive_text_color}` },
                ]}
                source={
                  showSearch
                    ? require("../../assets/icons/close_search_item.png")
                    : require("../../assets/icons/search_item.png")
                }
              />
            </Pressable>

            {/* grid icon */}
            <Pressable
              hitSlop={15}
              disabled={categoryItems?.length == 0}
              onPress={handleHorizontalGrid}
            >
              {!dash?.grid_view ? (
                <Image
                  style={[
                    styles.img_style,
                    {
                      tintColor: `${dash?.base_themes?.inactive_text_color}`,
                    },
                  ]}
                  source={require("../../assets/icons/grid-icon.png")}
                />
              ) : (
                <Image
                  style={[
                    styles.img_style,
                    {
                      tintColor: `${dash?.base_themes?.inactive_text_color}`,
                    },
                  ]}
                  source={require("../../assets/icons/list-icon.png")}
                />
              )}
            </Pressable>
          </View>
        </View>
      )}

      <Vertical size={10} />
      {/* Catogery List*/}
      {!showCatogeryItem() ? null : (
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={dash?.all_categories?.filter((item) =>
              dash?.all_menus[dash?.selected_menu]?.categories?.includes(
                item?._id
              )
            )}
            renderItem={handleCatogeryItem}
            horizontal
            key="?"
            keyExtractor={(item, index) => {
              return "?" + index;
            }}
          />
          <Vertical size={20} />
        </View>
      )}

      {/* searchfield */}
      <View>
        {showSearch && (
          <>
            <SearchComponent
              text={searchValue}
              setText={setSearchValue}
              placeholder={English.best_selling_items.search_title}
              borderStyle={[
                styles.seachcomponentstyle,
                {
                  backgroundColor: dash?.base_themes?.background_color,
                  borderColor: `${dash?.base_themes?.inactive_text_color}40`,
                },
              ]}
              dash={dash}
            />
            <Vertical size={20} />
          </>
        )}
      </View>

      {/* Items */}
      {categoryItems?.length ? (
        <View style={styles.listCountainer}>
          {dash?.grid_view ? (
            <FlatList
              key={"grid-view"}
              data={handleFoodItemArr(categoryItems)}
              numColumns={2}
              renderItem={handleFoodItem}
              keyExtractor={(_, index) => {
                return "!" + index;
              }}
              style={{ flex: 1 }}
              persistentScrollbar={true}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{ gap: 15, marginBottom: 12 }}
              ListFooterComponent={<View style={{ height: 100 }} />}
              nestedScrollEnabled={true}
            />
          ) : (
            <FlatList
              key={"list-view"}
              data={categoryItems}
              numColumns={1}
              renderItem={handleListFoodItem}
              keyExtractor={(_, index) => {
                return "?" + index;
              }}
              style={{ flex: 1 }}
              persistentScrollbar={true}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
              ListFooterComponent={<View style={{ height: 100 }} />}
              nestedScrollEnabled={true}
            />
          )}
        </View>
      ) : (
        <NoitemFound dash={dash} />
      )}

      {/* all mods bottom sheet */}
      {openModssheet == 0 && (
        <>
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
        </>
      )}

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

export default ItemPage;

const styles = StyleSheet.create({
  countainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F6F6F6",
  },

  listCountainer: {
    flex: 1,
  },

  icons_div: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingLeft: 5,
  },

  header_div: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  search_icon_div: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  img_style: {
    width: 22,
    height: 22,
    objectFit: "contain",
  },
  img_style1: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  modal: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 350,
    borderRadius: 10,
    paddingBottom: 32,
    paddingTop: 46,
    paddingHorizontal: 16,
    position: "relative",
  },

  //new
  dropdownArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  customDropdownStyle: {
    width: 120,
    borderWidth: 0,
    paddingHorizontal: 0,
    marginVertical: 0,
    padding: 0,
    height: "auto",
  },
  customPlaceholderStyle: {
    textAlign: "left",
    fontSize: baseFont.item_dropdown_value,
    fontFamily: typography.jakarta_semibold,
    includeFontPadding: false,
    lineHeight: baseFont.item_dropdown_value * 1.3,
    paddingHorizontal: 0,
  },
  customSelectedTextStyle: {
    textAlign: "left",
    fontSize: baseFont.item_dropdown_value,
    fontFamily: typography.jakarta_semibold,
    includeFontPadding: false,
    lineHeight: baseFont.item_dropdown_value * 1.3,
    paddingHorizontal: 0,
  },
  customItemTextStyle: {
    textAlign: "left",
    fontSize: baseFont.item_dropdown_value,
    fontFamily: typography.jakarta_semibold,
    includeFontPadding: false,
    lineHeight: baseFont.item_dropdown_value * 1.3,
    paddingHorizontal: 0,
  },
  customDropdownContainer: {
    width: 200,
    top: 10,
  },
  seachcomponentstyle: {
    marginBottom: 0,
    height: 38,
    borderWidth: 0.8,
    borderRadius: English.rounde_edge.search,
    width: "100%",
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
});
