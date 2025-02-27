import React from 'react'
import Placecarditem from './Placecarditem'

function Dailyplan({trip}) {
  return (
    <div>
        <div className='mt-4'>
        <span className='font-bold text-lg pt-3 border-b-2 '>Places to Visit</span>
        </div>
          
          <div>
            {trip?.tripdata?.itinerary&&Object.entries(trip.tripdata.itinerary).map(([day,details],index)=>(
                 <div>
                    <div className='font-bold scale-110 text-gray-900 mt-5 pl-10 underline text-base'>Day : {index + 1}</div>
                    <div className='mt-3'>
                        <h2 className='text-md text-gray-800 pb-2'><span className='font-bold '>🌞 When to Enjoy the Most: </span>
                       <span
                         className=' font-medium animate-pulse'>{details.bestTimeToVisit}</span> </h2>
                       <h2 className='text-gray-800 '> <span className='font-bold '>🎭 Travel Experience Theme: </span><span className='animate-pulse font-medium'>{details.theme}</span></h2></div>
                       

                       <div className='grid md:grid-cols-2 gap-5'>
                       {details.locations.map((place,index)=>(
                           <div>
                              <Placecarditem place={place}/>
                           </div>
                       ))}
                       </div>
                      
                 </div>
            ))}
          </div>
    </div>
  )
}

export default Dailyplan
