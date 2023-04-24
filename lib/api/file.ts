import axios from ".";

export const uploadFileAPI = (file: FormData) =>
    axios.post<any, string[]>("/api/files/upload", file);
