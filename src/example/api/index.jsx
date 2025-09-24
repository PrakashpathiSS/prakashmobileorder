import moment from "moment";
import { API } from "../constants";
import requests from "./axios-config";

//get all stores
export function get_stores(data) {
  return requests.post(API.authUrls.get_stores, data);
}

//get all store items
export function get_all_items(data, headers) {
  return requests.get(
    `${API.authUrls.get_all_items}?merchant=${data?.merchant}&store=${
      data?.store
    }&current_date=${moment().format("YYYY-MM-DD")}`,
    headers
  );
}

//create order
export function create_order(data, headers) {
  return requests.post(API.authUrls.create_order, data, headers);
}

//get single item details
export function get_single_item(data, headers) {
  return requests.get(
    `${API.authUrls.get_single_item}?merchant=${data?.merchant}&store=${data?.store}&item_id=${data?.item_id}`,
    headers
  );
}

//get best selling items list
export function get_best_selling_items(data, headers) {
  return requests.get(
    `${API.authUrls.get_best_selling_items}?merchant=${data?.merchant}&store=${data?.store}`,
    headers
  );
}

//get dashboard merchant details
export function get_dashmerch_details(data, headers) {
  return requests.post(
    `${API.authUrls.get_merchantdash_details}`,
    data,
    headers
  );
}

//get dashboard merchant details
export function update_splash_status(data) {
  return requests.post(`${API.authUrls.update_splash_status}`, data);
}

//get token
export function get_token_order() {
  return requests.get(`${API.authUrls.get_token}`);
}
export function get_deferred_data(data) {
  return requests.get(
    `${API.authUrls.deferred_data}?ip_address=${data?.ip_address}`
  );
}
export function update_deferred_data(data) {
  return requests.post(`${API.authUrls.update_deferred_data}`, data);
}

export function get_stripe_key(data) {
  return requests.post(`${API.authUrls.stripe_key}`, data);
}

export function stripe_payment_status(data, headers) {
  return requests.post(`${API.authUrls.stripe_payment_check}`, data, headers);
}

export function redemPos(data,headers) {
  return requests.post(API.authUrls.redem_pos, data, headers);
}

export function retailSellers(data,headers) {
  return requests.get(`${API.authUrls.retail_sellers}?merchant=${data?.merchant}&store=${data?.store}`, headers);
}