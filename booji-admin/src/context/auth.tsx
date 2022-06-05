import React, { ReactNode, useState } from "react";
import { LoginForm, RegisterForm, User } from "@/types";
import * as api from "@/api";
import { setToken } from "@/utils/token";

// 定义全局 auth context
const AuthContext = React.createContext<
  | {
      user?: User;
      loading: boolean;
      login: (data: LoginForm) => Promise<any>;
      register: (data: RegisterForm) => Promise<any>;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  let user;
  const [loading, setLoading] = useState(false);
  const login = async (form: LoginForm) => {
    setLoading(true);
    user = (await api.login(form)) as User;
    setToken(user.token);
    setLoading(false);
  };
  const register = async (form: RegisterForm) => {
    setLoading(true);
    await api.register(form);
    setLoading(false);
  };
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, loading, login, register }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("`useAuth` should used inside the `AuthProvider`");
  }
  return context;
};
