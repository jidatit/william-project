import React, { createContext, useContext, useState } from 'react';

const ListingContext = createContext();

export const useListing = () => useContext(ListingContext);

export const ListingProvider = ({ children }) => {
    const [daysLeft, setDaysLeft] = useState("");
    const [highestBid, setHighestBid] = useState("");
    const [status, setStatus] = useState("active");
    const [bidslen, setBidslen] = useState("");

    const calculateDaysLeft = (adDate) => {
        const currentDate = new Date();
        const targetDate = new Date(adDate);
        targetDate.setDate(targetDate.getDate() + 7);
        const timeDiff = targetDate - currentDate;
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (days <= 0) {
            setStatus("Inactive");
            return "Inactive";
        }
        return `${days} Days`;
    };

    return (
        <ListingContext.Provider value={{ calculateDaysLeft, bidslen, setBidslen, daysLeft, status, setDaysLeft, highestBid, setHighestBid }}>
            {children}
        </ListingContext.Provider>
    );
};
