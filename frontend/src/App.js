import React, { useState, useEffect } from "react";
import API from "./utils/API";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  const [userState, setUserState] = useState({
    firstname: "",
    email: "",
    id: "",
  });
  const [token, setToken] = useState();
  const [showLogin, setShowLogin] = useState(true);

  const logout = (e) => {
    localStorage.removeItem("weddingtoken");
    setUserState({ username: "", email: "", id: "" });
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
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("weddingtoken");
        });
    }
  }, []);
  return (
    <div className="container">
      {!userState.firstname ? (
        <>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-outline-primary btn-lg"
              type="button"
              onClick={() => {
                setShowLogin(false);
              }}
            >
              Signup
            </button>
            <button
              className="btn btn-outline-primary btn-lg"
              type="button"
              onClick={() => {
                setShowLogin(true);
              }}
            >
              Login
            </button>
            {!showLogin ? (
              <div className="col text-center">
                <Signup setToken={setToken} setUserState={setUserState} />
              </div>
            ) : (
              <div className="col text-center">
                <Login setUserState={setUserState} setToken={setToken} />
              </div>
            )}
          </div>
        </>
      ) : null}
      {userState.firstname ? (
        <div>
          <div className="row">
            <div className="text-center">
              <button onClick={logout}>Logout</button>
            </div>
            <div className="text-center">
              <h1>User Info</h1>
            </div>
          </div>
          <div className="row">
            <div className="text-center">Welcome {userState.firstname}!</div>
          </div>
          <div className="row">
            <div className="text-center">Your email is: {userState.email}</div>
            <div className="text-center">Your token is: {token}</div>
          </div>
        </div>
      ) : null}
      
    </div>
  );
}
