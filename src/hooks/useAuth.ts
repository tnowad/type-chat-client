import authApi from "@/apis/auth.api";
import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { login: loginWithCredentials } = context;

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    if (response.data.data) {
      const credential = response.data.data;
      loginWithCredentials(credential);
    }
  };

  return { ...context, login };
};

export default useAuth;
