import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { photo: string } = {
    photo: "",
};

const mainPhoto = createSlice({
    name: "mainPhoto",
    initialState,
    reducers: {
        setPhoto(state, action: PayloadAction<string>) {
            state.photo = action.payload;
        },
    },
});

export const mainPhotoActions = { ...mainPhoto.actions };

export default mainPhoto;
