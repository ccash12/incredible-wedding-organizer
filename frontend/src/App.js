import React, { useState, useEffect } from "react";
import API from "./utils/API";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./components/Profile/Profile";


export default function App() {
  const [userState, setUserState] = useState({
    firstname: "",
    email: "",
    id: "",
  });
  const [token, setToken] = useState();
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
    <>
      <BrowserRouter>
        
        <Navbar userState={userState} />
        <Routes>
          <Route
            path="/login"
            element={<Login setToken={setToken} setUserState={setUserState} />}
          />
          <Route
            path="/signup"
            element={<Signup setToken={setToken} setUserState={setUserState} />}
          />
          <Route
            path="/"
            element={
              <Home
                logout={logout}
                userState={userState}
                parties={parties}
                setParties={setParties}
                token={token}
                weddingId={weddingId}
                setWeddingId={setWeddingId}
                weddings={weddings}
                setWeddings={setWeddings}
                guests={guests}
                setGuests={setGuests}
                guestId={guestId}
              />
            }
          />
          <Route path="profile" element={<Profile />} />
        </Routes>
        {/* <div className="py-10 px-5 md:p-10 h-screen bg-yellow-100 dark:bg-slate-800">
          <Background />
        </div> */}
      </BrowserRouter>
    </>
  );
}
