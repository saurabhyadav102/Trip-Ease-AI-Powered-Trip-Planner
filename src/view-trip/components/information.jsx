import React from 'react'

function Information({trip}) {
  return (
    <div >
       
        <img src="/travel.jpg" className='w-full lg:h-[440px] sm:h-[340px] object-cover rounded-sm ' />
      
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userselection?.location}</h2>
            <div className='flex gap-5'>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>🗓{trip?.userselection?.noOfdays} days</h2> 
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>💰{trip?.userselection?.Budget} Budget</h2> 
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>🥂No of traveler : {trip?.userselection?.traveler} </h2>  
            </div>
        </div>
    </div>
  )
}

export default Information
