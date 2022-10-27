import React, { useState } from "react";
import API from "../../utils/API";
import UpdateParty from "./UpdateParty";
import { TrashIcon, PlayIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function PartyCard({ id, item, token, setParties, weddingId }) {
  const [showEdit, setShowEdit] = useState(false);
  const deleteParty = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to delete this party and everything associated with it? It cannot be undone!"
      )
    ) {
      API.deleteParty(weddingId, id, token)
        .then((res) => {
          API.getParties(weddingId, token)
            .then((res) => {
              setParties(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="p-5 items-center rounded-md hover:scale-105 transition-all duration-100 ease-out relative space-y-4 bg-yellow-200 dark:bg-slate-400 dark:text-slate-100 shadow-md">
        <div className="flex justify-between">
          <TrashIcon
            onClick={deleteParty}
            className="h-10 text-red-500 hover:text-yellow-400 cursor-pointer"
          />
          <PlayIcon
            // onClick={selectParty}
            className="h-10 text-green-500 hover:text-green-400 cursor-pointer"
          />
          <PencilIcon
            onClick={() => {
              setShowEdit(true);
            }}
            className="h-10 text-blue-500 hover:text-blue-400 cursor-pointer"
          />
        </div>
        <div>
          <p>{item.partyName}</p>
        </div>
        <div>
          <p>Date Invite Sent: {item.dateInviteSent}</p>
          <p>Date RSVP Received: {item.dateRSVPReceived}</p>
          <p>Street: {item.street1}</p>
          <p>Street: {item.street2}</p>
          <p>City: {item.city}</p>
          <p>State: {item.state}</p>
          <p>Zip/Postal Code: {item.zipcode}</p>
          <p>Country: {item.country}</p>
        </div>
      </div>
      {showEdit ? (
        <>
          <UpdateParty
            setShowEdit={setShowEdit}
            weddingId={id}
            token={token}
            setParties={setParties}
          />
        </>
      ) : null}
    </>
  );
}
