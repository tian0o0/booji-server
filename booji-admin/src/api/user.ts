import { ApiError, LoginForm, RegisterForm, User, UserData } from "@/types";
import request from "@/utils/request";

export const login = (data: LoginForm) =>
  request<User & ApiError>({ url: "/user/login", method: "POST", data });

export const register = (data: RegisterForm) =>
  request<User & ApiError>({ url: "/user", method: "POST", data });

export const getUserList = () =>
  request<UserData[]>({ url: "/user", method: "GET" });
