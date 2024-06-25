import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import placeholderImage from '../../assets/user_portal/carcar.jpg'

const OngoingBids = () => {

  return (
    <>
      <div className="w-[80%] relative flex flex-col justify-start mb-10 mx-auto bg-white rounded-xl shadow-md border-2 border-gray-200">

        <div className='w-full flex flex-col lg:flex-row justify-start items-start gap-5 p-3' >

          <div className="w-full lg:w-fit h-full bg-white ">
            <img src={placeholderImage} alt="tailwind logo" className="rounded-xl w-full lg:min-w-[260px] h-auto lg:h-[180px] cursor-pointer" />
          </div>

          <div className="w-full bg-white flex flex-col space-y-2 p-3">
            <h3 className="font-bold text-gray-800 lg:text-2xl text-md">BMW E46</h3>
            <p className="lg:text-lg text-gray-500 text-base"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo adipisci accusamus ullam consequatur, sit odio, earum, dolor quam quaerat voluptates expedita. Aliquam rerum ut perferendis tenetur, totam aperiam. Aliquid, reprehenderit.</p>
            <p className="text-xl font-black text-gray-800">
              <span className="text-[#FFA90A] text-base font-semibold"> Islamabad</span>
            </p>

            <div className='w-full flex flex-col xl:flex-row gap-3 lg:gap-4 xl:gap-0 xl:justify-between xl:items-center'>
              <div className='w-full xl:w-[40%] flex flex-row gap-[10px] lg:gap-[20px] justify-center lg:justify-start items-center'>
                <p> 2022 </p>
                |
                <p> 180,000 Km </p>
                |
                <p> 1500 cc </p>
              </div>

              <div className='w-full xl:w-[60%] flex flex-col md:flex-row lg:flex-row justify-center items-center gap-1'>

                <div className='basis-1/4 flex flex-col justify-center items-center gap-0'>
                  <div className='font-medium text-xl' > Highest Bid </div>
                  <div className=' text-base' > $43000 </div>
                </div>
                <div className='basis-1/4 flex flex-col justify-center items-center gap-0'>
                  <div className='font-medium text-xl' > Your Bid</div>
                  <div className=' text-base' > $23000 </div>
                </div>
                <button
                  className='basis-1/4 bg-[#FFA90A] lg:w-[32%] w-full text-white font-bold rounded-[30px] px-6 py-2'>
                  Bid More
                </button>
                <button
                  className='basis-1/4 bg-black w-full lg:w-[32%] text-white font-bold rounded-[30px] px-4 py-2'>
                  View Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OngoingBids;