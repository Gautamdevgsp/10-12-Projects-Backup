import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'

function AdminMaster() {
  const navigate = useNavigate();

  useEffect(() => {
    const userString = sessionStorage.getItem("user");
    if (!userString) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userString);
    if (user.userType !== 1) {
      navigate("/");
    }
  }, [navigate]);

  return (
  <>
  <AdminHeader/>
   <Outlet/>
  <AdminFooter/>
  </>
  )
}

export default AdminMaster