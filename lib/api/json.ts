import axios from ".";
import { pageType } from "../../types/page";

export const uploadJsonAPI = (body: { fileName: string; data: pageType[] }) =>
    axios.post("/api/json/upload", body);
