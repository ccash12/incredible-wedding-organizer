import React, { useState } from "react";
import API from "../../utils/API";
import { Button } from "react-bootstrap";

export default function Gift ({guests, setGuests,token, partyId, setShowAdd }) {
    const [form, setForm] = useState({ 
        guestName:"",
        meal:"",
        seat: "",
        street1: "",
        street2:"",
        city:"",
        state:"",
        zipcode: "",
        country: "",
    });

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const guestFormSubmit = (e) => {
        e.preventDefault();

        API.createGuest(form, weddingId, Token)
            .then((res) => {
                setGuests(res.data);
                setShowAdd(false);
            })
            .catch((err) => {
                console.log(err);
            });
        setForm({
            guestName:"",
            meal:"",
            seat: "",
            street1: "",
            street2:"",
            city:"",
            state:"",
            zipcode: "",
            country: "",
        })
    } 
    return (
        <form id="addGuest" onSubmit={guestFormSubmit}>
            <div>
                <input 
                    type = "text"
                    id="guestName"
                    name="guestName"
                    value={form.guestName}
                    onChange={handleFormChange}
                    placeholder="Guest Name"
                    required
                />
                <label className="form-label"> 
                    Guest Name*
                </label>
            </div>
            <div>
                <label className="form-label"> 
                    Meal
                </label>
                <input 
                    type = "text"
                    id="meal"
                    name="meal"
                    value={form.meal}
                    onChange={handleFormChange}
                    placeholder="Meal"
                    required
                />
            </div>
            <div>
                <label className="form-label"> 
                    Seat
                </label>
                <input 
                    type = "text"
                    id="seat"
                    name="seat"
                    value={form.seat}
                    onChange={handleFormChange}
                    placeholder="Seat"
                    required
                />
            </div>
            <div>
                <label className="form-label"> 
                    Street 1
                </label>
                <input 
                type = "text"
                id="street1"
                name="street1"
                value={form.street1}
                onChange={handleFormChange}
                placeholder="Street1"
                required
                /> 
            </div>
            <div>
                <label className="form-label">
                    Street 2
                </label>
                <input 
                    type = "text"
                    id="street2"
                    name="street2"
                    value={form.street2}
                    onChange={handleFormChange}
                    placeholder="Street 2"
                    required
                /> 
            </div>
            <div>
                <label className="form-label">
                    City
                </label>
                <input 
                    type = "text"
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleFormChange}
                    placeholder="City"
                    required
                /> 
            </div>
            <div>
                <label className="form-label">
                    City
                </label>
                <input 
                    type = "text"
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleFormChange}
                    placeholder="City"
                    required
                /> 
            </div>
            <div>
                <label className="form-label">
                    State
                </label>
                <input 
                    type = "text"
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleFormChange}
                    placeholder="State"
                    required
                />
            </div>
            <div>
                <label className="form-label">
                    Zipcode
                </label>
                <input 
                    type = "text"
                    id="zipcode"
                    name="zipcode"
                    value={form.zipcode}
                    onChange={handleFormChange}
                    placeholder="Zipcode"
                    required
                />
            </div>
            <div>
                <label>
                    Country
                </label>
                <input 
                    type = "text"
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleFormChange}
                    placeholder="Country"
                    required
                />
            </div>
            <div>
                <Button type='submit'>
                    Save
                </Button>
            </div>
        </form>
    );
}

