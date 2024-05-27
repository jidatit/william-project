
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Auctioncard from '../components/ui/Auctioncard'

import carSlider1 from './../../assets/web/carslider1.png';
import carSlider2 from './../../assets/web/carslider2.png';
import carSlider3 from './../../assets/web/carslider3.png';
import car1 from "../../assets/web/car1.png"
import car2 from "../../assets/web/car2.png"

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

                <div className='w-full min-h-screen grid lg:grid-cols-2 gap-2 justify-center items-center'>

                    <div className='w-full h-full'>
                        
                        <div className='border-2 border-rose-600 w-full h-10 grid grid-cols-2 flex-wrap' >
                            <div className='grid grid-cols-4 w-200 bg-black text-white' >
                                <div> <h1> Time Left </h1> <h1> 4 Days </h1> </div>
                                <div>2</div>
                                <div>3</div>
                                <div>4</div>
                            </div>
                            <div >
                                <div> <button type="button" class="focus:outline-none text-white bg-[#FFA90A] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"> Place Bid </button></div>
                            </div>
                        </div>

                        <div><h1> Area 02 </h1></div>
                        <div><h1> Area 03 </h1></div>
                    </div>

                    <div className='w-full h-full grid gap-2'>
                        <div className="font-bold text-2xl" ><h1>Auctions Ending Soon</h1></div>
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