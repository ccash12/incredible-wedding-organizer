import React, { useState, useEffect } from "react";
import API from "./utils/API";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import DisplayWedding from "./components/Wedding/DisplayWedding";
import DisplayParty from "./components/Party/DisplayParty";
import DisplayGuest from "./components/Guest/DisplayGuest";
import Background from "./components/Background/Background";

export default function App() {
  const [theme, setTheme] = useState("light");

  const [userState, setUserState] = useState({
    firstname: "",
    email: "",
    id: "",
  });
  const [token, setToken] = useState();
  const [showLogin, setShowLogin] = useState(true);
  const [weddings, setWeddings] = useState();
  const [parties, setParties] = useState();
  const [weddingId, setWeddingId] = useState();
  const [guestId, setGuestId] = useState();
  const [guests, setGuests] = useState();

  const logout = (e) => {
    localStorage.removeItem("weddingtoken");
    setUserState({ username: "", email: "", id: "" });
    setWeddings();
    setParties();
    setGuests();
    setWeddingId();
    setToken();
    setToken("");
  };

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

  useEffect(() => {
    const myToken = localStorage.getItem("weddingtoken");

    if (myToken) {
      API.verify(myToken)
        .then((res) => {
          setToken(myToken);
          setUserState({
            firstname: res.data.firstname,
            email: res.data.email,
            id: res.data.id,
          });
        })
        .then((res) => {
          API.getWedding(myToken)
            .then((res) => {
              setWeddings(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("weddingtoken");
        });
    }
  }, [token]);
  return (
    <div className="py-10 px-5 md:p-10 h-screen bg-yellow-100 dark:bg-slate-800">
      <Background />
      <div className="text-center">
        <button
          className="m-3 p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
          onClick={toggleTheme}
        >
          {" "}
          Toggle Theme{" "}
        </button>
      </div>
      {!userState.firstname ? (
        <>
          <div className="text-center">
            {showLogin ? (
              <button
                className="m-3 p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
                type="button"
                onClick={() => {
                  setShowLogin(false);
                }}
              >
                Signup
              </button>
            ) : (
              <button
                className="m-3 p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
                type="button"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Login
              </button>
            )}

            {!showLogin ? (
              <div className="">
                <Signup setToken={setToken} setUserState={setUserState} />
              </div>
            ) : (
              <div className="">
                <Login setUserState={setUserState} setToken={setToken} />
              </div>
            )}
          </div>
        </>
      ) : null}
      {userState.firstname ? (
        <div className="text-center">
          <button
            className="m-3 p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
            onClick={logout}
          >
            Logout
          </button>

          <div className="">Welcome {userState.firstname}!</div>
        </div>
      ) : null}

      {weddings ? (
        <div className="">
          <DisplayWedding
            token={token}
            weddings={weddings}
            setWeddings={setWeddings}
            setParties={setParties}
            weddingId={weddingId}
            setWeddingId={setWeddingId}
          />
        </div>
      ) : null}
      {parties ? (
        <div className="">
          <DisplayParty
            parties={parties}
            setParties={setParties}
            token={token}
            weddingId={weddingId}
            setWeddings={setWeddings}
          />
        </div>
      ) : null}
      {guests ? (
        <div>
          <DisplayGuest
            guests={guests}
            setGuests={setGuests}
            token={token}
            guestId={guestId}
          />
        </div>
      ) : null}

      
    </div>
  );
}
