import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";
import Link from "next/link";
import CounterPlusIcon from "../../public/static/svg/common/counter/counter_plus.svg";
import palette from "../../styles/palette";

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

    .plus-content {
        position: fixed;
        bottom: 10px;
        left: 10px;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 1px solid ${palette.gray_48};
        color: ${palette.gray_48};
        background-color: white;
        outline: none;
        cursor: pointer;
        z-index: 100;
        &:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }
    }
`;

const Album: React.FC = () => {
    const pages = useSelector((state) => state.album.pages);
    const isLogged = useSelector((state) => state.user.isLogged);

    return (
        <Container>
            {isLogged && (
                <>
                    {pages.map((page, index) => {
                        return (
                            <Link href={"/album/page/" + index}>
                                <div
                                    className="album-photo-container"
                                    key={index}
                                >
                                    <div className="album-photo-container-text">
                                        <h2>{page.date}</h2>
                                        <h1>{page.content}</h1>
                                        <h2>{page.location}</h2>
                                    </div>
                                    <img src={page.photos[0]} alt="" />
                                </div>
                            </Link>
                        );
                    })}
                    <Link href="/register/photo" role="presentation">
                        <div className="plus-content">
                            <CounterPlusIcon fill={palette.gray_48} />
                        </div>
                    </Link>
                </>
            )}
        </Container>
    );
};

export default Album;
