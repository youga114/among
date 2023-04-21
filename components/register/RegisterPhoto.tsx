import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import { useSelector } from "../../store";
import UploadIcon from "../../public/static/svg/register/upload.svg";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import RegisterPhotoCardList from "./RegisterPhotoCardList";
import RegisterPhotoFooter from "./RegisterPhotoFooter";
import { registerPageActions } from "../../store/registerPage";
import Input from "../common/Input";

const Container = styled.div`
    padding: 22px 30px 100px;
    h2 {
        font-size: 19px;
        font-weight: 800;
        margin-bottom: 56px;
    }
    h3 {
        font-weight: bold;
        color: ${palette.gray_76};
        margin-bottom: 6px;
    }
    .register-room-step-info {
        font-size: 18px;
        max-width: 400px;
        margin-bottom: 24px;
        font-weight: bolder;
    }
    .register-input {
        margin: 10px 0 20px;
    }
    .register-room-upload-photo-wrapper {
        width: 90%;
        max-width: 600px;
        height: 433px;
        margin: auto;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px dashed ${palette.gray_bb};
        border-radius: 6px;
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
`;

const RegisterPhoto: React.FC = () => {
    const dispatch = useDispatch();
    const registerPage = useSelector((state) => state.registerPage.page);

    const [content, setContent] = useState("");
    const [location, setLocation] = useState("");

    const onChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    const onChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };

    const onChangePhotos = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { files } = event.target;
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

    return (
        <Container>
            <p className="register-room-step-info">스토리 작성</p>
            <div className="register-input">
                <Input
                    label="제목"
                    value={content}
                    onChange={onChangeContent}
                    isValid={content !== ""}
                    errorMessage="제목을 입력하세요."
                />
            </div>
            <div className="register-input">
                <Input
                    label="위치"
                    value={location}
                    onChange={onChangeLocation}
                    isValid={location !== ""}
                    errorMessage="위치를 입력하세요."
                />
            </div>
            {registerPage.photos.length <= 0 && (
                <div className="register-room-upload-photo-wrapper">
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onChangePhotos}
                            multiple
                        />
                        <Button icon={<UploadIcon />} width="167px">
                            사진 업로드
                        </Button>
                    </>
                </div>
            )}
            {registerPage.photos.length > 0 && <RegisterPhotoCardList />}
            <RegisterPhotoFooter
                prevHref="/"
                nextHref="/album"
                isValid={
                    !!content && !!location && registerPage.photos.length > 0
                }
            />
        </Container>
    );
};

export default RegisterPhoto;
