import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";
import { Outlet } from "react-router-dom";

function UserMaster() {
  return (
    <>
      <UserHeader />
      <Outlet />
      <UserFooter />
    </>
  );
}

export default UserMaster;