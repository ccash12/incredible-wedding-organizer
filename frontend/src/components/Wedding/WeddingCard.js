import React, { useState } from "react";
import API from "../../utils/API";
import UpdateWedding from "./UpdateWedding";
import { TrashIcon, PlayIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function WeddingCard({
  id,
  item,
  token,
  setParties,
  setWeddings,
  setWeddingId,
}) {
  const [showEdit, setShowEdit] = useState(false);

  const selectWedding = (e) => {
    e.preventDefault();
    API.getParties(id, token)
      .then((res) => {
        setWeddings();
        setWeddingId(id);
        setParties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteWedding = (e) => {
    e.preventDefault();

    if (
      window.confirm(
        "Are you sure you want to delete this wedding? It cannot be undone!"
      )
    ) {
      API.deleteWedding(id, token)
        .then((res) => {
          setParties();
          API.getWedding(token)
            .then((res) => {
              setWeddings(res.data);
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
      <div className="p-5 h-64 items-center rounded-md hover:scale-105 transition-all duration-100 ease-out relative space-y-4 bg-yellow-200 dark:bg-slate-400 dark:text-slate-100 shadow-md">
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
          <p>Date: {item.date ? item.date : "Not Entered"}</p>
        </div>
      </div>
      {showEdit ? (
        <>
          <UpdateWedding
            setShowEdit={setShowEdit}
            weddingId={id}
            token={token}
            setWeddings={setWeddings}
          />
        </>
      ) : null}
    </>
  );
}
