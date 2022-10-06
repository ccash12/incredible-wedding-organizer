import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Button } from "react-bootstrap";

export default function Update({ setShowEdit, target, token, setWeddings }) {
  const [formState, setFormState] = useState({
    weddingName: "",
    date: "",
    spouseName1: "",
    spouseName2: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (!formState.date) {
        data = {
          ...formState,
          date: null,
        };
      } else {
        data = { ...formState };
      }
      await API.updateWedding(data, target, token).then(async (res) => {
        setShowEdit(false);
        await API.getWedding(token).then((res) => {
          setWeddings(res.data);
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      API.getOneWedding(target, token).then((res) => {
        // if(!res.data.date) {
        //     res.data.date = "";
        // }
        setFormState({
          weddingName: res.data.weddingName,
          date: res.data.date ? res.data.date : "",
          spouseName1: res.data.spouseName1,
          spouseName2: res.data.spouseName2,
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, [target, token]);

  return (
    <form id="updateWedding" onSubmit={formSubmit}>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="weddingName"
          name="weddingName"
          value={formState.weddingName}
          onChange={handleFormChange}
          placeholder="Wedding Name"
          required
        />
        <label className="form-label" htmlFor="weddingName">
          Wedding Name*:
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="date">
          Wedding Date:
        </label>
        <input
          className="form-control"
          type="date"
          id="date"
          name="date"
          onChange={handleFormChange}
          value={formState.date}
        />
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="spouseName1"
          name="spouseName1"
          value={formState.spouseName1}
          onChange={handleFormChange}
          placeholder="Spouse Name"
          required
        />
        <label className="form-label" htmlFor="spouseName1">
          Spouse Name:
        </label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="spouseName2"
          name="spouseName2"
          value={formState.spouseName2}
          onChange={handleFormChange}
          placeholder="Spouse Name"
          required
        />
        <label className="form-label" htmlFor="spouseName2">
          Spouse Name:
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
