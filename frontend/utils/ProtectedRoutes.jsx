import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/authContext.jsx";


const ProtectedRoutes = ({children, requireRole}) => {
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        if (!requireRole.includes(user.role)) {
            navigate("/unauthorized");
            return;
        }
    }, [user, navigate, requireRole]);

    if(!user) navigate("/login");
    if(!requireRole.includes(user.role)) navigate("/login");;

    return children;
};

export default ProtectedRoutes;