import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/cakelogo.png";

export default function Navbar({ userState }) {
  const [theme, setTheme] = useState("light");
  // const [isOpen, setIsOpen] = useState("false");

  const toggleTheme = () => {
    if (theme === "light") {
      localStorage.theme = "dark";
      setTheme("dark");
    } else {
      localStorage.theme = "light";
      setTheme("light");
    }
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white">
        <div className="p-4 flex items-center justify-between">
          <div className="py-1">
            <Link to="/">
              <img
                className="w-20 h-20 hover:scale-105 rounded-lg"
                src={logo}
                alt="cake-logo"
              />
            </Link>
          </div>
          <div className="hidden sm:flex flex-1 justify-end items-center gap-6">
            {userState.firstname && <Link to="/profile">Profile</Link>}
            {!userState.firstname && <Link to="/login">Login</Link>}
            {!userState.firstname && <Link to="/signup">Sign Up</Link>}
            <button
              className="p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
              onClick={toggleTheme}
            >
              {" "}
              Toggle Theme{" "}
            </button>
          </div>
          <div className="flex sm:hidden items-end flex-1 flex-col">
            <button className="text-2xl fas fa-bars "></button>
            {/* {userState.firstname && <Link to="/profile">Profile</Link>}
            {!userState.firstname && <Link to="/login">Login</Link>}
            {!userState.firstname && <Link to="/signup">Sign Up</Link>} */}
          </div>
        </div>
      </header>
    </>
  );
}
