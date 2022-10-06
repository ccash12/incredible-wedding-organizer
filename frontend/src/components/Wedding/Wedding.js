import { useState } from "react";
import API from "../../utils/API";

function Wedding({ token, weddings, setWeddings }) {
  const [weddingFormState, setWeddingFormState] = useState({
    weddingName: "",
    date: "",
    spouseName1: "",
    spouseName2: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setWeddingFormState({
      ...weddingFormState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWeddingFormState({
      weddingName: "",
      date: "",
      spouseName1: "",
      spouseName2: "",
    });

    API.createWedding(weddingFormState, token)
      .then((res) => {
        console.log(res);
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
  };
  return (
    <div>
      <div>
        <h3>Add New Wedding</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="weddingName"
          placeholder="Wedding Name"
          value={weddingFormState.weddingName}
          onChange={handleFormChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={weddingFormState.date}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="spouseName1"
          placeholder="Spouse 1"
          value={weddingFormState.spouseName1}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="spouseName2"
          placeholder="Spouse 2"
          value={weddingFormState.spouseName2}
          onChange={handleFormChange}
        />
        <button type="submit">Create New Weddding</button>
      </form>
    </div>
  );
}

export default Wedding;
