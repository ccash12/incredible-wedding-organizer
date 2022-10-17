import React, { useState } from "react";
import API from "../../utils/API";
import {
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
} from "react-bootstrap";
import Party from "./Party";

export default function DisplayParty({
  parties,
  setParties,
  token,
  weddingId,
}) {
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
  const deleteParty = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to delete this party and everything associated with it? It cannot be undone!"
      )
    ) {
      API.deleteParty(
        e.target.attributes["data-weddingid"].value,
        e.target.attributes["data-id"].value,
        token
      )
        .then((res) => {
          API.getParties(e.target.attributes["data-weddingid"].value, token)
            .then((res) => {
              setParties(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <Button size="sm" onClick={handleShow}>
        Add Party
      </Button>
      {parties
        ? parties.map((item) => {
            return (
              <Col key={item.id}>
                <Card data-id={item.id} key={item.id}>
                  <Card.Title>{item.partyName}</Card.Title>
                  <ListGroup>
                    <ListGroupItem>
                      Date Invite Sent: {item.datInviteSent}
                    </ListGroupItem>
                    <ListGroupItem>
                      Date RSVP Received: {item.datRSVPReceived}
                    </ListGroupItem>
                    <ListGroupItem>Street: {item.street1}</ListGroupItem>
                    <ListGroupItem>Street: {item.street2}</ListGroupItem>
                    <ListGroupItem>City: {item.city}</ListGroupItem>
                    <ListGroupItem>State: {item.state}</ListGroupItem>
                    <ListGroupItem>
                      Zip/Postal Code: {item.zipcode}
                    </ListGroupItem>
                    <ListGroupItem>Country: {item.country}</ListGroupItem>
                  </ListGroup>
                  <Card.Footer>
                    <Button size="sm" data-id={item.id} variant="success">
                      Edit Party
                    </Button>
                    <Button
                      size="sm"
                      data-weddingid={item.weddingId}
                      data-id={item.id}
                      variant="danger"
                      onClick={deleteParty}
                    >
                      Delete Party
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })
        : null}
      <Modal backdrop="static" show={showAdd} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Party</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Party
            setShowAdd={setShowAdd}
            token={token}
            setParties={setParties}
            weddingId={weddingId}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
