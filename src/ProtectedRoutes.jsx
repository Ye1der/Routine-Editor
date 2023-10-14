import { Navigate, Outlet } from "react-router";

export function PrivateRoute({path = "/login", inAutenticated}){

  if(!inAutenticated){
    return <Navigate to={path} replace/>
  }

  return <Outlet/>;
  
}