import {
  ApiError,
  LoginForm,
  Pagination,
  RegisterForm,
  User,
  UserData,
} from "@/types";
import request from "@/utils/request";

export const login = (data: LoginForm) =>
  request<User & ApiError>({ url: "/user/login", method: "POST", data });

export const register = (data: RegisterForm) =>
  request<User & ApiError>({ url: "/user", method: "POST", data });

export const getUserList = (params: { page: number; perPage: number }) =>
  request<Pagination<UserData>>({
    url: "/user",
    method: "GET",
    params,
  });

export const delUser = (userId: number) => {
  request({ url: `/user/${userId}`, method: "DELETE" });
};
