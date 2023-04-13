import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";
import palette from "../../styles/palette";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    .page-main-container {
        width: 100%;
        height: 50vw;
        position: relative;
        overflow: hidden;
        background-color: black;
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        @media (max-width: 1000px) {
            height: 30vh;
        }
        .page-main-container-text {
            width: 100%;
            height: 15vw;
            color: white;
            z-index: 1;
            text-align: center;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            h1 {
                font-size: 5vw;
            }
            h2 {
                font-size: 3vw;
            }
        }
        img {
            object-fit: cover;
            position: absolute;
            width: 100%;
            height: auto;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            filter: opacity(70%);
        }
    }
    .page-photos-container {
        width: 96%;
        display: flex;
        flex-direction: column;
        background-color: ${palette.gray_dd};
        padding: 2%;
        margin: 2%;
        padding-bottom: 0px;
        img {
            object-fit: cover;
            width: 100%;
            height: 50vh;
            margin-bottom: 2%;
        }
    }
`;

const Page: React.FC<{ id: number }> = ({ id }) => {
    const pages = useSelector((state) => state.album.pages);
    const page = pages?.[id] ?? {
        date: "",
        content: "",
        location: "",
        photos: [""],
    };

    return (
        <Container>
            <div className="page-main-container">
                <div className="page-main-container-text">
                    <h2>{page.date}</h2>
                    <h1>{page.content}</h1>
                    <h2>{page.location}</h2>
                </div>
                <img src={page.photos[0]} alt="" />
            </div>
            <div className="page-photos-container">
                {page.photos.map((photo, index) => {
                    if (index == 0) {
                        return false;
                    }

                    return <img src={photo} alt="" />;
                })}
            </div>
        </Container>
    );
};

export default Page;
