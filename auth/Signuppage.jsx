import { TextField } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signuppage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='min-h-screen flex flex-col justify-center items-center w-full'>

                <div className='w-[90%] relative md:w-[70%] bg-[#F1F1F1] pt-[30px] pb-[30px] rounded-[20px] flex flex-col justify-center items-center gap-5'>
                    <button onClick={() => { navigate('/') }} className='absolute text-white rounded-full bg-white/20 shadow-lg backdrop-blur-3xl px-3 py-3 hover:ring-2 top-2 left-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 text-black h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <h2 className='text-center mt-[50px] font-bold lg:text-[30px] md:text-[25px] text-[20px]'>Create Your Account</h2>
                    <div className='w-[90%] md:w-[60%] flex gap-2 flex-col justify-center items-center'>
                        <TextField placeholder='Full Name' className='w-full outline-none shadow-2xl' type='text' />
                        <TextField placeholder='Email' className='w-full outline-none shadow-2xl' type='email' />
                        <TextField placeholder='Phone Number' className='w-full outline-none shadow-2xl' type='number' />
                        <TextField placeholder='Password' className='w-full outline-none shadow-2xl' type='password' />
                        <TextField placeholder='Confirm Password' className='w-full outline-none shadow-2xl' type='password' />
                        <div className='w-full flex flex-row justify-start items-center'>
                            <input type="checkbox" className='w-[20px] h-[20px]' name="terms" id="terms" />
                            <span className='underline font-light ml-2'>Terms & Conditions</span>
                        </div>
                    </div>

                    <button className='w-[90%] md:w-[60%] py-3 rounded-[10px] bg-[#FFA90A] text-lg font-semibold text-white'>
                        Sign Up
                    </button>

                    <Link to="/auth">
                        <p className='text-center text-md font-light underline'>Want to Login? Click Here</p>
                    </Link>

                </div>

            </div>
        </>
    )
}

export default Signuppage