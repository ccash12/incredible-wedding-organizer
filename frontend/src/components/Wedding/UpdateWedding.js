import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import {XMarkIcon} from "@heroicons/react/24/outline"

export default function Update({ setShowEdit, weddingId, token, setWeddings }) {
  const [formState, setFormState] = useState({
    weddingName: "",
    date: "",
    spouseName1: "",
    spouseName2: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (!formState.date) {
        data = {
          ...formState,
          date: null,
        };
      } else {
        data = { ...formState };
      }
      await API.updateWedding(data, weddingId, token).then(async (res) => {
        setShowEdit(false);
        await API.getWedding(token).then((res) => {
          setWeddings(res.data);
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      API.getOneWedding(weddingId, token).then((res) => {
        setFormState({
          weddingName: res.data.weddingName,
          date: res.data.date ? res.data.date : "",
          spouseName1: res.data.spouseName1,
          spouseName2: res.data.spouseName2,
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, [weddingId, token]);

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 bg-gray-600/50 z-50 outline-none focus:outline-none">
    <form className="mt-3 bg-slate-200/90 p-2 rounded-lg shadow-xl z-10" id="updateWedding" onSubmit={formSubmit}>
      <div className="h-6 w-6 float-right relative py-0 z-10 hover:text-red"><XMarkIcon className="hover:text-red-500"  onClick={()=>setShowEdit(false)}/></div>
      <div className="form-floating mt-6 mb-3 xl:w-96">
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="weddingName"
          name="weddingName"
          value={formState.weddingName}
          onChange={handleFormChange}
          placeholder=" "
          required
        />
        <label
          className="text-gray-700 dark:text-slate-300"
          htmlFor="weddingName"
        >
          Wedding Name*:
        </label>
      </div>
      <div className="form-floating mb-3 xl:w-96">
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="spouseName1"
          name="spouseName1"
          value={formState.spouseName1}
          onChange={handleFormChange}
          placeholder=" "
        />
        <label className="text-gray-700 dark:text-slate-300" htmlFor="spouseName1">
          Spouse Name:
        </label>
      </div>
      <div className="form-floating mb-3 xl:w-96">
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="spouseName2"
          name="spouseName2"
          value={formState.spouseName2}
          onChange={handleFormChange}
          placeholder=" "
        />
        <label className="text-gray-700 dark:text-slate-300" htmlFor="spouseName2">
          Spouse Name:
        </label>
      </div>
      <div className="form-floating mb-3 xl:w-96">
        <input
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="date"
          id="date"
          name="date"
          onChange={handleFormChange}
          value={formState.date}
        />
        <label
          className="text-gray-700 dark:text-slate-300"
          htmlFor="date"
        >
          Wedding Date:
        </label>
      </div>
      <div className="flex items-center justify-center p-6 rounded-b">
        <button type="submit" className="p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 rounded-lg drop-shadow-xl">
          Save
        </button>
      </div>
    </form>
    </div>
  );
}
