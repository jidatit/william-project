import React, { useState } from 'react'
import logo from "../../assets/Logo.png"
import { Link } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';

const Header = () => {
    const { logout, currentUser, userType } = useAuth()
    const [openHam, setOpenHam] = useState(false);
    const toggleHam = () => {
        setOpenHam(!openHam)
    }
    return (
        <>
            <nav className="w-full sticky top-0 z-40 bg-[#000000] opacity-85">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <p className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} alt="Logo" />
                    </p>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

                        {!currentUser ? (
                            <Link className='w-full' to="/auth/signup">
                                <button className="text-white flex flex-col justify-center items-center bg-[#FFA90A] outline-none font-medium rounded-lg text-sm px-4 py-2">Signup</button>
                            </Link>
                        ) : (
                            userType === "user" ? (
                                <Link className='w-full' to="/user_portal">
                                    <button className="text-white flex flex-col justify-center items-center bg-[#4a9024] outline-none font-medium rounded-lg text-sm px-4 py-2">User Portal</button>
                                </Link>
                            ) : (
                                <Link className='w-full' to="/admin_portal">
                                    <button className="text-white flex flex-col justify-center items-center bg-[#FFA90A] outline-none font-medium rounded-lg text-sm px-4 py-2">Admin Portal</button>
                                </Link>
                            )
                        )}

                        <button onClick={toggleHam} data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>


                    </div>
                    {(<div className={`items-center justify-between ${openHam ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-cta">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                            <Link to="/">
                                <li>
                                    <p className="block py-2 px-3 md:p-0 text-white  rounded md:bg-transparent">Home</p>
                                </li>
                            </Link>
                            <li>
                                <p className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sell Car</p>
                            </li>
                            <li>
                                <p className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Bid Model</p>
                            </li>
                            <li>
                                <p className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About Us</p>
                            </li>
                            <li>
                                <p className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact Us</p>
                            </li>
                        </ul>
                    </div>)}
                </div>
            </nav>
        </>
    )
}

export default Header