import React, { useState, useEffect } from 'react';
import Auctioncard from '../components/ui/Auctioncard';

import ListingBannar from './../../assets/web/listingbannar.png'
import BannarTag from './../../assets/web/bannartag.png'

import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../db'

const CarListing = () => {

    const [carsData, setCarsData] = useState([]);

    const fetchAds = async () => {
        try {
            const Adsref = collection(db, 'Ads');
            const querySnapshot = await getDocs(Adsref);
            const adsData = [];
            querySnapshot.forEach((doc) => {
                adsData.push({ id: doc.id, ...doc.data() });
            });
            setCarsData(adsData);
            console.log("All Ads", adsData);
        } catch (error) {
            console.error('Error fetching ads:', error);
        }
    };

    const calculateDaysLeft = (postDate) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const currentDate = new Date();
        const post = new Date(postDate);
        const diffDays = Math.round(Math.abs((currentDate - post) / oneDay));
        const daysLeft = 7 - diffDays;
        return daysLeft;
    };


    useEffect(() => {
        fetchAds();
    }, []);

    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>

                <div className='w-full mt-[50px] mb-[25px] flex flex-col gap-5 justify-center bg-white items-center'>
                    <div className='relative w-auto h-auto m-0'>
                        <img src={ListingBannar} alt="Car Image" className='w-auto lg:w-full h-auto lg:h-full m-0' />
                        {/* Top Left */}
                        <div className='absolute top-0 left-0 w-auto h-auto flex justify-start items-center'>
                            <img src={BannarTag} alt="Car Image" className='relative w-[50%] lg:w-full h-auto lg:h-full' />
                            {/* Rotated Text */}
                            <h1 className='absolute w-[100%] h-auto mt-[-55%] lg:mt-[-50%] ml-[-10%] lg:ml-0  text-white text-[10px] lg:text-base font-bold -rotate-45'>
                                No Reserve
                            </h1>
                        </div>

                        {/* Top Right */}
                        <div className='absolute top-2 lg:top-5 right-2 lg:right-10 w-auto h-auto flex flex-col justify-start items-start'>
                            <h1 className='text-black text-xs lg:text-base font-bold'> Current Bid: <span className='text-[#FFA90A]' > $40000 </span> </h1>
                            {carsData.map((car, index) => (
                                <h1 key={index} className='text-black text-xs lg:text-base font-bold'> Ends In: <span className='text-[#008DF2]'>{calculateDaysLeft(car.date)} Days</span> </h1>
                            ))}
                        </div>
                        {/* Bottom Right */}
                        <div className='absolute bottom-2 lg:bottom-5 right-2 lg:right-10 w-auto h-auto flex justify-center items-center'>
                            <button className="bg-[#FFA90A] text-white font-bold py-2 px-4 rounded">
                                Bid Now
                            </button>
                        </div>
                        {/* Bottom Left */}
                        <div className='absolute bottom-2 lg:bottom-5 left-2 lg:left-10 w-auto h-auto flex flex-col justify-start items-start'>
                            <h1 className='text-white text-xs lg:text-base font-light'> Model: <span className='font-semibold' > Honda Civic </span> </h1>
                            <h1 className='text-white text-xs lg:text-base font-light'> Category: <span className='font-semibold'> Normal </span>  </h1>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-[25px] mb-[50px] flex flex-col gap-5 justify-center bg-white items-center'>
                    <h2 className='text-center font-semibold lg:text-[30px] md:text-[25px] text-[20px]'>Featured Listing Auction</h2>
                    <div className='w-full flex mt-[30px] flex-col px-10 lg:px-[100px] justify-center bg-white items-center'>
                        <div className='w-full grid gap-2 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 flex-wrap'>
                            {carsData.map((car, index) => (
                                <Link key={index} to={`/car-details/${car.id}`}>
                                    <Auctioncard image={car.images.length > 0 ? car.images[0].file : placeholderImage} model={car.model_name} category={car.engine_type} date={car.date} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default CarListing;