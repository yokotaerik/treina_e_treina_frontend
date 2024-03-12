import { ReactNode, useEffect } from "react";
import Router from "next/router";
import { parseCookies } from "nookies";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();

    if (!token) {
      Router.push("/"); // Redireciona para a página de login se não houver token
    }
  }, []);

  return <>{children}</>;
};

export default Layout;
