import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type photosType = {
    src: string;
    date: string;
    content: string;
}[];

const initialState: { photos: photosType } = {
    photos: [
        {
            src: "https://newbie-bucket.s3.ap-northeast-2.amazonaws.com/main.png",
            date: "20120102",
            content: "내용",
        },
    ],
};

const album = createSlice({
    name: "album",
    initialState,
    reducers: {
        setPhotos(state, action: PayloadAction<photosType>) {
            state.photos = action.payload;
        },
    },
});

export const photoActions = { ...album.actions };

export default album;
