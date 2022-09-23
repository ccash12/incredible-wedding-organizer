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
  createWedding:(data,tkn) => {
    return axios.post(`${URL_PREFIX}/api/weddings`, data,{
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });
}};

export default API;
