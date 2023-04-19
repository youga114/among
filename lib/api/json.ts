import axios from ".";

export const uploadJsonAPI = (json: {photos: string[]}) =>
    axios.post("/api/json/upload", json);