import { notification } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { VITE_HTTP_URL } from "@/config/constant";
import { getToken } from "./token";

const instance = axios.create({
  baseURL: VITE_HTTP_URL,
});

// // 请求拦截
axios.interceptors.request.use((request) => {
  request.headers!.Authorization = `Berar ${getToken()}`;
  return request;
});

// 对返回的结果做处理
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    notification.error({ message: err.response.data.message });
    return {
      error: true,
    };
  }
);

const request = <T>(reqConfig: AxiosRequestConfig): Promise<T> => {
  return instance.request<T, T>(reqConfig);
};

export default request;
export type { AxiosInstance, AxiosResponse };
