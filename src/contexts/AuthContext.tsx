"use client";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import axiosInstance from "@/utils/axios.utils";
import profileApi from "@/apis/profile.api";
import authApi from "@/apis/auth.api";
import { UserCredentials } from "@/types/auth";
import { User } from "@/types/model";

interface AuthContextType {
  user: User | null;
  login: (userCredentials: UserCredentials) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = cookies.accessToken;
      const refreshToken = cookies.refreshToken;

      if (accessToken) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        try {
          const response = await profileApi.getProfile();
          if (response.data.data) {
            setUser(response.data.data.user);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else if (refreshToken) {
        try {
          const response = await authApi.refreshToken({ refreshToken });
          const newAccessToken = response.data.data?.accessToken;
          if (newAccessToken) {
            setCookie("accessToken", newAccessToken.token, {
              path: "/",
              expires: new Date(newAccessToken.expiresAt),
            });

            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken.token}`;
            const profileResponse = await profileApi.getProfile();
            if (profileResponse.data.data) {
              setUser(profileResponse.data.data.user);
            }
          }
        } catch (error) {
          console.error("Error refreshing access token:", error);
        }
      }
    };

    fetchUser();
  }, [cookies, setCookie]);

  const login = useCallback(
    (userCredentials: UserCredentials) => {
      const { accessToken, refreshToken, user: loggedInUser } = userCredentials;
      setCookie("accessToken", accessToken.token, {
        path: "/",
        expires: new Date(accessToken.expiresAt),
      });
      setCookie("refreshToken", refreshToken.token, {
        path: "/",
        expires: new Date(refreshToken.expiresAt),
      });

      if (!user && loggedInUser) {
        setUser(loggedInUser);
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
    () => ({ user, login, logout }),
    [login, logout, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
