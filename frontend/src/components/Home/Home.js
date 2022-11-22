import React from "react";
import DisplayWedding from "../Wedding/DisplayWedding";
import DisplayParty from "../Party/DisplayParty";
import DisplayGuest from "../Guest/DisplayGuest";
import { useNavigate } from "react-router-dom";

function Home({
  token,
  weddings,
  setWeddings,
  parties,
  setParties,
  weddingId,
  setWeddingId,
  guests,
  setGuests,
  guestId,
  userState,
  logout,
}) {
  const navigate = useNavigate();
  return (
    <div>
      {!userState.firstname ? (
        <>
          <button
            className="z-50 m-3 p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
            type="button"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </button>
          <button
            className="z-50 m-3 p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In
          </button>{" "}
        </>
      ) : null}

      {userState.firstname ? (
        <div className="text-center">
          <button
            className="m-3 p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
            onClick={logout}
          >
            Logout
          </button>

          <div className="">Welcome {userState.firstname}!</div>
        </div>
      ) : null}
      {weddings ? (
        <div className="">
          <DisplayWedding
            token={token}
            weddings={weddings}
            setWeddings={setWeddings}
            setParties={setParties}
            weddingId={weddingId}
            setWeddingId={setWeddingId}
          />
        </div>
      ) : null}
      {parties ? (
        <div className="">
          <DisplayParty
            parties={parties}
            setParties={setParties}
            token={token}
            weddingId={weddingId}
            setWeddings={setWeddings}
          />
        </div>
      ) : null}
      {guests ? (
        <div>
          <DisplayGuest
            guests={guests}
            setGuests={setGuests}
            token={token}
            guestId={guestId}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Home;
