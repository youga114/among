import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import { isEmpty } from "lodash";
import { useSelector } from "../../store";
import UploadIcon from "../../public/static/svg/register/upload.svg";
import Button from "../common/Button";
import { uploadFileAPI } from "../../lib/api/file";
import { useDispatch } from "react-redux";
import RegisterPhotoCardList from "./RegisterPhotoCardList";
import RegisterPhotoFooter from "./RegisterPhotoFooter";
import { uploadJsonAPI } from "../../lib/api/json";
import { resolve } from "path";

const Container = styled.div`
    padding: 62px 30px 100px;
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
        font-size: 14px;
        max-width: 400px;
        margin-bottom: 24px;
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
            width: 100%;
            max-height: 100%;
        }
    }
`;

const RegisterPhoto: React.FC = () => {
    const [photos, setPhotos] = useState<File[]>([]);

    const onChangePhotos = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { files } = event.target;
        files && setPhotos(Array.from(files));
    };

    const addPhoto = () => {
        const el = document.createElement("input");
        el.type = "file";
        el.accept = "image/*";
        el.multiple = true;
        el.onchange = (event) => {
            const { files } = event.target as HTMLInputElement;
            files && setPhotos([...photos, ...Array.from(files)]);
        };
        el.click();
    };

    const uploadPage = async () => {
        // let uploadFileAPIs = [];
        // let uploadFileNames: any[] = ["testData", "testData2"];
        // for (let i = 0; i < files.length; ++i) {
        //     const file = files[0];
        //     const formdata = new FormData();
        //     formdata.append("file", file);
        //     uploadFileAPIs.push(async () => {
        //         try {
        //             const fileName = await uploadFileAPI(formdata);
        //             uploadFileNames.push(fileName);
        //         } catch (e) {
        //             console.log(e);
        //         }
        //     })
        // }
        // await Promise.all(uploadFileAPIs);
        // dispatch(registerRoomActions.setPhotos([...photos, ...uploadFileNames]));
        // await uploadJsonAPI({
        //     fileName: "photos.json",
        //     data: [
        //         {
        //             date: "",
        //             content: "",
        //             location: "",
        //             photos: [...photos, ...uploadFileNames]
        //         }
        //     ]
        // });
    };

    return (
        <Container>
            <p className="register-room-step-info"></p>
            {photos.length <= 0 && (
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
            {photos.length > 0 && (
                <RegisterPhotoCardList photos={photos} addPhoto={addPhoto} />
            )}
            <RegisterPhotoFooter prevHref="/" nextHref="/album" />
        </Container>
    );
};

export default RegisterPhoto;
