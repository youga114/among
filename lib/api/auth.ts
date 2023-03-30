import axios from "./";
import { UserType } from "../../types/user";

export const loginAPI = (body: { email: string; password: string }) =>
    axios.post<UserType>("/api/auth/login", body);
export const meAPI = () => axios.get<UserType>("/api/auth/me");
export const logoutAPI = () => axios.delete("/api/auth/logout");
