import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext, AuthProvider, SignInProps } from "@/contexts/AuthContext";

export default function Home() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials: SignInProps = {
      login,
      password,
    };
    await signIn(credentials);
  };

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100 w-full">
      <div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 p-4 bg-white  shadow-md"
        >
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLogin(e.target.value)
            }
            className="p-2 border border-gray-300  focus:outline-none focus:border-slate-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="p-2 border border-gray-300  focus:outline-none focus:border-slate-500"
          />

          <button
            type="submit"
            className="bg-slate-500 text-white px-4 py-2  hover:bg-slate-700 focus:outline-none focus:bg-slate-700"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
