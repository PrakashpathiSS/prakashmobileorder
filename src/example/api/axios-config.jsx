import axios from 'axios';
import { API } from '../constants';
const instance = axios.create({
  baseURL: API.baseUrls[API.currentEnv],
});


instance.interceptors.request.use(
  (config) => {
    return {
      ...config,
      params: config.params || {},
      headers: {
        ...config.headers,
      },
    };
  },
  (error) => Promise.reject(error)
);


instance.interceptors.response.use(
  (response) => response,
  async (error) => {
console.log(error?.response?.data,"---------->interceptors");

    if (error.response?.status === 400 && error.response?.data?.code === '-1') {
    }

    return Promise.reject(error);
  }
);


const responseBody = (response) => response.data;


const requests = {
  get: (url, headers, params) =>
    instance.get(url, { headers, params }).then(responseBody),

  post: (url, body, headers, timeout) =>
    instance.post(url, body, { headers, timeout }).then(responseBody),

  put: (url, body, headers) =>
    instance.put(url, body, { headers }).then(responseBody),

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url, body) => instance.delete(url, body).then(responseBody),
};

export default requests;
