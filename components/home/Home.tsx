import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";
import RegisterPhotoIcon from "../../public/static/svg/register/photo/register_main_photo.svg";
import { uploadFileAPI } from "../../lib/api/file";
import { mainPhotoActions } from "../../store/mainPhoto";
import { useDispatch } from "react-redux";

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    .home-title {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 60px;
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
    .home-photo-container {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        background-color: black;
        img {
            object-fit: cover;
            position: absolute;
            height: auto;
            width: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .home-photo-register {
            position: absolute;
            left: 1%;
            top: 85%;

            input {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }
            .home-photo-register-button {
                width: 60px;
                height: 60px;
                border: 0;
                box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.18);
                border-radius: 50%;
                background-color: white;
                cursor: pointer;
                outline: none;
                margin-left: 15px;
            }
        }
    }
`;

const Home: React.FC = () => {
    const isLogged = useSelector((state) => state.user.isLogged);

    const today = new Date();
    const metDay = new Date("2021-11-19");

    const dispatch = useDispatch();

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files.length > 0) {
            const file = files[0];
            const formdata = new FormData();
            formdata.append("file", file);
            formdata.append("from", "main");
            try {
                const { data } = await uploadFileAPI(formdata);

                dispatch(mainPhotoActions.setPhoto(data));
            } catch (e) {
                console.log(e);
            }
        }
    };

    const photo = useSelector((state) => state.mainPhoto.photo);

    return (
        <Container>
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
            {isLogged && (
                <div className="home-photo-container">
                    <img src={photo} alt="" />
                    <div className="home-photo-register">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={uploadImage}
                        />
                        <button className="home-photo-register-button">
                            <RegisterPhotoIcon />
                        </button>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Home;
