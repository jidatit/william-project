import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { strTruncator } from "strtoolkit"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import PickUp from '../../../assets/user_portal/pickup.png';
import DropOf from '../../../assets/user_portal/dropof.png';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 14,
    borderRadius: '12px',
};

const styleSecond = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 14,
    borderRadius: '12px',
};

const AdCard = ({ data, onDelete, onUpdate }) => {

    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [seeBids, setSeeBids] = useState(false);
    const [isAccept, setIsAccept] = useState(false);
    const [availabilityUpdated, setAvailabilityUpdated] = useState(false);

    const [openFirst, setOpenFirst] = useState(false);
    const handleOpenFirst = () => setOpenFirst(true);
    const handleCloseFirst = () => setOpenFirst(false);

    const [openSecond, setOpenSecond] = useState(false);
    const handleOpenSecond = () => setOpenSecond(true);
    const handleCloseSecond = () => setOpenSecond(false);

    const bidsDetails = [
        {
            "Bid By": "Alex Allan",
            "Bid Amount": "$43000",
            "Bid Time": "10/5/2024 (11:40am)"
        },
        {
            "Bid By": "Shane Agar",
            "Bid Amount": "$39000",
            "Bid Time": "11/6/2023 (10:30pm)"
        },
        {
            "Bid By": "Smith Valy",
            "Bid Amount": "$22000",
            "Bid Time": "22/9/2024 (08:20am)"
        },
    ];

    const handleViewListing = () => {
        navigate(`/car-details/${data.id}`);
    };

    const handleSeeBids = () => {
        setSeeBids(true);
    }

    const handleHideBids = () => {
        setSeeBids(false);
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

    const handleAcceptBid = () => {
        setIsAccept(true);
        setSeeBids(false);
    }

    const availabilityUpdate = () => {
        setAvailabilityUpdated(true);
        setOpenSecond(false);
        setOpenFirst(false);
    }

    return (
        <>
            <div className="w-full relative flex flex-col justify-start mx-auto bg-white rounded-xl shadow-md border-2 border-gray-200">

                <div className='w-full flex flex-col lg:flex-row justify-start items-start gap-5 p-3' >

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

                            {isAccept === false ? (
                                <>
                                    <div className='w-full xl:w-[60%] flex flex-col md:flex-row lg:flex-row justify-center items-center gap-1'>
                                        {seeBids === false ? (
                                            <button
                                                onClick={handleSeeBids}
                                                className='bg-[#FFA90A] lg:w-[32%] w-full text-white font-bold rounded-[30px] px-4 py-2'>
                                                See Bids
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleHideBids}
                                                className='bg-[#ecb248] lg:w-[32%] w-full text-white font-bold rounded-[30px] px-4 py-2'>
                                                Hide Bids
                                            </button>
                                        )}

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
                                </>
                            ) : (
                                <>
                                    <div className='w-full xl:w-[70%] flex flex-col md:flex-row lg:flex-row justify-center items-center gap-1'>
                                        <div
                                            className='w-full lg:w-[55%] text-black font-medium rounded-[30px] px-4 py-2'>
                                            You have accept the bid of $24,500
                                        </div>

                                        {availabilityUpdated === false ? (
                                            <button
                                                onClick={handleOpenFirst}
                                                className='bg-[#FFA90A] lg:w-[45%] w-full text-white font-bold rounded-[30px] px-4 py-2'>
                                                Add Vehicle Availability
                                            </button>
                                        ) : (
                                            <button
                                                className='bg-[#2FB500] lg:w-[45%] w-full text-white font-bold rounded-[30px] px-4 py-2'>
                                                Availability Updated
                                            </button>

                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>


                {seeBids === true ? (
                    <>
                        {bidsDetails.map((bid, index) => (
                            <div key={index} className='w-full h-auto flex flex-col lg:flex-row gap-5 py-6 px-10 border-t-2 border-gray-200'>
                                <div className='basis-1/5 flex flex-col justify-center items-center gap-4'>
                                    <div className='font-medium text-xl' > Bid By</div>
                                    <div className=' text-base' > {bid["Bid By"]} </div>
                                </div>
                                <div className='basis-1/5 flex flex-col justify-center items-center gap-4'>
                                    <div className='font-medium text-xl' > Bid Amount</div>
                                    <div className=' text-base' > {bid["Bid Amount"]} </div>
                                </div>
                                <div className='basis-1/5 flex flex-col justify-center items-center gap-4'>
                                    <div className='font-medium text-xl' > Bid Time</div>
                                    <div className=' text-base' > {bid["Bid Time"]} </div>
                                </div>
                                <div className='basis-2/5 flex justify-center items-center'>
                                    <button onClick={handleAcceptBid} className='bg-[#FFA90A] w-auto text-white font-bold rounded-[30px] px-6 py-2'>
                                        Accept Bid
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div></div>
                )}

                <Modal
                    open={openFirst}
                    onClose={handleCloseFirst}
                >
                    <Box sx={style}>
                        <div className='flex flex-row justify-evenly items-center py-24' >
                            <div onClick={handleOpenSecond} className='flex flex-col justify-center items-center cursor-pointer'>
                                <img src={PickUp} alt="Pick Up" />
                                <h2> Pick up </h2>
                            </div>
                            <div onClick={handleOpenSecond} className='flex flex-col justify-center items-center cursor-pointer' >
                                <img src={DropOf} alt="Drop Of" />
                                <h2> Drop Of </h2>
                            </div>
                        </div>
                    </Box>
                </Modal>

                <Modal
                    open={openSecond}
                    onClose={handleCloseSecond}
                >
                    <Box sx={styleSecond}>
                        <div className='w-full relative flex flex-col justify-center items-center gap-6 py-14 px-8' >
                            <div className='w-full absolute right-0 top-0 flex justify-end items-end pt-6 pr-6 cursor-pointer'>
                                <CloseIcon onClick={handleCloseSecond} />
                            </div>
                            <h1 className='font-bold text-xl' > Vehicle Availability </h1>
                            <div className='w-full flex flex-col justify-start items-start gap-3 cursor-pointer'>
                                <label htmlFor="date"> Date </label>
                                <TextField id="date" variant="outlined" type='date' fullWidth />
                                <label htmlFor="time"> Time </label>
                                <TextField id="time" type='time' fullWidth />
                                <label htmlFor="address"> Address </label>
                                <TextField id="address" type='text' fullWidth />
                                <button
                                    onClick={availabilityUpdate}
                                    className='bg-[#FFA90A] w-full text-white font-bold rounded-xl mt-6 px-6 py-3'>
                                    Upload Availability
                                </button>
                            </div>
                        </div>
                    </Box>
                </Modal>

            </div>
        </>
    )
}

export default AdCard;