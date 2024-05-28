import React from 'react'
import './../styles/web.css'

const BidDetails = () => {
    return (
        <>
            <div className='w-full h-10 flex flex-col mb-[40px] lg:flex-row justify-between gap-2 bid-details'>

                <div class='grid grid-cols-10 justify-center gap-2 items-center bg-black text-white w-full lg:w-4/5'>
                    <div class='flex flex-row justify-center col-span-10 lg:col-span-3 mt-5 md:mt-0 gap-3'>
                        <h1 class='font-light'>Time Left</h1>
                        <h1 class='font-bold'>4 Days</h1>
                    </div>
                    <div class='flex flex-row justify-center col-span-10 lg:col-span-3 gap-3'>
                        <h1 class='font-light'>High Bid</h1>
                        <h1 class='font-bold'>$42000</h1>
                    </div>
                    <div class='flex flex-row justify-center col-span-10 lg:col-span-2 gap-2'>
                        <h1 class='font-light'>Bid</h1>
                        <h1 class='font-bold'>7</h1>
                    </div>
                    <div class='flex flex-row justify-center col-span-10 lg:col-span-2 mb-5 md:mb-0 gap-2'>
                        <h1 class='font-light'>Comments</h1>
                        <h1 class='font-bold'>6</h1>
                    </div>
                </div>


                <div className='mr-3 w-full lg:w-1/5' >
                    <button type="button" className="focus:outline-none w-full text-white bg-[#FFA90A] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                        Place Bid
                    </button>
                </div>

            </div>
        </>
    )
}

export default BidDetails
