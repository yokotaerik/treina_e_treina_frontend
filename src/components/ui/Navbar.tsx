import React, { useContext, useState } from "react";
import Link from "next/link";
import { FaAdjust, FaBars } from "react-icons/fa";
import { AuthContext } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, signOut } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav className="bg-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <div>
          <Link href="/me">
            <p className="text-white text-xl font-bold transition duration-300 ease-in-out transform hover:scale-105">
              YK-TRAIN
            </p>
          </Link>
        </div>
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link href="/me">
              <p className="text-white hover:text-slate-300 transition duration-300 ease-in-out transform hover:scale-105">
                Seus treinos
              </p>
            </Link>
          </li>
          <li>
            <Link href="/create-workout">
              <p className="text-white hover:text-slate-300 transition duration-300 ease-in-out transform hover:scale-105">
                Criar um novo treino
              </p>
            </Link>
          </li>
          <li>
            <Link href="/me/archive">
              <p className="text-white hover:text-slate-300 transition duration-300 ease-in-out transform hover:scale-105">
                Treinos arquivados
              </p>
            </Link>
          </li>
        </ul>
        <div className="md:hidden">
          <button
            className="text-white transition duration-300 ease-in-out transform hover:scale-105"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-slate-800 py-2 absolute z-10 w-full">
          <ul className="flex flex-col space-y-2 text-center">
            <li>
              <Link href="/me" onClick={toggleSidebar}>
                <p className="text-white hover:text-slate-300 transition duration-300 ease-in-out transform hover:scale-105">
                  Seus treinos
                </p>
              </Link>
            </li>
            <hr className="border-slate-700" />
            <li>
              <Link href="/create-workout" onClick={toggleSidebar}>
                <p className="text-white hover:text-slate-300 transition duration-300 ease-in-out transform hover:scale-105">
                  Criar um novo treino
                </p>
              </Link>
            </li>
            <hr className="border-slate-700" />
            <li>
              <Link href="/me/archive" onClick={toggleSidebar}>
                <p className="text-white hover:text-slate-300 transition duration-300 ease-in-out transform hover:scale-105 border-slate-700">
                  Treinos arquivados
                </p>
              </Link>
            </li>
            <hr className="border-slate-700" />
            <li>
                <p className="text-white hover:text-slate-300 transition duration-300 ease-in-out transform hover:scale-105 border-slate-700" onClick={signOut}>
                  Sair
                </p>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
