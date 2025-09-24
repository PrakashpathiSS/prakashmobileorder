import React, { useEffect, useState } from 'react'
import CartItemsList from '../components/cart-items-list'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Pressable, View } from 'react-native'
import { Routes } from '../navigation/routes'
import { get_single_item } from '../example/api'
import { cart_items, setPaymentMethod, single_item } from '../redux/slice/user'
import { English } from '../utils/en'
import { color } from '../theme'

const UseCart = () => {

  const dispatch = useDispatch()
  const dash = useSelector(state => state?.user)
  const navigation = useNavigation()
  const [cartItems, setCartItems] = useState(dash?.cart_items || [])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setCartItems(dash?.cart_items || [])
  }, [dash?.cart_items])

  //calculate sub total
  const calculateSubtotal = () => {
    // Handle case where dash or cart_items is missing
    if (!dash?.cart_items) return '0.00';

    const subtotal = dash.cart_items.reduce((sum, item) => {
      // Handle missing item.price
      const itemPrice = Number(item?.price) || 0;

      // Calculate extras total
      const extrasTotal = item?.extras?.reduce((total, curr) => {
        return Number(total) + Number(curr?.price || 0);
      }, 0) || 0;

      return sum + itemPrice + extrasTotal;
    }, 0);

    // Return as fixed decimal string
    return subtotal.toFixed(2);
  };

  //calculate tax
  const calculateTax = (subtotal) => {
    return (subtotal * (dash?.store_detail?.tax / 100)).toFixed(2);
  };

  //calculate total
  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal()).toFixed(2)
    const tax = parseFloat(calculateTax(subtotal)).toFixed(2)
    const tip = 0.00
    // console.log(subtotal,tax,tip,"------>");

    return parseFloat(
      parseFloat(subtotal) +
      parseFloat(tax) +
      parseFloat(tip)
    ).toFixed(2)
  };

  //handle back
  const handleBack = () => {
    navigation.goBack()
  }

  //get single item
  const handleGetSingleItem = (item) => {
    let payload = {
      merchant: dash?.business_name,
      store: dash?.store_detail?.store_name,
      item_id: item?.item_id
    }

    get_single_item(payload, dash?.headers)
      .then((res) => {
        dispatch(single_item(res?.data))
        navigation.navigate(Routes.SINGLEFOODITEM)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //navigate to single food item details page
  const handleNavigateFoodItemDetails = (item) => {
    handleGetSingleItem(item)
  }

  const handleRemoveFoodItem = (index) => {
    dispatch(cart_items(dash?.cart_items?.filter((item, i) => i !== index)))
  }


  const handleMultipleAddItem = (type, index) => {
    // Determine if the operation is "Add" or "Remove"
    const isAdd = type === "Add";

    // Helper to calculate new count
    const updateCount = (prevCount) => isAdd ? prevCount + 1 : prevCount - 1;

    // Update cart state
    setCartItems((prevCart) => {
      const updatedCart = prevCart?.map((prev, i) => {
        // Only update the item at the specified index
        if (i !== index) return prev;

        let newCount = updateCount(prev?.count);

        // Ensure count stays within valid range (1 to 98)
        const isValidCount = isAdd ? newCount < 99 : newCount > 0;
        newCount = isValidCount ? newCount : prev?.count;


        // Update each extra item's price based on the new count
        const updatedExtraItems = prev?.extras?.map((data) => {
          const baseCount = isValidCount ? newCount : prev?.count;
          // Calculate updated prices
          const modsprice = (Number(data?.mods_default_price) * baseCount).toFixed(2);
          return { ...data, price: modsprice };
        });

        // Create updated item with new count, price, and extra info
        const updatedItem = {
          count: newCount,
          price: (Number(prev?.item_default_price) * newCount).toFixed(2),
          extras: updatedExtraItems
        };

        // Merge updated values into the original item
        return {
          ...prev,
          ...updatedItem
        };
      });

      // Dispatch the updated cart to the store
      dispatch(cart_items(updatedCart));
      return updatedCart;
    });
  };


  //handle cart items ui
  const handleCartItems = ({ item, index }) => {
    return (
      <CartItemsList
        index={index}
        name={item?.name}
        amount={item?.price}
        image={item?.image}
        extras={item?.extras}
        notes={item?.notes}
        count={item?.count}
        handleDelete={handleRemoveFoodItem}
        itemincriment={handleMultipleAddItem}
        dash={dash}

      // onPress={()=>handleNavigateFoodItemDetails(item)}
      />
    )
  }

  //check out button
  const handleCheckout = () => {
    dispatch(setPaymentMethod(English.payment_type.pay_type[0]))
    navigation.navigate(Routes.TopTabStack)
  }

  return {
    handleCartItems,
    handleBack,
    cartItems,
    handleCheckout,
    loading,
    calculateSubtotal,
    calculateTax,
    calculateTotal,
    dash
  }
}

export default UseCart