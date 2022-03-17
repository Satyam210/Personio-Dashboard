import candidateApi from "./axiosInstances/CandidateService";

export const getAllCandidatesList = () => candidateApi.get(`api/v1/candidates`);
