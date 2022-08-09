import { hostNameUrl } from "../config/api";
import axios from "axios";

export const findTrades = () => {
  return axios.get(`${hostNameUrl}/alltrades/`);
};