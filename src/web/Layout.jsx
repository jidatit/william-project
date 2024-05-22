import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

const Layout = () => {
    return (
        <>
            <div className='w-full flex flex-col justify-start items-center'>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default Layout