import React, { useState, useEffect } from "react";
import AddWedding from "./AddWedding";
import WeddingCard from "./WeddingCard";
import { useNavigate } from "react-router-dom";

export default function DisplayWedding({
  token,
  weddings,
  setWeddings,
  setParties,
  setWeddingId,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);
  return (
    <div className="text-center bg-gray-200 dark:bg-gray-700">
      <button
        className="p-1 rounded-lg hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 drop-shadow-xl"
        onClick={() => {
          setShowAdd(true);
        }}
      >
        Add Wedding
      </button>
      <div
        className="flex flex-wrap justify-center gap-5 m-5 hover:flex-1"
      >
        {weddings &&
          weddings.map((item, index) => {
            return (
              <WeddingCard
                key={index}
                id={item.id}
                item={item}
                token={token}
                setParties={setParties}
                weddings={weddings}
                setWeddings={setWeddings}
                setWeddingId={setWeddingId}
              />
            );
          })}
      </div>

      {showAdd && (
        <AddWedding
          setShowAdd={setShowAdd}
          token={token}
          setWeddings={setWeddings}
          weddings={weddings}
        />
      )}
    </div>
  );
}
