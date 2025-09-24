import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Text } from "../ui-kit/text";
import { color, typography } from "../theme";
import { Vertical } from "../ui-kit/spacer";
import { baseFont } from "../theme/font-size";

export const FoodItem = (props) => {
  const { name, price, onPress, img, index, availability, item, dash } = props;
  const isArrayImages = Array.isArray(img);
  const isDefaultImages = isArrayImages
    ? img[0]?.url == "" || img == undefined
    : img == "" || img == undefined;
  return (
    <>
      {!item?.isDummy ? (
        <>
          {isDefaultImages ? (
            <Pressable
              style={[
                styles.container,
                availability && { opacity: 0.7 },
                {
                  backgroundColor: dash?.base_themes?.layout_color,
                  borderRadius: 12,
                  justifyContent: "space-between",
                  height: 70,
                },
              ]}
              onPress={onPress}
            >
              <Text
                style={[
                  styles.name,
                  {
                    color: dash?.base_themes?.active_text_color,
                    marginTop: 10,
                    marginHorizontal: 10,
                  },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
                allowFontScaling={false}
              >
                {name}
              </Text>

              <Text
                style={[
                  styles.price,
                  {
                    color: dash?.base_themes?.inactive_text_color,
                    marginBottom: 10,
                    marginHorizontal: 10,
                  },
                ]}
                allowFontScaling={false}
              >
                ${price}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              style={[styles.container, availability && { opacity: 0.7 }]}
              onPress={onPress}
            >
              <View style={styles.shadowWrapper}>
                <View style={styles.imageContainer}>
                  <View style={styles.imageInner}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: isArrayImages ? img[0]?.url : item?.image,
                      }}
                      alt="food item"
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </View>

              <Vertical size={12} />
              <View>
                <Text
                  style={[
                    styles.name,
                    { color: dash?.base_themes?.active_text_color },
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  allowFontScaling={false}
                >
                  {name}
                </Text>
                <Vertical size={4} />
                <Text
                  style={[
                    styles.price,
                    { color: dash?.base_themes?.inactive_text_color },
                  ]}
                  allowFontScaling={false}
                >
                  ${price}
                </Text>
              </View>
            </Pressable>
          )}
        </>
      ) : (
        <View style={styles.container}></View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    overflow: "hidden",
    padding: 2,
  },

  imageContainer: {
    width: "100%",
    height: 110,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  shadowWrapper: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  name: {
    overflow: "hidden",
    fontSize: baseFont.item_name_text,
    fontWeight: "400",
    textAlign: "left",
    color: "#1D1D21",
    fontFamily: typography.jakarta_medium,
    includeFontPadding: false,
    lineHeight: baseFont.item_name_text * 1.3,
  },

  price: {
    fontSize: baseFont.item_price_text,
    fontWeight: "600",
    flexShrink: 0,
    textAlign: "left",
    fontFamily: typography.jakarta_regular,
    includeFontPadding: false,
    lineHeight: baseFont.item_price_text * 1.3,
    color: "#878787",
  },

  availabilitystylle: {
    borderColor: "#ff0000",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },

  imageInner: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 15,
  },
});
