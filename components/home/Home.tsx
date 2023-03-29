import React from "react";
import styled from "styled-components";
import SearchRoomBar from "./searchRoomBar/SearchRoomBar";

const Container = styled.div`
    width: 100%;
    padding: 20px 80px;
    .home-title {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        text-align: center;
        h2 {
            font-size: 20px;
            color: white;
            text-shadow: black 1px 0 10px;
        }
        h3 {
            font-size: 15px;
        }
        h4 {
            font-size: 15px;
        }
    }
`;

const Home: React.FC = () => {
    const today = new Date();
    const metDay = new Date(2021, 11, 19);

    return (
        <Container>
            <SearchRoomBar />
            <div className="home-title">
                <h2>처음 만난 날</h2>
                <h3>
                    {Math.floor(
                        (today.getTime() - metDay.getTime()) /
                            (1000 * 60 * 60 * 24)
                    ) + 1}{" "}
                    일째
                </h3>
                <h4>지나 🤍 유준</h4>
            </div>
        </Container>
    );
};

export default Home;
