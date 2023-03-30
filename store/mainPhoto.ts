import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { photo: string } = {
    photo: "https://newbie-bucket.s3.ap-northeast-2.amazonaws.com/main.png",
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
