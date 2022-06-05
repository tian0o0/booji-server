import React, { ReactNode, useState } from "react";
import { LoginForm, RegisterForm, User } from "@/types";
import * as api from "@/api";
import { setToken } from "@/utils/token";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@/store";
import { useNavigate } from "react-router-dom";

// 定义全局 auth context
const AuthContext = React.createContext<
  | {
      loading: boolean;
      login: (data: LoginForm) => Promise<any>;
      register: (data: RegisterForm) => Promise<any>;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setUser = useSetRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (form: LoginForm) => {
    setLoading(true);
    const res = (await api.login(form)) as User;
    setLoading(false);
    setUser(res);
    setToken(res.token);
    navigate("/");
  };
  const register = async (form: RegisterForm) => {
    setLoading(true);
    await api.register(form);
    setLoading(false);
  };
  const logout = () => {
    setUser(null);
    setToken("");
    navigate("/auth");
  };
  return (
    <AuthContext.Provider
      children={children}
      value={{ loading, login, register, logout }}
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
