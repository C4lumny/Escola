import { Navigate ,Outlet } from "react-router-dom"
import { useUserContext } from "../contexts/UserProvider"

export const ProtectedRoute = ({children, redirectTo="/Login"}) => {
    const { user } = useUserContext();
    
    if(!user){
        return <Navigate to={redirectTo}/>
    }

    return children ? children : <Outlet /> 

}