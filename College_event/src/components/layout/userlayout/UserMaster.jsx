import React from 'react'
import { Outlet } from "react-router-dom";
import Userheader from './Userheader';
import UserFooter from './UserFooter';

function UserMaster() {
  return (
    <>
    <Userheader/>
    <Outlet/>
    <UserFooter/>
   </>
  )
}

export default UserMaster
