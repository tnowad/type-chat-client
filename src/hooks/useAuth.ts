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
    const credential = await authApi.login(email, password);
    if (credential) {
      loginWithCredentials(credential);
    }
  };

  return { ...context, login };
};

export default useAuth;
