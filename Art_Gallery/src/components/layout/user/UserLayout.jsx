import React from 'react'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
     <>
     <UserHeader/>
      <Outlet/>
     <UserFooter/>
     </>
  )
}

export default UserLayout