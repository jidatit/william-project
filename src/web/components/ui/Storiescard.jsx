import React from 'react'

const Storiescard = ({ image, say }) => {
    return (
        <>
            <div className="bg-[#FFA90A] rounded-[20px] overflow-hidden shadow-lg w-[100%] lg:max-w-sm">
                <div className="p-2 bg-[#FFA90A]">
                    <img className="w-full rounded-[20px]" src={image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30"} alt="Product Image" />
                </div>
                <div className="p-4">
                    <p className="text-md mb-4 text-white">{say || "Lorem ipsum dolor sit amet consectetur. Vel cursus quam vulputate mi. Elementum lobortis tempus fames blandit. Nibh hac nisi urna bibendum erat felis. Risus ultricies a mattis pretium. Quisque vitae lorem suspendisse amet."}</p>
                    <div className="flex w-full items-center justify-end">
                        <button className="bg-black text-white font-bold py-2 px-4 rounded">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Storiescard