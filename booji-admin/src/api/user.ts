import { LoginForm, RegisterForm } from "@/types";
import request from "@/utils/request";

enum Api {
  UserLogin = "/user/login",
  UserRegister = "/user",
}

export const login = (data: LoginForm) =>
  request({ url: Api.UserLogin, method: "POST", data });

export const register = (data: RegisterForm) =>
  request({ url: Api.UserRegister, method: "POST", data });
