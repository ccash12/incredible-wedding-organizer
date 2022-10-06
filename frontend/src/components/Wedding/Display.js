import React, {useState} from "react";
import API from "../../utils/API";
import {
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Modal
} from "react-bootstrap";
import Update from "./Update"

export default function Display({ token, weddings, setWeddings }) {
  const [showEdit, setShowEdit] = useState(false);
  const [target, setTarget] = useState("");

  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = (e) => {
    setTarget(e.target.attributes["data-id"].value);
    setShowEdit(true);
  };

  const deleteWedding = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to delete this wedding? It cannot be undone!"
      )
    ) {
      API.deleteWedding(e.target.attributes["data-id"].value, token)
        .then((res) => {
          console.log("success", res);
        })
        .then((res) => {
          API.getWedding(token)
            .then((res) => {
              setWeddings(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="m-4">
      <Row>
        {weddings
          ? weddings.map((item) => {
              return (
                <Col key={item.id}>
                  <Card data-id={item.id} key={item.id}>
                    <Card.Title>{item.weddingName}</Card.Title>
                    <ListGroup>
                      <ListGroupItem>
                        Date: {item.date ? item.date : "Not Entered"}
                      </ListGroupItem>
                      <ListGroupItem>Spouse: {item.spouseName1}</ListGroupItem>
                      <ListGroupItem>Spouse: {item.spouseName2}</ListGroupItem>
                    </ListGroup>
                    <Card.Footer>
                      <Button
                        size="sm"
                        data-id={item.id}
                        className="mx-auto"
                        variant="success"
                        onClick={handleEditShow}
                      >Edit</Button>
                      <Button
                        size="sm"
                        data-id={item.id}
                        onClick={deleteWedding}
                        className="mx-auto"
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })
          : "Create your first wedding!"}
      </Row>
      <Modal backdrop="static" show={showEdit} onHide={handleEditClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Wedding</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Update setShowEdit={setShowEdit} target={target} token={token} setWeddings={setWeddings}/>
            </Modal.Body>
      </Modal>
    </div>
  );
}
