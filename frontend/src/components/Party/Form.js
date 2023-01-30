import React, { useState, useEffect } from "react";

export default function Form({ formData }) {
  const [formState, setFormState] = useState({ ...formData });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //   useEffect(() => {
  //     console.log(formState);
  //   }, [formState]);

  return (
    <>
      {formState.partyName && (
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="partyName"
          name="partyName"
          value={formState.partyName}
          onChange={handleFormChange}
          placeholder="Party Name"
          required
        />
      )}
    </>
  );
}
