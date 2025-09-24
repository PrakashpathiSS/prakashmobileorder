import { useState } from "react";
import { Text } from "../ui-kit/text";
import { Image, Platform, Pressable, StyleSheet, View } from "react-native";
import { color, typography } from "../theme";
import { English } from "../utils/en";
import { Horizontal, Vertical } from "../ui-kit/spacer";
import { Divider } from "../ui-kit/divider";
const CartItemsList = (props) => {
  const {
    name,
    amount,
    image,
    handleDelete,
    index,
    showDeleteIcon,
    extras,
    notes,
    onPress,
    itemincriment,
    count,
    dash,
  } = props;

  const isArrayImages = Array.isArray(image);

  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  const handleTextLayout = (e, combinedText) => {
    if (Platform.OS == "ios") {
      setShowToggle(combinedText?.length > 33);
      return;
    }
    const lines = e.nativeEvent.lines.length;
    setShowToggle(lines > 1);
  };

  const combinedText = extras
    ?.map((item) => {
      const priceText = item?.price > 0 ? `+ $${item?.price}` : "";
      return `${item?.name} ${priceText ? ` ${priceText}` : ""}`;
    })
    ?.join(",  ");
 const isDefaultImages = isArrayImages
    ? image[0]?.url == "" || image == undefined
    : image == "" || image == undefined;
  return (
    <Pressable style={styles.food_card_div} onPress={onPress}>
      {/* image */}

      <View style={styles.details_div}>
        <View style={styles.food_details_div}>
          <View style={styles.itemareacontainer}>
            {isDefaultImages ? null : (
              <>
                <View style={styles.image_div}>
                  <Image
                    style={styles.img_style}
                    source={{ uri: isArrayImages ? image[0]?.url : image }}
                  />
                </View>
                <Horizontal size={10} />
              </>
            )}
            <View style={styles.itemArea}>
              <View style={styles.namepriccountainer}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.name_text_style,
                    { color: dash?.base_themes?.active_text_color },
                  ]}
                >
                  {name}
                </Text>
                <View style={styles.itemincrimentcountainer}>
                  {showDeleteIcon ? null : (
                    <Pressable
                      style={styles.delete_icon_style}
                      onPress={() => handleDelete(index)}
                      hitSlop={2}
                    >
                      <Image
                        source={require("../assets/icons/xmarkiocn.png")}
                        style={styles.img_style}
                        tintColor={dash?.base_themes?.active_text_color}
                      />
                    </Pressable>
                  )}
                </View>
              </View>
              {/* <Vertical size={16} /> */}
              <View style={styles.itempriceareacountainer}>
                <View
                  style={[
                    styles.boxarea,
                    { borderColor: dash?.base_themes?.inactive_text_color },
                  ]}
                >
                  <Pressable
                    hitSlop={20}
                    style={styles.countcountainer}
                    onPress={() => itemincriment("Remove", index)}
                  >
                    <Image
                      source={require("../assets/icons/minus_icon.png")}
                      style={[
                        styles.boxicon,
                        { tintColor: dash?.base_themes?.inactive_text_color },
                      ]}
                    />
                  </Pressable>
                  <View
                    style={[
                      styles.countcountainer,
                      { borderLeftWidth: 0.5, borderRightWidth: 0.5 },
                    ]}
                  >
                    <Text
                      style={[
                        styles.boxareatext,
                        { color: dash?.base_themes?.inactive_text_color },
                      ]}
                    >
                      {count}
                    </Text>
                  </View>
                  <Pressable
                    hitSlop={20}
                    style={styles.countcountainer}
                    onPress={() => itemincriment("Add", index)}
                  >
                    <Image
                      source={require("../assets/icons/plus_icon.png")}
                      style={[
                        styles.boxicon,
                        { tintColor: dash?.base_themes?.inactive_text_color },
                      ]}
                    />
                  </Pressable>
                </View>
                <Text
                  style={[
                    styles.amount_text_style,
                    { color: dash?.base_themes?.active_text_color },
                  ]}
                >
                  $
                  {Number(
                    Number(amount) +
                      extras?.reduce(
                        (total, item) => Number(total) + Number(item?.price),
                        0
                      )
                  ).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
          <Vertical size={12} />
          {extras?.length > 0 && (
            <>
              <Pressable
                hitSlop={10}
                style={[styles.listdrpdown, expanded && { width: "100%" }]}
                onPress={() => setExpanded(!expanded)}
                disabled={!showToggle && !expanded}
              >
                <Text
                  onTextLayout={(e) => {
                    handleTextLayout(e, combinedText);
                  }}
                  numberOfLines={expanded ? undefined : 1}
                  style={[
                    styles.extatext,
                    { color: dash?.base_themes?.inactive_text_color },
                  ]}
                >
                  {combinedText}

                  {expanded && (
                    <Text
                      style={[
                        styles.extatext,
                        { color: dash?.base_themes?.inactive_text_color },
                      ]}
                    >
                      {" "}
                      ...
                      <Image
                        source={require("../assets/icons/uparrow.png")}
                        style={[
                          styles.downarrw,
                          {
                            tintColor: dash?.base_themes?.inactive_text_color,
                          },
                        ]}
                      />
                    </Text>
                  )}
                </Text>
                {showToggle && !expanded && (
                  <Image
                    source={require("../assets/icons/downarrow.png")}
                    style={[
                      styles.downarrw,
                      { tintColor: dash?.base_themes?.inactive_text_color },
                    ]}
                  />
                )}
              </Pressable>
              <Vertical size={8} />
            </>
          )}

          {notes && (
            <>
              <Text
                style={[
                  styles.notestext,
                  { color: dash?.base_themes?.inactive_text_color },
                ]}
              >
                {English.cart_item?.notes}: {notes}
              </Text>
              <Vertical size={8} />
            </>
          )}
        </View>
      </View>
      <Divider style={{ borderColor: "#F7F7F7" }} />
    </Pressable>
  );
};

