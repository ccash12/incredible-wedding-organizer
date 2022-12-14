import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import AddParty from "./AddParty";
import PartyCard from "./PartyCard";
import { useNavigate } from "react-router-dom";

export default function DisplayParty({
  parties,
  setParties,
  token,
  weddingId,
  weddings,
  setWeddings,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  const closeWedding = () => {
    setParties();
    navigate("/weddings");
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
        <table className="w-full">
          <thead className="border-b-2 border-gray-200 bg-gray-50">
            <tr>
              <th>Party Name</th>
              <th>Date Invite Sent</th>
              <th>Date RSVP Received</th>
              <th>Guests</th>
              <th>Address</th>
              <th>Gift(s)</th>
              {/* <th>Thank You Sent</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {parties ? (
              parties.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.partyName}</td>
                    <td>
                      {item.dateInviteSent ? item.dateInviteSent : "Not Sent"}
                    </td>
                    <td>
                      {item.dateRSVPReceived
                        ? item.dateRSVPReceived
                        : "Not Received"}
                    </td>
                    <td>
                      {item.Guests
                        ? item.Guests.map((guest) => {
                            return <p key={guest.id}>{guest.guestName}</p>;
                          })
                        : "No Guests"}
                    </td>
                    <td>
                      <p>{item.street1}</p>
                      {item.street2 && <p>{item.street2}</p>}
                      <p>
                        {item.city} {item.state}, {item.zipcode}
                      </p>
                      {item.country && <p>{item.country}</p>}
                    </td>
                    <td>
                    {item.Guests
                        ? item.Guests.map((guest) => {
                          {guest.Gifts ? guest.Gifts.map((gift)=>{
                              return (<p key={gift.id}>{gift.item}</p>)
                          }) : (<p>No Gifts</p>)}

                          })
                        : "No Gifts"}
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
    </div>
  );
}
