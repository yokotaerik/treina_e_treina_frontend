import { api } from "@/utils/api";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import Swal from "sweetalert2";

type AuthContextData = {
  isLoggedIn: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

export type SignInProps = {
  login: string;
  password: string;
};

type SignUpProps = {
  login: string;
  password: string;
  confirmPassword: string;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();

    if (token) {
      setIsLoggedIn(true);
    } else {
      signOut();
      Router.push("/");
    }
  }, []);

  async function signIn(credentials: SignInProps) {
    try {
      const response = await api.post("/auth/login", credentials);

      const { token } = response.data;

      setCookie(null, "token", token, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: "/",
      });
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsLoggedIn(true);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Bem vindo! ",
        showConfirmButton: false,
        timer: 1500,
      });
      Router.push("/me");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while logging in. Please check your credentials and try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  const signUp = async (credentials: SignUpProps) => {};

  const signOut = () => {
    destroyCookie(undefined, "token");
    setIsLoggedIn(false);
    Router.push('/')
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
