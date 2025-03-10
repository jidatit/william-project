import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Auctioncard from "../components/ui/Auctioncard";
import BidDetails from "./BidDetails";
import CarPictures from "./CarPictures";
import { Link } from "react-router-dom";
import car1 from "../../assets/web/car1.png";
import car2 from "../../assets/web/car2.png";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { db } from "./../../../db";
import { getDoc, doc } from "firebase/firestore";
import BiddingBox from "../components/BiddingBox";
import { collection, getDocs } from "firebase/firestore";
import CarDealershipContact from "../components/ContactForm";
const CarDetails = () => {
  const { id } = useParams();
  const location = useLocation(); // Get the state passed via Link
  const model_name = location.state?.model_name || "Unknown Model";
  let [carData, setCarData] = useState({});
  const [carsData, setCarsData] = useState([]);
  const [recentCarsData, setRecentCarsData] = useState([]);
  const filterRecentAds = (adsData) => {
    const recentAds = adsData.filter((ad) => {
      const adDate = new Date(ad.date);
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      return adDate >= threeDaysAgo;
    });

    // return recentAds;
    setRecentCarsData(recentAds);
  };
  const fetchAds = async () => {
    try {
      const Adsref = collection(db, "Ads");
      const querySnapshot = await getDocs(Adsref);
      const adsData = [];

      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        if (data.status !== "sold") {
          adsData.push(data);
        }
      });

      setCarsData(adsData);
      filterRecentAds(adsData);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const fetchAd = async (adId) => {
    try {
      const adRef = doc(db, "Ads", adId);
      const adSnapshot = await getDoc(adRef);
      if (adSnapshot.exists()) {
        setCarData({ id: adSnapshot.id, ...adSnapshot.data() });
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching carData:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAd(id);
      fetchAds();
    }
  }, [id]);

  return (
    <div className="w-full flex flex-col justify-center items-center my-5 lg:my-10 px-[20px] lg:px-[50px]">
      <CarPictures />
      <CarDealershipContact carName={model_name} />
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-10 gap-5 justify-center items-start my-4">
        <div className="w-full h-full col-span-6">
          <BidDetails />

          <div id="detailed-pricing" className="w-full overflow-x-auto">
            <div className="overflow-hidden min-w-max">
              {carData && (
                <>
                  <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 ">
                    <div className="font-bold"> Model Year </div>
                    <div className="font-normal"> {carData?.model_year} </div>
                    <div className="font-bold"> Registered In </div>
                    <div className="font-normal">
                      {" "}
                      {carData?.registered_in}{" "}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 ">
                    <div className="font-bold"> Location </div>
                    <div className="font-normal"> {carData?.location} </div>
                    <div className="font-bold"> Address </div>
                    <div className="font-normal"> {carData?.address} </div>
                  </div>
                  <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 ">
                    <div className="font-bold"> Mileage (km) </div>
                    <div className="font-normal"> {carData?.mileage_km} </div>
                    <div className="font-bold"> Body Color </div>
                    <div className="font-normal"> {carData?.body_color} </div>
                  </div>
                  <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 ">
                    <div className="font-bold"> Price </div>
                    <div className="font-normal"> {carData?.price} </div>
                    <div className="font-bold"> Engine Type </div>
                    <div className="font-normal"> {carData?.engine_type} </div>
                  </div>
                  <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 ">
                    <div className="font-bold"> Engine Capacity </div>
                    <div className="font-normal">
                      {" "}
                      {carData?.engine_capacity}{" "}
                    </div>
                    <div className="font-bold"> Transmission </div>
                    <div className="font-normal"> {carData?.transmission} </div>
                  </div>
                  <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 ">
                    <div className="font-bold"> Seller Name </div>
                    <div className="font-normal">
                      {" "}
                      {carData?.user?.fullname}{" "}
                    </div>
                    <div className="font-bold"> Seller Phone Number </div>
                    <div className="font-normal">
                      {" "}
                      {carData?.user?.phoneNumber}{" "}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 ">
                    <div className="font-bold"> Seller Email </div>
                    <div className="font-normal"> {carData?.user?.email} </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col justify-start items-start mt-4">
            <div className="text-2xl font-bold">
              <h1>Description:</h1>
            </div>
            <div className="mt-1 mr-5 text-base">
              <p className="text-justify">
                {carData && <>{carData.description}</>}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full grid gap-2 col-span-4">
          {id && carData && <BiddingBox vehicleId={id} carData={carData} />}

          <div className="font-bold text-2xl mb-3">
            <h1> Auctions Ending Soon </h1>
          </div>
          <div className="w-full h-full grid gap-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 flex-wrap cursor-pointer">
            {recentCarsData?.map((car, index) => (
              <Link
                key={index}
                to={`/car-details/${car.id}`}
                state={{ model_name: car.model_name }}
              >
                <Auctioncard
                  key={index}
                  image={car.images[0].file}
                  model={car.model_name}
                  category={car.engine_type}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
