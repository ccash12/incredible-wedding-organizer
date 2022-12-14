import React, { useState } from "react";
import API from "../../utils/API";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function AddParty({
  setShowAdd,
  token,
  parties,
  setParties,
  weddingId,
  weddings,
  setWeddings,
}) {
  const [formState, setFormState] = useState({
    partyName: "",
    dateInviteSent: "",
    dateRSVPReceived: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
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
    setShowAdd(false);
    API.createParty(formState, weddingId, token)
      .then((res) => {
        setParties([...parties, res.data]);
        let newWeddings = [...weddings];
        const objWithIdIndex = newWeddings.findIndex(
          (obj) => obj.id === weddingId
        );
        if (objWithIdIndex > -1) {
          newWeddings[objWithIdIndex].Parties.push(res.data);
        }
        setWeddings(newWeddings);
      })
      .catch((err) => {
        console.log(err);
      });
    setFormState({
      partyName: "",
      dateInviteSent: "",
      dateRSVPReceived: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    });
  };
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 bg-gray-600/50 z-50 outline-none focus:outline-none">
      <form
        className="mt-3 bg-slate-200/90 p-2 rounded-lg shadow-xl z-10"
        id="addParty"
        onSubmit={formSubmit}
      >
        <div className="h-6 w-6 float-right relative py-0 z-10 hover:text-red">
          <XMarkIcon
            className="hover:text-red-500"
            onClick={() => setShowAdd(false)}
          />
        </div>
        <div className="form-floating mt-6 mb-3 xl:w-96">
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="partyName"
            name="partyName"
            value={formState.partyName}
            onChange={handleFormChange}
            placeholder="Party Name"
            required
          />
          <label
            className="text-gray-700 dark:text-slate-300"
            htmlFor="partyName"
          >
            Party Name*
          </label>
        </div>
        <div className="mb-3">
          <label className="text-gray-700 dark:text-slate-300" htmlFor="date">
            Date Invite Sent
          </label>
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="date"
            id="dateInviteSent"
            name="dateInviteSent"
            onChange={handleFormChange}
            value={formState.dateInviteSent}
          />
        </div>
        <div className="mb-3">
          <label className="text-gray-700 dark:text-slate-300" htmlFor="date">
            Date RSVP Received
          </label>
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="date"
            id="dateRSVPReceived"
            name="dateRSVPReceived"
            onChange={handleFormChange}
            value={formState.dateRSVPReceived}
          />
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="street1"
            name="street1"
            value={formState.street1}
            onChange={handleFormChange}
            placeholder="Street and number, P.O.Box, c/o"
          />
          <label
            className="text-gray-700 dark:text-slate-300"
            htmlFor="street1"
          >
            Street and number, P.O.Box, c/o
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="street2"
            name="street2"
            value={formState.street2}
            onChange={handleFormChange}
            placeholder="Apartment, suite, unit, building, floor, etc."
          />
          <label
            className="text-gray-700 dark:text-slate-300"
            htmlFor="street2"
          >
            Apartment, suite, unit, building, floor, etc.
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="city"
            name="city"
            value={formState.city}
            onChange={handleFormChange}
            placeholder="City"
          />
          <label className="text-gray-700 dark:text-slate-300" htmlFor="city">
            City
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="state"
            name="state"
            value={formState.state}
            onChange={handleFormChange}
            placeholder="State / Province / Region"
          />
          <label className="text-gray-700 dark:text-slate-300" htmlFor="state">
            State / Province / Region
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="zipcode"
            name="zipcode"
            value={formState.zipcode}
            onChange={handleFormChange}
            placeholder="Zip Code"
          />
          <label
            className="text-gray-700 dark:text-slate-300"
            htmlFor="zipcode"
          >
            Zip Code
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="country"
            name="country"
            value={formState.country}
            onChange={handleFormChange}
            placeholder="Country"
          />
          <label
            className="text-gray-700 dark:text-slate-300"
            htmlFor="country"
          >
            Country
          </label>
        </div>
        <div className="flex items-center justify-center p-6 rounded-b">
          <button
            type="submit"
            className="p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 rounded-lg drop-shadow-xl"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
