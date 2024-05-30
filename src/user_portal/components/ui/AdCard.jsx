import React from 'react'
import {strTruncator} from "strtoolkit"

const AdCard = ({data}) => {
    return (
        <>
            <div
                className="relative flex flex-col lg:flex-row lg:space-x-5 space-y-3 lg:space-y-0 rounded-xl shadow-lg p-3 w-full mx-auto border border-white bg-white">
                <div className="w-full lg:w-1/6 bg-white grid place-items-center">
                    <img src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="tailwind logo" className="rounded-xl w-full lg:w-[178px] h-[165px]" />
                </div>
                <div className="w-full bg-white flex flex-col space-y-2 p-3">
                    <h3 className="font-bold text-gray-800 lg:text-2xl text-md">{data.model_name||"BMW E46"}</h3>
                    <p className="lg:text-lg text-gray-500 text-base"> {strTruncator(data.description,200)} </p>
                    <p className="text-xl font-black text-gray-800">
                        <span className="text-[#FFA90A] text-base font-semibold"> { data.location || "Location"}</span>
                    </p>
                    <div className='w-full flex flex-col lg:gap-0 gap-3 lg:flex-row justify-between items-center'>
                        <div className='w-full flex flex-row gap-[10px] justify-center lg:justify-start items-center lg:gap-[30px]'>
                            <p> {data.model_year} </p>
                            |
                            <p> {data.mileage_km + ' km'} </p>
                            |
                            <p> {data.engine_capacity + ' cc'} </p>
                        </div>
                        <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-1'>
                            <button className='bg-[#FFA90A] lg:w-[32%] w-full text-white font-bold rounded-[30px] px-4 py-2'>
                                See Bids
                            </button>
                            <button className='bg-black lg:w-[32%] w-full text-white font-bold rounded-[30px] px-4 py-2'>
                                View Listing
                            </button>
                            <button className='bg-[#C30000] w-full lg:w-[32%] text-white font-bold rounded-[30px] px-4 py-2'>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdCard