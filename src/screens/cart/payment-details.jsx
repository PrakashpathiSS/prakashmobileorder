import { Text } from "../../ui-kit/text";
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { color, typography } from "../../theme";
import { TextField } from "../../ui-kit/text-field";
import UseCheckout from "../../hooks/use-checkout";
import { English } from "../../utils/en";
import CheckoutPageFooter from "../../components/checkout-page-footer";
import StstusCard from "../../components/ststus-card";
import RedemPopupModal from "../../components/redem-popup-modal";
import PaymentDetailsComponent from "../../components/payment-details-comp";
import { show_toast } from "../../utils/toast/toast";

const PaymentDetails = () => {
  const {
    formik,
    calculateSubtotal,
    paymentMethod,
    calculateTax,
    calculateTotal,
    loading,
    dash,
    scrollToError,
    cardNumRef,
    expiryDateRef,
    securityCodeRef,
    successResponse,
    successModalMobile,
    handeclosemodal,
    store_type,
    handleConfirmOrder,
    stripeLoding,
    redemPopupLoder,
    openRedemPopupModal,
    disableBackNavigation,
    handleRedemPopupClose,
    handleRedemPopupSubmit,
    bottomSheetRef,
  } = UseCheckout("cardDetails");
 
  return (
    <View style={styles.container}>
      <View style={styles.itemcontainer}>
        <PaymentDetailsComponent
          disableBackNavigation={disableBackNavigation}
          dash={dash}
          paymentMethod={paymentMethod}
          cardNumRef={cardNumRef}
          expiryDateRef={expiryDateRef}
          formik={formik}
          securityCodeRef={securityCodeRef}
          store_type={store_type}
        />
      </View>
      <CheckoutPageFooter
        btntitle={English.checkout.btn_title}
        calculateSubtotal={calculateSubtotal}
        calculateTax={calculateTax}
        calculateTotal={calculateTotal}
        calculateTip={`${parseFloat(dash?.tipAmount)?.toFixed(2) || 0.0}`}
        onPress={() => {
          if (
            !dash?.paymentDetails?.name ||
            !dash?.paymentDetails?.phnNum ||
            !dash?.paymentDetails?.mail
          ) {
            show_toast(
              "Please make sure all required details are filled in before payment."
            );
            return;
          }
          if (store_type === "Stripe") {
            handleConfirmOrder();
          } else {
            formik.handleSubmit();
            scrollToError();
          }
        }}
        loading={stripeLoding}
        bottomSheetRef={bottomSheetRef}
      />
      {loading ? (
        <Modal
          style={styles.pageloadercountainer}
          transparent={true}
          visible={loading}
          animationType="fade"
        >
          <View style={styles.pageloaderarea}>
            <ActivityIndicator
              color={dash?.base_themes?.button_color}
              size={"large"}
            />
          </View>
        </Modal>
      ) : null}

      <StstusCard
        successResponse={successResponse}
        isVisible={successModalMobile}
        onClose={handeclosemodal}
        dash={dash}
      />

      <RedemPopupModal
        loader={redemPopupLoder}
        isVisible={openRedemPopupModal}
        onSubmit={handleRedemPopupSubmit}
        onClose={handleRedemPopupClose}
      />
    </View>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  itemcontainer: {
    paddingHorizontal: 16,
    flex: 1,
  },

  img_style: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  label_style: {
    fontWeight: "800",
    marginBottom: 5,
  },

  textfield_style: {
    borderColor: "#9B9B9B",
    fontSize: 20,
    fontFamily: typography.regular,
  },

  textfield_container_style: {
    height: 65,
  },

  textfield_div: {
    marginBottom: 20,
  },

  textfield_error_style: {
    fontSize: 10,
  },

  exclamation_icon_style: {
    width: 20,
    height: 20,
  },

  pay_text_style: {
    fontSize: 16,
    fontWeight: "bold",
  },

  paylater_content_style: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 100,
    marginTop: 30,
  },
  pageloaderarea: {
    backgroundColor: "rgba(0, 0, 0, 0.56)",
    flex: 1,
    justifyContent: "center",
  },
  pageloadercountainer: { flex: 1 },
});
