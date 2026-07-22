import { useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { Outlet, useNavigate } from "react-router-dom";

function AdminMaster() {
  const nav = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      nav("/login");
    } else if (user.userType !== 1) {
      nav("/");
    }
  }, [nav]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <AdminFooter />
    </div>
  );
}

export default AdminMaster;
