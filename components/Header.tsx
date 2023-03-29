import React from "react";
import styled from "styled-components";
import AmongLogoIcon from "../public/static/svg/logo/logo.svg";
import Link from "next/link";
import { useSelector } from "../store";
import HeaderAuths from "./HeaderAuths";
import HeaderUserProfile from "./HeaderUserProfile";

const Container = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 80px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
    z-index: 10;
    .header-logo-wrapper {
        display: flex;
        align-items: center;
        .header-logo {
            margin-right: 6px;
        }
    }
    .header-logo-wrapper + div {
        position: relative;
    }
`;

const Header: React.FC = () => {
    const isLogged = useSelector((state) => state.user.isLogged);
    return (
        <Container>
            <Link href="/" className="header-logo-wrapper">
                <AmongLogoIcon className="header-logo" />
                Among
            </Link>
            {!isLogged && <HeaderAuths />}
            {isLogged && <HeaderUserProfile />}
        </Container>
    );
};

export default Header;
