import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { XMarkIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import ReactToolTip from "react-tooltip";
import "./GuestGiftCard.css";

export default function GuestGiftCard({
  partyId,
  weddingId,
  token,
  weddings,
  setWeddings,
  parties,
  setParties,
  guests,
  gifts,
  setShowSelect,
  partyName,
}) {
  const [guestArray, setGuestArray] = useState();
  const [giftArray, setGiftArray] = useState();
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleClick = (e) => {
    // console.log(e.target.getAttribute("data-guest") || e.target.getAttribute("data-gift"))
    if (e.target.getAttribute("data-guest")) {
      console.log("guest");
    } else {
      console.log("gift");
    }
  };

  useEffect(() => {
    guests && setGuestArray(JSON.parse(guests));
    gifts && setGiftArray(JSON.parse(gifts));
  }, [guests, gifts]);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePos({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 bg-gray-600/50 outline-none z-50 focus:outline-none">
        <div className="mt-3 bg-slate-200/90 p-3 rounded-lg shadow-xl xl:w-96">
          <div
            className="h-6 w-6 fixed hover:text-red"
            data-tip
            data-for="close"
          >
            <XMarkIcon
              className="hover:text-red-500"
              onClick={() => setShowSelect(false)}
            />
          </div>
          <div className="text-center text-xl">{partyName} Party</div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h2 className="text-decoration-line: underline font-bold shadow-xl">
                Guests
              </h2>

              {guestArray &&
                guestArray.map((item, index) => {
                  return (
                    <p
                      key={index}
                      onClick={handleClick}
                      data-guest={index}
                      className="hover:text-red-500 cursor-zoom-out"
                    >
                      {item}
                    </p>
                  );
                })}
              <div className="flex justify-center">
                <PlusIcon className="h-6 w-6 hover:text-green-500" />
              </div>
            </div>
            <div className="vl"></div>
            <div>
              <h2 className="text-decoration-line: underline font-bold shadow-xl">
                Gifts
              </h2>
              {giftArray &&
                giftArray.map((item, index) => {
                  return (
                    <p key={index} onClick={handleClick} data-gift={index}>
                      {item}
                    </p>
                  );
                })}
            </div>
          </div>
          <div className="mt-1 text-center">
            <button className="p-1 hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 rounded-lg drop-shadow-xl">
              Save
            </button>
          </div>
        </div>
      </div>
      <ReactToolTip id="close">
        <span>Close without saving</span>
      </ReactToolTip>
    </>
  );
}
