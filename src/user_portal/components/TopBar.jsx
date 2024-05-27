import React from 'react'
import usericon from "../../assets/web/s3.png"
import { Link, useLocation } from 'react-router-dom';

const TopBar = () => {
    const location = useLocation();

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

    return (
        <div className='w-[80%] mt-[50px] mb-[50px] shadow-xl rounded-md flex flex-col justify-center items-center bg-white'>
            <div className='w-[80%] p-5 flex flex-row justify-start gap-2 items-center'>
                <img className='rounded-full w-[100px] h-[100px]' src={usericon} alt="User Icon" />
                <div className='flex flex-col justify-center items-start gap-1'>
                    <p className='font-bold text-[22px]'>Alex Allan</p>
                    <p className='font-light text-sm'>Member Since May 6th, 2024</p>
                </div>
            </div>
            <div className='w-full shadow-xl rounded-md bg-white grid grid-cols-5'>
                {pages.map((page, index) => (
                    <Link key={index} to={page.path}>
                        <div className={`${getButtonClasses(page.path)} ${index === 0 ? 'rounded-l-md' : ''} ${index === pages.length - 1 ? 'rounded-r-md' : ''}`}>
                            <p className='text-center font-semibold'>{page.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TopBar