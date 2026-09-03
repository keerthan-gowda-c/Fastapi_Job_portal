import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({allowedRole}){
    const {user, isAuthenticated} = useAuth();

    if(!isAuthenticated){
        return <Navigate to="/choose-login-role" replace />
    }
    if(allowedRole && user?.role !== allowedRole){
        return <Navigate to="/" replace/>
    }
    return <Outlet/>
}