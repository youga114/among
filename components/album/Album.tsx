import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";
import Link from "next/link";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    .album-photo-container {
        width: 100%;
        height: 50vw;
        position: relative;
        overflow: hidden;
        background-color: black;
        margin-top: 1px;
        display: flex;
        align-items: center;
        @media (max-width: 1000px) {
            height: 30vh;
        }
        .album-photo-container-text {
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
            height: auto;
            width: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            filter: opacity(70%);
        }
    }
`;

const Album: React.FC = () => {
    const pages = useSelector((state) => state.album.pages);

    return (
        <Container>
            {pages.map((page, index) => {
                return (
                    <div className="album-photo-container" key={index}>
                        <div className="album-photo-container-text">
                            <h2>{page.date}</h2>
                            <h1>{page.content}</h1>
                            <h2>{page.location}</h2>
                        </div>
                        {page.photos.length > 0 && (
                            <Link href={"/album/" + index}>
                                <img src={page.photos[0]} alt="" />
                            </Link>
                        )}
                    </div>
                );
            })}
        </Container>
    );
};

export default Album;
