import { useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { Outlet, useNavigate } from "react-router-dom";
import AuthServices from "../../../helpers/AuthServices";

function AdminLayout() {
  const nav = useNavigate();

  useEffect(() => {
    const isLogin = AuthServices.getIsLogin();
    const userType = AuthServices.getUserType();
    if (!isLogin) {
      nav("/login");
    } else if (userType != 1) {
      nav("/");
    }
  }, [nav]);

  return (
    <>
      <AdminHeader />
      <Outlet />
      <AdminFooter />
    </>
  );
}
export default AdminLayout;
