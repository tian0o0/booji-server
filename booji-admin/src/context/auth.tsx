import React, { ReactNode, useState } from "react";
import { LoginForm, RegisterForm } from "@/types";
import * as api from "@/api";
import { setToken, getToken } from "@/utils/token";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext<
  | {
      loading: boolean;
      login: (data: LoginForm) => Promise<void>;
      register: (data: RegisterForm) => Promise<void>;
      logout: () => void;
      hasLogin: boolean;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setUser = useSetRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (form: LoginForm) => {
    setLoading(true);
    const res = await api.login(form);
    setLoading(false);
    if (!res.error) {
      setUser(res);
      setToken(res.token);
      navigate("/");
    }
  };
  const register = async (form: RegisterForm) => {
    setLoading(true);
    const res = await api.register(form);
    setLoading(false);
    if (!res.error) {
      setUser(res);
      setToken(res.token);
      navigate("/");
    }
  };
  const logout = () => {
    setUser(null);
    setToken("");
    navigate("/auth");
  };
  return (
    <AuthContext.Provider
      children={children}
      value={{ loading, login, register, logout, hasLogin: !!getToken() }}
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
