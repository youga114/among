import axios from ".";
import { pagesType } from "../../store/album";

export const uploadJsonAPI = (body: { fileName: string; data: pagesType }) =>
    axios.post("/api/json/upload", body);
