import React, { useState } from "react";
import API from "../../utils/API";
import { Button } from "react-bootstrap";

export default function DisplayGuest ({guests, setGuests, token, partyId}) {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const handleAddClose = () => setShowAdd(false);
    const handleEditClose = () => setShowEdit(false);
    const handleShow = (e) => {
        switch (e.target.innerHTML) {
            case "Add Party":
            setShowAdd(true);
            break;
        case "Edit":
            setShowEdit(true);
            break;
        default: 
    }
    };
    const deleteGuest = (e) => {
        e.preventDefault();
        if (
            window.confirm(
                "Are you sure you want to delete this party and everything associated with it? It cannot be undone!"
            )
        ) {
            API.deleteGuest(
                e.target.attributes["data-partyId"].value,
                e.target.attributes["data-id"].value,
                token
            )
                .then((res) => {
                    API.getGuests(e.target.attributes["data-partyId"].value, token)
                .then((res) => {
                    setGuests(res.data);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err);
            });
        }
    };
        return(
            <>
                <Button size="sm" onClick={handleShow}>
                    Add Guest
                </Button>
            
            
            </>
        );
    };
