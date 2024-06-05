
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Auctioncard from '../components/ui/Auctioncard'
import BidDetails from './BidDetails';
import CarPictures from './CarPictures'

import car1 from "../../assets/web/car1.png"
import car2 from "../../assets/web/car2.png"

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { db } from "./../../../db"
import { getDoc, doc } from 'firebase/firestore';

const CarDetails = () => {

    const { id } = useParams();
    let [tempcarData, setTempCarData] = useState({});

    const carsData = [
        {
            image: car1,
            model: "Dacia Sanderi",
            category: "Hybrid"
        },
        {
            image: car2,
            model: "Dacia Sandera",
            category: "Hybrid"
        },
        {
            image: car2,
            model: "Dacia Sanderi",
            category: "Hybrid"
        },
        {
            image: car1,
            model: "Dacia Sandera",
            category: "Hybrid"
        },
    ]

    const fetchAd = async (adId) => {
        try {
            const adRef = doc(db, 'Ads', adId);
            const adSnapshot = await getDoc(adRef);
            if (adSnapshot.exists()) {
                setTempCarData({ id: adSnapshot.id, ...adSnapshot.data() });
            } else {
                console.error('No such document!');
            }
        } catch (error) {
            console.error("Error fetching tempcarData:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchAd(id);
        }
    }, [id]);


    return (
        <>
            <div className='w-full flex flex-col justify-center items-center my-5 lg:my-10 px-[20px] lg:px-[50px]'>
                < CarPictures />
                
                <div className='w-full min-h-screen grid grid-cols-1 lg:grid-cols-10 gap-5 justify-center items-start my-10'>
                    <div className='w-full h-full col-span-6'>
                    <BidDetails carData={tempcarData}/>

                        <div id="detailed-pricing" className="w-full overflow-x-auto">
                            <div className="overflow-hidden min-w-max">
                                {tempcarData && (
                                    <>
                                        <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                            <div className="font-bold"> Model Year </div>
                                            <div className='font-normal'> {tempcarData.model_year} </div>
                                            <div className='font-bold'> Registered In </div>
                                            <div className='font-normal'> {tempcarData.registered_in} </div>
                                        </div>
                                        <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                            <div className="font-bold"> Location </div>
                                            <div className='font-normal'> {tempcarData.location} </div>
                                            <div className='font-bold'> Address </div>
                                            <div className='font-normal'> {tempcarData.address} </div>
                                        </div>
                                        <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                            <div className="font-bold"> Mileage (km) </div>
                                            <div className='font-normal'> {tempcarData.mileage_km} </div>
                                            <div className='font-bold'> Body Color </div>
                                            <div className='font-normal'> {tempcarData.body_color} </div>
                                        </div>
                                        <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                            <div className="font-bold"> Price </div>
                                            <div className='font-normal'> {tempcarData.price} </div>
                                            <div className='font-bold'> Engine Type </div>
                                            <div className='font-normal'> {tempcarData.engine_type} </div>
                                        </div>
                                        <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                            <div className="font-bold"> Engine Capacity </div>
                                            <div className='font-normal'> {tempcarData.engine_capacity} </div>
                                            <div className='font-bold'> Transmission </div>
                                            <div className='font-normal'> {tempcarData.transmission} </div>
                                        </div>
                                        <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                            <div className="font-bold"> Seller Name </div>
                                            <div className='font-normal'> {tempcarData.user?.fullname} </div>
                                            <div className='font-bold'> Seller Phone Number </div>
                                            <div className='font-normal'> {tempcarData.user?.phoneNumber} </div>
                                        </div>
                                        <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                            <div className="font-bold"> Seller Email </div>
                                            <div className='font-normal'> {tempcarData.user?.email} </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className='w-full flex flex-col justify-start items-start mt-4' >
                            <div className='text-2xl font-bold' >
                                <h1>
                                    Description:
                                </h1>
                            </div>
                            <div className='mt-1 mr-5 text-base' >
                                <p className='text-justify' >
                                    {tempcarData && (
                                        <>
                                            {tempcarData.description}
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className='w-full grid gap-2 col-span-4'>
                        <div className="font-bold text-2xl mb-3" ><h1> Auctions Ending Soon </h1></div>
                        <div className='w-full h-full grid gap-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 flex-wrap cursor-pointer'>
                            {carsData && carsData?.map((car, index) => (
                                <Auctioncard key={index} image={car.image} model={car.model} category={car.category} />
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default CarDetails;