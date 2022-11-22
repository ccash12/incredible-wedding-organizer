import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ userState }) {
  const [theme, setTheme] = useState("light");

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
        <div className="text-right space-x-2">
          <Link to="/">Home</Link>
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
      </header>
    </>
  );
}
