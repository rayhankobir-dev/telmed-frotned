/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import api from "@/api";
import { User } from "@/types";
import { useAuthStore } from "@/store/authStore";
import Spinner from "@/components/common/spinner";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  loading: boolean;
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, token, isAuthenticated, login, logout, setToken } =
    useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const res = await api.post("/users/login", { email, password });
    const { user, token } = res.data;
    login(user, token);
    setToken(token);
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        token,
        isAuthenticated,
        login: handleLogin,
        logout,
      }}
    >
      {!loading ? (
        children
      ) : (
        <div className="h-screen flex items-center justify-center text-center">
          <Spinner />
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
