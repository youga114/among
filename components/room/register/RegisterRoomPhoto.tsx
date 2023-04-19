import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { isEmpty } from "lodash";
import { useSelector } from "../../../store";
import UploadIcon from "../../../public/static/svg/register/upload.svg";
import Button from "../../common/Button";
import { uploadFileAPI } from "../../../lib/api/file";
import { useDispatch } from "react-redux";
import { registerRoomActions } from "../../../store/registerRoom";
import RegisterRoomPhotoCardList from "./RegisterRoomPhotoCardList";
import RegisterRoomFooter from "./RegisterRoomFooter";
import { uploadJsonAPI } from "../../../lib/api/json";
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

const RegisterRoomPhoto: React.FC = () => {
    const photos = useSelector((state) => state.registerRoom.photos);

    const dispatch = useDispatch();

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files.length > 0) {
            let uploadFileAPIs = [];
            let uploadFileNames: any[] = ["testData", "testData2"];
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
            await uploadJsonAPI({photos: [...photos, ...uploadFileNames]});
        }
    };

    return (
        <Container>
            <p className="register-room-step-info"></p>
            {isEmpty(photos) && (
                <div className="register-room-upload-photo-wrapper">
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={uploadImage}
                        />
                        <Button icon={<UploadIcon />} width="167px">
                            사진 업로드
                        </Button>
                    </>
                </div>
            )}
            {!isEmpty(photos) && <RegisterRoomPhotoCardList photos={photos} />}
            <RegisterRoomFooter
                prevHref="/"
                nextHref="/album"
            />
        </Container>
    );
};

export default RegisterRoomPhoto;
