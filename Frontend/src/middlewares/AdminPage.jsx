import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function({children}){
    const { isAdminIn } = useAuth();

    if(!isAdminIn) return <Navigate to="/loginAdmin"/>

    return children;
}