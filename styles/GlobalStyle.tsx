import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";
import palette from "./palette";

const globalStyle = css`
    margin: 0;
    padding: 0;
    ${reset};
    * {
        box-sizing: border-box;
    }
    body {
        overflow-x: hidden;
        font-family: Noto Sans, Noto Sans KR;
        color: ${palette.black};
    }
    a {
        text-decoration: none;
        color: ${palette.black};
    }
`;

const GlobalStyle = createGlobalStyle`
	${globalStyle};
`;

export default GlobalStyle;
