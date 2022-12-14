import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const UpdateProfile = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 bg-gray-600/50 z-50 outline-none focus:outline-none"> */}
      <div className="flex items-center justify-center">
        <form
          className="mt-3 max-w-sm bg-slate-200/90 p-1 rounded-lg shadow-xl z-10"
          id="updateProfile"
          // onSubmit={formSubmit}
        >
          <div className="h-6 w-6 float-right relative py-0 z-10 hover:text-red">
            <XMarkIcon
              className="hover:text-red-500"
              onClick={() => navigate("/profile")}
            />
          </div>
          <br />
          <label htmlFor="updateProfile" className="font-bold text-xl">
            Update Profile
          </label>
          <div className="form-floating mt-6 mb-3 xl:w-96">
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email"
              name="email"
              // value={formState.weddingName}
              // onChange={handleFormChange}
              placeholder=" "
              required
            />
            <label
              className="text-gray-700 dark:text-slate-300"
              htmlFor="email"
            >
              Email:
            </label>
          </div>
          <div className="form-floating mb-3 xl:w-96">
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="password"
              name="password"
              // value={formState.password}
              // onChange={handleFormChange}
              placeholder=" "
            />
            <label
              className="text-gray-700 dark:text-slate-300"
              htmlFor="password"
            >
              Password:
            </label>
          </div>
          <div className="form-floating mb-3 ">
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="password2"
              name="password2"
              // value={formState.password2}
              // onChange={handleFormChange}
              placeholder=" "
            />
            <label
              className="text-gray-700 dark:text-slate-300"
              htmlFor="password2"
            >
              Re-enter Password:
            </label>
          </div>
          <div className="flex items-center justify-center p-6 rounded-b">
            <button
              type="submit"
              className="p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 rounded-lg drop-shadow-xl"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
};
