import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import AddParty from "./AddParty";
import PartyCard from "./PartyCard";
import {useNavigate} from "react-router-dom"

export default function DisplayParty({
  parties,
  setParties,
  token,
  weddingId,
  setWeddings,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();
  
  const closeWedding = () => {
    setParties();
    navigate("/weddings")
  };


  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate,token]);

  return (
    <div className="text-center">
      <button
        className="p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
        onClick={() => {
          setShowAdd(true);
        }}
      >
        Add Party
      </button>
      &nbsp;
      <button
        className="p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
        onClick={closeWedding}
      >
        Close Wedding
      </button>
      <div className="p-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto pb-64">
        {parties
          ? parties.map((item) => {
              return (
                <PartyCard
                  key={item.id}
                  id={item.id}
                  item={item}
                  token={token}
                  setParties={setParties}
                  weddingId={weddingId}
                />
              );
            })
          : null}
      </div>

      {showAdd ? (
        <>
          <AddParty
            setShowAdd={setShowAdd}
            token={token}
            setParties={setParties}
            weddingId={weddingId}
          />
        </>
      ) : null}
    </div>
  );
}
