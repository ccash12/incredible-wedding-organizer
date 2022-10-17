import React, { useState } from "react";
import API from "../../utils/API";
import { Button } from "react-bootstrap";

export default function Party({ setShowAdd, token, setParties, weddingId }) {
  const [formState, setFormState] = useState({
    partyName: "",
    dateInviteSent: "",
    dateRSVPReceived: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();

    API.createParty(formState, weddingId, token)
      .then((res) => {
        API.getParties(weddingId, token)
          .then((res) => {
            setParties(res.data);
            setShowAdd(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
    setFormState({
      partyName: "",
      dateInviteSent: "",
      dateRSVPReceived: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    });
  };
  return (
    <form id="addParty" onSubmit={formSubmit}>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="partyName"
          name="partyName"
          value={formState.partyName}
          onChange={handleFormChange}
          placeholder="Party Name"
          required
        />
        <label className="form-label" htmlFor="partyName">
          Party Name*
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="date">
          Date Invite Sent
        </label>
        <input
          className="form-control"
          type="date"
          id="dateInviteSent"
          name="dateInviteSent"
          onChange={handleFormChange}
          value={formState.dateInviteSent}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="date">
          Date RSVP Received
        </label>
        <input
          className="form-control"
          type="date"
          id="dateRSVPReceived"
          name="dateRSVPReceived"
          onChange={handleFormChange}
          value={formState.dateRSVPReceived}
        />
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="street1"
          name="street1"
          value={formState.street1}
          onChange={handleFormChange}
          placeholder="Street and number, P.O.Box, c/o"
        />
        <label className="form-label" htmlFor="street1">
          Street and number, P.O.Box, c/o
        </label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="street2"
          name="street2"
          value={formState.street2}
          onChange={handleFormChange}
          placeholder="Apartment, suite, unit, building, floor, etc."
        />
        <label className="form-label" htmlFor="street2">
          Apartment, suite, unit, building, floor, etc.
        </label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          value={formState.city}
          onChange={handleFormChange}
          placeholder="City"
        />
        <label className="form-label" htmlFor="city">
          City
        </label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="state"
          name="state"
          value={formState.state}
          onChange={handleFormChange}
          placeholder="State / Province / Region"
        />
        <label className="form-label" htmlFor="state">
          State / Province / Region
        </label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="zipcode"
          name="zipcode"
          value={formState.zipcode}
          onChange={handleFormChange}
          placeholder="Zip Code"
        />
        <label className="form-label" htmlFor="zipcode">
          Zip Code
        </label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="country"
          name="country"
          value={formState.country}
          onChange={handleFormChange}
          placeholder="Country"
        />
        <label className="form-label" htmlFor="country">
          Country
        </label>
      </div>
      <div className="d-flex">
        <Button type="submit" className="mx-auto p-2">
          Save
        </Button>
      </div>
    </form>
  );
}
