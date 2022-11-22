import React, { useState } from "react";
import API from "../../utils/API";
import decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  const [errorMsg, setErrorMsg] = useState();

  const navigate = useNavigate();

  const [signupFormState, setSignupFormState] = useState({
    email: "",
    password: "",
    firstname: "",
    confirmPassword: "",
  });

  // listens for form changes

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupFormState({
      ...signupFormState,
      [name]: value,
    });
  };

  // verifies password matches and is at least 8 characters
  // if user email already exists display error
  // if account is successfully created, populate userState with user info
  // and navigate to profile page.

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupFormState.password !== signupFormState.confirmPassword) {
      setErrorMsg("Passwords don't match");
    } else if (signupFormState.password.length < 8) {
      setErrorMsg("Password needs to be a least 8 characters");
    } else {
      API.signup(signupFormState)
        .then((res) => {
          setErrorMsg("");
          setSignupFormState({
            email: "",
            password: "",
            firstname: "",
            confirmPassword: "",
          });
          API.login(signupFormState)
            .then((res) => {
              const decoded = decode(res.data.token);
              props.setUserState({
                firstname: decoded.data.firstname,
                email: decoded.data.email,
                id: decoded.data.id,
              });
              props.setToken(res.data.token);
              localStorage.setItem("weddingtoken", res.data.token);
              navigate("/");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          setErrorMsg("User already exists please login");
        });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="bg-slate-200/50 p-2 rounded-lg shadow-xl z-10"
        id="signup-form"
        onSubmit={handleSignupSubmit}
      >
        <h4>Signup</h4>
        <div className="form-floating mb-3 xl:w-96">
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="firstname-signup"
            value={signupFormState.username}
            name="firstname"
            onChange={handleSignupChange}
            placeholder="First Name"
            autoComplete="first-name"
          />
          <label
            htmlFor="firstname-signup"
            className="text-gray-700 dark:text-slate-300"
          >
            First Name
          </label>
        </div>
        <div className="form-floating mb-3 xl:w-96">
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="email-signup"
            value={signupFormState.email}
            name="email"
            onChange={handleSignupChange}
            type="email"
            placeholder="Email"
            autoComplete="email"
          />
          <label
            htmlFor="email-signup"
            className="text-gray-700 dark:text-slate-300"
          >
            Email
          </label>
        </div>
        <div className="form-floating mb-3 xl:w-96">
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="password-signup"
            value={signupFormState.password}
            name="password"
            onChange={handleSignupChange}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          <label
            htmlFor="password-signup"
            className="text-gray-700 dark:text-slate-300"
          >
            Password
          </label>
        </div>
        <div className="form-floating mb-3 xl:w-96">
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="confirmPassword-signup"
            value={signupFormState.confirmPassword}
            name="confirmPassword"
            onChange={handleSignupChange}
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
          />
          <label
            htmlFor="confirmPassword-signup"
            className="text-gray-700 dark:text-slate-300"
          >
            Confirm Password
          </label>
        </div>
        <p>{errorMsg}</p>
        <button
          disabled={
            !signupFormState.email ||
            !signupFormState.firstname ||
            !signupFormState.password ||
            !signupFormState.confirmPassword
          }
          className="disabled:opacity-50 disabled:cursor-not-allowed p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 rounded-lg drop-shadow-xl"
          id="signup-btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
