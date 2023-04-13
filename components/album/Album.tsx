import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    .album-photo-container {
        width: 100%;
        height: 30vh;
        position: relative;
        overflow: hidden;
        background-color: black;
        img {
            position: absolute;
            height: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
`;

const Album: React.FC = () => {
    const isLogged = useSelector((state) => state.user.isLogged);
    const photos = useSelector((state) => state.album.photos);

    return (
        <Container>
            {isLogged &&
                photos.map((photo, index) => {
                    return (
                        <div className="album-photo-container" key={index}>
                            <img src={photo.src} alt="" />
                        </div>
                    );
                })}
        </Container>
    );
};

export default Album;
