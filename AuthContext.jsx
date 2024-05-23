import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './db';
// import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // const getUserDetails = async (userId) => {
    //     try {
    //         const userDocRef = doc(db, "users", userId);
    //         const userDocSnapshot = await getDoc(userDocRef);
    //         if (userDocSnapshot.exists()) {
    //             const userData = userDocSnapshot.data();
    //             return userData;
    //         }
    //         else {
    //             console.log("No user/admin exists.")
    //         }
    //     } catch (error) {
    //         console.error("Error fetching user details:", error);
    //         throw error;
    //     }
    // }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            setCurrentUser(user)
            setLoading(false);
            if (user) {
                // const data = await getUserDetails(user.uid)
                // let allDetails = { ...user, data }
                setCurrentUser(user)
                localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                localStorage.removeItem('currentUser');
                setCurrentUser(null);
            }
        });

        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
            setLoading(false);
        } else {
            setLoading(false);
            setCurrentUser(null);
        }

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem('currentUser');
            setCurrentUser(null)
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
