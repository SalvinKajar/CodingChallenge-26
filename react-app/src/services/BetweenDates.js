import { hostNameUrl } from "../config/api";
import axios from "axios";

export const betweenDates = (d1,d2) => {
  return axios.get(`${hostNameUrl}/securities/${d1}/${d2}`);
};