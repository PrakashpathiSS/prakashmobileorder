import { StyleSheet, View } from "react-native";
import { English } from "../../utils/en";
import UseCheckout from "../../hooks/use-checkout";
import CheckoutPageFooter from "../../components/checkout-page-footer";
import UseOrderSuccess from "../../hooks/use-order-success";
import ItemsDetails from "../../components/items-details";
import { Vertical } from "../../ui-kit/spacer";
import UseCart from "../../hooks/use-cart";
import { setIsexpandSummary } from "../../redux/slice/user";
import { Routes } from "../../navigation";
import CustomerDetailsModal from "../../components/customer-details-modal";

const CartDetails = () => {
  const { dash } = UseOrderSuccess();
  const {
    navigation,
    calculateSubtotal,
    calculateTax,
    calculateTotal,
    bottomSheetRef,
    dispatch,
    service_formik,
    stripeLoding,
    loading,
    serviceCustomerDetails,
    handleCloseServiceModal,
    handleOpenServiceModal,
  } = UseCheckout();
  const { handleCartItems, cartItems } = UseCart();

  return (
    <View style={styles.container}>
      <View style={styles.itemcontainer}>
        <ItemsDetails
          cartItems={cartItems}
          handleCartItems={handleCartItems}
          dash={dash}
        />
        <Vertical size={12} />
      </View>

      <CheckoutPageFooter
        btntitle={
          dash?.store_detail?.store_type == "Service"
            ? "Order"
            : English.checkout.btn_next
        }
        calculateSubtotal={calculateSubtotal}
        calculateTax={calculateTax}
        calculateTotal={calculateTotal}
        calculateTip={dash?.tipAmount}
        bottomSheetRef={bottomSheetRef}
        onPress={() => {
          if (dash?.store_detail?.store_type == "Service") {
            service_formik?.resetForm();
            handleOpenServiceModal();
            return;
          }
          navigation.navigate(Routes.CUSTOMERDETAILS);
          bottomSheetRef.current?.collapse();
          dispatch(setIsexpandSummary(false));
        }}
        disabled={dash?.cart_items?.length == 0}
      />
      <CustomerDetailsModal
        dash={dash}
        formik={service_formik}
        loader={stripeLoding || loading}
        isVisible={serviceCustomerDetails}
        onCancel={handleCloseServiceModal}
      />
    </View>
  );
};

export default CartDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  itemcontainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
