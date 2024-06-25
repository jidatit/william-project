import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../../db';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsUpdating(true);
            const authUserDoc = doc(db, 'users', user.uid);
            await updateDoc(authUserDoc, {
                fullname: fullName,
                email: email,
                phoneNumber: phoneNumber,
            });
            console.log("User Data Updated Successfully");
            toast.success("User Data Updated Successfully");
        } catch (error) {
            console.log("Error Updating Data: ", error);
            toast.error("Error Updating User Data");
        } finally {
            setIsUpdating(false);
        }
    };

    const fetchUserData = async () => {
        try {
            const authUserDoc = doc(db, 'users', user.uid);
            const docSnap = await getDoc(authUserDoc);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                console.log("Data Fetched Successfully");
                setFullName(userData.fullname);
                setEmail(userData.email);
                setPhoneNumber(userData.phoneNumber);
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.log("Error Fetching User Data: ", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user]);

    return (
        <>
            <div className='w-[80%] flex flex-col justify-center items-center mt-8 mb-20 py-12 bg-white shadow-xl rounded-md'>
                <ToastContainer />
                <div className='w-[85%] lg:w-[70%] mb-10 relative flex flex-row justify-center items-center' >
                    <div className='font-semibold text-2xl' > Edit Profile </div>
                    <button className='cursor-pointer absolute right-0 text-[#FFA90A] hover:text-black' onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? <EditOffOutlinedIcon sx={{ fontSize : '40px' }} /> : <CreateOutlinedIcon sx={{ fontSize : '40px' }} />}
                    </button>
                </div>
                <form className='w-[85%] lg:w-[70%] flex flex-col justify-center items-center gap-4' onSubmit={handleSubmit}>
                    <TextField
                        id="fullName"
                        name="fullName"
                        label="Full Name"
                        type='text'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        fullWidth
                        disabled={!isEditing}
                    />
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        disabled={!isEditing}
                    />
                    <TextField
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Phone Number"
                        type='text'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        fullWidth
                        disabled={!isEditing}
                    />
                    {isEditing && (
                        <button
                            className='lg:w-[30%] w-full rounded-xl cursor-pointer bg-[#FFA90A] text-white font-semibold mt-6 p-3'
                            type='submit'
                        >
                            {isUpdating ? 'Updating' : 'Update'}
                        </button>
                    )}
                </form>
            </div>
        </>
    );
};

export default EditProfile;