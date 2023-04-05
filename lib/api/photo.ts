import axios from "./";

export const getMainPhotoAPI = () =>
    axios.get<string>("/api/photo/getMainPhoto");
