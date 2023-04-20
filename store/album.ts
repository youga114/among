import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type pagesType = {
    date: string;
    content: string;
    location: string;
    photos: string[];
}[];

const initialState: { pages: pagesType } = {
    pages: [
        {
            date: "2012년 01월 02일",
            content: "내용",
            location: "서울시 관악구 청룡동",
            photos: [
                "/static/image/test.jpg",
                "/static/image/test.jpg",
                "/static/image/test.jpg",
                "/static/image/test.jpg",
                "/static/image/test.jpg"
            ]
        },
        {
            date: "2012년 01월 02일",
            content: "내용",
            location: "서울시 관악구 청룡동",
            photos: ["/static/image/test2.jpg"]
        },
        {
            date: "2012년 01월 02일",
            content: "내용",
            location: "서울시 관악구 청룡동",
            photos: ["/static/image/test.jpg"]
        },
        {
            date: "2012년 01월 02일",
            content: "내용",
            location: "서울시 관악구 청룡동",
            photos: ["/static/image/test2.jpg"]
        },
        {
            date: "2012년 01월 02일",
            content: "내용",
            location: "서울시 관악구 청룡동",
            photos: ["/static/image/test.jpg"]
        }
    ]
};

const album = createSlice({
    name: "album",
    initialState,
    reducers: {
        setPhotos(state, action: PayloadAction<pagesType>) {
            state.pages = action.payload;
        }
    }
});

export const photoActions = { ...album.actions };

export default album;
