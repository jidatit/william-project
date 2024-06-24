import React from 'react'
import { useListing } from '../../../listingContext'

const BidDetails = () => {
    const { daysLeft, highestBid, bidslen } = useListing()
    return (
        <>
            <div className='w-full flex flex-col xl:flex-row justify-between gap-2 mb-0 xl:mb-3'>

                <div className='grid lg:grid-flow-col lg:auto-cols-auto px-5 py-3 gap-4 items-center bg-black text-white w-full'>
                    <div className='flex flex-row justify-center mt-5 md:mt-0 gap-3'>
                        <h1 className='font-light'>Time Left</h1>
                        {daysLeft && (<h1 className='font-bold'>{daysLeft}</h1>)}
                    </div>
                    <div className='flex flex-row justify-center gap-3'>
                        <h1 className='font-light'>High Bid</h1>
                        {highestBid && (<h1 className='font-bold'>${highestBid}</h1>)}
                    </div>
                    <div className='flex flex-row justify-center gap-2'>
                        <h1 className='font-light'>Bid</h1>
                        {bidslen && (<h1 className='font-bold'>{bidslen}</h1>)}
                    </div>
                    <div className='flex flex-row justify-center mb-5 md:mb-0 gap-2'>
                        <h1 className='font-light'>Comments</h1>
                        <h1 className='font-bold'>6</h1>
                    </div>
                </div>

            </div>
        </>
    )
}

export default BidDetails
