import React, { useState } from "react";
import API from "../../utils/API";
import { Button } from "react-bootstrap";

export default function Gift ({gifts, setGifts,token, partyId, setShowAdd }) {
    const [form, setForm] = useState({ 
        gift:"",
    });

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const giftFormSubmit = (e) => {
        e.preventDefault();

        API.createGift(form, weddingId, Token)
            .then((res) => {
                setGifts(res.data);
                setShowAdd(false);
            })
            .catch((err) => {
                console.log(err);
            });
        setForm({
            gift:"",
            
        })
    } 
    return (
        <form id="addGift" onSubmit={giftFormSubmit}>
            <div>
                <input 
                    type = "text"
                    id="giftName"
                    name="Gift"
                    value={form.giftName}
                    onChange={handleFormChange}
                    placeholder="Gift"
                    required
                />
                <label className="form-label"> 
                    Gift
                </label>
            </div>
            <div>
                <Button type='submit'>
                    Save
                </Button>
            </div>
        </form>
    );
}

