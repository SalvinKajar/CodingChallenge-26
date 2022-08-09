import { hostNameUrl } from "../config/api";
import axios from "axios";

export const getTradeByID = (id) => {
  return axios.get(`${hostNameUrl}/trades/${id}`);
};