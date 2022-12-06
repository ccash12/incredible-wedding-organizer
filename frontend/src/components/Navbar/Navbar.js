import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/cakelogo.png";

export default function Navbar({
  userState,
  setUserState,
  setWeddings,
  setParties,
  setGuests,
  setWeddingId,
  setToken,
}) {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  const logout = (e) => {
    localStorage.removeItem("weddingtoken");
    setUserState({ username: "", email: "", id: "" });
    setWeddings();
    setParties();
    setGuests();
    setWeddingId();
    setToken("");
    navigate("/");
  };
  const [isOpen, setIsOpen] = useState("false");

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
            {userState.firstname && <Link to="/about">About</Link>}
            {userState.firstname && (
              <button
                className="m-3 p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
                onClick={logout}
              >
                Logout
              </button>
            )}
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
            <button
              className="text-2xl fas fa-bars "
              onClick={() => {
                setIsOpen(true);
              }}
            ></button>
            {isOpen === true && (
              <div
                className="fixed h-full w-full top-0 right-0 left-0 bottom-0"
                onClick={() => {
                  setIsOpen(false);
                }}
              ></div>
            )}
            {isOpen === true && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <div className="py-1" role="none">
                  {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                  {userState.firstname && (
                    <Link
                      to="/profile"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Profile
                    </Link>
                  )}
                  {userState.firstname && (
                    <Link
                      to="/about"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-2"
                    >
                      About
                    </Link>
                  )}
                  {!userState.firstname && (
                    <Link
                      to="/login"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                    >
                      Login
                    </Link>
                  )}
                  {!userState.firstname && (
                    <Link
                      to="/signup"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-2"
                    >
                      Signup
                    </Link>
                  )}
                  {userState.firstname && (
                    <button
                      className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-3"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
