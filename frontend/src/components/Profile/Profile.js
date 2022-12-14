import React from "react";
import { Link } from "react-router-dom";

export const Profile = ({ userState }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md rounded overflow-hidden shadow-lg">
        <div className="px-10 py-6">
          <div className="font-bold text-xl text-center mb-2">Profile</div>
          <strong>Email: </strong> {userState.email}
          <br />
          <br />
          <Link
            to="/updateprofile"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
};
