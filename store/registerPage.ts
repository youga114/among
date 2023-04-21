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
        initRegisterPage(state) {
            state = initialState;
            return state;
        },
        setRegisterPage(state, action: PayloadAction<pageType>) {
            state.page = action.payload;
        },
        setPhotos(state, action: PayloadAction<string[]>) {
            state.page.photos = action.payload;
        }
    }
});

export const registerPageActions = { ...registerPage.actions };

export default registerPage;
