import { useState, useEffect } from "react";
import API from "../../utils/API";
import {
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";

export default function Display({token}) {
  const [weddings, setWeddings] = useState();

  const deleteWedding = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to delete this wedding? It cannot be undone!"
      )
    ) {
      API.deleteWedding(e.target.attributes["data-id"].value, token)
        .then((res) => {
          console.log('success',res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    API.getWedding(token)
      .then((res) => {
        setWeddings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
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
                        onClick={deleteWedding}
                        className="mx-0"
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })
          : "Loading....."}
      </Row>
    </div>
  );
}
