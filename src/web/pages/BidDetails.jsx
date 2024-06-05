import React from 'react'

const BidDetails = ({ carData }) => {

    const calculateDaysLeft = (postDate) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const currentDate = new Date();
        const post = new Date(postDate);
        const diffDays = Math.round(Math.abs((currentDate - post) / oneDay));
        const daysLeft = 7 - diffDays;
        return daysLeft;
    };


    return (
        <>
            <div className='w-full flex flex-col xl:flex-row justify-between gap-2 mb-0 xl:mb-3'>

                <div className='grid lg:grid-flow-col lg:auto-cols-auto px-5 py-2 lg:py-0 gap-4 items-center bg-black text-white w-full xl:w-4/5'>
                    <div className='flex flex-row justify-center mt-5 md:mt-0 gap-3'>
                        <h1 className='font-light'>Time Left</h1>
                        <h1 className='font-bold'>{calculateDaysLeft(carData.date)}</h1>
                    </div>
                    <div className='flex flex-row justify-center gap-3'>
                        <h1 className='font-light'>High Bid</h1>
                        <h1 className='font-bold'>$42000</h1>
                    </div>
                    <div className='flex flex-row justify-center gap-2'>
                        <h1 className='font-light'>Bid</h1>
                        <h1 className='font-bold'>7</h1>
                    </div>
                    <div className='flex flex-row justify-center mb-5 md:mb-0 gap-2'>
                        <h1 className='font-light'>Comments</h1>
                        <h1 className='font-bold'>6</h1>
                    </div>
                </div>


                <div className='mr-0 xl:mr-2 w-full xl:w-1/5' >
                    <button type="button" className="focus:outline-none w-full h-full text-white bg-[#FFA90A] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                        Place Bid
                    </button>
                </div>

            </div>
        </>
    )
}

export default BidDetails
