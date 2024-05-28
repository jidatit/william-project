
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Auctioncard from '../components/ui/Auctioncard'
import BidDetails from './BidDetails';

import carSlider1 from './../../assets/web/carslider1.png';
import carSlider2 from './../../assets/web/carslider2.png';
import carSlider3 from './../../assets/web/carslider3.png';
import car1 from "../../assets/web/car1.png"
import car2 from "../../assets/web/car2.png"

import './../styles/web.css'

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const CarDetails = () => {

    const params = useParams();
    const [advancedExampleOpen, setAdvancedExampleOpen] = useState(false);

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

    return (
        <>
            <div className='w-full flex flex-col justify-center items-center px-[50px]'>

                <div className='w-full flex flex-col justify-center items-center mt-5'>
                    <h2 className='text-center font-semibold lg:text-[30px] md:text-[25px] text-[20px]'>The car ID is: {params.id}</h2>
                </div>

                <div className='w-full min-h-screen grid lg:grid-cols-2 gap-2 justify-center items-center'>
                    <div className='cursor-pointer'>
                        <img src={carSlider3} className="w-full h-[590px]" alt="Selected Image" onClick={() => setAdvancedExampleOpen(true)} />
                    </div>

                    <div className='w-full grid grid-cols-2 gap-2 cursor-pointer'>
                        <img src={carSlider1} className="w-full h-full" alt="Image 1" onClick={() => setAdvancedExampleOpen(true)} />
                        <img src={carSlider2} className="w-full h-full" alt="Image 2" onClick={() => setAdvancedExampleOpen(true)} />
                        <img src={carSlider3} className="w-full h-full" alt="Image 3" onClick={() => setAdvancedExampleOpen(true)} />
                        <img src={carSlider1} className="w-full h-full" alt="Image 1" onClick={() => setAdvancedExampleOpen(true)} />
                    </div>
                </div>

                {advancedExampleOpen && (<Lightbox
                    open={advancedExampleOpen}
                    close={() => setAdvancedExampleOpen(false)}
                    slides={[
                        { src: carSlider1 },
                        { src: carSlider2 },
                        { src: carSlider3 },
                    ]}
                    plugins={[Captions, Fullscreen, Thumbnails, Video, Zoom]}
                />)}

                <div className='w-full min-h-screen grid lg:grid-cols-2 gap-5 justify-center items-center'>

                    <div className='w-full h-full'>

                        < BidDetails />

                        <div id="detailed-pricing" className="w-full overflow-x-auto table-view">
                            <div className="overflow-hidden min-w-max">

                                <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                    <div className="font-bold"> Model Year </div>
                                    <div className='font-normal'> Lorem </div>
                                    <div className='font-bold'> Registered In </div>
                                    <div className='font-normal'> Lorem </div>
                                </div>

                                <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                    <div className="font-bold"> Location </div>
                                    <div className='font-normal'> Lorem </div>
                                    <div className='font-bold'> Address </div>
                                    <div className='font-normal'> Lorem </div>
                                </div>

                                <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                    <div className="font-bold"> Mileage (km) </div>
                                    <div className='font-normal'> Lorem </div>
                                    <div className='font-bold'> Body Color </div>
                                    <div className='font-normal'> Lorem </div>
                                </div>

                                <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                    <div className="font-bold"> Price </div>
                                    <div className='font-normal'> Lorem </div>
                                    <div className='font-bold'> Engine Type</div>
                                    <div className='font-normal'> Lorem </div>
                                </div>

                                <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                    <div className="font-bold"> Engine Capacity </div>
                                    <div className='font-normal'> Lorem </div>
                                    <div className='font-bold'> Transmission </div>
                                    <div className='font-normal'> Lorem </div>
                                </div>

                                <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                    <div className="font-bold"> Seller Name </div>
                                    <div className='font-normal'> Lorem </div>
                                    <div className='font-bold'> Seller Phone Number </div>
                                    <div className='font-normal'> Lorem </div>
                                </div>

                                <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                    <div className="font-bold"> Seller Email </div>
                                    <div className='font-normal'> Lorem </div>
                                </div>

                            </div>
                        </div>


                        <div className='w-full flex flex-col justify-start items-start mt-4' >
                            <div className='text-2xl font-semibold' >
                                <h1>
                                    Description:
                                </h1>
                            </div>
                            <div className='mt-1 mr-5 text-base' >
                                <p className='text-justify' >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptatibus voluptas dolor. Eum, impedit quas? Accusamus dicta voluptatem totam iure, mollitia perferendis voluptas, voluptatibus aperiam similique perspiciatis aut eligendi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptatibus voluptas dolor. Eum, impedit quas? Accusamus dicta voluptatem totam iure, mollitia perferendis voluptas, voluptatibus aperiam similique perspiciatis aut eligendi.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className='w-full h-full grid gap-2'>
                        <div className="font-bold text-2xl mb-5 " ><h1> Auctions Ending Soon </h1></div>
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