import React, { useEffect, useState } from 'react';
import { db } from '../../../db';
import { collection, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const PayPalPayment = ({ currentUser, adDocId, handleCloseSecond }) => {
    const [paymentStatus, setPaymentStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=AW5nn8ZblyoZOgQIXLEXFdHIx738wglYHLhsQV6udyaGaNa97y5CcH8E0M_KcuhyX8N-eAYj1CeWOZgD`;
        script.async = true;

        script.onload = () => {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: '299.00',
                                currency_code: 'USD',
                            },
                        }],
                    });
                },
                onApprove: async (data, actions) => {
                    try {
                        const order = await actions.order.capture();
                        setPaymentStatus('Your payment was successful!');
                        const bidsQuery = query(
                            collection(db, "Ads"),
                            where("accepted_bid.bidder.email", "==", currentUser.data.email),
                            where("accepted_bid.vehicleId", "==", adDocId)
                        );

                        const querySnapshot = await getDocs(bidsQuery);
                        if (!querySnapshot.empty) {
                            const adDoc = querySnapshot.docs[0];
                            const adRef = doc(db, "Ads", adDoc.id);
                            await updateDoc(adRef, {
                                "accepted_bid.payment": true,
                                "accepted_bid.order": order
                            });
                            console.log("Payment status updated successfully");
                            setTimeout(() => {
                                handleCloseSecond();
                            }, 3000);
                        } else {
                            console.log("No matching documents found");
                        }
                    } catch (error) {
                        console.error('Error capturing order : ', error);
                        setPaymentStatus('There was an error processing your payment.');
                    }
                },
                onError: (err) => {
                    console.error('PayPal Checkout error:', err);
                    setPaymentStatus('There was an error processing your payment.');
                },
            }).render('#paypal-button-container');
        };

        document.body.appendChild(script);

        return () => {
            script.remove();
        };
    }, [currentUser, adDocId]);

    return (
        <div className="w-full">
            <div id="paypal-button-container"></div>
            {paymentStatus && <div className="mt-4 text-center text-lg">{paymentStatus}</div>}
        </div>
    );
};

export default PayPalPayment;