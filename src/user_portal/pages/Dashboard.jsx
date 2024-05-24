import React from 'react'
import { useAuth } from '../../../AuthContext'

const Dashboard = () => {
  const { logout } = useAuth()
  return (
    <div>
      <p>User Dashboard</p>
      <button onClick={logout} className="text-white flex flex-col justify-center items-center bg-[#902424] outline-none font-medium rounded-lg text-sm px-4 py-2">Logout</button>
    </div>
  )
}

export default Dashboard