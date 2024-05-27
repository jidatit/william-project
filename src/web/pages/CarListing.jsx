import React from 'react'
import Auctioncard from '../components/ui/Auctioncard'
import car1 from "../../assets/web/car1.png"
import car2 from "../../assets/web/car2.png"
import {Link} from 'react-router-dom';

const CarListing = () => {

    const carsData = [
        {
            image: car1,
            model: "Dacia Sanderi",
            category: "Hybrid",
            id: 111
        },
        {
            image: car2,
            model: "Dacia Sandera",
            category: "Hybrid",
            id: 222
        },
        {
            image: car2,
            model: "Dacia Sanderi",
            category: "Hybrid",
            id: 333
        },
        {
            image: car1,
            model: "Dacia Sandera",
            category: "Hybrid",
            id: 444
        },
    ]

    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>

                <div className='w-full flex mt-[70px] mb-[70px] flex-col gap-5 justify-center bg-white items-center'>
                    <h2 className='text-center font-semibold lg:text-[30px] md:text-[25px] text-[20px]'>Featured Listing Auction</h2>
                    <div className='w-full flex mt-[30px] flex-col px-10 justify-center bg-white items-center'>
                        <div className='w-full grid gap-2 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 flex-wrap'>
                            {carsData && carsData?.map((car, index) => (
                                <Link to={`/car-details/${car.id}`}>
                                    <Auctioncard key={index} image={car.image} model={car.model} category={car.category} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CarListing;