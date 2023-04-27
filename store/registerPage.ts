import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pageType } from "../types/page";

const initialState: { page: pageType } = {
    page: {
        date: "",
        content: "",
        location: "",
        latitude: 0,
        longitude: 0,
        country: "",
        city: "",
        district: "",
        streetAddress: "",
        postcode: "",
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
        },
        setContent(state, action: PayloadAction<string>) {
            state.page.content = action.payload;
        },
        setLocation(state, action: PayloadAction<string>) {
            state.page.location = action.payload;
        },
        setDate(state, action: PayloadAction<string>) {
            state.page.date = action.payload;
        }
    }
});

export const registerPageActions = { ...registerPage.actions };

export default registerPage;
