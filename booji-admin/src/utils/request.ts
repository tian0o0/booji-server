import { notification } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "./token";
import { ApiError } from "@/types";

const instance = axios.create({
  baseURL: import.meta.env.VITE_HTTP_URL,
});

instance.interceptors.request.use((request) => {
  request.headers!.Authorization = `Berar ${getToken()}`;
  return request;
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err): ApiError => {
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
