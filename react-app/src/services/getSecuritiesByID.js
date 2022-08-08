import { hostNameUrl } from "../config/api";
import axios from "axios";

export const getSecuritiesByID = (id) => {
  return axios.get(`${hostNameUrl}/securities/${id}`);
};