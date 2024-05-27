import React, { useState } from 'react'
import AdCard from '../components/ui/AdCard'
import { Modal, TextField } from '@mui/material'
import Button from "../components/ui/Button"
import { useAuth } from '../../../AuthContext'

const MyAds = () => {
    const { logout } = useAuth()
    const [buttonText, setButtonText] = useState("Submit");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        images: [],
        imagePreviews: [],
        model_year: "",
        registered_in: "",
        location: "",
        address: "",
        mileage_km: "",
        body_color: "",
        transaction_type: "",
        price: "",
        description: "",
        engine_type: "",
        engine_capacity: "",
        transmission: "",
        user: {
            fullname: "",
            email: "",
            phoneNumber: ""
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        if (keys.length > 1) {
            setFormData(prevState => ({
                ...prevState,
                [keys[0]]: {
                    ...prevState[keys[0]],
                    [keys[1]]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map(file => URL.createObjectURL(file));

        setFormData(prevState => ({
            ...prevState,
            images: files,
            imagePreviews
        }));
    };

    return (
        <>
            <div className='w-[80%] min-h-screen flex flex-col justify-start items-center'>
                
                <div className='w-full mt-[20px] mb-[20px] flex flex-col justify-center items-start'>
                    <div onClick={handleOpen} className='md:w-[20%] w-full transition-all ease-in-out delay-150 cursor-pointer hover:bg-[#FFA90A] hover:text-white rounded-[30px] border-[2px] border-[#FFA90A] text-[#FFA90A] font-semibold p-3'>
                        <p className='text-center'>Create an Ad</p>
                    </div>
                </div>

                <div className='w-full mt-[20px] mb-[20px] flex flex-col justify-center items-center'>
                    <div className='flex w-full flex-col lg:flex-row gap-2'>
                        <div className='md:w-[20%] w-full rounded-[30px] cursor-pointer bg-[#FFA90A] text-white font-semibold p-3'>
                            <p className='text-center'>Active</p>
                        </div>
                        <div className='md:w-[20%] w-full transition-all ease-in-out delay-150 cursor-pointer hover:bg-[#FFA90A] hover:text-white rounded-[30px] border-[2px] border-[#FFA90A] text-[#FFA90A] font-semibold p-3'>
                            <p className='text-center'>Removed</p>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col mb-[50px] justify-center items-center gap-3'>
                    <AdCard />
                    <AdCard />
                    <AdCard />
                    <AdCard />
                    <AdCard />
                </div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div className="md:w-[50%] w-[90%] mt-[50px] gap-4 bg-white flex flex-col  rounded-md shadow-lg overflow-y-auto max-h-[80vh] items-center py-[30px]">
                        <h3 className='font-bold md:text-[24px] text-[15px] text-center'>Create an Ad</h3>

                        <div className="file_upload w-[70%] p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                            <svg className="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                            <div className="input_field flex flex-col w-max mx-auto text-center">
                                <label>
                                    <input className="text-sm cursor-pointer w-36 hidden" type="file" multiple onChange={handleImageChange} />
                                    <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                                </label>

                                <div className="title text-indigo-500 uppercase">or drop files here</div>
                            </div>
                        </div>

                        <div className="w-[70%] grid grid-cols-4 gap-1 items-center justify-center mt-4">
                            {formData.imagePreviews.map((preview, index) => (
                                <img key={index} src={preview} alt={`preview ${index}`} className="w-[200px] h-[100px] object-cover mb-2 rounded-md" />
                            ))}
                        </div>

                        <TextField required label="Model Year" type="text" onChange={handleChange} name="model_year" value={formData.model_year} className="w-[70%]" />
                        <TextField required label="Registered In" type="text" onChange={handleChange} name="registered_in" value={formData.registered_in} className="w-[70%]" />
                        <TextField required label="Location" type="text" onChange={handleChange} name="location" value={formData.location} className="w-[70%]" />
                        <TextField required label="Address" type="text" onChange={handleChange} name="address" value={formData.address} className="w-[70%]" />
                        <TextField required label="Mileage (km)" type="text" onChange={handleChange} name="mileage_km" value={formData.mileage_km} className="w-[70%]" />
                        <TextField required label="Body Color" type="text" onChange={handleChange} name="body_color" value={formData.body_color} className="w-[70%]" />
                        <TextField required label="Transaction Type" type="text" onChange={handleChange} name="transaction_type" value={formData.transaction_type} className="w-[70%]" />
                        <TextField required label="Price" type="text" onChange={handleChange} name="price" value={formData.price} className="w-[70%]" />
                        <TextField required label="Description" type="text" onChange={handleChange} name="description" value={formData.description} className="w-[70%]" />
                        <TextField required label="Engine Type" type="text" onChange={handleChange} name="engine_type" value={formData.engine_type} className="w-[70%]" />
                        <TextField required label="Engine Capacity" type="text" onChange={handleChange} name="engine_capacity" value={formData.engine_capacity} className="w-[70%]" />
                        <TextField required label="Transmission" type="text" onChange={handleChange} name="transmission" value={formData.transmission} className="w-[70%]" />
                        <TextField required label="Full Name" type="text" onChange={handleChange} name="user.fullname" value={formData.user.fullname} className="w-[70%]" />
                        <TextField required label="Email" type="text" onChange={handleChange} name="user.email" value={formData.user.email} className="w-[70%]" />
                        <TextField required label="Phone Number" type="text" onChange={handleChange} name="user.phoneNumber" value={formData.user.phoneNumber} className="w-[70%]" />

                        <div className="w-[90%] mb-5 flex flex-col justify-end items-end">
                            <div className="md:w-[30%] w-full pr-0 md:pr-2">
                                <Button onClickProp={() => console.log(formData)} text={buttonText} />
                            </div>
                        </div>
                    </div>
                </Modal>

            </div>
        </>
    )
}

export default MyAds