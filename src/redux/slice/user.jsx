import { createSlice } from '@reduxjs/toolkit';
import { English } from '../../utils/en';
import { color } from '../../theme/color';

const initialState = {
  merchant_token: null,
  stores: null,
  merchant_details: null,
  store_detail: null,
  store_items: null,
  category_item: null,
  single_item: null,
  cart_items: [],
  profile_details: null,
  order_success_res: null,
  grid_view: true,
  business: [English.business.merchant_name],
  business_name: English.business.merchant_name,
  headers: '',
  paymentDetails: null,
  tipAmount: 0.00,
  appcredentials: null,
  all_menus: null,
  all_categories: null,
  all_items: null,
  all_mods: null,
  selected_menu: null,
  selected_category: null,
  selected_item: null,
  selected_mod: null,
  selected_extras: null,
  bannerimages: [],
  paymentMethod: "Pay now",
  orderResponce: null,
  disableBackNavigation: false,
  hidetabbar: false,
  base_themes:{...color.palette.basethemes},
  is_expand_summary: false,
  sellers_list:[]
};

export const itemsSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setMerchantToken: (state, action) => {
      state.merchant_token = action.payload;
    },
    stores: (state, action) => {
      state.stores = action.payload;
    },

    merchant_details: (state, action) => {
      state.merchant_details = action.payload;
    },

    store_items: (state, action) => {
      state.store_items = action.payload;
    },

    category_item: (state, action) => {
      state.category_item = action.payload;
    },

    single_item: (state, action) => {
      state.single_item = action.payload;
    },

    all_items: (state, action) => {
      state.all_items = action.payload;
    },

    cart_items: (state, action) => {
      state.cart_items = action.payload;
    },

    profile_details: (state, action) => {
      state.profile_details = action.payload;
    },

    store_detail: (state, action) => {
      state.store_detail = action.payload;
    },

    order_success_res: (state, action) => {
      state.order_success_res = action.payload;
    },

    grid_view: (state, action) => {
      state.grid_view = action.payload;
    },

    business: (state, action) => {
      state.business = action.payload;
    },

    business_name: (state, action) => {
      state.business_name = action.payload;
    },

    setMercahntToken: (state, action) => {
      state.headers = action.payload;
    },

    setPaymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    },

    setTipAmount: (state, action) => {
      state.tipAmount = action.payload;
    },

    setCredentials: (state, action) => {
      state.appcredentials = action.payload;
    },

    all_menus: (state, action) => {
      state.all_menus = action.payload;
    },

    all_categories: (state, action) => {
      state.all_categories = action.payload;
    },

    all_items: (state, action) => {
      state.all_items = action.payload;
    },

    all_mods: (state, action) => {
      state.all_mods = action.payload;
    },

    selected_menu: (state, action) => {
      state.selected_menu = action.payload;
    },

    selected_category: (state, action) => {
      state.selected_category = action.payload;
    },

    selected_item: (state, action) => {
      state.selected_item = action.payload;
    },

    selected_mod: (state, action) => {
      state.selected_mod = action.payload;
    },

    selected_extras: (state, action) => {
      state.selected_extras = action.payload;
    },
    banner_images: (state, action) => {
      state.bannerimages = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setOrderResponce: (state, action) => {
      state.orderResponce = action.payload;
    },
    setDisableBackNavigation: (state, action) => {
      state.disableBackNavigation = action.payload;
    },
    setHidetabbar: (state, action) => {
      state.hidetabbar = action.payload;
    },
    setIsexpandSummary: (state, action) => {
      state.is_expand_summary = action.payload;
    },
    setBaseTheme: (state, action) => {
      state.base_themes = action.payload;
    },
    setSellersList: (state, action) => {
      state.sellers_list = action.payload;
    },

  },
});

export const {
  stores,
  merchant_details,
  store_items,
  category_item,
  single_item,
  all_items,
  cart_items,
  profile_details,
  store_detail,
  order_success_res,
  grid_view,
  business,
  business_name,
  setMercahntToken,
  setPaymentDetails,
  setTipAmount,
  setCredentials,
  all_menus,
  all_categories,
  all_mods,
  selected_menu,
  selected_category,
  selected_item,
  selected_mod,
  banner_images,
  selected_extras,
  setMerchantToken,
  setPaymentMethod,
  setOrderResponce,
  setDisableBackNavigation,
  setHidetabbar,
  setIsexpandSummary,
  setBaseTheme,
  setSellersList
} = itemsSlice.actions;
export default itemsSlice.reducer;
