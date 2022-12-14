import React, { useState } from "react";
import API from "../../utils/API";
import UpdateWedding from "./UpdateWedding";
import { TrashIcon, PlayIcon, PencilIcon } from "@heroicons/react/24/outline";
import Timer from "../../components/Timer/Timer";
import { useNavigate } from "react-router-dom";
import Counts from "./Counts";

export default function WeddingCard({
  id,
  item,
  token,
  setParties,
  weddings,
  setWeddings,
  setWeddingId
}) {
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  const selectWedding = (e) => {
    e.preventDefault();
    setParties(item.Parties);
    setWeddingId(id)
    navigate("/parties");
  };

  const deleteWedding = (e) => {
    e.preventDefault();

    if (
      window.confirm(
        "Are you sure you want to delete this wedding? It cannot be undone!"
      )
    ) {
      const newWeddings = [...weddings];

      const objWithIdIndex = newWeddings.findIndex((obj) => obj.id === id);
      if (objWithIdIndex > -1) {
        newWeddings.splice(objWithIdIndex, 1);
        setWeddings(newWeddings);
      }
      API.deleteWedding(id, token)
      .catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <>
      <div className="p-5 w-96 items-center rounded-md hover:scale-105 transition-all duration-100 ease-out relative space-y-4 bg-yellow-200 dark:bg-slate-400 dark:text-slate-100 shadow-md">
        <div className="flex justify-between">
          <TrashIcon
            onClick={deleteWedding}
            className="h-10 text-red-500 hover:text-yellow-400 cursor-pointer"
          />
          <PlayIcon
            onClick={selectWedding}
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
          <p>{item.weddingName}</p>
        </div>
        <div>
          <p>Spouse: {item.spouseName1}</p>
          <p>Spouse: {item.spouseName2}</p>
          <br />
          {item.Parties && <p> <Counts data={item.Parties} item="gifts"/> Gifts from <Counts data={item.Parties} item="guests"/> Guests in {item.Parties.length} Parties</p>}
          <br/>
          <p>Date: {item.date ? item.date : "Not Entered"}</p>

          {item.date && <Timer date={item.date} />}
        </div>
      </div>
      {showEdit && (
        <UpdateWedding
          setShowEdit={setShowEdit}
          weddingId={id}
          token={token}
          weddings={weddings}
          setWeddings={setWeddings}
        />
      )}
    </>
  );
}
