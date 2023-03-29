import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { authMode: "login" } = {
    authMode: "login",
};

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthMode(state, action: PayloadAction<"login">) {
            state.authMode = action.payload;
        },
    },
});

export const authActions = { ...auth.actions };

export default auth;
