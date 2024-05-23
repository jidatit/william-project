import React from 'react'
import Auctioncard from '../components/ui/Auctioncard'
import heroimg from "../../assets/web/heroimg.png"
import seccar from "../../assets/web/seccar.png"
import car1 from "../../assets/web/car1.png"
import car2 from "../../assets/web/car2.png"
import icon1 from "../../assets/web/icon1.png"
import icon2 from "../../assets/web/icon2.png"
import icon3 from "../../assets/web/icon3.png"
import StoriesSlider from "../components/slider"
import FAQ from "../components/faq"

const Homepage = () => {

    const carsData = [
        {
            image: car1,
            model: "Dacia Sanderi",
            category: "Hybrid"
        },
        {
            image: car2,
            model: "Dacia Sandera",
            category: "Hybrid"
        },
        {
            image: car2,
            model: "Dacia Sanderi",
            category: "Hybrid"
        },
        {
            image: car1,
            model: "Dacia Sandera",
            category: "Hybrid"
        },
    ]

    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>

                <div className='w-full min-h-screen flex flex-col justify-center items-center'
                    style={{
                        backgroundImage: `url(${heroimg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className='lg:w-[60%] text-white flex flex-col justify-center items-center gap-5'>
                        <h1 className='font-bold lg:text-[50px] md:text-[25px] text-[20px] text-center'>THE LEADING ONLINE CAR AUCTION FOR DEALERS AND SELLERS</h1>
                        <p className='font-light lg:text-[25px] md:text-[20px] text-[15px] text-center'>Find the right price, dealer and advice</p>
                        <div className='w-full flex flex-col md:flex-row justify-center items-center gap-5'>
                            <button className='bg-transparent lg:text-[20px] text-[13px] py-2 px-2 md:w-[25%] w-[90%] font-semibold flex flex-col justify-center items-center border-[2px] border-[#FFA90A]'>
                                Buy Car
                            </button>
                            <button className='bg-[#FFA90A] lg:text-[20px] text-[13px] py-2 px-2 md:w-[25%] w-[90%] flex flex-col justify-center items-center border-[2px] border-[#FFA90A] font-semibold'>
                                Sell Car
                            </button>
                        </div>
                    </div>
                </div>

                <div className='w-[90%] shadow-lg mt-[-90px] px-5 py-3 bg-[#FFA90A] rounded-[20px] text-black flex flex-col justify-center items-center gap-5'>
                    <h2 className='text-center font-semibold lg:text-[30px] md:text-[25px] text-[20px]'>Why Us?</h2>
                    <div className='w-full grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-5'>
                        <div className='w-full flex flex-col justify-center items-center gap-5'>
                            <div className='w-[60px] h-[60px] rounded-full bg-[#D9D9D9]'>

                            </div>
                            <p className='text-center font-semibold lg:text-[25px] md:text-[20px] text-[15px]'>#1 automotive marketplace</p>
                        </div>
                        <div className='w-full flex flex-col justify-center items-center gap-5'>
                            <div className='w-[60px] h-[60px] rounded-full bg-[#D9D9D9]'>

                            </div>
                            <p className='text-center font-semibold lg:text-[25px] md:text-[20px] text-[15px]'>5+ lac visitors daily</p>
                        </div>
                        <div className='w-full flex flex-col justify-center items-center gap-5'>
                            <div className='w-[60px] h-[60px] rounded-full bg-[#D9D9D9]'>

                            </div>
                            <p className='text-center font-semibold lg:text-[25px] md:text-[20px] text-[15px]'>3 million+ cars sold</p>
                        </div>
                    </div>
                </div>

                <div className='w-full flex mt-[70px] mb-[70px] flex-col gap-5 justify-center bg-white items-center'>
                    <h2 className='text-center font-semibold lg:text-[30px] md:text-[25px] text-[20px]'>Featured Listing Auction</h2>
                    <div className='w-full flex mt-[30px] flex-col px-10 justify-center bg-white items-center'>
                        <div className='w-full grid gap-2 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 flex-wrap'>
                            {carsData && carsData?.map((car, index) => (
                                <Auctioncard key={index} image={car.image} model={car.model} category={car.category} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className='w-full px-5 py-5 bg-[#C8C8C8] flex flex-col justify-center items-center gap-5 text-black'>
                    <h2 className='text-center mt-[20px] font-semibold lg:text-[30px] md:text-[25px] text-[20px]'>3 Simple Steps To Bid Your Car</h2>
                    <div className='w-full mt-[20px] mb-[20px] grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-5'>
                        <div className='w-full flex flex-col justify-center items-center gap-5'>
                            <div className='p-[30px] rounded-[10px] bg-white flex flex-col justify-center items-center'>
                                <img src={icon1} alt="" />
                            </div>
                            <p className='text-center font-bold lg:text-[25px] md:text-[20px] text-[15px]'>Registration and Account</p>
                            <p className='text-center font-light lg:text-[25px] md:text-[20px] text-[15px]'>Search inventory of more than salvage used vehicles. Aliquam sagittis pellentesque turpis egestas tincidunt. Integer mollis leo lectus.</p>
                        </div>
                        <div className='w-full flex flex-col justify-center items-center gap-5'>
                            <div className='p-[30px] rounded-[10px] bg-white flex flex-col justify-center items-center'>
                                <img src={icon2} alt="" />
                            </div>
                            <p className='text-center font-bold lg:text-[25px] md:text-[20px] text-[15px]'>Browse and Select a Vehicle</p>
                            <p className='text-center font-light lg:text-[25px] md:text-[20px] text-[15px]'>Search inventory of more than salvage used vehicles. Aliquam sagittis pellentesque turpis egestas tincidunt. Integer mollis leo lectus.</p>
                        </div>
                        <div className='w-full flex flex-col justify-center items-center gap-5'>
                            <div className='p-[30px] rounded-[10px] bg-white flex flex-col justify-center items-center'>
                                <img src={icon3} alt="" />
                            </div>
                            <p className='text-center font-bold lg:text-[25px] md:text-[20px] text-[15px]'>Place Bids and Monitor</p>
                            <p className='text-center font-light lg:text-[25px] md:text-[20px] text-[15px]'>Search inventory of more than salvage used vehicles. Aliquam sagittis pellentesque turpis egestas tincidunt. Integer mollis leo lectus.</p>
                        </div>
                    </div>
                </div>

                <div className='w-full bg-white mb-[50px] flex gap-5 flex-col justify-center items-center'>
                    <h2 className='text-center mt-[50px] font-semibold lg:text-[30px] md:text-[25px] text-[20px]'>Deal Car Success Stories</h2>
                    <StoriesSlider />
                </div>

                <div className="w-full relative min-h-screen flex flex-col justify-center items-end bg-[#C8C8C8] mb-12 lg:mb-[50px] p-5 lg:p-10">
                    <img className="absolute h-full top-0 left-0 object-cover w-full lg:w-auto" src={seccar} alt="Car" />
                    <div className="relative lg:w-[50%] flex flex-col justify-center items-start gap-5 bg-white bg-opacity-70 p-5 lg:p-10 rounded-lg shadow-lg">
                        <h2 className="text-[#FFA90A] font-semibold text-lg lg:text-[30px] md:text-[25px]">About Us</h2>
                        <h2 className="font-bold md:leading-[50px] text-xl lg:text-[40px] md:text-[30px]">Revving The Future: Your Ultimate Auction Car Destination</h2>
                        <p className="font-semibold text-sm lg:text-base">Lorem ipsum dolor sit amet consectetur. Gravida mi mauris arcu sed. Adipiscing mollis velit lacus posuere varius leo. Pellentesque tincidunt convallis pretium duis eu pretium sagittis nunc velit. Ullamcorper phasellus nisl mauris cras euismod.</p>
                        <ul className="list-disc pl-5">
                            <li className="text-sm lg:text-base">
                                Diverse Inventory: Explore a wide range of vehicles, each meticulously.
                            </li>
                            <li className="text-sm lg:text-base">
                                Live Auctions: Immerse yourself in the excitement of real-time bidding.
                            </li>
                            <li className="text-sm lg:text-base">
                                Transparency: We believe in openness and provide detailed information.
                            </li>
                            <li className="text-sm lg:text-base">
                                User-Friendly Platform: Navigate effortlessly through our website.
                            </li>
                            <li className="text-sm lg:text-base">
                                Secure Transactions: Bid with confidence, knowing that your transactions are secure.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='w-full flex flex-col justify-center items-center gap-5'>
                    <h2 className='text-center mt-[30px] mb-[10px] font-semibold lg:text-[30px] md:text-[25px] text-[20px]'>FAQs About Selling Cars</h2>
                    <div className='md:w-[70%] w-[90%] mb-[30px] flex flex-col justify-center items-center'>
                        <FAQ />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Homepage