import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import BackArrowIcon from "../../public/static/svg/register/register_room_footer_back_arrow.svg";
import Button from "../common/Button";
import palette from "../../styles/palette";
import useValidateMode from "../../hooks/useValidateMode";
import { uploadFileAPI } from "../../lib/api/file";
import { useSelector } from "../../store";
import { useRouter } from "next/router";
import { albumActions } from "../../store/album";
import { useDispatch } from "react-redux";
import { uploadJsonAPI } from "../../lib/api/json";
import { registerPageActions } from "../../store/registerPage";

const Container = styled.footer`
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 82px;
    padding: 14px 0px 20px;
    background-color: white;
    z-index: 10;
    border-top: 1px solid ${palette.gray_dd};
    .register-room-footer-back {
        display: flex;
        align-items: center;
        color: ${palette.gray_48};
        cursor: pointer;
        svg {
            margin-right: 8px;
        }
    }
`;

interface IProps {
    prevHref?: string;
    nextHref?: string;
    isValid?: boolean;
    fileList: FileList | null;
}

const RegisterRoomFooter: React.FC<IProps> = ({
    prevHref,
    nextHref,
    isValid = true,
    fileList
}) => {
    const { setValidateMode } = useValidateMode();

    useEffect(() => {
        return () => {
            setValidateMode(false);
        };
    }, []);

    const router = useRouter();
    const dispatch = useDispatch();
    const pages = useSelector((state) => state.album.pages);
    const registerPage = useSelector((state) => state.registerPage.page);

    const onClickRegister = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!isValid) {
            event.preventDefault();
            setValidateMode(true);
            return;
        }

        if (fileList == null) {
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < fileList.length; i++) {
            formData.append("file", fileList[i]);
        }

        try {
            const files = await uploadFileAPI(formData);

            const newPages = [
                ...pages,
                {
                    ...registerPage,
                    photos: files.data
                }
            ];
            dispatch(albumActions.setPages(newPages));
            dispatch(registerPageActions.initRegisterPage());

            await uploadJsonAPI({
                fileName: "album.json",
                data: newPages
            });

            router.push("/album");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container>
            <Link href={prevHref || ""} className="register-room-footer-back">
                <BackArrowIcon fill={palette.gray_48} />
                뒤로
            </Link>
            <Link href={nextHref || ""}>
                <Button onClick={onClickRegister}>등록</Button>
            </Link>
        </Container>
    );
};

export default RegisterRoomFooter;
