import { ApiError, LoginForm, RegisterForm, User } from "@/types";
import request from "@/utils/request";

enum Api {
  UserLogin = "/user/login",
  UserRegister = "/user",
}

export const login = (data: LoginForm): Promise<User & ApiError> =>
  request({ url: Api.UserLogin, method: "POST", data });

export const register = (data: RegisterForm): Promise<User & ApiError> =>
  request({ url: Api.UserRegister, method: "POST", data });
