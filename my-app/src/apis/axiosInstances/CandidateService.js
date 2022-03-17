import axios from "axios";
import { constants } from "../../utils/constants";

const candidateApi = axios.create({
  baseURL: constants("CandidateServiceUrl"),
  timeout: 0,
});

candidateApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default candidateApi;