export default CartItemsList;

const styles = StyleSheet.create({
  food_card_div: {
    width: "100%",
    marginBottom: 12,
    paddingHorizontal: 16,
  },

  img_style: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 8,
  },

  image_div: {
    width: 85,
    height: 64,
    elevation: 5,
  },

  details_div: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },

  food_details_div: {
    flex: 1,
  },

  name_text_style: {
    fontSize: 14,
    fontFamily: typography.jakarta_medium,
    fontWeight: "500",
    lineHeight: 14 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
    color: "#303030",
  },
  extatext: {
    fontSize: 12,
    fontFamily: typography.jakarta_regular,
    fontWeight: "400",
    lineHeight: 12 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
    color: "#737373",
  },
  notestext: {
    fontSize: 12,
    fontFamily: typography.jakarta_regular,
    fontWeight: "400",
    lineHeight: 12 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
    color: "#737373",
  },
  amount_text_style: {
    fontSize: 16,
    fontFamily: typography.jakarta_semibold,
    fontWeight: "500",
    lineHeight: 16 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
    color: "#303030",
  },

  button_style: {
    backgroundColor: "#6D54CF",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: 89.69,
  },

  delete_icon_style: {
    width: 20,
    height: 20,
  },

  downarrw: {
    height: 12,
    width: 12,
    resizeMode: "contain",
  },
  listdrpdown: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "60%",
  },
  namepriccountainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemincrimentcountainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxicon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    tintColor: "#737373",
  },
  boxareatext: {
    fontSize: 12,
    fontFamily: typography.jakarta_medium,
    fontWeight: "400",
    lineHeight: 12 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
    color: "#737373",
  },
  boxarea: {
    height: 25,
    width: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#DCDCDC",
  },
  countcountainer: {
    height: "100%",
    width: 25,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#DCDCDC",
  },
  itemArea: {
    flex: 1,
    justifyContent: "space-between",
    height: 64,
  },
  itemareacontainer: {
    flexDirection: "row",
    alignItems: "center",
    alignItems: "center",
  },
  itempriceareacountainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
