import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pageType } from "../types/page";

const initialState: { page: pageType } = {
    page: {
        date: "",
        content: "",
        location: "",
        photos: []
    }
};

const registerPage = createSlice({
    name: "registerPage",
    initialState,
    reducers: {
        setRegisterPage(state, action: PayloadAction<pageType>) {
            state.page = action.payload;
        },
        initRegisterPage(state) {
            state = initialState;
            return state;
        }
    }
});

export const registerPageActions = { ...registerPage.actions };

export default registerPage;
