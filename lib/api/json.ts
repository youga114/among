import axios from ".";

export const uploadJsonAPI = (body: { fileName: string; data: any }) =>
    axios.post("/api/json/upload", body);
