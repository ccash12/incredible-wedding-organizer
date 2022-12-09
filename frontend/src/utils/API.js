import axios from "axios";
//local
const URL_PREFIX = "http://localhost:3001";
//deploy
// const URL_PREFIX = "https://mymoney-tracker-backend.herokuapp.com"

const API = {
  // user section
  login: (usrData) => {
    return axios.post(`${URL_PREFIX}/api/user/login`, usrData);
  },
  signup: (usrData) => {
    return axios.post(`${URL_PREFIX}/api/user/signup`, usrData);
  },
  verify: (tkn) => {
    return axios.get(`${URL_PREFIX}/api/user/verify`, {
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });
  },
  update: (usrData, tkn) => {
    return axios.put(`${URL_PREFIX}/api/user/update`, usrData, {
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });
  },
  createWedding: (data, tkn) => {
    return axios.post(`${URL_PREFIX}/api/wedding`, data, {
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });
  },
  getWedding: (tkn) => {
    return axios.get(`${URL_PREFIX}/api/wedding`, {
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });
  },
  getOneWedding: (id, tkn) => {
    return axios.get(`${URL_PREFIX}/api/wedding/${id}`, {
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });
  },
  updateWedding: (data, id, tkn) => {
    return axios.put(`${URL_PREFIX}/api/wedding/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });
  },
  deleteWedding: (id, tkn) => {
    return axios.delete(`${URL_PREFIX}/api/wedding/${id}`, {
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });
  },
  getParties: (id, tkn) => {
    return axios.get(`${URL_PREFIX}/api/party/${id}`, {
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });
  },
  createParty: (data, weddingId, tkn) => {
    return axios.post(`${URL_PREFIX}/api/party/${weddingId}`, data, {
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });
  },
  deleteParty: (weddingId, partyId, tkn) => {
    return axios.delete(`${URL_PREFIX}/api/party/${weddingId}/${partyId}`, {
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });
  },
};

export default API;
