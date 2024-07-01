import { TextField } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from "../../../AuthContext";
import { collection, getDocs, addDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../db';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from "react-spinners/BeatLoader";
import { useListing } from '../../../listingContext';

const BiddingBox = ({ vehicleId, carData }) => {
    const { currentUser } = useAuth();
    const [vehicleBids, setVehicleBids] = useState([]);
    const [bidAmount, setBidAmount] = useState('');
    const [Loading, setLoading] = useState(false);
    const { setDaysLeft, setHighestBid, calculateDaysLeft, status, setBidslen } = useListing();

    useEffect(() => {
        const lastBid = vehicleBids.length > 0 ? vehicleBids[vehicleBids.length - 1].amount : carData.price;
        setHighestBid(lastBid);

        const d = calculateDaysLeft(carData.date);
        setDaysLeft(d);
    }, [vehicleBids, carData]);

    useEffect(() => {
        fetchBidsforVehicleId(vehicleId);
    }, [vehicleId]);

    const fetchBidsforVehicleId = async (vehicleId) => {
        try {
            const bidsQuery = query(collection(db, "bids"), where("vehicleId", "==", vehicleId));
            const querySnapshot = await getDocs(bidsQuery);
            const bids = querySnapshot.docs.map(doc => doc.data());

            const sortedBids = bids.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
            setBidslen(sortedBids.length)
            setVehicleBids(sortedBids);
        } catch (error) {
            console.error("Error fetching bids:", error);
        }
    }

    useEffect(() => {
        const bidsRef = collection(db, "bids")
        const queryBids = query(bidsRef, where("vehicleId", "==", vehicleId));
        onSnapshot(queryBids, (snapshot) => {
            let newbids = []
            snapshot.forEach((doc) => {
                newbids.push({ ...doc.data(), id: doc.id })
            });
            const sortedBids = newbids.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
            setBidslen(sortedBids.length)
            setVehicleBids(sortedBids)
        })
    }, [])

    const makeAbidforVehicleId = async () => {
        try {
            const currentDate = new Date();
            const newBid = {
                vehicleId,
                amount: bidAmount,
                userId: currentUser.uid,
                bidder: currentUser.data,
                bidDate: currentDate.toISOString()
            };
            await addDoc(collection(db, "bids"), newBid);
            const updatedBids = [...vehicleBids, newBid].sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
            setVehicleBids(updatedBids);
            setBidAmount('');
            toast.success("Bid placed successfully!");
        } catch (error) {
            console.error("Error making a bid:", error);
        }
    }

    const handleMakeBid = (bid) => {
        setLoading(true);
        setTimeout(() => {
            const lastBid = vehicleBids.length > 0 ? vehicleBids[vehicleBids.length - 1].amount : carData.price;
            if (bid > lastBid) {
                makeAbidforVehicleId(bid);
                setLoading(false);
            } else {
                toast.error("Bid must be higher than the last bid or the car's price.", {
                    autoClose: 1000
                });
                setLoading(false);
            }
        }, 2000);
    }

    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [vehicleBids]);

    const [currentUserId, setCurrentUserId] = useState('');
    const [currentUserAd, setCurrentUserAd] = useState('');

    useEffect(() => {
        if ((carData.user) && (currentUser)) {
            console.log("Car Data : ", carData);
            console.log("Ad of user : ", carData.user);
            console.log("Ad of user Id : ", carData.user.uid);
            setCurrentUserAd(carData.user.uid);
            console.log("Current User Id : ", currentUser.uid);
            setCurrentUserId(currentUser.uid);
            console.log("Ad ID : ", vehicleId);
        }
    }, [carData, currentUser, vehicleId]);

    return (
        <>
            <div ref={containerRef} className='w-full p-2 flex flex-col justify-start items-center max-h-[371px] overflow-y-auto min-h-[370px] bg-white border border-gray-200 rounded-lg shadow-lg'>
                <ToastContainer
                    autoClose={1000}
                />
                {vehicleBids.length > 0 ? (
                    vehicleBids.map((bid, index) => (
                        <BidBadge key={index} bid={bid} />
                    ))
                ) : (
                    <p className='font-semibold italic'>No bids currently in place</p>
                )}
            </div>

            {carData && currentUser && status === "active" && (
                <div className='w-full flex-row justify-center items-center gap-1'>
                    {currentUserId === currentUserAd ? (
                        <div> You cannot bid on your own Ad </div>
                    ) : (
                        <>
                            <TextField type='number' disabled={Loading} value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} className='w-full md:w-[70%] outline-none focus:outline-none' placeholder='Type amount of your bid here!' />
                            <button onClick={() => handleMakeBid(parseFloat(bidAmount))} type="button" className="focus:outline-none text-white md:w-[30%] w-full md:h-full bg-[#FFA90A] hover:bg-yellow-500 focus:ring-yellow-300 font-medium text-sm px-5 py-2.5">
                                {Loading ? (
                                    <BeatLoader
                                        color={"#000000"}
                                        loading={Loading}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                ) : ("Place Bid")}
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

const BidBadge = ({ bid }) => {
    return (
        <div className="relative border border-gray-200 rounded-lg shadow-lg w-[98%]">
            <div className="flex items-center justify-start gap-1 p-4">
                <p className="font-medium text-[20px] text-gray-900">{bid.amount}</p>
                -
                <p className="max-w-xs text-[16px] font-[300] text-gray-500 truncate">
                    {bid.bidder.fullname}
                </p>
            </div>
        </div>
    )
}

export default BiddingBox;