import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pageType } from "../types/page";

const initialState: { pages: pageType[] } = {
    pages: []
};

const album = createSlice({
    name: "album",
    initialState,
    reducers: {
        setPages(state, action: PayloadAction<pageType[]>) {
            state.pages = action.payload;
        }
    }
});

export const albumActions = { ...album.actions };

export default album;
