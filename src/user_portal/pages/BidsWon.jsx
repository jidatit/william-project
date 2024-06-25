import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import placeholderImage from '../../assets/user_portal/carcar.jpg'
import WonLabel from '../../assets/user_portal/wonlabel.png';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

const styleFirst = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 14,
    borderRadius: '12px',
    overflow: 'auto',
    maxHeight: '80vh'
};

const styleSecond = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 14,
    borderRadius: '12px',
    overflow: 'auto',
    maxHeight: '90vh'
};

const BidsWon = () => {

    const [openFirst, setOpenFirst] = useState(false);
    const handleOpenFirst = () => setOpenFirst(true);
    const handleCloseFirst = () => setOpenFirst(false);

    const [openSecond, setOpenSecond] = useState(false);
    const handleOpenSecond = () => setOpenSecond(true);
    const handleCloseSecond = () => setOpenSecond(false);

    const [isEditing, setIsEditing] = useState(false);
    const [confirmRequest, setConfirmRequest] = useState(false);

    const editAvailabilityRequest = () => {
        setIsEditing(true);
    }

    const CancelEditAvailabilityRequest = () => {
        setIsEditing(false);
    }

    const confirmAvailabilityRequest = () => {
        setConfirmRequest(true);
        setOpenFirst(false);
    }

    return (
        <>
            <div className="w-[80%] relative flex flex-col justify-start mb-10 mx-auto bg-white rounded-xl shadow-md border-2 border-gray-200">

                <div className='w-full flex flex-col lg:flex-row justify-start items-start gap-5 p-3' >

                    <div className="w-full lg:w-fit h-full bg-white ">
                        <img src={placeholderImage} alt="tailwind logo" className="rounded-xl w-full lg:min-w-[260px] h-auto lg:h-[180px] cursor-pointer" />
                    </div>

                    <div className="w-full bg-white flex flex-col space-y-2 p-3">
                        <div className=' w-full relative flex flex-row justify-between items-center' >
                            <h3 className="font-bold text-gray-800 lg:text-2xl text-md">BMW E46</h3>
                            <img className='w-40 h-auto absolute right-0 mr-[-1.50rem] ' src={WonLabel} alt="Won Label" />
                            <p className='absolute right-0 text-white text-xs pr-1' > You Won This Bid </p>
                        </div>
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

                            <div className='w-full xl:w-[60%] flex flex-col md:flex-row lg:flex-row justify-center items-center gap-2'>
                                <div className='basis-1/3 flex flex-col justify-center items-center gap-2 lg:gap-0'>
                                    <div className='font-medium text-xl' > Your Bid</div>
                                    <div className=' text-base' > $23000 </div>
                                </div>
                                {confirmRequest === false ? (
                                    <button
                                        onClick={handleOpenFirst}
                                        className='basis-1/3 bg-[#FFA90A] lg:w-[32%] w-full text-white font-bold rounded-[30px] px-6 py-2'>
                                        See Availability
                                    </button>
                                ) : (
                                    <button
                                        className='basis-[40%] bg-[#2FB500] lg:w-[32%] w-full text-white font-bold rounded-[30px] px-6 py-2'>
                                        Change Requested
                                    </button>
                                )}
                                <button
                                    onClick={handleOpenSecond}
                                    className='basis-1/3 bg-black w-full lg:w-[32%] text-white font-bold rounded-[30px] px-4 py-2'>
                                    Make Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    open={openFirst}
                    onClose={handleCloseFirst}
                >
                    <Box sx={styleFirst}>
                        <div className='w-[95vw] lg:w-[50vw] relative flex flex-col justify-center items-center gap-6 py-8 lg:py-14 px-6 lg:px-14' >
                            <div className='w-full absolute right-0 top-0 flex justify-end items-end pt-6 pr-6 cursor-pointer'>
                                <CloseIcon onClick={handleCloseFirst} />
                            </div>
                            <h1 className='font-bold text-xl' > Vehicle Availability </h1>
                            <div className='w-full flex flex-col justify-start items-start gap-3 cursor-pointer'>
                                <label htmlFor="date"> Date </label>
                                <TextField
                                    id="date"
                                    type='date'
                                    disabled={!isEditing}
                                    fullWidth
                                />
                                <label htmlFor="time"> Time </label>
                                <TextField
                                    id="time"
                                    type='time'
                                    disabled={!isEditing}
                                    fullWidth
                                />
                                <label htmlFor="address"> Address </label>
                                <TextField
                                    id="address"
                                    type='text'
                                    value={"Karachi, Pakistan"}
                                    disabled={!isEditing}
                                    fullWidth
                                />
                                <div className='w-full h-auto flex flex-row justify-center items-center gap-3' >
                                    {isEditing === false ? (
                                        <button
                                            onClick={editAvailabilityRequest}
                                            className='bg-[#383838] w-full text-white font-bold rounded-xl mt-6 px-4 py-2'>
                                            Request Change
                                        </button>
                                    ) : (
                                        <button
                                            onClick={CancelEditAvailabilityRequest}
                                            className='bg-[#383838] w-full text-white font-bold rounded-xl mt-6 px-4 py-2'>
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        onClick={confirmAvailabilityRequest}
                                        className='bg-[#FFA90A] w-full text-white font-bold rounded-xl mt-6 px-4 py-2'>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>

                <Modal
                    open={openSecond}
                    onClose={handleCloseSecond}
                >
                    <Box sx={styleSecond}>
                        <div className='w-[95vw] lg:w-[50vw] relative flex flex-col justify-center items-center gap-6 py-8 lg:py-14 px-6 lg:px-14' >
                            <div className='w-full absolute right-0 top-0 flex justify-end items-end pt-6 pr-6 cursor-pointer'>
                                <CloseIcon onClick={handleCloseSecond} />
                            </div>
                            <h1 className='font-bold text-xl' > Make Payment </h1>
                            <div className='w-full flex flex-col justify-start items-start gap-3 cursor-pointer'>
                                <Typography>
                                    To proceed further to confirm availability date, you have to pay the platform commission fees
                                </Typography>
                                <Typography sx={{ mt: 1 }}>
                                    Bid accepted: $24,500
                                </Typography>
                                <Typography sx={{ mb: 1 }}>
                                    Commission: $240
                                </Typography>
                                <label htmlFor="date" className='font-semibold'> Select Payment Method </label>
                                <TextField
                                    id="paymentmethod"
                                    type='text'
                                    fullWidth
                                />
                                <label htmlFor="time" className='font-semibold'> Enter Card Details </label>
                                <TextField
                                    id="time"
                                    type='text'
                                    fullWidth
                                />
                                <label htmlFor="address" className='font-semibold'> Enter Amount </label>
                                <TextField
                                    id="address"
                                    type='text'
                                    fullWidth
                                />
                                <div className='w-full h-auto flex flex-row justify-center items-center gap-3' >
                                    <button
                                        onClick={handleCloseSecond}
                                        className='bg-[#383838] w-full text-white font-bold rounded-xl mt-6 px-4 py-2'>
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-[#FFA90A] w-full text-white font-bold rounded-xl mt-6 px-4 py-2'>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>

            </div>
        </>
    )
}

export default BidsWon;