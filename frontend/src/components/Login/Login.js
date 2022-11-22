import React, { useState } from "react";
import API from "../../utils/API";
import decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    API.login(loginFormState)
      .then((res) => {
        setLoginFormState({ email: "", password: "" });
        setErrorMsg("");
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
        setErrorMsg("Wrong email and/or password");
      });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          className="bg-slate-200/50 p-2 rounded-lg shadow-xl"
          id="login-form"
          onSubmit={handleLoginSubmit}
        >
          <h4>Login</h4>

          <div className="form-floating mb-3 xl:w-96">
            <input
              type="email"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={loginFormState.email}
              name="email"
              onChange={handleLoginChange}
              id="email"
              placeholder="name@example.com"
              autoComplete="email"
            />
            <label
              htmlFor="email"
              className="text-gray-700 dark:text-slate-300"
            >
              Email address
            </label>
          </div>
          <div className="form-floating mb-3 xl:w-96">
            <input
              type="password"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="floatingPassword"
              value={loginFormState.password}
              name="password"
              onChange={handleLoginChange}
              placeholder="Password"
              autoComplete="current-password"
            />
            <label
              htmlFor="floatingPassword"
              className="text-gray-700 dark:text-slate-300"
            >
              Password
            </label>
          </div>

          <p>{errorMsg}</p>
          <button
            disabled={!loginFormState.email || !loginFormState.password}
            className="disabled:opacity-50 disabled:cursor-not-allowed p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 rounded-lg drop-shadow-xl"
            id="submit-login"
          >
            Submit
          </button>
        </form>
        {/* <div>
          Need an account <Link to="/signup">Sign up</Link>
        </div> */}
      </div>
    </>
  );
}
