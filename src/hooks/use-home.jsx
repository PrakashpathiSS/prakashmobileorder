import React, { useCallback, useEffect, useRef, useState } from "react";
import FoodItemList from "../components/food-item-list";
import FoodCardList from "../components/food-card-list";
import { Platform, Pressable, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import UseCommonHook from "./use-common-hook";
import {
  get_all_items,
  get_best_selling_items,
  get_dashmerch_details,
  retailSellers,
} from "../example/api";
import {
  all_items,
  cart_items,
  category_item,
  store_detail,
  all_menus,
  all_categories,
  all_mods,
  selected_menu,
  selected_category,
  selected_item,
  selected_mod,
  selected_extras,
  banner_images,
  setHidetabbar,
  setBaseTheme,
  setSellersList,
} from "../redux/slice/user";
import { Routes } from "../navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "../theme";
import { Text } from "../ui-kit/text";
import { MenuItem } from "../components/menu-item";
import { FoodItem } from "../components/food-item";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { ListFoodItem } from "../components/list-food-item";
import { show_toast } from "../utils/toast/toast";
import { authHeaders } from "../utils/headers";
import { CatogeryItem } from "../components/catogery-item";
import { BlurView } from "@react-native-community/blur";

const UseHome = () => {
  const foodItemListRef = useRef(null);
  const dash = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [changeColor, setchangeColor] = useState(0);
  const [refresh, setRefresh] = useState(Date.now());
  const [note, setNote] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [menuavailablity, setMenuavailablity] = useState(false);
  const [stayleave, setStayleave] = useState(false);
  const [redoData, setRedoData] = useState(null);
  const [priceAlertData, setpriceAlertData] = useState({});
  const [currentModscat, setCurrentModscat] = useState(null);
  const [extrasArr, setextrasArr] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [itemList, setitemList] = useState([]);
  const [dropdownArrow, setdropdownArrow] = useState(false);
  const [openMenusheet, setOpenMenusheet] = useState(-1);
  const [openModssheet, setOpenModssheet] = useState(-1);
  const [openSearchArea, setopenSearchArea] = useState(false);
  const [selectSellerIndex, setSlectSellerIndex] = useState(0);
  const getGreeting = () => {
    // const hour = new Date().getHours();
    // if (hour < 12) return 'Good Morning';
    // if (hour < 17) return 'Good Afternoon';
    // return 'Good Evening';
    return dash?.business_name;
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(setHidetabbar(false));
      setOpenMenusheet(-1);
      setOpenModssheet(-1);
    }, [])
  );

  useEffect(() => {
    setextrasArr(
      dash?.selected_extras?.flatMap((e) =>
        e?.extras?.map((extra) => ({
          ...extra,
          mods_default_price: extra?.price,
        }))
      ) || []
    );
  }, [dash]);

  useEffect(() => {
    const curretMods = dash?.all_mods?.filter((mod) =>
      dash?.all_categories
        ?.find((item) => item?._id === dash?.selected_item?.category_id)
        ?.mods?.includes(mod?._id)
    );

    setCurrentModscat(curretMods);
  }, [dash]);

  //refresh
  useEffect(() => {
    setRefresh(Date.now());
  }, []);

  //find menu availability
  useEffect(() => {
    const availMenu = dash?.all_menus?.find((_, i) => i == dash?.selected_menu);
    setMenuavailablity(availMenu?.availability);
  }, [dash?.all_menus, dash?.selected_menu]);

  useEffect(() => {
    const item = dash?.all_items?.filter(
      (item) =>
        item?.category_id ===
        dash?.all_categories?.filter((item) =>
          dash?.all_menus[dash?.selected_menu]?.categories?.includes(item?._id)
        )[dash?.selected_category]?._id
    );

    const finaloutput = item?.filter((e) =>
      e?.name?.toLowerCase()?.includes(searchItem?.toLowerCase())
    );
    setitemList(finaloutput);
  }, [searchItem, dash]);

  //trigger best selling and all items func
  useEffect(() => {
    handleGetAllItems();
    handleGetMerchantDashDetails(dash.store_detail);
    if (dash?.store_detail?.store_type == "Retail") {
      getRetailItems(dash.store_detail);
    }else{
      dispatch(setSellersList(null))
    }
  }, [dash.store_detail, count]);

  //get colors
  // useEffect(() => {
  //   AsyncStorage.getItem('theme_colors')
  //     .then((res) => {
  //       const theme_colors = JSON.parse(res)
  //       color.palette['orangeBtn'] = theme_colors.btn_color
  //       color.palette['mainTextColor'] = theme_colors.body_text_main_color
  //       color.palette['subTextColor'] = theme_colors.body_text_sub_color
  //     })
  //     .catch((err) => {
  //       console.log('async storage color err')
  //     })
  // }, [changeColor])

  //get all items
  const handleGetAllItems = () => {
    let payload = {
      merchant: dash?.business_name,
      store: dash?.store_detail?.store_name,
    };

    get_all_items(payload, dash?.headers)
      .then((res) => {
        dispatch(all_menus(res?.data?.all_menus));
        dispatch(all_categories(res?.data?.all_categories));
        dispatch(all_items(res?.data?.all_items));
        dispatch(all_mods(res?.data?.all_mods));
        dispatch(selected_menu(0));
        dispatch(selected_category(0));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err?.response?.data, "------>");

        dispatch(all_menus([]));
        dispatch(all_categories([]));
        dispatch(all_items([]));
        dispatch(all_mods([]));
        setLoading(false);
      });
  };

  //get merchant dashboard details
  const handleGetMerchantDashDetails = (data) => {
    let payload = {
      store_id: data?._id,
    };

    get_dashmerch_details(payload, authHeaders(data?.token))
      .then(async (res) => {
        console.log(res?.data?.theme_colors, "-->");
        if (res?.data?.theme_colors) {
          dispatch(
            setBaseTheme({
              ...dash?.base_themes,
              ...res?.data?.theme_colors,
            })
          );
        }

        // if (res?.data?.theme_colors) {
        //   await AsyncStorage.setItem('theme_colors', JSON.stringify(res?.data?.theme_colors))
        // }
        dispatch(banner_images(res?.data?.banner_images ?? []));
        setchangeColor((prev) => prev + 1);
      })
      .catch((err) => {
        dispatch(banner_images([]));
        console.log(err, "dashmerch err");
      });
  };

  //add button
  const handleAddBtn = (item) => {
    dispatch(cart_items([...dash?.cart_items, item]));
  };

  //handle navigate to category item
  const handleNavigateCategoryItems = (item) => {
    dispatch(category_item(item));
    navigation.navigate(Routes.BESTSELLINGITEMS);
  };

  // food card list
  const handleFoodCardList = ({ item, index }) => {
    return (
      <FoodCardList
        key={index}
        item={item}
        name={item?.name}
        amount={item?.price}
        image={item?.image}
        handleAddBtn={() => {
          handleAddBtn(item);
        }}
      />
    );
  };

  //menu list
  const handleMenuList = ({ item, index }) => {
    return (
      <View key={index}>
        <MenuItem
          key={index}
          availability={item?.availability}
          name={item?.name}
          active={index === dash?.selected_menu}
          onPress={() => {
            dispatch(selected_menu(index));
            dispatch(selected_category(0));
          }}
          dash={dash}
        />
      </View>
    );
  };
  //seller list
  const handleSellerList = ({ item, index }) => {
    return (
      <View key={index}>
        <MenuItem
          key={index}
          availability={true}
          name={item?.label}
          active={index === selectSellerIndex}
          onPress={() => {
            setSlectSellerIndex(index);
          }}
          dash={dash}
        />
      </View>
    );
  };

  const handleCatogeryItem = ({ item, index }) => {
    return (
      <CatogeryItem
        disabled={!menuavailablity || !item?.category_status}
        key={index}
        name={item?.category_name}
        active={index === dash?.selected_category}
        onPress={() => {
          dispatch(selected_category(index));
          setOpenMenusheet(-1);
          dispatch(setHidetabbar(false));
        }}
        dash={dash}
      />
    );
  };

  //mod list
  const handleModList = ({ item, index }) => {
    return (
      <View key={index}>
        <MenuItem
          key={index}
          name={item?.name}
          availability={menuavailablity}
          active={item?._id === dash?.selected_mod?._id}
          onPress={() => {
            dispatch(selected_mod(item));
            // dispatch(selected_category(0))
          }}
          dash={dash}
        />
      </View>
    );
  };

  //food item
  const handleFoodItem = ({ item, index }) => {
    return (
      <FoodItem
        key={index}
        name={item?.name}
        index={index}
        img={item?.image}
        price={item?.price}
        availability={!menuavailablity || !item?.status}
        onPress={() => {
          if (item?.status) {
            const selectedCategory = dash?.all_categories?.find(
              (foodItem) => foodItem?._id === item?.category_id
            );
            const mods_item = selectedCategory?.mods?.map((modId) =>
              dash?.all_mods?.find((mod) => mod?._id === modId)
            );
            dispatch(selected_item(item));
            dispatch(selected_mod(mods_item[0]));
            selectedFoodItem(item, mods_item);
          }
        }}
        item={item}
        dash={dash}
      />
    );
  };

  //food item
  const handleSellerItem = ({ item, index }) => {
    return (
      <FoodItem
        key={index}
        name={item?.name}
        index={index}
        img={item?.image}
        price={item?.price}
        availability={false}
        onPress={() => {
          dispatch(selected_item(item));
          dispatch(selected_mod(item?.mods[0]));
          selectedFoodItem(item, item?.mods);
        }}
        item={item}
        dash={dash}
      />
    );
  };

  //list food item
  const handleListFoodItem = ({ item, index }) => {
    return (
      <ListFoodItem
        key={index}
        name={item?.name}
        index={index}
        img={item?.image}
        price={item?.price}
        availability={!menuavailablity || !item?.status}
        onPress={() => {
          if (item?.status) {
            const selectedCategory = dash?.all_categories?.find(
              (foodItem) => foodItem?._id === item?.category_id
            );
            const mods_item = selectedCategory?.mods?.map((modId) =>
              dash?.all_mods?.find((mod) => mod?._id === modId)
            );
            dispatch(selected_item(item));
            dispatch(selected_mod(mods_item[0]));
            selectedFoodItem(item, mods_item);
          }
        }}
        item={item}
        dash={dash}
      />
    );
  };

  //select food item
  const selectedFoodItem = (currentitem, cartMod) => {
    if (cartMod?.length) {
      setOpenModssheet(0);
      dispatch(setHidetabbar(true));
    } else {
      if (menuavailablity) {
        dispatch(
          cart_items(
            dash?.cart_items?.length
              ? [
                  ...dash?.cart_items,
                  {
                    ...currentitem,
                    extras: [],
                    notes: "",
                    item_default_price: currentitem?.price || 0.0,
                    count: 1,
                  },
                ]
              : [
                  {
                    ...currentitem,
                    extras: [],
                    notes: "",
                    item_default_price: currentitem?.price || 0.0,
                    count: 1,
                  },
                ]
          )
        );
      }
    }
  };

  //food item list
  const handleFoodItemList = ({ item, index }) => {
    return (
      <Pressable
        key={index}
        disabled={item?.status && item?.availability ? false : true}
        onPress={() => {
          handleNavigateCategoryItems(item);
        }}
      >
        <FoodItemList name={item?.category} category={item} />
      </Pressable>
    );
  };

  //scroll food item list
  const handleScrollFoodItemList = (dir) => {
    let newOffset = scrollOffset;

    if (dir === "left") {
      newOffset = scrollOffset - 200;
    } else {
      newOffset = scrollOffset + 200;
    }

    if (foodItemListRef.current) {
      foodItemListRef.current.scrollToOffset({
        offset: newOffset,
        animated: true,
      });
    }

    setScrollOffset(newOffset);
  };

  //select store
  const handleSelectStore = (value) => {
    setLoading(true);
    dispatch(store_detail(value));
    dispatch(category_item([]));
    dispatch(cart_items([]));
    setCount(count + 1);
    setchangeColor((prev) => prev + 1);
  };

  //select extra
  const handleSelectExtra = (value) => {
    if (!currentModscat?.length) return;

    // Loop through mod categories
    let updatedExtras = [...(dash?.selected_extras || [])];
    let shouldUpdateSelection = false;

    currentModscat.forEach((mod) => {
      if (!mod?._id) return;

      const existingCatIndex = updatedExtras.findIndex(
        (cat) => cat._id === mod._id
      );
      const modExtras = mod?.extras || [];

      // Check if this value belongs to this mod category
      const isValueInMod = modExtras.some((extra) => extra._id === value._id);
      if (!isValueInMod) return;

      if (existingCatIndex !== -1) {
        // Category already exists in selected_extras
        const existingCat = updatedExtras[existingCatIndex];
        const alreadySelected = existingCat.extras?.some(
          (extra) => extra._id === value._id
        );

        let newExtras;
        if (dash.store_detail?.store_type !== "Retail") {
          if (alreadySelected) {
            // Remove the value
            newExtras = existingCat.extras.filter(
              (extra) => extra._id !== value._id
            );
          } else {
            // Add the value
            newExtras = [...existingCat.extras, value];
          }
        } else {
          if (alreadySelected) {
            // Remove the value
            newExtras = [];
          } else {
            // Add the value
            newExtras = [value];
          }
        }

        const zeroPriceCount = newExtras?.filter(
          (item) => item?.price === "0.00"
        )?.length;
        const hasOnlyZeroPriceItems = newExtras.every(
          (item) => parseFloat(item.price) === 0
        );
        if (existingCat?.length == 0 && hasOnlyZeroPriceItems) {
          shouldUpdateSelection = true;
          updatedExtras[existingCatIndex] = {
            ...existingCat,
            extras: newExtras,
            selected_length: zeroPriceCount,
          };
          return;
        }
        // if (existingCat?.length == 0) {
        //   shouldUpdateSelection = true
        //   updatedExtras[existingCatIndex] = {
        //     ...existingCat,
        //     extras: newExtras,
        //     selected_length: zeroPriceCount,
        //   };
        //   return
        // }

        //if priced item
        if (!alreadySelected && value?.price !== "0.00") {
          updatedExtras[existingCatIndex] = {
            ...existingCat,
            extras: newExtras.map((e) => {
              if (e._id === value._id) {
                return {
                  ...e,
                  price: e?.price == "0.00" ? existingCat?.price : e?.price,
                };
              }
              return e;
            }),
            selected_length: zeroPriceCount,
          };
          setRedoData(updatedExtras);
          setpriceAlertData({
            name: value?.name,
            price: value?.price == "0.00" ? existingCat?.price : value?.price,
            open: true,
          });
          return;
        }
        //if priced item
        if (!alreadySelected) {
          if (zeroPriceCount > existingCat?.length) {
            updatedExtras[existingCatIndex] = {
              ...existingCat,
              extras: newExtras.map((e) => {
                if (e._id === value._id) {
                  return {
                    ...e,
                    price: e?.price == "0.00" ? existingCat?.price : e?.price,
                  };
                }
                return e;
              }),
              selected_length: zeroPriceCount,
            };
            setRedoData(updatedExtras);
            setpriceAlertData({
              name: value?.name,
              price: value?.price == "0.00" ? existingCat?.price : value?.price,
              open: true,
            });
            return;
          }
        }

        shouldUpdateSelection = true;
        updatedExtras[existingCatIndex] = {
          ...existingCat,
          extras: newExtras,
          selected_length: zeroPriceCount,
        };
      } else {
        if (value?.price !== "0.00") {
          setRedoData([
            {
              ...mod,
              extras: [value],
              selected_length: value?.price === "0.00" ? 1 : 0,
            },
          ]);
          setpriceAlertData({
            name: value?.name,
            price: value?.price,
            open: true,
          });
          return;
        }
        // Add new category with this value
        updatedExtras.push({
          ...mod,
          extras: [value],
          selected_length: value?.price === "0.00" ? 1 : 0,
        });
        shouldUpdateSelection = true;
      }
    });

    if (shouldUpdateSelection) {
      dispatch(
        selected_extras(
          updatedExtras?.map((e) => {
            return {
              ...e,
              mods_default_price: e?.price,
            };
          })
        )
      );
    }
  };

  // bottom sheet backdrop component
  const renderBackdrop = useCallback(
    (props) => {
      if (props?.index < 0 && dash?.hidetabbar) return null;
      return (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.6}
          pressBehavior="close"
          onPress={() => {
            dispatch(setHidetabbar(false));
          }}
        />
      );
    },
    [dash]
  );

  //note done
  const handleNoteDone = () => {
    if (note?.startsWith(" ")) {
      show_toast("No leading space allowed");
      return;
    }
    setOpenModal(false);
  };

  //mod done
  const handleModDone = () => {
    dispatch(
      cart_items(
        dash?.cart_items?.length
          ? [
              ...dash?.cart_items,
              {
                ...dash?.selected_item,
                extras: extrasArr || [],
                notes: note,
                item_default_price: dash?.selected_item?.price || 0.0,
                count: 1,
              },
            ]
          : [
              {
                ...dash?.selected_item,
                extras: extrasArr || [],
                notes: note,
                item_default_price: dash?.selected_item?.price || 0.0,
                count: 1,
              },
            ]
      )
    );
    setOpenModssheet(-1);
    dispatch(setHidetabbar(false));
    dispatch(selected_mod([]));
    setNote("");
    dispatch(selected_extras(null));
  };

  //click notes button
  const handleClickNotes = () => {
    setOpenModal(true);
  };

  //close
  const handleClose = () => {
    //open stay or leave

    // if (menuavailablity) {
    //   setStayleave(true);
    // } else {
    //   handleLeaveConfermationModal();
    // }
    
    // if(menuavailablity){
       handleLeaveConfermationModal();
    // }
  };

  //leave ConfermationModal
  const handleLeaveConfermationModal = () => {
    dispatch(selected_extras([]));
    setNote("");
    setOpenModssheet(-1);
    dispatch(setHidetabbar(false));
    setStayleave(false);
  };
  //leave ConfermationModal
  const handleStayConfermationModal = () => {
    setStayleave(false);
  };

  const handleClosePriceModal = () => {
    setRedoData(null);
    setpriceAlertData({
      open: false,
    });
  };

  const handleConfirmPriceModal = () => {
    const existingExtras = dash?.selected_extras || [];
    const redoExtras = redoData || [];

    // Create a map of redoData by _id for easy lookup
    const redoMap = new Map(redoExtras.map((item) => [item._id, item]));

    // Merge: replace items in existingExtras if updated in redoData
    const mergedExtras = existingExtras.map((item) =>
      redoMap.has(item._id) ? redoMap.get(item._id) : item
    );

    // If redoData has any new categories not already in selected_extras
    const newExtras = redoExtras.filter(
      (item) => !existingExtras.some((existing) => existing._id === item._id)
    );

    const finalExtras = [...mergedExtras, ...newExtras];

    dispatch(selected_extras(finalExtras));
    setpriceAlertData({ open: false });
    setRedoData(null);
  };

  //food item array
  const handleFoodItemArr = (arr) => {
    if (arr) {
      if (arr?.length % 2 === 0) {
        return arr;
      } else {
        return [...arr, { isDummy: true }];
      }
    } else {
      return [];
    }
  };
  const handleFoodItemArr2 = (arr) => {
    if (!Array.isArray(arr)) return [];

    const remainder = arr.length % 3;

    if (remainder === 0) return arr;

    const dummyCount = 3 - remainder;
    const dummyItems = Array.from({ length: dummyCount }, () => ({
      isDummy: true,
    }));

    return [...arr, ...dummyItems];
  };

  const handleSearchbutton = () => {
    setopenSearchArea((prev) => !prev);
    setSearchItem("");
  };

  const getRetailItems = async (e) => {
    try {
      const payload = {
        merchant: dash?.business_name,
        store: dash?.store_detail?.store_name,
      };
      const res = await retailSellers(payload, authHeaders(e?.token));
      if (res) {
        dispatch(
          setSellersList({
            label: [
              {
                label: "New Collection",
                value: "New_Collection",
              },
              {
                label: "Best Seller",
                value: "Best_Seller",
              },
            ],
            values: {
              new_collection: res?.data?.new_collection?.map((e) => {
                return {
                  ...e,
                  price: e?.sale_price,
                  base_price: e?.sale_price,
                  image: e?.images,
                };
              }),
              best_seller: res?.data?.best_seller.map((e) => {
                return {
                  ...e,
                  price: e?.sale_price,
                  base_price: e?.sale_price,
                  image: e?.images,
                };
              }),
            },
          })
        );
      }
    } catch (error) {
      console.log(error?.response?.data, "getRetailItems");
    }
  };

    const showMenuItem = () => {
      if (dash?.all_menus?.length == 1) {
        return !dash?.store_detail?.single_item ? false : true;
      }
      return !!dash?.all_menus?.length;
    };
  
    const showCatogeryItem = () => {
      const categories=dash?.all_categories?.filter((item) =>
          dash?.all_menus[dash?.selected_menu]?.categories?.includes(item?._id)
        )
      if (categories?.length == 1) {
        return !dash?.store_detail?.single_item ? false : true;
      }
      return !!categories?.length;
    };
  return {
    activeIndex,
    setActiveIndex,
    handleFoodItemList,
    handleFoodCardList,
    dash,
    loading,
    foodItemListRef,
    handleScrollFoodItemList,
    handleSelectStore,
    // carouselImg,
    refresh,
    handleMenuList,
    handleFoodItem,
    dispatch,
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
    menuavailablity,
    handleClose,
    handleLeaveConfermationModal,
    handleStayConfermationModal,
    stayleave,
    priceAlertData,
    handleClosePriceModal,
    handleConfirmPriceModal,
    extrasArr,
    handleFoodItemArr,
    redoData,
    handleListFoodItem,
    currentModscat,
    handleFoodItemArr2,
    searchItem,
    setSearchItem,
    itemList,
    changeColor,
    dropdownArrow,
    setdropdownArrow,
    getGreeting,
    handleCatogeryItem,
    openMenusheet,
    openModssheet,
    setOpenMenusheet,
    setOpenModssheet,
    openSearchArea,
    handleSearchbutton,
    handleSellerList,
    selectSellerIndex,
    handleSellerItem,
    showMenuItem,
showCatogeryItem
  };
};

export default UseHome;
