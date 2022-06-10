import { ApiError, LoginForm, RegisterForm, User } from "@/types";
import request from "@/utils/request";

enum Api {
  UserLogin = "/user/login",
  UserRegister = "/user",
}

export const login = (data: LoginForm) =>
  request<User & ApiError>({ url: Api.UserLogin, method: "POST", data });

export const register = (data: RegisterForm) =>
  request<User & ApiError>({ url: Api.UserRegister, method: "POST", data });
