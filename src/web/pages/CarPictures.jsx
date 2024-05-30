import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import './../styles/web.css'

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { db } from "../../../db"
import { getDoc, doc } from 'firebase/firestore';

const CarPictures = () => {

    const { id } = useParams();
    const [advancedExampleOpen, setAdvancedExampleOpen] = useState(false);
    let [tempcarData, setTempCarData] = useState({});

    const fetchAd = async (adId) => {
        try {
            const adRef = doc(db, 'Ads', adId);
            const adSnapshot = await getDoc(adRef);
            if (adSnapshot.exists()) {
                setTempCarData({ id: adSnapshot.id, ...adSnapshot.data() });
            } else {
                console.error('No such document!');
            }
        } catch (error) {
            console.error("Error fetching tempcarData:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchAd(id);
        }
    }, [id]);


    return (
        <>
            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-3 justify-start items-start'>

                <div className='w-full cursor-pointer'>
                    {tempcarData && tempcarData.images && tempcarData.images.length > 0 && (
                        <>
                            <img src={tempcarData.images[0].file} className="w-full h-full lg:h-[500px]" alt="Selected Image" onClick={() => setAdvancedExampleOpen(true)} />
                        </>
                    )}
                </div>

                <div className='w-full grid grid-cols-2 justify-start items-start cursor-pointer'>
                    {tempcarData && tempcarData.images && tempcarData.images.length > 0 && (
                        <>
                            {tempcarData.images.length == 1 && (
                                tempcarData.images.map((image, index) => (
                                    image.file && <img key={index} src={image.file} className="w-full h-[500px] col-span-2 row-span-2" alt={`Image ${index + 1}`} onClick={() => setAdvancedExampleOpen(true)} />
                                ))
                            )}
                            {tempcarData.images.length == 2 && (
                                tempcarData.images.map((image, index) => (
                                    image.file && <img key={index} src={image.file} className="w-full lg:h-[250px] bg-black opacity-100 z-10 transition-opacity duration-300 hover:opacity-70" alt={`Image ${index + 1}`} onClick={() => setAdvancedExampleOpen(true)} />
                                ))
                            )}
                            {tempcarData.images.length == 3 && (
                                tempcarData.images.map((image, index) => (
                                    image.file && <img key={index} src={image.file} className="w-full lg:h-[250px] bg-black opacity-100 z-10 transition-opacity duration-300 hover:opacity-70" alt={`Image ${index + 1}`} onClick={() => setAdvancedExampleOpen(true)} />
                                ))
                            )}
                            {tempcarData.images.length >= 4 && (
                                tempcarData.images.slice(0, 4).map((image, index) => (
                                    image.file && <img key={index} src={image.file} className="w-full lg:h-[250px] border-10 border-black-800 bg-black opacity-100 z-10 transition-opacity duration-300 hover:opacity-70" alt={`Image ${index + 1}`} onClick={() => setAdvancedExampleOpen(true)} />
                                ))
                            )}
                        </>
                    )}
                </div>

            </div>

            {advancedExampleOpen && tempcarData && tempcarData.images && (
                <Lightbox
                    open={advancedExampleOpen}
                    close={() => setAdvancedExampleOpen(false)}
                    slides={tempcarData.images.map((image) => ({ src: image.file }))}
                    plugins={[Captions, Fullscreen, Thumbnails, Video, Zoom]}
                />
            )}

        </>
    )
}

export default CarPictures;
