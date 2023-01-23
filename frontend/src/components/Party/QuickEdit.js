import React, { useEffect, useState } from "react";
import Form from "./Form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import API from "../../utils/API";

export default function QuickEdit({
  quickEditTarget,
  setShowQuickEdit,
  parties,
  setParties,
  token,
  weddingId,
  weddings,
  setWeddings,
}) {
  const [formData, setFormData] = useState();
  const [formState, setFormState] = useState();

  const formSubmit = (e) => {
    e.preventDefault();
    const result = parties.findIndex((obj) => {
      return obj.id == quickEditTarget.partyId;
    });
    const updateParties = [...parties];
    switch (quickEditTarget.item) {
      case "Address":
        updateParties[result].street1 = formState.street1;
        updateParties[result].street2 = formState.street2;
        updateParties[result].city = formState.city;
        updateParties[result].state = formState.state;
        updateParties[result].zipcode = formState.zipcode;
        updateParties[result].country = formState.country;
        break;
      case "AddGuest":
        API.createGuest(
          formState,
          weddingId,
          quickEditTarget.partyId,
          token
        ).then((res) => {
          updateParties[result].Guests.push(res.data);
          setParties(updateParties);
        });
        setShowQuickEdit(false);
        return;
        break;
      default:
        updateParties[result][formData] = formState[formData];
        break;
    }
    try {
      API.updateParty(formState, weddingId, quickEditTarget.partyId, token);
    } catch (err) {
      console.err(err);
    }
    setShowQuickEdit(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    const result = parties.findIndex((obj) => {
      return obj.id == quickEditTarget.partyId;
    });
    switch (quickEditTarget.item) {
      case "Party Name":
        setFormData("partyName");
        setFormState({ partyName: parties[result].partyName });
        break;
      case "Date Invite Sent":
        setFormData("dateInviteSent");
        setFormState({ dateInviteSent: parties[result].dateInviteSent || "" });
        break;
      case "Date RSVP Received":
        setFormData("dateRSVPReceived");
        setFormState({
          dateRSVPReceived: parties[result].dateRSVPReceived || "",
        });
        break;
      case "Address":
        setFormData("address");
        setFormState({
          street1: parties[result].street1 || "",
          street2: parties[result].street2 || "",
          city: parties[result].city || "",
          state: parties[result].state || "",
          zipcode: parties[result].zipcode || "",
          country: parties[result].country || "",
        });
        break;
      case "Guest":
        console.log(quickEditTarget);
        break;
      case "Gifts":
        console.log(quickEditTarget);
        break;
      case "AddGuest":
        setFormData("addGuest");
        setFormState({ guestName: "", meal: "", seat: "" });
        break;
      default:
    }
  }, [quickEditTarget, formData, parties]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-gray-600/50 focus:outline-none">
        <form
          className="z-10 p-2 mt-3 rounded-lg shadow-xl bg-slate-200/90"
          id="addParty"
          onSubmit={formSubmit}
        >
          <div className="relative z-10 float-right w-6 h-6 py-0 hover:text-red">
            <XMarkIcon
              className="hover:text-red-500"
              onClick={() => setShowQuickEdit(false)}
            />
          </div>
          <div className="mt-6 mb-3 form-floating xl:w-96">
            {quickEditTarget.item === "Party Name" && (
              <>
                <div>Party Name</div>
                <input
                  type="text"
                  className="w-full text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control dark:bg-slate-600 bg-clip-padding dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="partyName"
                  name="partyName"
                  value={formState.partyName}
                  onChange={handleFormChange}
                  placeholder="Party Name"
                  required
                />
              </>
            )}
            {quickEditTarget.item === "Date Invite Sent" && (
              <>
                <div>Date Invite Sent</div>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="date"
                  id="dateInviteSent"
                  name="dateInviteSent"
                  onChange={handleFormChange}
                  value={formState?.dateInviteSent}
                />
              </>
            )}
            {quickEditTarget.item === "Date RSVP Received" && (
              <>
                <div>Date RSVP Received</div>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="date"
                  id="dateRSVPReceived"
                  name="dateRSVPReceived"
                  onChange={handleFormChange}
                  value={formState?.dateRSVPReceived}
                />
              </>
            )}
            {quickEditTarget.item === "Address" && (
              <>
                <div className="mb-3 form-floating">
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
                <div className="mb-3 form-floating">
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
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="city"
                    name="city"
                    value={formState.city}
                    onChange={handleFormChange}
                    placeholder="City"
                  />
                  <label
                    className="text-gray-700 dark:text-slate-300"
                    htmlFor="city"
                  >
                    City
                  </label>
                </div>
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="state"
                    name="state"
                    value={formState.state}
                    onChange={handleFormChange}
                    placeholder="State / Province / Region"
                  />
                  <label
                    className="text-gray-700 dark:text-slate-300"
                    htmlFor="state"
                  >
                    State / Province / Region
                  </label>
                </div>
                <div className="mb-3 form-floating">
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
                <div className="mb-3 form-floating">
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
              </>
            )}
            {quickEditTarget.item === "AddGuest" && (
              <>
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="guestName"
                    name="guestName"
                    value={formState.guestName}
                    onChange={handleFormChange}
                    placeholder="Guest Name"
                  />
                  <label
                    className="text-gray-700 dark:text-slate-300"
                    htmlFor="guestName"
                  >
                    Guest Name
                  </label>
                </div>
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="meal"
                    name="meal"
                    value={formState.meal}
                    onChange={handleFormChange}
                    placeholder="Meal"
                  />
                  <label
                    className="text-gray-700 dark:text-slate-300"
                    htmlFor="meal"
                  >
                    Meal
                  </label>
                </div>
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="seat"
                    name="seat"
                    value={formState.seat}
                    onChange={handleFormChange}
                    placeholder="Seat"
                  />
                  <label
                    className="text-gray-700 dark:text-slate-300"
                    htmlFor="seat"
                  >
                    Table/Seat
                  </label>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center justify-center rounded-b">
            <button
              type="submit"
              className="p-2 rounded-lg hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 drop-shadow-xl"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
