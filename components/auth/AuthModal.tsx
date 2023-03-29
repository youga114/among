import React from "react";
import { useSelector, RootState } from "../../store";
import LoginModal from "./LoginModal";

interface IProps {
    closeModal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
    const authMode = useSelector((state: RootState) => state.auth.authMode);
    return (
        <div>
            {authMode === "login" && <LoginModal closeModal={closeModal} />}
        </div>
    );
};

export default AuthModal;
