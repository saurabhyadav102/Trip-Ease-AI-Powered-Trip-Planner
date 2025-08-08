import React from 'react'
import { Link } from 'react-router-dom'

function Recommended({trip}) {
  return (
    <div >
          <span className='font-bold text-xl mt-5 mb-3 border-b-2 '>Hotel Recommendation</span>
        
          <div className='grid grid-cols-2 md:grid:cols-3 xl:grid-cols-4 gap-5 pt-5 '>
            {trip?.tripdata?.hotels?.map((hotel,index)=>(
                   
                   
                  <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+','+ hotel?.hotelAddress} target='_blank'>
                    {console.log(hotel.hotelImageUrl)}
                        <div  
                             key={index}
                       className='hover:scale-105 transition-all cursor-pointer'>
                        <img src={hotel.hotelImageUrl} className='w-[130px] h-[130px] rounded-xl' />
                            <div className='my-2'>
                           
                       
                                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                                <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
                                <h2 className='text-sm'>💰{hotel?.price}</h2>
                                <h2 className='text-sm'>⭐{hotel?.rating}</h2>
                            </div>
                        </div>
                        </Link>
))}
          </div>
    </div>
  )
}

export default Recommended
