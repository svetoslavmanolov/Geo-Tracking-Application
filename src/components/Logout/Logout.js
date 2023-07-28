import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export default function Logout () {
    const navigate = useNavigate();
    const { userLogout } = useContext(AuthContext);

    useEffect(() => {
        userLogout();
        navigate('/', { replace: true });
    });
}
