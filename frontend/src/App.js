import React, { useState, useEffect } from "react";
import API from "./utils/API";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Background from "./components/Background/Background";
import DisplayWedding from "./components/Wedding/DisplayWedding";
import DisplayParty from "./components/Party/DisplayParty";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Profile } from "./components/Profile/Profile";
import { About } from "./components/About/About"

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

  return (
    <>
      <BrowserRouter>
        <Navbar
          userState={userState}
          setUserState={setUserState}
          setWeddings={setWeddings}
          setParties={setParties}
          setGuests={setGuests}
          setWeddingId={setWeddingId}
          setToken={setToken}
        />
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
                userState={userState}
                setUserState={setUserState}
                parties={parties}
                setParties={setParties}
                token={token}
                setToken={setToken}
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
          <Route path="About" element={<About />} />
          <Route
            path="/weddings"
            element={
              <DisplayWedding
                token={token}
                weddings={weddings}
                setWeddings={setWeddings}
                setParties={setParties}
                weddingId={weddingId}
                setWeddingId={setWeddingId}
              />
            }
          />
          <Route
            path="/parties"
            element={
              <DisplayParty
                parties={parties}
                setParties={setParties}
                token={token}
                weddingId={weddingId}
                setWeddings={setWeddings}
              />
            }
          />
        </Routes>
        {/* <div className="py-10 px-5 md:p-10 h-screen bg-yellow-100 dark:bg-slate-800">
          <Background />
        </div> */}
      </BrowserRouter>
    </>
  );
}
