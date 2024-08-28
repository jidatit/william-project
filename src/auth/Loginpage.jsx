import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../db";

const Loginpage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleForgotPassword = () => {
    navigate("/auth/forgotPassword");
  };
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        <div className="w-[90%] relative md:w-[70%] bg-[#F1F1F1] pt-[30px] pb-[30px] rounded-[20px] flex flex-col justify-center items-center gap-5">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="absolute text-white rounded-full bg-white/20 shadow-lg isolate backdrop-blur-3xl px-3 py-3 transition-all ease-in-out delay-100 hover:pr-[50px] hover:ring-2 left-[50px] top-[20px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <h2 className="text-center mt-[50px] font-bold lg:text-[30px] md:text-[25px] text-[20px]">
            Login To Your Account
          </h2>
          <div className="w-[90%] md:w-[60%] flex gap-2 flex-col justify-center items-center">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full shadow-2xl outline-none"
              type="email"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full shadow-2xl outline-none"
              type="password"
            />
          </div>
          <div className="flex flex-col w-[90%] md:w-[60%] gap-y-1">
            <button
              className="w-full text-black cursor-pointer text-end"
              onClick={handleForgotPassword} // Handle forgot password navigation
            >
              Forgot Password?
            </button>
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-[10px] bg-[#ffe001] text-lg font-semibold text-white"
            >
              Login
            </button>
          </div>

          <Link to="/auth/signup">
            <p className="font-light text-center underline text-md">
              Want to Signup? Click Here
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
