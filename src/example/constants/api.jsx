export const API = {
    currentEnv: 'dev',
    baseUrls: {
      dev: 'https://dev-backend-dot-jago-dev-2.uc.r.appspot.com/v1/', //http://192.168.29.191:5001/v1/
    },
  
    authUrls: {
      get_stores: 'jagopos-mobile-order-stores',
      get_all_items: 'jagopos-mobile-order-get-all-items',
      create_order: 'jagopos-mobile-order-create-order',
      get_single_item: 'jagopos-mobile-order-get-item',
      get_best_selling_items: 'jagopos-mobile-order-get-most-selling-items',
      get_token:'jagopos-mobile-order-generate-token',
      get_merchantdash_details: 'jagopos-merchant-get-merchant-mobileorder',
      update_splash_status: 'jagopos-merchnat-update-splash-status',
      deferred_data:"jagopos-deep-link/get",
      update_deferred_data:"jagopos-deep-link/update/data",
      stripe_key: "jagopos-common-stripe-keys",
      stripe_payment_check: "jagopos-mobile-order-check-payment",
      redem_pos:'jagopos-common-partial-refund',
      retail_sellers:'jagopos-mobile-order-get-retail-store'
    },
  };
  // v1 - > v2
  // change endpoint name
  // change local host
  // timeout test
  