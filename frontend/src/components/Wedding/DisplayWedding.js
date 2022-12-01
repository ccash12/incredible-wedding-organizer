import React, { useState, useEffect } from "react";
import AddWedding from "./AddWedding";
import WeddingCard from "./WeddingCard";
import { useNavigate } from "react-router-dom";

export default function DisplayWedding({
  token,
  weddings,
  setWeddings,
  setParties,
  weddingId,
  setWeddingId,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate,token]);
console.log(weddings)
  return (
    <div className="text-center">
      <button
        className="p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
        onClick={() => {
          setShowAdd(true);
        }}
      >
        Add Wedding
      </button>
      <div className="p-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto pb-64">
        {weddings
          ? weddings.map((item) => {
              return (
                <WeddingCard
                  key={item.id}
                  id={item.id}
                  item={item}
                  token={token}
                  setParties={setParties}
                  weddings={weddings}
                  setWeddings={setWeddings}
                  setWeddingId={setWeddingId}
                />
              );
            })
          : null}
      </div>

      {showAdd ? (
        <>
          <AddWedding
            setShowAdd={setShowAdd}
            token={token}
            setWeddings={setWeddings}
            weddings={weddings}
          />
        </>
      ) : null}
    </div>
  );
}
