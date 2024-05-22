import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full flex flex-col justify-center items-center min-h-[200px] bg-[#000000] opacity-85 text-white py-4">
            <p className="text-sm">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </footer>
    );
};

export default Footer;