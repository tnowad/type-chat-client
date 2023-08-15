"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import User from "@/types/User";
import { getCookie, removeCookie, setCookie } from "@/utils/cookie.utils";
import authApi from "@/apis/auth.api";
import api from "@/utils/api.utils";

interface AuthContextInterface {
  user: User | null;
  login: (accessToken: string, refreshToken: string) => void;
  isLoggedIn: boolean;
  logout: () => void;
}

const initialState: AuthContextInterface = {
  user: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
};

export const AuthContext = createContext(initialState);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const login = (accessToken: string, refreshToken: string) => {
    setCookie("accessToken", accessToken, { path: "/" });
    setCookie("refreshToken", refreshToken, { path: "/" });
    setIsLoggedIn(true);
  };

  const logout = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/login");
  };

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (accessToken && refreshToken) {
      api.defaults.headers["authorization"] = `Bearer ${accessToken}`;
      authApi
        .me()
        .then((response) => {
          const user = response.data.data?.user;
          if (user)
            setUser({
              _id: user._id,
              createAt: user.createAt,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              verified: user.verified,
            });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const value = useMemo(
    () => ({ user, isLoggedIn, login, logout }),
    [user, isLoggedIn]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
