import { hostNameUrl } from "../config/api";
import axios from "axios";

export const getMaturedSecurities = () => {
  return axios.get(`${hostNameUrl}/maturedsecurities`);
};