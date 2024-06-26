import React, { useEffect, useState } from 'react'
import usericon from "../../assets/user_portal/placeholder.jpg"
import { Link, useLocation } from 'react-router-dom';
import { db, storage } from '../../../db';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const TopBar = () => {

    const location = useLocation();
    const auth = getAuth();
    const user = auth.currentUser;
    const [userName, setUserName] = useState('');

    const pages = [
        { name: 'My Ads', path: '/user_portal' },
        { name: 'Ongoing Bids', path: '/user_portal/ongoing-bids' },
        { name: 'Bids Won', path: '/user_portal/bids-won' },
        { name: 'Edit Profile', path: '/user_portal/edit-profile' },
        { name: 'Change Password', path: '/user_portal/change-password' },
    ];

    const getButtonClasses = (path) => {
        const baseClasses = 'border-[#EEEEEE] w-full p-2 border-[2px]';
        const activeClasses = 'bg-[#EEEEEE] text-black';
        const inactiveClasses = 'bg-white text-black';

        return `${baseClasses} ${location.pathname === path ? activeClasses : inactiveClasses}`;
    };

    const fetchUserData = async () => {
        try {
            const authuserDoc = doc(db, 'users', user.uid);
            const userDoc = await getDoc(authuserDoc);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserName(userData.fullname);
            } else {
                console.log("No Such Document Exists");
            }
        } catch (error) {
            console.error("Error Fetching User Data : ", error);
        }
    }

    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    })

    return (
        <div className='w-[80%] mt-[50px] mb-[50px] shadow-xl rounded-md flex flex-col justify-center items-center bg-white'>
            <div className='w-[80%] p-5 flex flex-row justify-start gap-6 items-center'>
                <img className='rounded-full w-[100px] h-[100px] border-2 border-gray-300' src={usericon} alt="User Icon" />
                <div className='flex flex-col justify-center items-start gap-1'>
                    <p className='font-bold text-[22px]'> { userName !== '' ? userName : '' } </p>
                    <p className='font-light text-sm'>Member Since May 6th, 2024</p>
                </div>
            </div>
            <div className='w-full shadow-xs border-1 border-gray-200 bg-white grid lg:grid-cols-5'>
                {pages.map((page, index) => (
                    <Link key={index} to={page.path}>
                        <div className={`${getButtonClasses(page.path)} ${index === 0 ? 'rounded-l-md' : ''} ${index === pages.length - 1 ? 'rounded-r-md' : ''} border-r-1 border-gray-200`}>
                            <p className='text-center font-semibold'>{page.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TopBar