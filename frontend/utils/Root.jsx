import { useEffect } from "react";
import {useAuth} from "../context/authContext.jsx"
import { useNavigate } from "react-router";


const Root = ()=>{
    const {user} = useAuth();
    const navigate = useNavigate;
    useEffect(()=>{
        if(user){
            // check user is authenticated and redirect accordingly
            if(user.role === 'admin'){
                navigate('/admin/dashboard');
            }else if(user.role === 'storeManager'){
                navigate('/storeManager/dashboard');
            }else if(user.role === 'departmentHead'){
                navigate('/departmentHead/dashboard');
            }else if(user.role === 'universityAuth'){
                navigate('/universityAuth/dashboard');
            }else{
                navigate('/login');
            }
        }else{
            navigate('/login');
        }
    }, [user, navigate]);

    return null;
};

export default Root;