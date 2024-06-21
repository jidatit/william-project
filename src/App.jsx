import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import WebLayout from "./web/Layout"
import Homepage from "./web/pages/Homepage"
import AuthLayout from "./auth/Layout"
import Signuppage from './auth/Signuppage'
import Loginpage from './auth/Loginpage'
import AdminLayout from "./admin_portal/Layout"
import UserLayout from "./user_portal/Layout"
import AdminDashboard from "./admin_portal/pages/Dashboard"
import AdminLogin from './auth/AdminLogin'
import { useAuth } from '../AuthContext'
import Users from './admin_portal/pages/Users'
import CarDetails from './web/pages/CarDetails'
import CarListing from './web/pages/CarListing'

import MyAds from './user_portal/pages/MyAds'
import OngoingBids from './user_portal/pages/OngoingBids'
import EditProfile from './user_portal/pages/EditProfile'
import ChangePassword from './user_portal/pages/ChangePassword'

function App() {

  return (
    <>
      <Router>
        <Routes>

          <Route path='/auth' element={<AuthLayout />}>
            <Route index element={<Loginpage />} />
            <Route path='signup' element={<Signuppage />} />
            <Route path='admin' element={<AdminLogin />} />
          </Route>

          <Route path='/' element={<WebLayout />}>
            <Route index element={<Homepage />} />
            <Route path="car-listing" element={<CarListing />} />
            <Route path="car-details/:id" element={<CarDetails />} />
          </Route>

          <Route path='/admin_portal' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='users' element={<Users />} />
            <Route path='logout' element={<Logout />} />
          </Route>

          <Route path='/user_portal' element={<UserLayout />}>
            <Route index element={<MyAds />} />
            <Route path='edit-profile' element={<EditProfile />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='ongoing-bids' element={<OngoingBids />} />
            <Route path='logout' element={<Logout />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

function Logout() {
  const { logout, userType } = useAuth()
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#1F2634] bg-opacity-75">
        <div className='w-[654px] h-[310px] rounded-lg mt-[40px] flex flex-col gap-[23px] justify-center items-center bg-white'>
          <p className='font-bold text-black text-3xl text-center'>Are you sure you want to logout?</p>
          <div className='w-[540px] h-[70px] flex flex-row gap-6 justify-center'>
            {userType === "admin" ? (<button onClick={() => { navigate('/admin_portal') }} className='bg-[#BB000E] rounded-md w-[229px] h-[56px] font-bold text-white'>Cancel</button>)
              : (<button onClick={() => { navigate('/user_portal') }} className='bg-[#BB000E] rounded-md w-[229px] h-[56px] font-bold text-white'>Cancel</button>)}
            <button onClick={logout} className='bg-[#059C4B] rounded-md w-[229px] h-[56px] font-bold text-white'>Confirm</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;