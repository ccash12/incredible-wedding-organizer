import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Update({
  setShowEdit,
  weddingId,
  token,
  weddings,
  setWeddings,
}) {
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

  const formSubmit = (e) => {
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
      let newWeddings = [...weddings];
      const objWithIdIndex = newWeddings.findIndex(
        (obj) => obj.id === weddingId
      );
      if (objWithIdIndex > -1) {
        newWeddings[objWithIdIndex] = {
          ...newWeddings[objWithIdIndex],
          date: data.date,
          spouseName1: data.spouseName1,
          spouseName2: data.spouseName2,
          weddingName: data.weddingName,
        };
        setWeddings(newWeddings);
      }
      setShowEdit(false);
      API.updateWedding(data, weddingId, token);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const objWithIdIndex = weddings.findIndex((obj) => obj.id === weddingId);
    setFormState({
      weddingName: weddings[objWithIdIndex].weddingName,
      date: weddings[objWithIdIndex].date ? weddings[objWithIdIndex].date : "",
      spouseName1: weddings[objWithIdIndex].spouseName1,
      spouseName2: weddings[objWithIdIndex].spouseName2,
    });
  }, [weddingId, weddings]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-gray-600/50 focus:outline-none">
      <form
        className="z-10 p-2 mt-3 rounded-lg shadow-xl bg-slate-200/90"
        id="updateWedding"
        onSubmit={formSubmit}
      >
        <div className="relative z-10 float-right w-6 h-6 py-0 hover:text-red">
          <XMarkIcon
            className="hover:text-red-500"
            onClick={() => setShowEdit(false)}
          />
        </div>
        <div className="mt-6 mb-3 form-floating xl:w-96">
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
        <div className="mb-3 form-floating xl:w-96">
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="spouseName1"
            name="spouseName1"
            value={formState.spouseName1}
            onChange={handleFormChange}
            placeholder=" "
          />
          <label
            className="text-gray-700 dark:text-slate-300"
            htmlFor="spouseName1"
          >
            Spouse Name:
          </label>
        </div>
        <div className="mb-3 form-floating xl:w-96">
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="spouseName2"
            name="spouseName2"
            value={formState.spouseName2}
            onChange={handleFormChange}
            placeholder=" "
          />
          <label
            className="text-gray-700 dark:text-slate-300"
            htmlFor="spouseName2"
          >
            Spouse Name:
          </label>
        </div>
        <div className="mb-3 form-floating xl:w-96">
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="date"
            id="date"
            name="date"
            onChange={handleFormChange}
            value={formState.date}
          />
          <label className="text-gray-700 dark:text-slate-300" htmlFor="date">
            Wedding Date:
          </label>
        </div>
        <div className="flex items-center justify-center p-6 rounded-b">
          <button
            type="submit"
            className="p-1 rounded-lg hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 drop-shadow-xl"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
