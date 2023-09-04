import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getBalanceSheet = (data) => {
  return axios.post(`${BASE_URL}/getBalanceSheet`, data);
};

export const getOutcome = (data) => {
  return axios.post(`${BASE_URL}/getLoanOutcome`, data);
};