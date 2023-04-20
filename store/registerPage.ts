import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pageType } from "../types/page";

type registerPageType = {
    date: string;
    content: string;
    location: string;
    photos: File[];
};

const initialState: { page: registerPageType } = {
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
        setRegisterPage(state, action: PayloadAction<registerPageType>) {
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
