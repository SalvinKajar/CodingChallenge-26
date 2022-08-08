import { hostNameUrl } from "../config/api";
import axios from "axios";

export const getWatchlist = () => {
  return axios.get(`${hostNameUrl}/watchlist`);
};