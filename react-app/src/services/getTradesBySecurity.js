import { hostNameUrl } from "../config/api";
import axios from "axios";

export const getTradesBySecurity = (id) => {
  return axios.get(`${hostNameUrl}/securities/trade/${id}`);
};