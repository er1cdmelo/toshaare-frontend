import { Navigate, Outlet } from "react-router-dom"
import useUser from "../hooks/useUser"


export const PrivateRoutes = () => {
    const { user, loading } = useUser()
    if(!loading) {
        return user ? <Outlet /> : <Navigate to="/signin" />
    }
}