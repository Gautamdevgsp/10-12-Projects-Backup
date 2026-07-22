import React from 'react'
import UserHeader from './UserHeader'
import { Outlet } from 'react-router-dom'
import UserFooter from './UserFooter'
import ChatBot from './ChatBot'

function UserMaster() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     <UserHeader/>
     <Outlet/>
     <div style={{ marginTop: 'auto' }}>
       <UserFooter/>
     </div>
     <ChatBot/>
    </div>    
  )
}

export default UserMaster
