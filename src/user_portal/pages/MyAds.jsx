import React, { useState, useEffect } from 'react'
import AdCard from '../components/ui/AdCard'
import { Modal, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material'
import Button from "../components/ui/Button"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CancelIcon from '@mui/icons-material/Cancel';
import { db, storage } from "../../../db"
import { addDoc, deleteDoc, updateDoc, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from '@firebase/storage';
import { useAuth } from "../../../AuthContext"

const MyAds = () => {

    const { currentUser } = useAuth()
    const [MyAds, setMyAds] = useState([]);
    const [createButtonText, setCreateButtonText] = useState("Create");
    const [open, setOpen] = useState(false);
    const [adToUpdate, setAdToUpdate] = useState(null);

    const CreateHandleOpen = () => {
        resetFormData();
        setCreateButtonText("Create");
        setAdToUpdate(null);
        setOpen(true);
    };

    const updateHandleOpen = (data) => {
        populateFormData(data);
        setCreateButtonText("Update");
        setAdToUpdate(data);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const [formData, setFormData] = useState({
        images: [],
        imagePreviews: [],
        model_name: "",
        model_year: "",
        registered_in: "",
        location: "",
        address: "",
        mileage_km: "",
        body_color: "",
        price: "",
        description: "",
        engine_type: "",
        engine_capacity: "",
        transmission: "",
        date: "",
        status: "active",
        user: {}
    });

    const resetFormData = () => {
        setFormData({
            images: [],
            imagePreviews: [],
            model_name: "",
            model_year: "",
            registered_in: "",
            location: "",
            address: "",
            mileage_km: "",
            body_color: "",
            price: "",
            description: "",
            engine_type: "",
            engine_capacity: "",
            transmission: "",
            status: "active",
            date: "",
            user: {}
        });
    };

    const populateFormData = (data) => {
        setFormData({
            images: data.images ? data.images.map(image => image.file) : [],
            imagePreviews: data.images ? data.images.map(image => image.file) : [],
            model_name: data.model_name,
            model_year: data.model_year,
            registered_in: data.registered_in,
            location: data.location,
            address: data.address,
            mileage_km: data.mileage_km,
            body_color: data.body_color,
            price: data.price,
            description: data.description,
            engine_type: data.engine_type,
            engine_capacity: data.engine_capacity,
            transmission: data.transmission,
            date: data.date,
            status: "active",
            user: {}
        });
    };

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
        const newImagePreviews = files.map(file => URL.createObjectURL(file));

        setFormData(prevState => ({
            ...prevState,
            images: [...prevState.images, ...files],
            imagePreviews: [...prevState.imagePreviews, ...newImagePreviews]
        }));
    };

    const handleImageDelete = (index) => {
        setFormData(prevState => {
            const newImages = [...prevState.images];
            const newImagePreviews = [...prevState.imagePreviews];
            newImages.splice(index, 1);
            newImagePreviews.splice(index, 1);
            return {
                ...prevState,
                images: newImages,
                imagePreviews: newImagePreviews
            };
        });
    };

    const createAd = async () => {
        try {
            setCreateButtonText("Creating...");
            if (formData.images.length === 0) {
                toast.warn("Upload any image(s)!");
                setCreateButtonText("Create");
                handleClose();
                return;
            }

            const timestamp = Date.now();
            const uniqueId = Math.random().toString(36).substring(2);

            const promises = formData.images.map(async (file) => {
                const storageRef = ref(storage, `Ads/${timestamp}_${uniqueId}_${file.name}`);
                await uploadBytes(storageRef, file);
                return getDownloadURL(storageRef);
            });

            const fileUrls = await Promise.all(promises);

            const formDataWithUrls = {
                ...formData,
                images: fileUrls.map(url => ({ file: url })),
                user: {
                    ...currentUser.data,
                    uid: currentUser.uid
                },
                date: new Date().toISOString()
            };
            delete formDataWithUrls.imagePreviews;
            await addDoc(collection(db, 'Ads'), formDataWithUrls);
            fetchMyAds();
            toast.success("Ad created with success!");
        } catch (error) {
            console.error("Error creating Ad:", error);
            toast.error("Error creating Ad!");
            handleClose();
        } finally {
            setCreateButtonText("Create");
            resetFormData();
            handleClose();
        }
    };

    const updateAd = async () => {
        try {
            setCreateButtonText("Updating...");

            if (formData.images.length === 0) {
                toast.warn("Upload any image(s)!");
                setCreateButtonText("Update");
                handleClose();
                return;
            }

            const adRef = doc(db, 'Ads', adToUpdate.id);
            const adSnapshot = await getDoc(adRef);
            let currentImages = adSnapshot.exists() ? adSnapshot.data().images : [];
            currentImages = currentImages.map(url => ({ file: url }));

            const deletedImages = currentImages.filter(
                img => !formData.images.some(newImg => newImg.file === img.file)
            );

            const deletedImagesFromStorage = currentImages.filter(
                img => !formData.images.some(newImg => newImg === img.file.file)
            );

            for (const img of deletedImagesFromStorage) {
                const imageName = decodeURIComponent(img.file.file.split('?')[0].split('/o/')[1]);
                const storageRef = ref(storage, `${imageName}`);
                await deleteObject(storageRef);
                console.log(`Image deleted from Firebase Storage: ${imageName}`);
            }

            currentImages = currentImages.filter(
                img => !deletedImages.some(deletedImg => deletedImg.file === img.file)
            );

            console.log("Current Images 02", currentImages)

            const timestamp = Date.now();
            const uniqueId = Math.random().toString(36).substring(2);

            const promises = formData.images.map(async (file) => {
                if (file instanceof File) {
                    const storageRef = ref(storage, `Ads/${timestamp}_${uniqueId}_${file.name}`);
                    await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(storageRef);
                    return { file: url };
                } else {
                    return { file: file };
                }
            });

            const newFileUrls = await Promise.all(promises);

            const updatedImages = [
                ...currentImages,
                ...newFileUrls
            ];
            console.log("Current Images : ", currentImages)
            console.log("New Files URL Images : ", newFileUrls)
            console.log("Updated Images : ", updatedImages)

            const formDataWithUrls = {
                ...formData,
                images: updatedImages,
                user: {
                    ...currentUser.data,
                    uid: currentUser.uid
                },
                date: new Date().toISOString()
            };
            delete formDataWithUrls.imagePreviews;

            await updateDoc(adRef, formDataWithUrls);
            fetchMyAds();
            toast.success("Ad updated successfully!");
        } catch (error) {
            console.error("Error updating Ad:", error);
            toast.error("Error updating Ad!");
            handleClose();
        } finally {
            setCreateButtonText("Update");
            resetFormData();
            handleClose();
        }
    };

    const deleteAd = async (id) => {
        try {
            await deleteDoc(doc(db, 'Ads', id));
            console.log("Ad deleted successfully");
            toast.success("Ad Deleted successfully!");
            fetchMyAds();
        } catch (error) {
            console.error("Error deleting ad:", error);
            toast.error("Error Deleting Ad!");
        }
    };

    const fetchMyAds = async () => {
        let allQts = []
        const Adsref = collection(db, 'Ads');
        const q = query(Adsref, where("user.uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            allQts.push({ id: doc.id, ...doc.data() });
        });
        setMyAds(allQts)
    }

    useEffect(() => {
        fetchMyAds()
    }, [])

    return (
        <>
            <div className='w-[80%] min-h-screen flex flex-col justify-start items-center'>
                <ToastContainer />
                <div className='w-full mt-[20px] mb-[20px] flex flex-col justify-center items-start'>
                    <div onClick={CreateHandleOpen} className='lg:w-[20%] w-full transition-all ease-in-out delay-150 cursor-pointer hover:bg-[#FFA90A] hover:text-white rounded-[30px] border-[2px] border-[#FFA90A] text-[#FFA90A] font-semibold p-3'>
                        <p className='text-center'>Create an Ad</p>
                    </div>
                </div>

                <div className='w-full mt-[20px] mb-[20px] flex flex-col justify-center items-center'>
                    <div className='flex w-full flex-col lg:flex-row gap-2'>
                        <div className='lg:w-[20%] w-full rounded-[30px] cursor-pointer bg-[#FFA90A] text-white font-semibold p-3'>
                            <p className='text-center'>Active</p>
                        </div>
                        <div className='lg:w-[20%] w-full transition-all ease-in-out delay-150 cursor-pointer hover:bg-[#FFA90A] hover:text-white rounded-[30px] border-[2px] border-[#FFA90A] text-[#FFA90A] font-semibold p-3'>
                            <p className='text-center'>Removed</p>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col mb-[50px] justify-center items-center gap-3'>
                    {MyAds && MyAds.map((ad, index) => (
                        <AdCard key={index} data={ad} onDelete={deleteAd} onUpdate={updateHandleOpen} onFetch={fetchMyAds} />
                    ))}
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
                    <div className="md:w-[50%] w-[90%] mt-[50px] gap-4 bg-white flex flex-col rounded-md shadow-lg overflow-y-auto max-h-[80vh] items-center py-[30px]">
                        <h3 className='font-bold md:text-[24px] text-[15px] text-center'>{adToUpdate === null ? 'Create Ad' : 'Update Ad'}</h3>

                        <div className="file_upload w-[70%] p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                            <svg className="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
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
                                <div key={index} className='relative' >
                                    <button onClick={() => handleImageDelete(index)} className="absolute w-full flex justify-end items-end text-black rounded-md">< CancelIcon /></button>
                                    <img src={preview} alt={`preview ${index}`} className="w-[200px] h-[100px] object-cover mb-2 rounded-md" />
                                </div>
                            ))}
                        </div>

                        <TextField required label="Model Name" type="text" onChange={handleChange} name="model_name" value={formData.model_name} className="w-[70%]" />
                        <TextField required label="Model Year" type="text" onChange={handleChange} name="model_year" value={formData.model_year} className="w-[70%]" />
                        <TextField required label="Registered In" type="text" onChange={handleChange} name="registered_in" value={formData.registered_in} className="w-[70%]" />
                        <TextField required label="Location" type="text" onChange={handleChange} name="location" value={formData.location} className="w-[70%]" />
                        <TextField required label="Address" type="text" onChange={handleChange} name="address" value={formData.address} className="w-[70%]" />
                        <TextField required label="Mileage (km)" type="text" onChange={handleChange} name="mileage_km" value={formData.mileage_km} className="w-[70%]" />
                        <TextField required label="Body Color" type="text" onChange={handleChange} name="body_color" value={formData.body_color} className="w-[70%]" />
                        <TextField required label="Price" type="number" onChange={handleChange} name="price" value={formData.price} className="w-[70%]" />
                        <TextField required label="Description" multiline rows={5} type="text" onChange={handleChange} name="description" value={formData.description} className="w-[70%]" />

                        <FormControl required className="w-[70%]">
                            <InputLabel>Engine Type</InputLabel>
                            <Select
                                label="Engine Type"
                                onChange={handleChange}
                                name="engine_type"
                                value={formData.engine_type}
                            >
                                <MenuItem value="Hybrid">Hybrid</MenuItem>
                                <MenuItem value="Diesel">Diesel</MenuItem>
                                <MenuItem value="CNG">CNG</MenuItem>
                                <MenuItem value="Petrol">Petrol</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField required label="Engine Capacity" type="text" onChange={handleChange} name="engine_capacity" value={formData.engine_capacity} className="w-[70%]" />

                        <FormControl required className="w-[70%]">
                            <InputLabel>Transmission</InputLabel>
                            <Select
                                label="Transmission"
                                onChange={handleChange}
                                name="transmission"
                                value={formData.transmission}
                            >
                                <MenuItem value="Automatic">Automatic</MenuItem>
                                <MenuItem value="Manual">Manual</MenuItem>
                            </Select>
                        </FormControl>

                        <div className="w-[90%] mb-5 flex flex-col justify-end items-end">
                            <div className="md:w-[30%] w-full pr-0 md:pr-2">
                                <Button onClickProp={createButtonText === "Create" ? createAd : updateAd} text={createButtonText} />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default MyAds