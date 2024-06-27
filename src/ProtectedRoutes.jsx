import { Navigate, Outlet } from "react-router";

export function PrivateRoute({ path = "/login", inAutenticated }) {
  if (localStorage.getItem("guest") == "true") {
    return <Outlet />;
  }

  if (!inAutenticated) {
    return <Navigate to={path} replace />;
  }

  return <Outlet />;
}
