import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-orange-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <div>
          <Link href="/">
            <p className="text-white text-xl font-bold">Logo</p>
          </Link>
        </div>
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link href="/my-workouts">
              <p className="text-white hover:text-orange-300">Home</p>
            </Link>
          </li>
          <li>
            <Link href="/create-workout">
              <p className="text-white hover:text-orange-300">
                Criar um novo treino!
              </p>
            </Link>
          </li>
          <li>
            <Link href="/my-workouts/archive">
              <p className="text-white hover:text-orange-300">Treinos arquivado</p>
            </Link>
          </li>
        </ul>
        <div className="md:hidden">
          <button className="text-white" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-orange-500 py-2 absolute z-10">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link href="/my-workouts" onClick={toggleSidebar}>
                <p className="text-white hover:text-orange-300">Home</p>
              </Link>
            </li>
            <li>
              <Link href="/create-workout" onClick={toggleSidebar}>
                <p className="text-white hover:text-orange-300">
                  Criar um novo treino!
                </p>
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={toggleSidebar}>
                <p className="text-white hover:text-orange-300">Contact</p>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
