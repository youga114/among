import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import { useDispatch } from "react-redux";
import { uploadFileAPI } from "../../lib/api/file";

import PencilIcon from "../../public/static/svg/register/photo/pencil.svg";
import TrashCanIcon from "../../public/static/svg/register/photo/trash_can.svg";
import GrayPlusIcon from "../../public/static/svg/register/photo/gray_plus.svg";
import { useSelector } from "../../store";
import { registerPageActions } from "../../store/registerPage";

const Container = styled.ul`
    .register-room-first-photo-wrapper {
        width: 100%;
        height: 400px;
        margin: 0 auto 24px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        overflow: hidden;
        background-color: black;
        &:hover {
            .register-room-photo-interaction-buttons {
                display: flex;
            }
        }
        input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
        img {
            object-fit: cover;
            height: auto;
            width: 100%;
        }
    }

    .register-room-photo-interaction-buttons {
        display: none;
        position: absolute;
        top: 8px;
        right: 8px;
        button {
            width: 48px;
            height: 48px;
            background-color: white;
            border-radius: 50%;
            cursor: pointer;
            border: 0;
            outline: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
            &:first-child {
                margin-right: 8px;
            }
        }
    }

    li:nth-child(n + 1) {
        margin-right: 0;
    }
    .register-room-photo-card {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 400px;
        border-radius: 6px;
        background-color: black;
        overflow: hidden;
        margin-right: 24px;
        margin-bottom: 24px;
        &:hover {
            .register-room-photo-interaction-buttons {
                display: flex;
            }
        }
        img {
            object-fit: cover;
            height: auto;
            width: 100%;
        }
    }
    .register-room-add-more-photo-card {
        position: relative;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border: 2px dashed ${palette.gray_bb};
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
        display: flex;
    }
`;

const RegisterPhotoCardList: React.FC = () => {
    const dispatch = useDispatch();
    const registerPage = useSelector((state) => state.registerPage.page);

    const addPhoto = () => {
        const el = document.createElement("input");
        el.type = "file";
        el.accept = "image/*";
        el.multiple = true;
        el.onchange = (event) => {
            const { files } = event.target as HTMLInputElement;
            if (files) {
                const filesUrl = [];
                for (let i = 0; i < files?.length ?? 1; ++i) {
                    filesUrl.push(URL.createObjectURL(files[i]));
                }
                dispatch(
                    registerPageActions.setRegisterPage({
                        ...registerPage,
                        photos: [...registerPage.photos, ...filesUrl]
                    })
                );
            }
        };
        el.click();
    };

    const deletePhoto = (index: number) => {
        const newPhotos = [...registerPage.photos];
        newPhotos.splice(index, 1);
        dispatch(registerPageActions.setPhotos(newPhotos));
    };

    const editPhoto = (index: number) => {
        const el = document.createElement("input");
        el.type = "file";
        el.onchange = (event) => {
            const file = (event.target as HTMLInputElement)?.files?.[0];
            if (file) {
                const newPhotos = [...registerPage.photos];
                newPhotos[index] = URL.createObjectURL(file);
                dispatch(registerPageActions.setPhotos(newPhotos));
            }
        };
        el.click();
    };

    return (
        <Container>
            {registerPage.photos.map((photo, index) => (
                <React.Fragment key={index}>
                    {index === 0 && (
                        <li className="register-room-first-photo-wrapper">
                            <img src={photo} alt="" />
                            <div className="register-room-photo-interaction-buttons">
                                <button
                                    type="button"
                                    onClick={() => {
                                        deletePhoto(index);
                                    }}
                                >
                                    <TrashCanIcon />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        editPhoto(index);
                                    }}
                                >
                                    <PencilIcon />
                                </button>
                            </div>
                        </li>
                    )}
                    {index !== 0 && (
                        <li className="register-room-photo-card">
                            <img src={photo} alt="" />
                            <div className="register-room-photo-interaction-buttons">
                                <button
                                    type="button"
                                    onClick={() => {
                                        deletePhoto(index);
                                    }}
                                >
                                    <TrashCanIcon />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        editPhoto(index);
                                    }}
                                >
                                    <PencilIcon />
                                </button>
                            </div>
                        </li>
                    )}
                </React.Fragment>
            ))}
            <li
                className="register-room-photo-card"
                role="presentation"
                onClick={addPhoto}
            >
                <div className="register-room-add-more-photo-card">
                    <GrayPlusIcon />
                </div>
            </li>
        </Container>
    );
};

export default RegisterPhotoCardList;
