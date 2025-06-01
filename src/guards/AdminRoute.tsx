import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../context/app.context";
import Error from "../pages/Error";

export default function AdminRoute() {
  const { isAdmin, isAuthenticated } = useContext(AppContext);
  return isAdmin && isAuthenticated ? (
    <Outlet />
  ) : (
    <Error message="You can't reach the page because you are not admin" />
  );
}
