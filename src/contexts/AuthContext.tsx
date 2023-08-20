"use client";
import { UserCredentials } from "@/types/auth";
import axiosInstance from "@/utils/axios.utils";
import { CookiesProvider, useCookies } from "react-cookie";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "@/types/model";
import profileApi from "@/apis/profile.api";

interface AuthContextType {
  user: User | null;
  login: (userCredentials: UserCredentials) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);

  useEffect(() => {
    const fetchUser = () => {
      const accessToken = cookies.accessToken;
      if (accessToken) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        profileApi.getProfile().then((response) => {
          if (response.data.data) {
            setUser(response.data.data.user);
          }
        });
      }
    };
    return () => {
      fetchUser();
    };
  }, [cookies.accessToken]);

  const login = useCallback(
    (userCredentials: UserCredentials) => {
      console.log(userCredentials);
      setCookie("accessToken", userCredentials.accessToken.token, {
        path: "/",
        expires: new Date(userCredentials.accessToken.expiresAt),
      });
      setCookie("refreshToken", userCredentials.refreshToken.token, {
        path: "/",
        expires: new Date(userCredentials.refreshToken.expiresAt),
      });
      if (!user && userCredentials.user) {
        setUser(userCredentials.user);
      }
    },
    [setCookie, user]
  );

  const logout = useCallback(() => {
    setCookie("accessToken", "", { expires: new Date(0) });
    setCookie("refreshToken", "", { expires: new Date(0) });
    setUser(null);
  }, [setCookie]);

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [login, logout, user]
  );

  return (
    <CookiesProvider>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </CookiesProvider>
  );
};

export default AuthContext;
