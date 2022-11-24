import React from "react";
import DisplayWedding from "../Wedding/DisplayWedding";
import DisplayParty from "../Party/DisplayParty";
import DisplayGuest from "../Guest/DisplayGuest";
import { useNavigate } from "react-router-dom";
import heroImage from "../../images/wedding-rings.jpg";

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
        <section className="relative">
          <div className="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28">
            <div className="flex flex-1 flex-col items-center lg:items-start">
              <h2 className="text-pink-600 text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6">
                Let 'em Eat Cake
              </h2>
              <p className="text-gray-400 text-lg text-center lg:text-left mb-6">
                Let us take care of the planning so you can take care of each
                other.
              </p>
              <div className="flex items-center justify-center flex-wrap gap-6">
                <button
                  className="m-3 p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
                  type="button"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Signup
                </button>
                <p>or</p>
                <button
                  className="m-3 p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 rounded-lg drop-shadow-xl"
                  type="button"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log In
                </button>{" "}
              </div>
            </div>
            <div className="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10">
              <img
                className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full rounded-lg "
                src={heroImage}
                alt="Wedding Rings"
              />
            </div>
          </div>
          <div className="hidden md:block overflow-hidden bg-purple-200 rounded-l-full absolute h-80 w-2/4 top-32 right-0 lg:-bottom-28 lg:-right-36"></div>
        </section>
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
