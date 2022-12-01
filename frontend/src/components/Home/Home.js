import React, { useEffect } from "react";
import API from "../../utils/API";
import DisplayWedding from "../Wedding/DisplayWedding";
import DisplayParty from "../Party/DisplayParty";
import DisplayGuest from "../Guest/DisplayGuest";
import { useNavigate } from "react-router-dom";
import heroImage from "../../images/wedding-rings.jpg";

function Home({
  userState,
  setUserState,
  parites,
  setParties,
  token,
  setToken,
  weddingId,
  setWeddingId,
  weddings,
  setWeddings,
  guests,
  setGuests,
  guestId,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const myToken = localStorage.getItem("weddingtoken");

    if (myToken) {
      API.verify(myToken)
        .then((res) => {
          setToken(myToken);
          setUserState({
            firstname: res.data.firstname,
            email: res.data.email,
            id: res.data.id,
          });
        })
        .then((res) => {
          API.getWedding(myToken)
            .then((res) => {
              setWeddings(res.data.Weddings);
              navigate("/weddings");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("weddingtoken");
        });
    }
  }, [token]);

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
          <div className="">Welcome {userState.firstname}!</div>
        </div>
      ) : null}
      {/* {weddings ? navigate("/weddings") : null} */}
      {/* {parties ? navigate("/parties") : null} */}
      {/* {guests ? (
        <div>
          <DisplayGuest
            guests={guests}
            setGuests={setGuests}
            token={token}
            guestId={guestId}
          />
        </div>
      ) : null} */}
    </div>
  );
}

export default Home;
