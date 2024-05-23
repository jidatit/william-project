import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WebLayout from "./web/Layout"
import Homepage from "./web/pages/Homepage"
import AuthLayout from "../auth/Layout"
import Signuppage from '../auth/Signuppage'
import Loginpage from '../auth/Loginpage'
import AdminLayout from "./admin_portal/Layout"
import UserLayout from "./user_portal/Layout"
import AdminDashboard from "./admin_portal/pages/Dashboard"
import UserDashboard from "./user_portal/pages/Dashboard"

function App() {

  return (
    <>
      <Router>
        <Routes>

          <Route path='/auth' element={<AuthLayout />}>
            <Route index element={<Loginpage />} />
            <Route path='signup' element={<Signuppage />} />
          </Route>

          <Route path='/' element={<WebLayout />}>
            <Route index element={<Homepage />} />
          </Route>

          <Route path='/admin_portal' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>

          <Route path='/user_portal' element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
