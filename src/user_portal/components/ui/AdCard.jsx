import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { strTruncator } from "strtoolkit"

const AdCard = ({ data, onDelete, onUpdate }) => {

    const navigate = useNavigate();
    const [seeBids, setSeeBids] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleViewListing = () => {
        navigate(`/car-details/${data.id}`);
    };

    const handleSeeBids = () => {
        setSeeBids(true);
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(data.id);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            await onUpdate(data);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            <div
                className="relative flex flex-col lg:flex-row justify-start gap-5  rounded-xl shadow-lg p-3 w-full mx-auto border border-white bg-white">
                
                <div className="w-full lg:w-fit h-full bg-white ">
                    <img src={data.images.length > 0 ? data.images[0].file : placeholderImage} alt="tailwind logo" className="rounded-xl w-full lg:min-w-[260px] h-auto lg:h-[180px] cursor-pointer" />
                </div>

                <div className="w-full bg-white flex flex-col space-y-2 p-3">
                    <h3 className="font-bold text-gray-800 lg:text-2xl text-md">{data.model_name || "BMW E46"}</h3>
                    <p className="lg:text-lg text-gray-500 text-base"> {strTruncator(data.description, 200)} </p>
                    <p className="text-xl font-black text-gray-800">
                        <span className="text-[#FFA90A] text-base font-semibold"> {data.location || "Location"}</span>
                    </p>

                    <div className='w-full flex flex-col xl:flex-row gap-3 lg:gap-4 xl:gap-0 xl:justify-between xl:items-center'>
                        <div className='w-full xl:w-[40%] flex flex-row gap-[10px] lg:gap-[20px] justify-center lg:justify-start items-center'>
                            <p> {data.model_year} </p>
                            |
                            <p> {data.mileage_km + ' km'} </p>
                            |
                            <p> {data.engine_capacity + ' cc'} </p>
                        </div>
                        <div className='w-full xl:w-[60%] flex flex-col md:flex-row lg:flex-row justify-center items-center gap-1'>
                            
                            <button 
                                onClick={handleSeeBids}
                                className='bg-[#FFA90A] lg:w-[32%] w-full text-white font-bold rounded-[30px] px-4 py-2'>
                                See Bids
                            </button>

                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating}
                                className='bg-[#4a9024] w-full lg:w-[32%] text-white font-bold rounded-[30px] px-4 py-2'>
                                {isUpdating ? "Updating..." : "Update"}
                            </button>

                            <button
                                onClick={handleViewListing}
                                className='bg-black lg:w-[32%] w-full text-white font-bold rounded-[30px] px-4 py-2'>
                                View
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className='bg-[#C30000] w-full lg:w-[32%] text-white font-bold rounded-[30px] px-4 py-2'>
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {seeBids === true ? (
                <>
                    <div className='' > 
                        The bids
                    </div>
                </>
            ) : (
            <div></div>
            )}
        </>
    )
}

export default AdCard
