import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import Header from '../web/components/Header';
import Footer from '../web/components/Footer';
import TopBar from './components/TopBar';

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 opacity-75 z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    );
};

const Layout = () => {
    const { currentUser, loading, userType } = useAuth();
    if (loading) {
        return <Loader />;
    }
    return (
        currentUser && userType !== "admin" ? (<>
            <div className='w-full bg-[#F4F4F4] flex flex-col justify-start items-center'>
                <Header />
                <TopBar />
                <Outlet />
                <Footer />
            </div>
        </>) : (
            <>
                <Navigate to="/" />
            </>
        )
    )
}

export default Layout