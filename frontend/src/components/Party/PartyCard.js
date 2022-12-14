import React, { useState } from "react";
import API from "../../utils/API";
import UpdateParty from "./UpdateParty";
import GuestGiftCard from "./GuestGiftCard";
import { TrashIcon, PlayIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function PartyCard({
  id,
  item,
  token,
  parties,
  setParties,
  weddingId,
  weddings,
  setWeddings,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const deleteParty = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to delete this party and everything associated with it? It cannot be undone!"
      )
    ) {
      let newWeddings = [...weddings];
      const objWithIdIndex = newWeddings.findIndex(
        (obj) => obj.id === weddingId
      );
      if (objWithIdIndex > -1) {
        const partyWithIdIndex = newWeddings[objWithIdIndex].Parties.findIndex(
          (obj) => obj.id === id
        );

        if (partyWithIdIndex > -1) {
          newWeddings[objWithIdIndex].Parties.splice(partyWithIdIndex, 1);
          const newParties = [...parties];
          newParties.splice(partyWithIdIndex, 1);
          setParties(newParties);
        }
      }
      setWeddings(newWeddings);
      API.deleteParty(weddingId, id, token).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <>
      <div className="relative items-center p-5 space-y-4 transition-all duration-100 ease-out bg-yellow-200 rounded-md shadow-md hover:scale-105 dark:bg-slate-400 dark:text-slate-100">
        <div className="flex justify-between">
          <TrashIcon
            onClick={deleteParty}
            className="h-10 text-red-500 cursor-pointer hover:text-yellow-400"
          />
          <PlayIcon
            onClick={() => console.log(item)}
            className="h-10 text-green-500 cursor-pointer hover:text-green-400"
          />
          <PencilIcon
            onClick={() => {
              setShowEdit(true);
            }}
            className="h-10 text-blue-500 cursor-pointer hover:text-blue-400"
          />
        </div>
        <div>
          <p>{item.partyName}</p>
        </div>
        <div>
          <p>Date Invite Sent: {item.dateInviteSent ? item.dateInviteSent : 'Not Sent'}</p>
          <p>Date RSVP Received: {item.dateRSVPReceived ? item.dateRSVPReceived : 'Not Received'}</p>
          <br/>
          <p>{item.street1}</p>
          {item.street2 && <p>{item.street2}</p>}
          <p>
            {item.city} {item.state}, {item.zipcode}
          </p>
          {item.country && <p>{item.country}</p>}
          <br />
          
        </div>
      </div>
      {showEdit && (
        <UpdateParty
          setShowEdit={setShowEdit}
          weddingId={id}
          token={token}
          setParties={setParties}
        />
      )}
      
    </>
  );
}
