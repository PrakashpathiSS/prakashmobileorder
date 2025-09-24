import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useMemo } from "react";
import { English } from "../utils/en";
import { typography } from "../theme";
import { Button } from "../ui-kit/button";
import { baseFont } from "../theme/font-size";
import { Vertical } from "../ui-kit/spacer";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import LinearGradient from "react-native-linear-gradient";
import { Divider } from "../ui-kit/divider";
import { useDispatch, useSelector } from "react-redux";
import { setIsexpandSummary } from "../redux/slice/user";

const CheckoutPageFooter = ({
  btntitle,
  onPress,
  calculateTotal,
  customeFoterStyle,
  calculateSubtotal,
  calculateTax,
  calculateTip,
  loading = false,
  disabled = false,
  bottomSheetRef,
}) => {
  const dispatch = useDispatch();
  const { is_expand_summary, base_themes, store_detail } = useSelector(
    (state) => state?.user
  );

  const handleToggle = () => {
    if (is_expand_summary) {
      bottomSheetRef.current?.collapse();
    } else {
      bottomSheetRef.current?.expand();
    }

    dispatch(setIsexpandSummary(!is_expand_summary));
  };
  const bottomsheet = useMemo(() => {
    //colors
    const handle_top_gradient = [
      base_themes?.background_color,
      `${base_themes?.button_color}90`,
    ];
    const handleArrow = {
      backgroundColor: base_themes?.inactive_text_color,
      tintColor: base_themes?.background_color,
    };

    const body_text = { color: base_themes?.active_text_color };
    const title_text = { color: base_themes?.inactive_text_color };
    const sheet_close_price_text = { color: base_themes?.button_color };
    const divider_color = { color: `${base_themes?.inactive_text_color}40` };
    //end
    const snapPoints = () => {
      if (Platform.OS == "ios") {
        return ["18%", store_detail?.store_type !== "Service"?"35%":"28"];
      }
      return ["12%", store_detail?.store_type !== "Service"?"35%":"28"];
    };
    return (
      <BottomSheet
        style={styles.bottmsheetstyle}
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints()}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        enableOverDrag={false}
        containerStyle={[styles.sheetCountainer]}
        bottomInset={0}
        backgroundStyle={[
          styles.sheetbackground,
          { backgroundColor: base_themes?.background_color },
        ]}
        handleComponent={() => (
          <>
            <View>
              <LinearGradient
                colors={handle_top_gradient}
                style={[styles.linergradiantstyle]}
                pointerEvents="none"
              />
              <View
                style={[
                  styles.linergeadiantmask,
                  { backgroundColor: base_themes?.background_color },
                ]}
              >
                <Pressable
                  hitSlop={50}
                  onPress={() => {
                    handleToggle();
                  }}
                  style={[
                    styles.handleCountainer,
                    { backgroundColor: handleArrow.backgroundColor },
                  ]}
                >
                  {is_expand_summary ? (
                    <Image
                      source={require("../assets/icons/downArrowsheet.png")}
                      style={[
                        styles.handleImage,
                        { tintColor: handleArrow.tintColor },
                      ]}
                    />
                  ) : (
                    <Image
                      source={require("../assets/icons/upArrowsheet.png")}
                      style={[
                        styles.handleImage,
                        { tintColor: handleArrow.tintColor },
                      ]}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          </>
        )}
      >
        <BottomSheetScrollView style={{ flex: 1 }}>
          <BottomSheetView style={styles.sheetViewStyle}>
            <View style={!is_expand_summary && { display: "none" }}>
              <Vertical size={5} />
              <Text style={[styles.titletext, body_text]}>
                {English.cart.summary_title}
              </Text>
              <Divider
                variant="dotted"
                style={[styles.dotareacountainer, divider_color]}
                dotedCountainerStyle={styles.doted}
                marginLeft={4}
                count={80}
              />

              <View style={styles.textRow}>
                <Text style={[styles.summaryTextlabel, body_text]}>
                  {English.cart.subtotal}
                </Text>
                <Text style={[styles.summaryText, body_text]}>
                  ${parseFloat(calculateSubtotal()).toFixed(2)}
                </Text>
              </View>
              <Vertical size={10} />
              {store_detail?.store_type !== "Service" && (
                <>
                  <View style={styles.textRow}>
                    <Text style={[styles.summaryTextlabel, body_text]}>
                      {English.cart.tip}
                    </Text>
                    <Text style={[styles.summaryText, body_text]}>
                      ${(calculateTip && calculateTip) || `0.00`}
                    </Text>
                  </View>
                  <Vertical size={10} />
                </>
              )}

              <View style={styles.textRow}>
                <Text style={[styles.summaryTextlabel, body_text]}>
                  {English.cart.tax}
                </Text>
                <Text style={[styles.summaryText, body_text]}>
                  ${calculateTax(calculateSubtotal())}
                </Text>
              </View>
              <Divider
                variant="dotted"
                style={[styles.dotareacountainer, divider_color]}
                dotedCountainerStyle={styles.doted}
                marginLeft={4}
                count={80}
              />
            </View>

            <View style={styles.textRow}>
              <Text style={[styles.totalTextlabel, body_text]}>
                {English.cart.grand_total}
              </Text>

              <Text style={[styles.totalText, sheet_close_price_text]}>
                ${calculateTotal()}
              </Text>
            </View>
          </BottomSheetView>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }, [
    bottomSheetRef,
    calculateTotal,
    customeFoterStyle,
    calculateSubtotal,
    calculateTax,
    calculateTip,
    is_expand_summary,
    dispatch,
  ]);
  return (
    <>
      {bottomsheet}
      <View style={styles.buttoncountainer}>
        <Button
          title={btntitle}
          style={[styles.btn, { backgroundColor: base_themes?.button_color }]}
          textStyle={[
            styles.buttontext,
            { color: base_themes?.button_text_color },
          ]}
          onPress={onPress}
          loading={loading}
          disabled={disabled || loading}
          opacityColor={base_themes?.button_color}
        />
        {Platform.OS == "android" ? (
          <Vertical size={16} />
        ) : (
          <Vertical size={5} />
        )}
      </View>
    </>
  );
};

export default CheckoutPageFooter;

const styles = StyleSheet.create({
  buttoncountainer: {
    paddingHorizontal: 16,
    marginBottom: Platform.OS == "ios" ? "2%" : 0,
  },
  text_div: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title_text_style: {
    fontSize: 20,
    color: "rgba(0,0,0,0.5)",
  },
  rate_text_style: {
    fontSize: 20,
    color: "rgba(0,0,0,0.7)",
    fontWeight: "700",
  },

  horizontal_rule_style: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)",
  },

  grand_total: {
    fontSize: 16,
    fontFamily: typography.jakarta_semibold,
    fontWeight: "600",
    lineHeight: 16 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  grand_total_price: {
    fontSize: 16,
    fontFamily: typography.jakarta_semibold,
    fontWeight: "600",
    lineHeight: 16 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  foterStyle: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 24,
  },
  btn: {
    width: "100%",
    height: 48,
    backgroundColor: "#000000",
    borderRadius: English.rounde_edge.button,
  },
  buttontext: {
    fontSize: 18,
    fontFamily: typography.jakarta_semibold,
    fontWeight: "600",
    lineHeight: 18 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  //sheet
  bottmsheetstyle: {
    elevation: 12,
    shadowColor: "#634EC1",
  },
  sheetCountainer: {
    backgroundColor: "transparent",
    marginBottom: Platform.OS == "ios" ? "20%" : "20%",
    borderRadius: 20,
    marginHorizontal: 16,
  },
  sheetbackground: {
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 0.5,
  },
  linergradiantstyle: {
    height: 75,
    width: "100%",
    position: "absolute",
    opacity: 0.5,
    bottom: -15,
  },
  handleCountainer: {
    width: 30,
    height: 30,
    borderRadius: 40,
    backgroundColor: "gray",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  handleImage: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  sheetViewStyle: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  titletext: {
    fontSize: 16,
    fontFamily: typography.jakarta_medium,
    color: "#000",
    fontWeight: "500",
    includeFontPadding: false,
    lineHeight: 16 * 1.3,
  },

  doted: {
    overflow: "hidden",
  },
  dotareacountainer: {
    color: "#DCDCDC",
    borderWidth: 0,
    marginVertical: 2,
  },
  summaryTextlabel: {
    fontSize: 18,
    fontFamily: typography.jakarta_regular,
    color: "#000000",
    lineHeight: 18 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  summaryText: {
    fontSize: 18,
    fontFamily: typography.jakarta_medium,
    color: "#000000",
    fontWeight: "500",
    lineHeight: 18 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalTextlabel: {
    fontSize: 18,
    fontFamily: typography.jakarta_medium,
    color: "#000000",
    fontWeight: "500",
    lineHeight: 18 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  totalText: {
    fontSize: 18,
    fontFamily: typography.jakarta_regular,
    color: "#000000",
    fontWeight: "400",
    lineHeight: 18 * 1.3,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  linergeadiantmask: {
    position: "absolute",
    bottom: Platform.OS == "android" ? -22 : -23,
    width: "100%",
    height: Platform.OS == "android" ? 20 : 23,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 20,
  },
});
