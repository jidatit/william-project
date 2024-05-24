import { TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../../db';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc, doc, setDoc } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hasEmptyValue } from "../utils/helperSnippets"

const Signuppage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        termsCondition: 'off',
        userType: 'user'
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const inv_url_name = searchParams.get('name');
        const inv_url_email = searchParams.get('email');
        const inv_url_phoneNumber = searchParams.get('phoneNumber');

        setUserData({
            ...userData,
            fullname: inv_url_name || '',
            email: inv_url_email || '',
            phoneNumber: inv_url_phoneNumber || '',
        })

    }, []);

    const [passwordError, setPasswordError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });

        if (name === 'confirmPassword' && userData.password !== value) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };

    const handleSignup = async () => {
        try {
            const { confirmPassword, password, ...userDataWithoutPasswords } = userData;
            if (confirmPassword !== password) {
                toast.error("Password Not Matched!")
                return
            }
            if (hasEmptyValue(userDataWithoutPasswords)) {
                toast.error("Fill all Fields!")
                return
            }
            const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            await setDoc(doc(db, "users", user.uid), userDataWithoutPasswords);
            await CheckIfInvitedUser(userData.email)
            toast.success("User registered!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const CheckIfInvitedUser = async (email) => {
        try {
            const invitedUsersRef = collection(db, "invited_users");
            const q = query(invitedUsersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach(async (doc) => {
                    const invitedUserRef = doc.ref;
                    await updateDoc(invitedUserRef, {
                        signup_status: "completed"
                    });
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className='min-h-screen flex flex-col justify-center items-center w-full'>
                <ToastContainer />
                <div className='w-[90%] relative md:w-[70%] bg-[#F1F1F1] pt-[30px] pb-[30px] rounded-[20px] flex flex-col justify-center items-center gap-5'>
                    <button onClick={() => { navigate('/') }} className='absolute text-white rounded-full bg-white/20 shadow-lg isolate backdrop-blur-3xl px-3 py-3 transition-all ease-in-out delay-100 hover:pr-[50px] hover:ring-2 left-[50px] top-[20px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 text-black h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <h2 className='text-center mt-[50px] font-bold lg:text-[30px] md:text-[25px] text-[20px]'>Create Your Account</h2>
                    <div className='w-[90%] md:w-[60%] flex gap-2 flex-col justify-center items-center'>
                        <TextField name='fullname' onChange={handleInputChange} value={userData.fullname} placeholder='Full Name' className='w-full outline-none shadow-2xl' type='text' />
                        <TextField name='email' onChange={handleInputChange} value={userData.email} placeholder='Email' className='w-full outline-none shadow-2xl' type='email' />
                        <TextField name='phoneNumber' onChange={handleInputChange} value={userData.phoneNumber} placeholder='Phone Number' className='w-full outline-none shadow-2xl' type='number' />
                        <TextField name='password' onChange={handleInputChange} placeholder='Password' className='w-full outline-none shadow-2xl' type='password' />
                        <TextField name='confirmPassword' onChange={handleInputChange} placeholder='Confirm Password' className='w-full outline-none shadow-2xl' type='password' />
                        <div className='w-full flex flex-row justify-start items-center'>
                            <input type="checkbox" onChange={handleInputChange} className='w-[20px] h-[20px]' name="termsCondition" id="terms" />
                            <span className='underline font-light ml-2'>Terms & Conditions</span>
                        </div>
                    </div>

                    {passwordError && <p className="text-red-500">{passwordError}</p>}

                    <button onClick={handleSignup} className='w-[90%] md:w-[60%] py-3 rounded-[10px] bg-[#FFA90A] text-lg font-semibold text-white'>
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