import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import AddParty from "./AddParty";
import PartyCard from "./PartyCard";
import QuickEdit from "./QuickEdit";
import { useNavigate } from "react-router-dom";
import { PlusIcon, TrashIcon, PlayIcon } from "@heroicons/react/24/outline";

export default function DisplayParty({
  parties,
  setParties,
  token,
  weddingId,
  weddings,
  setWeddings,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [showQuickEdit, setShowQuickEdit] = useState(false);
  const [quickEditTarget, setQuickEditTarget] = useState();
  const navigate = useNavigate();

  const closeWedding = () => {
    setParties();
    navigate("/weddings");
  };

  const test = (e) => {
    // if (!Object.keys(e.target.dataset).length) {
    //   if (!Object.keys(e.target.parentElement.dataset).length) {
    //     // console.log(e.target.parentElement.parentElement.dataset);
    //     setQuickEditTarget(e.target.parentElement.parentElement.dataset);
    //   } else {
    //     // console.log(e.target.parentElement.dataset);
    //     setQuickEditTarget(e.target.parentElement.dataset);
    //   }
    // } else {
    //   // console.log(e.target.dataset);
    setQuickEditTarget(e.target.dataset);
    // }
    setShowQuickEdit(true);
    // console.log(e.target.dataset);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div className="text-center">
      <button
        className="p-1 rounded-lg hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 drop-shadow-xl"
        onClick={() => {
          setShowAdd(true);
        }}
      >
        Add Party
      </button>
      &nbsp;
      <button
        className="p-1 rounded-lg hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 drop-shadow-xl"
        onClick={closeWedding}
      >
        Close Wedding
      </button>
      <div className="hidden overflow-auto rounded-lg shadow md:block">
        <table onClick={test} className="w-full">
          <thead className="border-b-2 border-gray-200 bg-gray-50">
            <tr>
              <th>Party Name</th>
              <th>Date Invite Sent</th>
              <th>Date RSVP Received</th>
              <th>Address</th>
              <th>Guest(s)</th>
              <th>Gift(s)</th>
              <th></th>
              {/* <th>Thank You Sent</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {parties ? (
              parties.map((item) => {
                return (
                  <tr key={item.id}>
                    <td
                      data-party-id={item.id}
                      data-item="Party Name"
                      className="dark:hover:text-white hover:text-sky-800 hover:cursor-pointer"
                    >
                      {item.partyName}
                    </td>
                    <td
                      data-party-id={item.id}
                      data-item="Date Invite Sent"
                      className="dark:hover:text-white hover:text-sky-800 hover:cursor-pointer"
                    >
                      {item.dateInviteSent ? item.dateInviteSent : "Not Sent"}
                    </td>
                    <td
                      data-party-id={item.id}
                      data-item="Date RSVP Received"
                      className="dark:hover:text-white hover:text-sky-800 hover:cursor-pointer"
                    >
                      {item.dateRSVPReceived
                        ? item.dateRSVPReceived
                        : "Not Received"}
                    </td>

                    <td className="dark:hover:text-white hover:text-sky-800 hover:cursor-pointer">
                      {!item.street1 &&
                      !item.street2 &&
                      !item.city &&
                      !item.state &&
                      !item.zipcode &&
                      !item.country ? (
                        <p data-party-id={item.id} data-item="Address">
                          Add an address
                        </p>
                      ) : (
                        <>
                          <p data-party-id={item.id} data-item="Address">
                            {item.street1}
                          </p>
                          {item.street2 && (
                            <p data-party-id={item.id} data-item="Address">
                              {item.street2}
                            </p>
                          )}
                          <p data-party-id={item.id} data-item="Address">
                            {item.city} {item.state}, {item.zipcode}
                          </p>
                          {item.country && (
                            <p data-party-id={item.id} data-item="Address">
                              {item.country}
                            </p>
                          )}{" "}
                        </>
                      )}
                    </td>
                    <td className="transition duration-500 group">
                      {item.Guests
                        ? item.Guests.map((guest) => {
                            return (
                              <p
                                className="dark:hover:text-white hover:text-sky-800 hover:cursor-pointer"
                                data-party-id={item.id}
                                data-guest-id={guest.id}
                                data-item="Guest"
                                key={guest.id}
                              >
                                {guest.guestName}
                              </p>
                            );
                          })
                        : "No Guests"}
                      <div className="flex justify-center">
                        <p className="hidden w-6 h-6 transition duration-500 group-hover:block">
                          <PlusIcon
                            data-party-id={item.id}
                            data-item="AddGuest"
                            className="dark:hover:text-white hover:text-sky-800"
                          />
                        </p>
                      </div>
                    </td>
                    <td>
                      {item.Guests
                        ? item.Guests.map((guest) => {
                            return (
                              <span key={guest.id}>
                                {guest.Gifts
                                  ? guest.Gifts.map((gift) => {
                                      return (
                                        <p
                                          className="dark:hover:text-white hover:text-sky-800 hover:cursor-pointer"
                                          data-party-id={item.id}
                                          data-guest-id={guest.id}
                                          data-gift-id={gift.id}
                                          data-item="Gifts"
                                          key={gift.id}
                                        >
                                          {gift.item}
                                        </p>
                                      );
                                    })
                                  : // <p>No Gifts</p>
                                    null}
                              </span>
                            );
                          })
                        : "No Gifts"}
                    </td>
                    <td>
                  
                        <div className="flex justify-between">
                          <PlayIcon
                            // onClick={selectWedding}
                            className="h-6 text-green-500 cursor-pointer hover:text-green-400"
                          />
                          <TrashIcon
                            // onClick={deleteWedding}
                            className="h-6 text-red-500 cursor-pointer hover:text-yellow-400"
                          />
                          
                        </div>
                      
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-center max-w-6xl gap-5 p-5 pb-64 mx-auto md:hidden">
        {parties
          ? parties.map((item, index) => {
              return (
                <PartyCard
                  key={index}
                  id={item.id}
                  item={item}
                  token={token}
                  parties={parties}
                  setParties={setParties}
                  weddingId={weddingId}
                  weddings={weddings}
                  setWeddings={setWeddings}
                />
              );
            })
          : null}
      </div>
      {showAdd && (
        <AddParty
          setShowAdd={setShowAdd}
          token={token}
          parties={parties}
          setParties={setParties}
          weddingId={weddingId}
          weddings={weddings}
          setWeddings={setWeddings}
        />
      )}
      {showQuickEdit && (
        <QuickEdit
          quickEditTarget={quickEditTarget}
          setShowQuickEdit={setShowQuickEdit}
          parties={parties}
          setParties={setParties}
          token={token}
          weddingId={weddingId}
          weddings={weddings}
          setWeddings={setWeddings}
        />
      )}
    </div>
  );
}
