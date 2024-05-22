import React from 'react'

const Auctioncard = ({ image, model, category }) => {
    return (
        <>
            <div className="bg-white rounded-[20px] overflow-hidden shadow-lg w-[100%] lg:max-w-sm">
                <div className="relative">
                    <img className="w-full" src={image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30"} alt="Product Image" />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">Model: {model || "Dacia Sandero"}</h3>
                    <p className="text-md mb-4">Category: {category || "Hybrid"}</p>
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-[#FFA90A] underline">More info</span>
                        <button className="bg-[#FFA90A] text-white font-bold py-2 px-4 rounded">
                            Bid Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auctioncard