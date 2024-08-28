import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import WebLayout from "./web/Layout";
import Homepage from "./web/pages/Homepage";
import AuthLayout from "./auth/Layout";
import Signuppage from "./auth/Signuppage";
import Loginpage from "./auth/Loginpage";
import AdminLayout from "./admin_portal/Layout";
import UserLayout from "./user_portal/Layout";
import AdminDashboard from "./admin_portal/pages/Dashboard";
import AdminLogin from "./auth/AdminLogin";
import { useAuth } from "../AuthContext";
import Users from "./admin_portal/pages/Users";
import CarDetails from "./web/pages/CarDetails";
import CarListing from "./web/pages/CarListing";
import BidsWon from "./user_portal/pages/BidsWon";
import MyAds from "./user_portal/pages/MyAds";
import OngoingBids from "./user_portal/pages/OngoingBids";
import EditProfile from "./user_portal/pages/EditProfile";
import ChangePassword from "./user_portal/pages/ChangePassword";
import ForgotPassword from "./auth/ForgotPassword";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Loginpage />} />
            <Route path="signup" element={<Signuppage />} />
            <Route path="admin" element={<AdminLogin />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
          </Route>

          <Route path="/" element={<WebLayout />}>
            <Route index element={<Homepage />} />
            <Route path="car-listing" element={<CarListing />} />
            <Route path="car-details/:id" element={<CarDetails />} />
          </Route>

          <Route path="/admin_portal" element={<AdminLayout />}>
            <Route index element={<Users />} />
            <Route path="logout" element={<Logout />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          <Route path="/user_portal" element={<UserLayout />}>
            <Route index element={<MyAds />} />
            <Route path="ongoing-bids" element={<OngoingBids />} />
            <Route path="bids-won" element={<BidsWon />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

function Logout() {
  const { logout, userType } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#1F2634] bg-opacity-75">
        <div className="w-[600px] h-[280px] rounded-lg mt-[40px] flex flex-col gap-[20px] justify-center items-center bg-white p-6">
          <p className="text-2xl font-bold text-center text-black">
            Are you sure you want to logout?
          </p>
          <div className="flex flex-row justify-center w-full gap-4">
            {userType === "admin" ? (
              <button
                onClick={() => {
                  navigate("/admin_portal");
                }}
                className="bg-[#FFD700] hover:bg-[#FFC300] rounded-md w-[180px] h-[50px] font-bold text-white transition-all duration-300"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/user_portal");
                }}
                className="bg-[#FFD700] hover:bg-[#FFC300] rounded-md w-[180px] h-[50px] font-bold text-white transition-all duration-300"
              >
                Cancel
              </button>
            )}
            <button
              onClick={logout}
              className="bg-[#059C4B] hover:bg-[#048C43] rounded-md w-[180px] h-[50px] font-bold text-white transition-all duration-300"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
