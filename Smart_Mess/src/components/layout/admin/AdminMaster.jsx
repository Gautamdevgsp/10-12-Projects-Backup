import React from 'react'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'
import AdminFooter from './AdminFooter'

function AdminMaster() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <AdminHeader/>
    <div style={{ flex: 1 }}>
      <Outlet/>
    </div>
    <AdminFooter/>
    </div>
  )
}

export default AdminMaster
