import Layout from "@/components/Layout";
import Navbar from "@/components/ui/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Navbar />
        <div className="bg-gradient-to-r from-stone-300 to-stone-100 flex justify-center  min-h-screen w-full">
          <Component {...pageProps} />
        </div>
      </Layout>
    </AuthProvider>
  );
}
